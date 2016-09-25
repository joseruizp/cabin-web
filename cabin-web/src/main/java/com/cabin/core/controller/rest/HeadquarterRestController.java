package com.cabin.core.controller.rest;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Headquarter;
import com.cabin.core.persistence.repository.HeadquarterRepository;

@RestController
public class HeadquarterRestController {
    
    @Autowired
    private HeadquarterRepository headquarterRepository;

    @RequestMapping(value = "/get/allHeadquarters", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Headquarter> getAllHeadquarters() {
        return headquarterRepository.findAll();
    }
    
    @RequestMapping(value = "/get/headquarter", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Headquarter getHeadquarter(@RequestParam(value = "id", required = true) Long idHeadquarter) {
        return headquarterRepository.findOne(idHeadquarter);
    }

    @RequestMapping(value = "/post/headquarter", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public Headquarter postHeadquarter(@RequestBody(required = true) Headquarter headquarter) throws ParseException {
        return headquarterRepository.save(headquarter);
    }
}
