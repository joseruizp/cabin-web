package com.cabin.core.controller.rest;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Bonus;
import com.cabin.core.persistence.repository.BonusRepository;

@RestController
public class BonusRestController {

    @Autowired
    private BonusRepository bonusRepository;

    @RequestMapping(value = "/get/allBonus", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Bonus> getAllBonus() {
        return bonusRepository.findAll();
    }

    @RequestMapping(value = "/get/bonus", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Bonus getBonus(@RequestParam(value = "id", required = true) Long idBonus) {
        return bonusRepository.findOne(idBonus);
    }

    @RequestMapping(value = "/post/bonus", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public Bonus postBonus(@RequestBody(required = true) Bonus bonus) throws ParseException {
        return bonusRepository.save(bonus);
    }
}
