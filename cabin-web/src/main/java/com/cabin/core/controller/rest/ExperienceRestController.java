package com.cabin.core.controller.rest;

import java.text.ParseException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Experience;
import com.cabin.core.persistence.domain.Tariff;
import com.cabin.core.persistence.domain.TariffDetail;
import com.cabin.core.persistence.repository.ExperienceRepository;

@RestController
public class ExperienceRestController {

    @Autowired
    private ExperienceRepository experienceRepository;

    @RequestMapping(value = "/get/allExperiences", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll();
    }
    
    @RequestMapping(value = "/get/experience", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Experience getExperience(@RequestParam(value = "id", required = true) Long idExperience) {
        return experienceRepository.findOne(idExperience);
    }
    
    @RequestMapping(value = "/post/experience", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public Experience postExperience(@RequestBody(required = true) Experience experience) throws ParseException {
        return experienceRepository.save(experience);
    }
}
