package com.cabin.core.controller.rest;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.util.StringUtils;

import com.cabin.core.persistence.domain.Tariff;
import com.cabin.core.persistence.domain.TariffByGroup;
import com.cabin.core.persistence.domain.TariffDetail;
import com.cabin.core.persistence.repository.TariffByGroupRepository;
import com.cabin.core.persistence.repository.TariffDetailRepository;
import com.cabin.core.persistence.repository.TariffRepository;

@RestController
public class TariffRestController {

    private static final Map<Integer, String> DAYS_MAP = new HashMap<>();

    static {
        DAYS_MAP.put(Calendar.SUNDAY, "Dom");
        DAYS_MAP.put(Calendar.MONDAY, "Lun");
        DAYS_MAP.put(Calendar.TUESDAY, "Mar");
        DAYS_MAP.put(Calendar.WEDNESDAY, "Mie");
        DAYS_MAP.put(Calendar.THURSDAY, "Jue");
        DAYS_MAP.put(Calendar.FRIDAY, "Vie");
        DAYS_MAP.put(Calendar.SATURDAY, "Sab");
    }

    @Autowired
    private TariffRepository tariffRepository;

    @Autowired
    private TariffDetailRepository tariffDetailRepository;

    @Autowired
    private TariffByGroupRepository tariffByGroupRepository;

    @RequestMapping(value = "/post/tariff", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public Tariff putTariff(@RequestBody(required = true) Tariff tariff) throws ParseException {
        Long tariffId = tariff.getId();
        TariffDetail tariffDetail = CollectionUtils.isNotEmpty(tariff.getTariffDetails()) ? tariff.getTariffDetails().iterator().next() : null;

        if (tariffDetail != null) {
            tariff.setTariffDetails(null);
            tariffId = tariffRepository.saveAndFlush(tariff).getId();

            Tariff originalTarif = new Tariff();
            originalTarif.setId(tariffId);
            tariffDetail.setTariff(originalTarif);
            tariffDetailRepository.saveAndFlush(tariffDetail);
        } else {
            tariffId = tariffRepository.saveAndFlush(tariff).getId();
        }

        return tariffRepository.getOne(tariffId);
    }

    @RequestMapping(value = "/post/tariffDetail", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public TariffDetail putTariffDetail(@RequestBody(required = true) Tariff tariff) throws ParseException {
        TariffDetail tariffDetail = tariff.getTariffDetails().iterator().next();
        tariff.setTariffDetails(null);
        tariffDetail.setTariff(tariff);

        return tariffDetailRepository.save(tariffDetail);
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
    
    @RequestMapping(value = "/delete/tariffDetail", method = RequestMethod.DELETE, produces = { "application/json;charset=UTF-8" })
    public void deleteTariffDetail(@RequestParam(value = "id", required = true) Long idTariffDetail) {
        tariffDetailRepository.delete(idTariffDetail);
    }

    @RequestMapping(value = "/get/tariffPrice", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Double getTariffPrice(@RequestParam(value = "idGroup", required = true) Long idGroup, @RequestParam(value = "idHeadquarter", required = true) Long idHeadquarter,
            @RequestParam(value = "pcConsole", required = true) String pcConsole) {
        List<TariffByGroup> tariffs = tariffByGroupRepository.findByHeadquarterIdAndGroupId(idHeadquarter, idGroup);
        Tariff tariff = tariffs.get(0).getTariff();
        Set<TariffDetail> tariffDetails = getAllTariffDetails(tariff.getId());

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        String currentDay = DAYS_MAP.get(calendar.get(Calendar.DAY_OF_WEEK));
        int currenttMinutes = (calendar.get(Calendar.HOUR_OF_DAY) * 60) + calendar.get(Calendar.MINUTE);

        for (TariffDetail tariffDetail : tariffDetails) {
            if (StringUtils.contains(tariffDetail.getDays(), currentDay)) {
                int startMinutes = getNumberOfMinutes(tariffDetail.getStartTime());
                int endMinutes = getNumberOfMinutes(tariffDetail.getEndTime());
                if (currenttMinutes >= startMinutes && currenttMinutes <= endMinutes) {
                    return tariffDetail.getPrice();
                }
            }
        }

        return tariff.getPrice();
    }

    private int getNumberOfMinutes(String time) {
        int hours = Integer.parseInt(time.split(":")[0]);
        int minutes = Integer.parseInt(time.split(":")[1]);
        return (hours * 60) + minutes;
    }

    @RequestMapping(value = "/post/saveTariffByGroup", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public List<TariffByGroup> postSaveTariffByGroup(@RequestBody(required = true) List<TariffByGroup> tariffByGroups) {

        List<TariffByGroup> result = new ArrayList<>();
        for (TariffByGroup tariffByGroup : tariffByGroups) {
            List<TariffByGroup> tariffs = tariffByGroupRepository.findByHeadquarterIdAndGroupIdAndPcConsoleFlag(tariffByGroup.getHeadquarter().getId(),
                    tariffByGroup.getGroup().getId(), tariffByGroup.getPcConsoleFlag());
            if (CollectionUtils.isEmpty(tariffs)) {
                result.add(tariffByGroup);
                tariffByGroupRepository.save(tariffByGroup);
            } else {
                tariffs.get(0).setTariff(tariffByGroup.getTariff());
                result.add(tariffs.get(0));
                tariffByGroupRepository.save(tariffs.get(0));
            }
        }

        return result;
    }

    @RequestMapping(value = "/get/tariffByHeadquarter", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<TariffByGroup> getTariffByHeadquarter(@RequestParam(value = "id", required = true) Long headquarterId) {
        return tariffByGroupRepository.findByHeadquarterId(headquarterId);
    }
}
