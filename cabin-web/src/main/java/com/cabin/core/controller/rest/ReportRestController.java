package com.cabin.core.controller.rest;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.Calendar;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Parameter;
import com.cabin.core.persistence.repository.ParameterRepository;
import com.cabin.core.persistence.repository.RentRepository;
import com.cabin.core.persistence.repository.TicketRepository;
import com.cabin.core.valueobject.AmountByMonth;
import com.cabin.core.view.ReportAnalytics;
import com.cabin.core.view.RevenueAnalytics;
import com.cabin.core.view.SalesAnalytics;

@RestController
public class ReportRestController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private RentRepository rentRepository;

    @Autowired
    private ParameterRepository parameterRepository;

    @RequestMapping(value = "/get/reportAnalytics", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public ReportAnalytics getReportAnalytics() {
        ReportAnalytics reportAnalytics = new ReportAnalytics();
        reportAnalytics.setRevenue(new RevenueAnalytics());

        BigDecimal targetRevenue = getTargetRevenue();
        reportAnalytics.getRevenue().setTargetMonthly(targetRevenue);
        reportAnalytics.getRevenue().setTargetToday(getTargetRevenueToday(targetRevenue));

        reportAnalytics.getRevenue().setMonthly(getRevenueCurrentMonth(null));
        reportAnalytics.getRevenue().setLastMont(getRevenueLastMonth(null));
        reportAnalytics.getRevenue().setLastWeek(getRevenueLastWeek(null));
        reportAnalytics.getRevenue().setToday(getRevenueCurrentDate(null));

        reportAnalytics.setSales(new SalesAnalytics());
        reportAnalytics.getSales().setComputerSalesByMonth(getAmountByMonth(ticketRepository.getTotalRechargesByMonth()));
        reportAnalytics.getSales().setConsoleSalesByMonth(getAmountByMonth(ticketRepository.getTotalExpensesByMonth()));

        reportAnalytics.setOcupiedComputers(rentRepository.getNumberOfRentedComputersInCurrentMonth());
        reportAnalytics.setOcupiedConsoles(rentRepository.getNumberOfRentedConsolesInCurrentMonth());

        reportAnalytics.setNumberOfTickets(ticketRepository.getNumberOfTicketsCurrentMonth());

        return reportAnalytics;
    }

    @RequestMapping(value = "/get/reportAnalytics/{headquarterId}", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public ReportAnalytics getReportAnalytics(@PathVariable(value = "headquarterId") Long headquarterId) {
        ReportAnalytics reportAnalytics = new ReportAnalytics();
        reportAnalytics.setRevenue(new RevenueAnalytics());

        BigDecimal targetRevenue = getTargetRevenue();
        reportAnalytics.getRevenue().setTargetMonthly(targetRevenue);
        reportAnalytics.getRevenue().setTargetToday(getTargetRevenueToday(targetRevenue));

        reportAnalytics.getRevenue().setMonthly(getRevenueCurrentMonth(headquarterId));
        reportAnalytics.getRevenue().setLastMont(getRevenueLastMonth(headquarterId));
        reportAnalytics.getRevenue().setLastWeek(getRevenueLastWeek(headquarterId));
        reportAnalytics.getRevenue().setToday(getRevenueCurrentDate(headquarterId));

        reportAnalytics.setSales(new SalesAnalytics());
        reportAnalytics.getSales().setComputerSalesByMonth(getAmountByMonth(ticketRepository.getTotalRechargesByMonth()));
        reportAnalytics.getSales().setConsoleSalesByMonth(getAmountByMonth(ticketRepository.getTotalExpensesByMonth()));

        reportAnalytics.setOcupiedComputers(rentRepository.getNumberOfRentedComputersInCurrentMonth());
        reportAnalytics.setOcupiedConsoles(rentRepository.getNumberOfRentedConsolesInCurrentMonth());

        reportAnalytics.setNumberOfTickets(ticketRepository.getNumberOfTicketsCurrentMonth());

        return reportAnalytics;
    }

    private BigDecimal getTargetRevenue() {
        return new BigDecimal(parameterRepository.findOne(Parameter.TARGET_REVENUE).getValue());
    }

    private BigDecimal getTargetRevenueToday(BigDecimal targetRevenue) {
        LocalDate localDate = LocalDate.now();
        return targetRevenue.divide(new BigDecimal(localDate.lengthOfMonth()), 2, RoundingMode.HALF_UP);
    }

    private BigDecimal getRevenueCurrentMonth(Long headquarterId) {
        if (headquarterId == null) {
            return substractAmounts(ticketRepository.getTotalRechargesCurrentMonth(), ticketRepository.getTotalExpensesCurrentMonth());
        } else {
            return substractAmounts(ticketRepository.getTotalRechargesCurrentMonthByHeadquarter(headquarterId),
                    ticketRepository.getTotalExpensesCurrentMonthByHeadquarter(headquarterId));
        }
    }

    private BigDecimal getRevenueLastMonth(Long headquarterId) {
        if (headquarterId == null) {
            return substractAmounts(ticketRepository.getTotalRechargesLastMonth(), ticketRepository.getTotalExpensesLastMonth());
        } else {
            return substractAmounts(ticketRepository.getTotalRechargesLastMonthByHeadquarter(headquarterId),
                    ticketRepository.getTotalExpensesLastMonthByHeadquarter(headquarterId));
        }
    }

    private BigDecimal getRevenueLastWeek(Long headquarterId) {
        LocalDate localDate = LocalDate.now();
        java.util.Date startDate = java.sql.Date.valueOf(localDate.with(DayOfWeek.MONDAY).with(TemporalAdjusters.previous(DayOfWeek.MONDAY)));
        java.util.Date endDate = java.sql.Date.valueOf(localDate.with(TemporalAdjusters.next(DayOfWeek.SUNDAY)));

        Calendar startCalendar = Calendar.getInstance();
        startCalendar.setTime(startDate);

        Calendar endCalendar = Calendar.getInstance();
        endCalendar.setTime(endDate);

        if (headquarterId == null) {
            return substractAmounts(ticketRepository.getTotalRechargesBetween(startCalendar, endCalendar),
                    ticketRepository.getTotalExpensesBetween(startCalendar, endCalendar));
        } else {
            return substractAmounts(ticketRepository.getTotalRechargesBetweenByHeadquarter(startCalendar, endCalendar, headquarterId),
                    ticketRepository.getTotalExpensesBetweenByHeadquarter(startCalendar, endCalendar, headquarterId));
        }
    }

    private BigDecimal getRevenueCurrentDate(Long headquarterId) {
        if (headquarterId == null) {
            return substractAmounts(ticketRepository.getTotalRechargesCurrentDate(), ticketRepository.getTotalExpensesCurrentDate());
        } else {
            return substractAmounts(ticketRepository.getTotalRechargesCurrentDateByHeadquarter(headquarterId),
                    ticketRepository.getTotalExpensesCurrentDateByHeadquarter(headquarterId));
        }
    }

    private BigDecimal substractAmounts(BigDecimal firstValue, BigDecimal secondValue) {
        firstValue = firstValue == null ? BigDecimal.ZERO : firstValue;
        secondValue = secondValue == null ? BigDecimal.ZERO : secondValue;

        return firstValue.subtract(secondValue);
    }

    private Map<Integer, Double> getAmountByMonth(List<AmountByMonth> amountByMonth) {
        if (amountByMonth == null) {
            return new HashMap<>();
        }

        LocalDate localDate = LocalDate.now();

        Map<Integer, Double> result = new LinkedHashMap<>();
        amountByMonth.forEach(a -> result.put(a.getMonth(), a.getAmount()));

        IntStream.rangeClosed(1, localDate.getMonthValue()).forEach(i -> {
            if (!result.containsKey(i)) {
                result.put(i, 0.0);
            }
        });
        return result;
    }
}
