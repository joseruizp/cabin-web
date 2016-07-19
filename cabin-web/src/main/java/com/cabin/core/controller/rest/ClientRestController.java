package com.cabin.core.controller.rest;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Client;
import com.cabin.core.persistence.domain.Experience;
import com.cabin.core.persistence.domain.Level;
import com.cabin.core.persistence.domain.PunctuationRule;
import com.cabin.core.persistence.repository.ClientRepository;
import com.cabin.core.persistence.repository.ExperienceRepository;
import com.cabin.core.persistence.repository.LevelRepository;
import com.cabin.core.persistence.repository.PunctuationRuleRepository;
import com.cabin.core.view.Recharge;

@RestController
public class ClientRestController {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private PunctuationRuleRepository punctuationRuleRepository;

    @Autowired
    private ExperienceRepository experienceRepository;
    
    @Autowired
    private LevelRepository levelRepository;
    
    @RequestMapping(value = "/get/client", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Client getClient(@RequestParam(value = "id", required = true) Long id) {
        System.out.println("clientId ::: " + id);
        return clientRepository.findOne(id);
    }

    @RequestMapping(value = "/post/recharge", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public Client recharge(@RequestBody(required = true) Recharge recharge) throws ParseException {
        Client client = clientRepository.findOne(recharge.getClientId());
        Level level = client.getLevel();

        PunctuationRule punctuationRule = punctuationRuleRepository.findByLevelId(client.getLevel().getId());

        Experience experience = experienceRepository.findByLevelId(client.getLevel().getId());

        client.setPoints(client.getPoints() + getRechargePoints(punctuationRule, recharge.getAmount()));
        Integer newExperience = client.getExperience() + getRechargeExperience(experience, recharge.getAmount());
        client.setExperience(newExperience);
        
        if (newExperience > level.getFinalExperience()) {
        	Level newLevel = levelRepository.findOne(level.getId() + 1);
        	if (newLevel != null) {
        		client.setLevel(newLevel);
        	}
        }

        return clientRepository.saveAndFlush(client);
    }

    private Integer getRechargePoints(PunctuationRule rule, Double recharge) {
        return Math.toIntExact(Math.round(recharge * rule.getRechargingFraction() / rule.getPoints()));
    }

    private Integer getRechargeExperience(Experience experience, Double recharge) {
        return Math.toIntExact(Math.round(recharge * experience.getRechargeFraction() / experience.getExperienceToGive()));
    }
}
