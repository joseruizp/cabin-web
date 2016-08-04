package com.cabin.core.controller.rest;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Parameter;
import com.cabin.core.persistence.repository.ParameterRepository;

@RestController
public class ParameterRestController {

    @Autowired
    private ParameterRepository parameterRepository;

    @RequestMapping(value = "/get/allParameters", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Parameter> getAllParameters() {
        return parameterRepository.findAll();
    }

    @RequestMapping(value = "/get/parameter", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Parameter getParameter(@RequestParam(value = "id", required = true) Long idParameter) {
        return parameterRepository.findOne(idParameter);
    }

    @RequestMapping(value = "/post/parameter", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public Parameter postParameter(@RequestBody(required = true) Parameter parameter) throws ParseException {
        return parameterRepository.save(parameter);
    }
}
