package com.cabin.core;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import com.cabin.core.enums.SessionEnum;
import com.cabin.core.persistence.domain.Client;
import com.cabin.core.persistence.domain.CurrentUser;
import com.cabin.core.persistence.domain.Employee;
import com.cabin.core.persistence.domain.Headquarter;
import com.cabin.core.persistence.domain.Profile;
import com.cabin.core.persistence.domain.Status;
import com.cabin.core.persistence.domain.User;
import com.cabin.core.persistence.repository.ClientRepository;
import com.cabin.core.persistence.repository.EmployeeRepository;
import com.cabin.core.persistence.repository.HeadquarterRepository;
import com.cabin.core.persistence.repository.UserRepository;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HeadquarterRepository headquarterRepository;

    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/", "/login/**", "/error/**", "/post/loginClient").permitAll();
        http.authorizeRequests().antMatchers("/get/computer", "/get/allFailures", "/get/prizeByLevel", "/put/startRentComputer", "/put/endRentComputer",
                "/put/exchangePoints", "/put/changeLevel", "/put/changeBonification", "/get/tariffPrice", "/get/bonification").permitAll();
        http.authorizeRequests().antMatchers("/get/allHeadquarters", "/get/anonymous").permitAll();
        http.authorizeRequests().antMatchers("/css/**", "/images/**", "/bootstrap/**", "/fonts/**", "/plugins/**", "/js/**", "/sockjs-client/**", "/stomp-websocket/**")
                .permitAll();

        http.authorizeRequests().antMatchers("/admin/**", "/headquarters/**").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/operator/**").hasAuthority("OPERATOR");
        http.authorizeRequests().antMatchers("/client/**").hasAuthority("USER");

        http.authorizeRequests().anyRequest().fullyAuthenticated().and().httpBasic().disable();
        http.csrf().disable();

        http.formLogin().loginPage("/login").failureUrl("/login?error=E001").successHandler(new SuccessHandler()).usernameParameter("email").permitAll();
        http.authorizeRequests().and().logout().logoutUrl("/logout").logoutSuccessHandler(new LogoutHandler()).permitAll().and().rememberMe();
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
        // .passwordEncoder(new BCryptPasswordEncoder());
    }

    private class SuccessHandler implements AuthenticationSuccessHandler {

        @Override
        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
            CurrentUser currentUser = (CurrentUser) authentication.getPrincipal();
            User user = currentUser.getUser();
            Long profileId = currentUser.getProfile();
            System.out.println("currentUser: " + currentUser.getId());
            System.out.println("currentUser isAuthenticated: " + authentication.isAuthenticated());

            HttpSession session = request.getSession();            

            validateProfile(currentUser.getProfile(), request, response);

            if (Profile.CLIENT == profileId) {
                authenticateClient(currentUser, request, response);
            } else {
                authenticateEmployee(currentUser, request, response);
            }

            updateUserStatus(user, request);

            session.setAttribute(SessionEnum.USER_PROFILE.name(), profileId);
            session.setAttribute(SessionEnum.USER_ID.name(), currentUser.getId());
            session.setAttribute(SessionEnum.USER_NAME.name(), currentUser.getUsername());
            
            session.setMaxInactiveInterval(-1);
            
            redirect(profileId, request, response);
        }

    }

    private void validateProfile(Long currentProfile, HttpServletRequest request, HttpServletResponse response) throws IOException {
        Long profileId = Long.parseLong(request.getParameter("profileId"));
        if (profileId != currentProfile) {
            request.getSession().invalidate();
            redirectStrategy.sendRedirect(request, response, "/login?error=E002");
        }
    }

    private void authenticateClient(CurrentUser currentUser, HttpServletRequest request, HttpServletResponse response) throws IOException {
        List<Client> clients = clientRepository.findByUserId(currentUser.getId());
        if (CollectionUtils.isEmpty(clients)) {
            request.getSession().invalidate();
            redirectStrategy.sendRedirect(request, response, "/login?error=E002");
        }
        Client client = clients.get(0);
        
        if (currentUser.isAnonymous()) {
            client.setStatus(new Status());
            client.getStatus().setId(Status.ACTIVE);
            client.setBalance(0.0);
            client.setPoints(0);
            client.setExperience(0);
            clientRepository.saveAndFlush(client);
        }

        if (Status.ACTIVE != client.getStatus().getId()) {
            request.getSession().invalidate();
            redirectStrategy.sendRedirect(request, response, "/login?error=E003");
        }

        request.getSession().setAttribute(SessionEnum.CLIENT_ID.name(), client.getId());

        request.getSession().setAttribute(SessionEnum.IS_ANONYMOUS.name(), currentUser.isAnonymous());
    }

    private void authenticateEmployee(CurrentUser currentUser, HttpServletRequest request, HttpServletResponse response) throws IOException {
        List<Employee> employees = employeeRepository.findByUserId(currentUser.getId());
        if (CollectionUtils.isEmpty(employees)) {
            request.getSession().invalidate();
            redirectStrategy.sendRedirect(request, response, "/login?error=E002");
        }

        Employee employee = employees.get(0);
        if (Status.ACTIVE != employee.getStatus().getId()) {
            request.getSession().invalidate();
            redirectStrategy.sendRedirect(request, response, "/login?error=E003");
        }

        if (Profile.EMPLOYEE == currentUser.getProfile()) {
            validateOperator(request, response);
        }

        request.getSession().setAttribute(SessionEnum.EMPLOYEE_ID.name(), employee.getId());
    }

    private void validateOperator(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Long headquarterId = Long.parseLong(request.getParameter("headquarterId"));
        Headquarter headquarter = headquarterRepository.findById(headquarterId);

        List<User> users = userRepository.findByProfileIdAndStatusIdAndHeadquarterId(Profile.EMPLOYEE, Status.ACTIVE, headquarterId);
        if (users.size() >= headquarter.getMaxAmountOperator()) {
            redirectStrategy.sendRedirect(request, response, "/login?error=E004");
        }
    }

    private void updateUserStatus(User user, HttpServletRequest request) {
        user.setStatus(new Status());
        user.getStatus().setId(Status.ACTIVE);

        String headquarterId = request.getParameter("headquarterId");
        if (StringUtils.isNotBlank(headquarterId)) {
            user.setHeadquarter(new Headquarter());
            user.getHeadquarter().setId(Long.parseLong(headquarterId));
            request.getSession().setAttribute(SessionEnum.HEADQUARTER_ID.name(), headquarterId);
        }

        userRepository.saveAndFlush(user);
    }

    private void redirect(Long profileId, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (Profile.ADMIN == profileId) {
            redirectStrategy.sendRedirect(request, response, "/admin");
        } else if (Profile.CLIENT == profileId) {
            redirectStrategy.sendRedirect(request, response, "/client");
        } else if (Profile.EMPLOYEE == profileId) {
            redirectStrategy.sendRedirect(request, response, "/operator");
        } else if (Profile.INCIDENCE == profileId) {
            redirectStrategy.sendRedirect(request, response, "/incidence");
        }
    }

    private class LogoutHandler implements LogoutSuccessHandler {

        @Override
        public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        	System.out.println("Ingresó al cierre de sesión");
        	CurrentUser currentUser = (CurrentUser) authentication.getPrincipal();
            User user = currentUser.getUser();

            boolean isAnonymous = currentUser.isAnonymous();

            if (isAnonymous) {
                List<Client> clients = clientRepository.findByUserId(currentUser.getId());
                Client client = clients.get(0);
                client.setStatus(new Status());
                client.getStatus().setId(Status.INACTIVE);
                client.setBalance(0.0);
                client.setPoints(0);
                client.setExperience(0);

                clientRepository.saveAndFlush(client);
            }

            user.setStatus(new Status());
            user.getStatus().setId(Status.INACTIVE);

            userRepository.saveAndFlush(user);

            request.getSession().invalidate();
            
            System.out.println("Se cerró sesión satisfactoriamente");
            
            redirectStrategy.sendRedirect(request, response, "/login");
        }

    }
}
