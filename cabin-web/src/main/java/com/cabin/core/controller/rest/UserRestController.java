package com.cabin.core.controller.rest;

import java.text.ParseException;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.enums.SessionEnum;
import com.cabin.core.persistence.domain.Client;
import com.cabin.core.persistence.domain.Employee;
import com.cabin.core.persistence.domain.Profile;
import com.cabin.core.persistence.domain.Status;
import com.cabin.core.persistence.domain.User;
import com.cabin.core.persistence.repository.ClientRepository;
import com.cabin.core.persistence.repository.EmployeeRepository;
import com.cabin.core.persistence.repository.UserRepository;
import com.cabin.core.view.UserRequest;

@RestController
public class UserRestController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private HttpSession httpSession;

    @RequestMapping(value = "/post/loginClient", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public Client loginClient(@RequestBody UserRequest user) throws ParseException {

        List<User> users = userRepository.findByNameAndPass(user.getName(), user.getPass());

        List<Client> clients = clientRepository.findByUserId(users.get(0).getId());
        Client client = clients.get(0);
        
        if (Status.INACTIVE == client.getStatus().getId()) {
            return null;
        }

        System.out.println("httpSession ::: " + httpSession);
        httpSession.setAttribute(SessionEnum.CLIENT_ID.name(), client.getId());
        httpSession.setAttribute(SessionEnum.HEADQUARTER_ID.name(), user.getHeadquarterId());
        httpSession.setAttribute(SessionEnum.USER_ID.name(), users.get(0).getId());
        httpSession.setAttribute(SessionEnum.USER_NAME.name(), user.getName());

        return client;
    }

    @RequestMapping(value = "/post/login", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public User login(@RequestBody UserRequest userRequest) throws ParseException {

        List<User> users = userRepository.findByNameAndPass(userRequest.getName(), userRequest.getPass());
        User user = users.get(0);
        if (userRequest.getProfileId() != user.getProfile().getId()) {
            return null;
        }

        if (Profile.CLIENT == user.getProfile().getId()) {
            List<Client> clients = clientRepository.findByUserId(user.getId());
            Client client = clients.get(0);
            httpSession.setAttribute(SessionEnum.CLIENT_ID.name(), client.getId());
        } else {
            List<Employee> employees = employeeRepository.findByUserId(user.getId());
            Employee employee = employees.get(0);
            httpSession.setAttribute(SessionEnum.EMPLOYEE_ID.name(), employee.getId());
        }

        System.out.println("httpSession ::: " + httpSession);
        httpSession.setAttribute(SessionEnum.IS_ANONYMOUS.name(), false);
        httpSession.setAttribute(SessionEnum.USER_PROFILE.name(), userRequest.getProfileId());
        httpSession.setAttribute(SessionEnum.HEADQUARTER_ID.name(), userRequest.getHeadquarterId());
        httpSession.setAttribute(SessionEnum.USER_ID.name(), user.getId());
        httpSession.setAttribute(SessionEnum.USER_NAME.name(), user.getName());

        return user;
    }

    @RequestMapping(value = "/post/loginAnonymous", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public User loginAnonymous(@RequestBody UserRequest userRequest) throws ParseException {

        List<Client> inactiveClients = clientRepository.findByStatusIdAndUserAnonymous(Status.INACTIVE, User.IS_ANONYMOUS);
        Client client = inactiveClients.get(0);
        User user = client.getUser();

        client.setStatus(new Status());
        client.getStatus().setId(Status.ACTIVE);
        client.setBalance(0.0);
        client.setPoints(0);
        client.setExperience(0);

        clientRepository.saveAndFlush(client);

        System.out.println("httpSession ::: " + httpSession);
        httpSession.setAttribute(SessionEnum.CLIENT_ID.name(), client.getId());
        httpSession.setAttribute(SessionEnum.IS_ANONYMOUS.name(), true);
        httpSession.setAttribute(SessionEnum.HEADQUARTER_ID.name(), userRequest.getHeadquarterId());
        httpSession.setAttribute(SessionEnum.USER_NAME.name(), user.getName());

        return user;
    }

    /*
     * @RequestMapping(value = "/post/login", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8"
     * }) public User login(@RequestBody UserRequest user) throws ParseException { long id = 0; List<User> users =
     * userRepository.findByNameAndPass(user.getName(), user.getPass()); System.out.println("User Found " +
     * users.get(0).getName()); List<Client> clients = clientRepository.findByUserId(users.get(0).getId());
     * List<Employee> employees = employeeRepository.findByUserId(users.get(0).getId()); if ( clients.size() > 0 ) id =
     * clients.get(0).getId(); else if (employees.size() > 0) id = employees.get(0).getId(); System.out.println(
     * "Id del cliente o empleado " + id); if ( id > 0) { System.out.println("httpSession ::: " + httpSession);
     * httpSession.setAttribute(SessionEnum.CLIENT_ID.name(), id);
     * httpSession.setAttribute(SessionEnum.HEADQUARTER_ID.name(), user.getHeadquarterId());
     * httpSession.setAttribute(SessionEnum.USER_NAME.name(), user.getName()); } return users.get(0); }
     */
}
