package com.cabin.core.controller.rest;

import java.text.ParseException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Tariff;
import com.cabin.core.persistence.domain.TariffDetail;
import com.cabin.core.persistence.repository.TariffDetailRepository;
import com.cabin.core.persistence.repository.TariffRepository;

@RestController
public class TariffRestController {

    @Autowired
    private TariffRepository tariffRepository;

    @Autowired
    private TariffDetailRepository tariffDetailRepository;

    @RequestMapping(value = "/post/tariff", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public Tariff putTariff(@RequestBody(required = true) Tariff tariff) throws ParseException {

        Set<TariffDetail> details = tariff.getTariffDetails();
        tariff.setTariffDetails(new HashSet<TariffDetail>());

        Tariff newTariff = tariffRepository.save(tariff);

        for (TariffDetail tariffDetail : details) {
            tariffDetail.setTariff(newTariff);
            tariff.getTariffDetails().add(tariffDetailRepository.save(tariffDetail));
        }

        return tariff;
    }

    @RequestMapping(value = "/post/tariffDetail", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public Tariff putTariffDetail(@RequestBody(required = true) Tariff tariff) throws ParseException {
        TariffDetail tariffDetail = tariff.getTariffDetails().iterator().next();
        tariff.setTariffDetails(null);
        tariffDetail.setTariff(tariff);

        tariffDetailRepository.save(tariffDetail);

        tariff.setTariffDetails(new HashSet<TariffDetail>());
        tariff.getTariffDetails().add(tariffDetail);
        return tariff;
    }

    @RequestMapping(value = "/get/allTariff", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Tariff> getAllTariffs() {
        return tariffRepository.findAll();
    }

    @RequestMapping(value = "/get/allTariffDetails", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Set<TariffDetail> getAllTariffDetails(@RequestParam(value = "id", required = true) Long tariffId) {
        return tariffRepository.findOne(tariffId).getTariffDetails();
    }

    @RequestMapping(value = "/get/tariff", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Tariff getTariff(@RequestParam(value = "id", required = true) Long idTariff) {
        return tariffRepository.findOne(idTariff);
    }

}
