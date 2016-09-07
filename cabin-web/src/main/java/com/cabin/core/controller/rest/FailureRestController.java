package com.cabin.core.controller.rest;

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Computer;
import com.cabin.core.persistence.domain.Failure;
import com.cabin.core.persistence.domain.FailureByComputer;
import com.cabin.core.persistence.domain.Parameter;
import com.cabin.core.persistence.domain.Status;
import com.cabin.core.persistence.repository.ComputerRepository;
import com.cabin.core.persistence.repository.FailureByComputerRepository;
import com.cabin.core.persistence.repository.FailureRepository;
import com.cabin.core.persistence.repository.ParameterRepository;

@RestController
public class FailureRestController {

    @Autowired
    private FailureRepository failureRepository;

    @Autowired
    private FailureByComputerRepository failureByComputerRepository;

    @Autowired
    private ComputerRepository computerRepository;

    @Autowired
    private ParameterRepository parameterRepository;

    @RequestMapping(value = "/get/allFailures", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Failure> getAllFailures() {
        return failureRepository.findAll();
    }

    @RequestMapping(value = "/put/report", method = RequestMethod.PUT, produces = { "application/json;charset=UTF-8" })
    public FailureByComputer putReportFailures(@RequestParam(value = "computerId", required = true) Long computerId,
            @RequestParam(value = "failureId", required = true) Long failureId) {
        Parameter parameter = parameterRepository.findOne(Parameter.MAXIMUM_NUMBER_OF_FAILURES);
        int maximumNumberOfFailures = Integer.parseInt(parameter.getValue());

        FailureByComputer failureByComputer = new FailureByComputer();
        failureByComputer.setComputer(new Computer());
        failureByComputer.getComputer().setId(computerId);
        failureByComputer.setFailure(new Failure());
        failureByComputer.getFailure().setId(failureId);
        failureByComputer.setStatus(new Status());
        failureByComputer.getStatus().setId(Status.ACTIVE);
        failureByComputerRepository.saveAndFlush(failureByComputer);

        List<FailureByComputer> failureByComputers = failureByComputerRepository.findByComputerIdAndStatusId(computerId, Status.ACTIVE);
        if (CollectionUtils.size(failureByComputers) >= maximumNumberOfFailures) {
            Computer computer = computerRepository.findOne(computerId);
            computer.setStatus(new Status());
            computer.getStatus().setId(Status.INACTIVE);
            computerRepository.saveAndFlush(computer);
        }

        return failureByComputer;
    }
}
