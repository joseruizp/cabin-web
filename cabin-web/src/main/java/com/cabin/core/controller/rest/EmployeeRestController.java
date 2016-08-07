package com.cabin.core.controller.rest;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Employee;
import com.cabin.core.persistence.repository.EmployeeRepository;

@RestController
public class EmployeeRestController {

    @Autowired
    private EmployeeRepository employeeRepository;

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
        return employeeRepository.save(employee);
    }
}
