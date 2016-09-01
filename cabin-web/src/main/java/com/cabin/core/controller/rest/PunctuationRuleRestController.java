package com.cabin.core.controller.rest;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.PunctuationRule;
import com.cabin.core.persistence.repository.PunctuationRuleRepository;

@RestController
public class PunctuationRuleRestController {

    @Autowired
    private PunctuationRuleRepository punctuationRuleRepository;

    @RequestMapping(value = "/post/punctuation_rule", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public PunctuationRule savePunctuationRule(@RequestBody(required = true) PunctuationRule rule) throws ParseException {
        return punctuationRuleRepository.saveAndFlush(rule);
    }
}
