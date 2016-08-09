package com.cabin.core.controller.rest;

import java.text.ParseException;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.CashClosing;
import com.cabin.core.persistence.repository.CashClosingRepository;

@RestController
public class CashClosingRestController {

    @Autowired
    private CashClosingRepository cashClosingRepository;

    @RequestMapping(value = "/get/allCashClosings", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<CashClosing> getAllCashClosings() {
        return cashClosingRepository.findAll();
    }

    @RequestMapping(value = "/get/cashClosing", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public CashClosing getCashClosing(@RequestParam(value = "id", required = true) Long idCashClosing) {
        return cashClosingRepository.findOne(idCashClosing);
    }

    @RequestMapping(value = "/post/cashClosing", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public CashClosing postCashClosing(@RequestBody(required = true) CashClosing cashClosing) throws ParseException {
    	Calendar date = Calendar.getInstance();    	
    	cashClosing.setDate( date );
        return cashClosingRepository.save(cashClosing);
    }
}
