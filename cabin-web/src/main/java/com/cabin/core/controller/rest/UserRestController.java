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
    /*
    @RequestMapping(value = "/post/login", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public Client login(@RequestBody UserRequest user) throws ParseException {

        List<User> users = userRepository.findByNameAndPass(user.getName(), user.getPass());

        List<Client> clients = clientRepository.findByUserId(users.get(0).getId());
        Client client = clients.get(0);

        System.out.println("httpSession ::: " + httpSession);
        httpSession.setAttribute(SessionEnum.CLIENT_ID.name(), client.getId());
        httpSession.setAttribute(SessionEnum.HEADQUARTER_ID.name(), user.getHeadquarterId());
        httpSession.setAttribute(SessionEnum.USER_NAME.name(), user.getName());

        return client;
    }
	*/
    @RequestMapping(value = "/post/login", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public User login(@RequestBody UserRequest user) throws ParseException {    	
    	long id = 0;
        List<User> users = userRepository.findByNameAndPass(user.getName(), user.getPass());
        System.out.println("User Found " + users.get(0).getName());
        List<Client> clients = clientRepository.findByUserId(users.get(0).getId());
        List<Employee> employees = employeeRepository.findByUserId(users.get(0).getId());        
        if ( clients.size() > 0 )
        	id = clients.get(0).getId();
        else if (employees.size() > 0)
        	id = employees.get(0).getId();  
        System.out.println("Id del cliente o empleado " + id);
        if ( id > 0) {
	        System.out.println("httpSession ::: " + httpSession);
	        httpSession.setAttribute(SessionEnum.CLIENT_ID.name(), id);
	        httpSession.setAttribute(SessionEnum.HEADQUARTER_ID.name(), user.getHeadquarterId());
	        httpSession.setAttribute(SessionEnum.USER_NAME.name(), user.getName());
        }
        return users.get(0);
    }
    
}
