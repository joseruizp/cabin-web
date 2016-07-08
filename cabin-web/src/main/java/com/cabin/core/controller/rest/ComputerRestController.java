package com.cabin.core.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Computer;
import com.cabin.core.persistence.repository.ComputerRepository;

@RestController
public class ComputerRestController {

    @Autowired
    private ComputerRepository computerRepository;

    @RequestMapping(value = "/get/computersByHeadquarter", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Computer> getComputersByHeadquarter(@RequestParam(value = "id", required = true) Long id) {
        System.out.println("headquarterId ::: " + id);
        return computerRepository.findByHeadquarterId(id);
    }

    @RequestMapping(value = "/get/computer", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Computer getComputer(@RequestParam(value = "id", required = true) Long id) {
        System.out.println("computerId ::: " + id);
        return computerRepository.findOne(id);
    }
}
