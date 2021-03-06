package com.cabin.core.controller.rest;

import java.text.ParseException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Parameter;
import com.cabin.core.persistence.domain.RechargeInfo;
import com.cabin.core.persistence.repository.ParameterRepository;

@RestController
public class ParameterRestController {

    @Autowired
    private ParameterRepository parameterRepository;

    @RequestMapping(value = "/get/allParameters", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Parameter> getAllParameters() {
        return parameterRepository.findAll();
    }
    
    @RequestMapping(value = "/get/conectionParameters", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Map<Long, Long> getConectionParameters() {
    	List<Long> parametersToFilter = Arrays.asList(Parameter.MAXIMUM_DISCONNECTION_TIME, Parameter.MAXIMUM_BLOCKED_TIME_TO_CLOSE_PROGRAMS,
    			Parameter.MAXIMUM_BLOCKED_TIME_TO_SHUT_DOWN);
        return parameterRepository.findAll().stream().filter(p -> parametersToFilter.contains(p.getId()))
        		.collect(Collectors.toMap(k -> k.getId(), v -> Long.parseLong(v.getValue())));
    }

    @RequestMapping(value = "/get/parametersRecharge", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public RechargeInfo getParametersRecharge() {
        RechargeInfo rechargeInfo = new RechargeInfo();
        rechargeInfo.setMinimumFraction(Double.parseDouble(getParameter(Parameter.MINIMUN_RECHARGE).getValue()));
        rechargeInfo.setMaximumFraction(Double.parseDouble(getParameter(Parameter.MAXIMUM_RECHARGE).getValue()));
        rechargeInfo.setRechargeFraction(Double.parseDouble(getParameter(Parameter.RECHARGE_FRACTION).getValue()));
        return rechargeInfo;
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
