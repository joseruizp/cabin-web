package com.cabin.core.controller.rest;

import java.text.ParseException;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Employee;
import com.cabin.core.persistence.domain.Profile;
import com.cabin.core.persistence.domain.User;
import com.cabin.core.persistence.repository.EmployeeRepository;
import com.cabin.core.persistence.repository.UserRepository;

@RestController
public class EmployeeRestController {

    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/get/allEmployees", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @RequestMapping(value = "/get/employee", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Employee getEmployee(@RequestParam(value = "id", required = true) Long idEmployee) {
        return employeeRepository.findOne(idEmployee);
    }

    @RequestMapping(value = "/post/employee", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public Employee postEmployee(@RequestBody(required = true) Employee employee) throws ParseException {
        Long employeeId = employee.getId();
        employee.getBirthDate().set(Calendar.HOUR_OF_DAY, 12);
        User user = employee.getUser();

        if (employeeId != null && employeeId != 0) {
            Employee original = employeeRepository.findOne(employeeId);
            original.getUser().setName(employee.getUser().getName());
            original.getUser().setPass(employee.getUser().getPass());
        } else {
            user.setAnonymous("0");
            user.setProfile(new Profile());
            user.getProfile().setId(Profile.EMPLOYEE);
            employee.setUser(userRepository.saveAndFlush(user));
        }

        return employeeRepository.saveAndFlush(employee);
    }
}
