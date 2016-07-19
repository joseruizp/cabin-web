package com.cabin.core.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
}
