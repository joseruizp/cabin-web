package com.cabin.core.controller.rest;

import java.text.NumberFormat;
import java.text.ParseException;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.PrizesRule;
import com.cabin.core.persistence.repository.PrizesRuleRepository;

@RestController
public class PrizesRuleRestController {

    private static final NumberFormat DECIMAL_FORMAT = NumberFormat.getNumberInstance(Locale.US);

    @Autowired
    private PrizesRuleRepository prizesRuleRepository;

    @RequestMapping(value = "/get/prizeByLevel", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public String getPrizeByLevel(@RequestParam(value = "id", required = true) Long idlevel, @RequestParam(value = "points", required = true) Integer points) {
        PrizesRule rule = prizesRuleRepository.findByLevelId(idlevel);
        return DECIMAL_FORMAT.format(points * rule.getBalanceFraction() / rule.getPoints());
    }
    
    @RequestMapping(value = "/get/allPrizesRules", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<PrizesRule> getAllPrizesRules() {
        return prizesRuleRepository.findAll();
    }

    @RequestMapping(value = "/get/prizesRule", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public PrizesRule getPrizesRule(@RequestParam(value = "id", required = true) Long idPrizesRule) {
        return prizesRuleRepository.findOne(idPrizesRule);
    }

    @RequestMapping(value = "/post/prizesRule", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public PrizesRule postPrizesRule(@RequestBody(required = true) PrizesRule prizesRule) throws ParseException {
        return prizesRuleRepository.save(prizesRule);
    }
}
