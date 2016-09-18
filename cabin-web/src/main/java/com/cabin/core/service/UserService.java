package com.cabin.core.service;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cabin.core.enums.SessionEnum;
import com.cabin.core.persistence.domain.Client;
import com.cabin.core.persistence.domain.Employee;
import com.cabin.core.persistence.domain.Profile;
import com.cabin.core.persistence.domain.User;
import com.cabin.core.persistence.repository.ClientRepository;
import com.cabin.core.persistence.repository.EmployeeRepository;

@Service
public class UserService {
    
    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private HttpSession httpSession;

    public void saveUserInSession(User user) {
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
        httpSession.setAttribute(SessionEnum.USER_PROFILE.name(), user.getProfile().getId());
//        httpSession.setAttribute(SessionEnum.HEADQUARTER_ID.name(), userRequest.getHeadquarterId());
        httpSession.setAttribute(SessionEnum.USER_ID.name(), user.getId());
        httpSession.setAttribute(SessionEnum.USER_NAME.name(), user.getName());

//        return user;
    }
}
