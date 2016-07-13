package com.cabin.core.controller.rest;

import java.text.DecimalFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.PrizesRule;
import com.cabin.core.persistence.repository.PrizesRuleRepository;

@RestController
public class PrizesRuleRestController {
	
	private static final DecimalFormat DECIMAL_FORMAT = new DecimalFormat("#0.00");

    @Autowired
    private PrizesRuleRepository prizesRuleRepository;

    @RequestMapping(value = "/get/prizeByLevel", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public String getPrizeByLevel(@RequestParam(value = "id", required = true) Long idlevel, @RequestParam(value = "points", required = true) Integer points) {
        PrizesRule rule = prizesRuleRepository.findByLevelId(idlevel);
        return DECIMAL_FORMAT.format(points * rule.getBalanceFraction() / rule.getPoints());
    }
}
