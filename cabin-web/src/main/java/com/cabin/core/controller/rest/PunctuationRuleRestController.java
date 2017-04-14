package com.cabin.core.controller.rest;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Bonus;
import com.cabin.core.persistence.domain.Status;
import com.cabin.core.persistence.domain.PunctuationRule;
import com.cabin.core.persistence.repository.PunctuationRuleRepository;

@RestController
public class PunctuationRuleRestController {

    @Autowired
    private PunctuationRuleRepository punctuationRuleRepository;

    @RequestMapping(value = "/post/punctuation_rule", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public PunctuationRule savePunctuationRule(@RequestBody(required = true) PunctuationRule rule) throws ParseException {    	 
    	 Long statusId = (long) 1;
    	 Long active = (long) 1;
    	 Long inactiveId = (long) 2;
    	 List<PunctuationRule> punctuationRuleList = punctuationRuleRepository.findByStatusId(statusId);
         for (PunctuationRule punctuationRule: punctuationRuleList) {        	 
        	 if ( punctuationRule.getLevel().getId() ==  rule.getLevel().getId() && punctuationRule.getStatus().getId() == active){
        		 Status inactive = new Status();
        		 inactive.setId( inactiveId );
        		 punctuationRule.setStatus(inactive);
        		 punctuationRuleRepository.saveAndFlush(punctuationRule);
        	 }
         }
        return punctuationRuleRepository.saveAndFlush(rule);
    }
}
