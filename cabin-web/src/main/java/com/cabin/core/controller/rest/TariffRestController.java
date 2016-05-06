package com.cabin.core.controller.rest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
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

	private static final SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");

	@Autowired
	private TariffRepository tariffRepository;

	@Autowired
	private TariffDetailRepository tariffDetailRepository;

	@RequestMapping(value = "/post/tariff", method = RequestMethod.POST, produces = {
			"application/json;charset=UTF-8" })
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

	@RequestMapping(value = "/get/allTariff", method = RequestMethod.GET, produces = {
			"application/json;charset=UTF-8" })
	public List<Tariff> getAllTariffs() {
		return tariffRepository.findAll();
	}

	@RequestMapping(value = "/get/tariff", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
	public Tariff getTariff(@RequestParam(value = "id", required = true) Long idTariff) {
		return tariffRepository.findOne(idTariff);
	}

	@RequestMapping(value = "/post/tariffDetail", method = RequestMethod.POST, produces = {
			"application/json;charset=UTF-8" })
	public Tariff putTariffDetail(@RequestParam(value = "id_tariff", required = true) Long idTariff,
			@RequestParam(value = "days", required = true) String days,
			@RequestParam(value = "minimumFraction", required = true) Double minimumFraction,
			@RequestParam(value = "price", required = true) Double price,
			@RequestParam(value = "startTime", required = true) String startTime,
			@RequestParam(value = "endTime", required = true) String endTime) throws ParseException {

		Tariff tariff = tariffRepository.findOne(idTariff);

		TariffDetail tariffDetail = new TariffDetail();
		tariffDetail.setDays(days);
		tariffDetail.setMinimumFraction(minimumFraction);
		tariffDetail.setPrice(price);

		Calendar startCalendar = Calendar.getInstance();
		startCalendar.setTime(format.parse(startTime));
		Calendar endCalendar = Calendar.getInstance();
		endCalendar.setTime(format.parse(startTime));

		tariffDetail.setStartTime(startCalendar);
		tariffDetail.setEndTime(endCalendar);

		tariff.getTariffDetails().add(tariffDetail);

		return tariffRepository.saveAndFlush(tariff);
	}
}
