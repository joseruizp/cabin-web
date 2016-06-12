package com.cabin.core.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.PunctuationRule;
import com.cabin.core.persistence.repository.PunctuationRuleRepository;

@RestController
public class PunctuationRuleRestController {

	@Autowired
	private PunctuationRuleRepository punctuationRuleRepository;

	@RequestMapping(value = "/get/punctationsByLevel", method = RequestMethod.GET, produces = {
			"application/json;charset=UTF-8" })
	public List<PunctuationRule> getPunctuationsByLevel(@RequestParam(value = "id", required = true) Long idlevel) {
		return punctuationRuleRepository.findByLevelId(idlevel);
	}
}
