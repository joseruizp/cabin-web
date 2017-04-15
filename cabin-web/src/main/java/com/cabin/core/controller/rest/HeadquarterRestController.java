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
import com.cabin.core.persistence.domain.Status;
import com.cabin.core.persistence.repository.CashRepository;
import com.cabin.core.persistence.repository.HeadquarterRepository;

@RestController
public class HeadquarterRestController {

    @Autowired
    private HeadquarterRepository headquarterRepository;

    @Autowired
    private CashRepository cashRepository;

    @RequestMapping(value = "/get/allHeadquarters", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Headquarter> getAllHeadquarters() {
        return headquarterRepository.findAll();
    }
    
    @RequestMapping(value = "/get/allHeadquartersActives", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Headquarter> allHeadquartersActives() {
    	long statusId = (long) 1;
        return headquarterRepository.findByStatusId(statusId);
    }

    @RequestMapping(value = "/get/headquarter", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Headquarter getHeadquarter(@RequestParam(value = "id", required = true) Long idHeadquarter) {
        return headquarterRepository.findOne(idHeadquarter);
    }

    @RequestMapping(value = "/post/headquarter", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public Headquarter postHeadquarter(@RequestBody(required = true) Headquarter headquarter) throws ParseException {
        return headquarterRepository.save(headquarter);
    }

    @RequestMapping(value = "/get/operators", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Employee> getOperators(@RequestParam(value = "id", required = true) Long idHeadquarter) {
        List<Cash> cashes = cashRepository.findByHeadquarterIdAndStatusId(idHeadquarter, Status.ACTIVE);
        if (cashes == null) {
            return new ArrayList<>();
        }
        Set<Employee> employees = cashes.stream().map(Cash::getEmployee).collect(Collectors.toSet());
        if (employees == null) {
            return new ArrayList<>();
        }
        return new ArrayList<>(employees);
    }
}
