package com.cabin.core;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
import com.cabin.core.persistence.domain.Profile;
import com.cabin.core.persistence.domain.Status;
import com.cabin.core.persistence.repository.ClientRepository;
import com.cabin.core.persistence.repository.EmployeeRepository;

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

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/", "/login/**", "/error/**").permitAll();
        http.authorizeRequests().antMatchers("/get/allHeadquarters", "/get/anonymous").permitAll();
        http.authorizeRequests().antMatchers("/css/**", "/images/**", "/bootstrap/**", "/fonts/**", "/plugins/**", "/js/**", "/sockjs-client/**", "/stomp-websocket/**").permitAll();

        http.authorizeRequests().antMatchers("/admin/**", "/headquarters/**").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/operator/**").hasAuthority("OPERATOR");
        http.authorizeRequests().antMatchers("/client/**").hasAuthority("USER");

        http.authorizeRequests().anyRequest().fullyAuthenticated().and().httpBasic().disable();
        http.csrf().disable();

        http.formLogin().loginPage("/login").failureUrl("/login?error").successHandler(new SuccessHandler()).usernameParameter("email").permitAll();
        http.authorizeRequests().and().logout().logoutUrl("/logout").logoutSuccessHandler(new LogoutHandler()).permitAll().and().rememberMe();
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
        // .passwordEncoder(new BCryptPasswordEncoder());
    }

    private class SuccessHandler implements AuthenticationSuccessHandler {

        private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

        @Override
        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
            CurrentUser currentUser = (CurrentUser) authentication.getPrincipal();
            System.out.println("currentUser: " + currentUser.getId());

            HttpSession session = request.getSession();

            Long profileId = Long.parseLong(request.getParameter("profileId"));

            if (profileId != currentUser.getProfile()) {
                session.invalidate();
                redirectStrategy.sendRedirect(request, response, "/login?error");
            }

            boolean isAnonymous = currentUser.isAnonymous();

            if (Profile.CLIENT == profileId) {
                List<Client> clients = clientRepository.findByUserId(currentUser.getId());
                Client client = clients.get(0);

                if (Status.ACTIVE != client.getStatus().getId()) {
                    session.invalidate();
                    redirectStrategy.sendRedirect(request, response, "/login?error");
                }

                session.setAttribute(SessionEnum.CLIENT_ID.name(), client.getId());

                if (isAnonymous) {
                    client.setStatus(new Status());
                    client.getStatus().setId(Status.ACTIVE);
                    client.setBalance(0.0);
                    client.setPoints(0);
                    client.setExperience(0);

                    clientRepository.saveAndFlush(client);
                }
            } else {
                List<Employee> employees = employeeRepository.findByUserId(currentUser.getId());
                Employee employee = employees.get(0);
                if (Status.ACTIVE != employee.getStatus().getId()) {
                    session.invalidate();
                    redirectStrategy.sendRedirect(request, response, "/login?error");
                }

                session.setAttribute(SessionEnum.EMPLOYEE_ID.name(), employee.getId());
            }

            session.setAttribute(SessionEnum.IS_ANONYMOUS.name(), isAnonymous);
            session.setAttribute(SessionEnum.USER_PROFILE.name(), profileId);
            session.setAttribute(SessionEnum.HEADQUARTER_ID.name(), request.getParameter("headquarterId"));
            session.setAttribute(SessionEnum.USER_ID.name(), currentUser.getId());
            session.setAttribute(SessionEnum.USER_NAME.name(), currentUser.getUsername());

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

    }

    private class LogoutHandler implements LogoutSuccessHandler {

        private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

        @Override
        public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
            CurrentUser currentUser = (CurrentUser) authentication.getPrincipal();

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

            request.getSession().invalidate();

            redirectStrategy.sendRedirect(request, response, "/login");
        }

    }
}
