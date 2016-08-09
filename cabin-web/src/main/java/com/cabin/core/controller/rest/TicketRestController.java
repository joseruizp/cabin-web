package com.cabin.core.controller.rest;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Calendar;
import com.cabin.core.persistence.domain.Ticket;
import com.cabin.core.persistence.domain.CashClosing;
import com.cabin.core.persistence.repository.TicketRepository;
import com.cabin.core.persistence.repository.CashClosingRepository;

@RestController
public class TicketRestController {

    @Autowired
    private TicketRepository ticketRepository;
    
    @Autowired
    private CashClosingRepository cashClosingRepository;

    @RequestMapping(value = "/get/allTickets", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }
    
    @RequestMapping(value = "/get/allTicketsByCashClosing", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Ticket> getAllTicketsByCashClosing(@RequestParam(value = "id", required = true) Long cashClosingId) {
        return ticketRepository.findByCashClosingId(cashClosingId);
    }
    
    @RequestMapping(value = "/get/allTicketsByOperator", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Ticket> getAllTicketsByOperator(@RequestParam(value = "id", required = true) Long employeeId,
    		@RequestParam(value = "cashClosingFlag", required = true) Integer cashClosingFlag) {    	 
        return ticketRepository.findByEmployeeIdAndCashClosingFlag(employeeId, cashClosingFlag);
    }
     
    @RequestMapping(value = "/get/ticket", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Ticket getTicket(@RequestParam(value = "id", required = true) Long idTicket) {
        return ticketRepository.findOne(idTicket);
    }

    @RequestMapping(value = "/post/ticket", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public Ticket postTicket(@RequestBody(required = true) Ticket ticket) throws ParseException {
    	Long id = ticket.getId();    	
    	System.out.println("El valor de Id: " + id);
    	if ( id == null ){
    		Calendar date = Calendar.getInstance();    	
        	ticket.setDate( date );    		
    	}
    	else{
    		System.out.println("Entro a la actualización de tickets");
    		CashClosing cc = cashClosingRepository.findOne(ticket.getCashClosing().getId());
    		ticket = ticketRepository.findOne(id);
    		ticket.setCashClosingFlag(1);
    		ticket.setCashClosing(cc);    		
    	}
    	return ticketRepository.save(ticket);
        
    }
}
