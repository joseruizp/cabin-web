package com.cabin.core.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Ticket;
import com.cabin.core.persistence.repository.TicketRepository;

@RestController
public class TicketRestController {

    @Autowired
    private TicketRepository ticketRepository;

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

}
