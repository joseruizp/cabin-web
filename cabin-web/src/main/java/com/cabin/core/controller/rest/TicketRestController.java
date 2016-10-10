package com.cabin.core.controller.rest;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Cash;
import com.cabin.core.persistence.domain.Client;
import com.cabin.core.persistence.domain.Employee;
import com.cabin.core.persistence.domain.ExpenseType;
import com.cabin.core.persistence.domain.Ticket;
import com.cabin.core.persistence.repository.CashRepository;
import com.cabin.core.persistence.repository.TicketRepository;
import com.cabin.core.view.ExpenseCash;

@RestController
public class TicketRestController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private CashRepository cashRepository;

    @RequestMapping(value = "/get/allTickets", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    @RequestMapping(value = "/get/allTicketsByCash", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Ticket> getAllTicketsByCash(@RequestParam(value = "id", required = true) Long cashId) {
        return ticketRepository.findByCashId(cashId);
    }

    @RequestMapping(value = "/get/ticket", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Ticket getTicket(@RequestParam(value = "id", required = true) Long idTicket) {
        return ticketRepository.findOne(idTicket);
    }

    @RequestMapping(value = "/post/expenses", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public Ticket saveExpenses(@RequestBody ExpenseCash expenseCash) {
        Calendar now = Calendar.getInstance();

        Cash cash = cashRepository.findOne(expenseCash.getCashId());
        cash.setModificationDate(now);
        cashRepository.saveAndFlush(cash);

        Ticket ticket = new Ticket();
        ticket.setAmount(expenseCash.getAmount());
        ticket.setCash(cash);

        if (expenseCash.getClientId() != null) {
            ticket.setClient(new Client());
            ticket.getClient().setId(expenseCash.getClientId());
        }

        ticket.setEmployee(new Employee());
        ticket.getEmployee().setId(expenseCash.getEmployeeId());

        ticket.setExpenseType(new ExpenseType());
        ticket.getExpenseType().setId(expenseCash.getExpenseTypeId());
        ticket.setDate(now);

        return ticketRepository.saveAndFlush(ticket);
    }

}
