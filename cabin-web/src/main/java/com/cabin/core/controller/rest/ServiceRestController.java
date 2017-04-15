package com.cabin.core.controller.rest;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Cash;
import com.cabin.core.persistence.domain.Employee;
import com.cabin.core.persistence.domain.Headquarter;
import com.cabin.core.persistence.domain.Service;
import com.cabin.core.persistence.domain.Status;
import com.cabin.core.persistence.repository.CashRepository;
import com.cabin.core.persistence.repository.HeadquarterRepository;
import com.cabin.core.persistence.repository.ServiceRepository;

@RestController
public class ServiceRestController {

    @Autowired
    private ServiceRepository serviceRepository;

    @RequestMapping(value = "/get/allServices", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

}
