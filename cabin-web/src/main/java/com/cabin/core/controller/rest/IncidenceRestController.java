package com.cabin.core.controller.rest;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
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
import com.cabin.core.persistence.domain.Incidence;
import com.cabin.core.persistence.domain.Status;
import com.cabin.core.persistence.repository.CashRepository;
import com.cabin.core.persistence.repository.HeadquarterRepository;
import com.cabin.core.persistence.repository.IncidenceRepository;

@RestController
public class IncidenceRestController {

    @Autowired
    private IncidenceRepository incidenceRepository;

    @RequestMapping(value = "/get/allIncidences", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Incidence> getAllIncidences() {
        return incidenceRepository.findAll();
    }
    
    @RequestMapping(value = "/get/incidencesByEmployee", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Incidence> allIncidencesByEmployee(@RequestParam(value = "id", required = true) Long employeeId) {    	
        return incidenceRepository.findByEmployeeId(employeeId);    	
    }

    @RequestMapping(value = "/get/incidence", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Incidence getIncidence(@RequestParam(value = "id", required = true) Long incidenceId) {
        return incidenceRepository.findOne(incidenceId);
    }

    @RequestMapping(value = "/post/incidence", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public Incidence postIncidence(@RequestBody(required = true) Incidence incidence) throws ParseException {
    	if ( incidence.getId() == null){
	    	Calendar now = Calendar.getInstance();    	
	    	incidence.setDate( now );
    	}
    	else{
    		incidence.setDate( incidenceRepository.findOne(incidence.getId()).getDate() );
    	}
        return incidenceRepository.save(incidence);
    }
}
