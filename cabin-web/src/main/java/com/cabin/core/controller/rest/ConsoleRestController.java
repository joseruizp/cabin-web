package com.cabin.core.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Console;
import com.cabin.core.persistence.repository.ConsoleRepository;

@RestController
public class ConsoleRestController {

    @Autowired
    private ConsoleRepository consoleRepository;
    
    @RequestMapping(value = "/get/consolesByHeadquarter", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Console> getConsolesByHeadquarter(@RequestParam(value = "id", required = true) Long id) {
        System.out.println("headquarterId ::: " + id);
        return consoleRepository.findByHeadquarterId(id);
    }

    @RequestMapping(value = "/get/console", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Console getConsole(@RequestParam(value = "id", required = true) Long id) {
        System.out.println("consoleId ::: " + id);
        return consoleRepository.findOne(id);
    }
}
