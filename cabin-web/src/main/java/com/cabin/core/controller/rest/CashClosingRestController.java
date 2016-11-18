package com.cabin.core.controller.rest;

import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Cash;
import com.cabin.core.persistence.domain.Employee;
import com.cabin.core.persistence.domain.Headquarter;
import com.cabin.core.persistence.domain.RechargingType;
import com.cabin.core.persistence.domain.Status;
import com.cabin.core.persistence.domain.Ticket;
import com.cabin.core.persistence.repository.CashRepository;
import com.cabin.core.persistence.repository.TicketRepository;
import com.cabin.core.view.CloseCash;
import com.cabin.core.view.StartCash;

@RestController
public class CashClosingRestController {

    @Autowired
    private CashRepository cashRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @RequestMapping(value = "/post/startCash", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public Cash startCash(@RequestBody StartCash startCash) {
        Cash cash = new Cash();
        Calendar now = Calendar.getInstance();
        cash.setStartDate(now);
        cash.setModificationDate(now);
        cash.setEmployee(new Employee());
        cash.getEmployee().setId(startCash.getEmployeeId());
        cash.setHeadquarter(new Headquarter());
        cash.getHeadquarter().setId(startCash.getHeadquarterId());
        cash.setStatus(new Status());
        cash.getStatus().setId(Status.ACTIVE);
        cash = cashRepository.saveAndFlush(cash);

        Ticket ticket = new Ticket();
        ticket.setRechargeAmount(startCash.getAmount());
        ticket.setEmployee(new Employee());
        ticket.getEmployee().setId(startCash.getEmployeeId());
        ticket.setDate(now);
        ticket.setRechargingType(new RechargingType());
        ticket.getRechargingType().setId(RechargingType.MANUAL);
        ticket.setCash(cash);
        ticketRepository.saveAndFlush(ticket);

        return cash;
    }

    @RequestMapping(value = "/get/allCashClosings", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Cash> getAllCashClosings() {
        return cashRepository.findAll();
    }

    @RequestMapping(value = "/get/cashClosing", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Cash getCashClosing(@RequestParam(value = "id", required = true) Long idCashClosing) {
        return cashRepository.findOne(idCashClosing);
    }

    @RequestMapping(value = "/put/closeCash/{cashId}", method = RequestMethod.PUT, produces = { "application/json;charset=UTF-8" })
    public CloseCash postCashClosing(@PathVariable(value = "cashId") Long cashId, @RequestBody(required = true) CloseCash closeCash) {
        Cash cash = cashRepository.findOne(cashId);
        cash.setModificationDate(Calendar.getInstance());
        cash.setStatus(new Status());
        cash.getStatus().setId(Status.INACTIVE);

        List<Ticket> tickets = ticketRepository.findByCashId(cashId);
        Double income = tickets.stream().collect(Collectors.summingDouble(t -> t.getRechargeAmount()));
        Double expense = tickets.stream().collect(Collectors.summingDouble(t -> t.getExpenseAmount()));
        Double totalAmount = income - expense;

        cashRepository.saveAndFlush(cash);

        closeCash.setJustifiedAmount(totalAmount);
        return closeCash;
    }
}
