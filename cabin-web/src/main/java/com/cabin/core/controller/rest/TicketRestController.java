package com.cabin.core.controller.rest;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Bonus;
import com.cabin.core.persistence.domain.Cash;
import com.cabin.core.persistence.domain.Client;
import com.cabin.core.persistence.domain.Employee;
import com.cabin.core.persistence.domain.ExpenseType;
import com.cabin.core.persistence.domain.Experience;
import com.cabin.core.persistence.domain.Level;
import com.cabin.core.persistence.domain.PunctuationRule;
import com.cabin.core.persistence.domain.Ticket;
import com.cabin.core.persistence.repository.BonusRepository;
import com.cabin.core.persistence.repository.CashRepository;
import com.cabin.core.persistence.repository.ClientRepository;
import com.cabin.core.persistence.repository.ExperienceRepository;
import com.cabin.core.persistence.repository.LevelRepository;
import com.cabin.core.persistence.repository.PunctuationRuleRepository;
import com.cabin.core.persistence.repository.TicketRepository;
import com.cabin.core.view.ExpenseCash;

@RestController
public class TicketRestController {

	@Autowired
    private BonusRepository bonusRepository;
	
	@Autowired
    private PunctuationRuleRepository punctuationRuleRepository;

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private LevelRepository levelRepository;

	@Autowired
    private ClientRepository clientRepository;
	
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
        
        Client client = clientRepository.findOne(expenseCash.getClientId());
        Double balance = client.getBalance() - expenseCash.getAmount();        
        
        if ( !client.getUser().isAnonymous() ){
            Long statusId = (long) 1;
            
        	PunctuationRule punctuationRule = punctuationRuleRepository.findByLevelIdAndStatusId(client.getLevel().getId(), statusId);

            Experience experience = experienceRepository.findByLevelIdAndStatusId(client.getLevel().getId(), statusId);

            client.setPoints(client.getPoints() - getRechargePoints(punctuationRule, expenseCash.getAmount()));
            Integer newExperience = client.getExperience() - getRechargeExperience(experience, expenseCash.getAmount());
            client.setExperience(newExperience);

            
            List<Level> levels = levelRepository.findByStatusId(statusId);
            for (Level level : levels) {
                Integer finalExperience = level.getFinalExperience();
                if (finalExperience == null) {
                    finalExperience = Integer.MAX_VALUE;
                }
                if (newExperience >= level.getInitialExperience() && newExperience <= finalExperience) {
                    client.setLevel(level);
                }
            }
            
        }
        
        if (balance <= 0)
        	balance = 0.0;
        client.setBalance(balance);
        clientRepository.saveAndFlush(client);
        
        Cash cash = cashRepository.findOne(expenseCash.getCashId());
        cash.setModificationDate(now);
        cashRepository.saveAndFlush(cash);

        Ticket ticket = new Ticket();
        ticket.setExpenseAmount(expenseCash.getAmount());
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
        Double rechargeAmount = 0.0;
        ticket.setRechargeAmount(rechargeAmount);
        
        return ticketRepository.saveAndFlush(ticket);
    }
    
    private Integer getRechargePoints(PunctuationRule rule, Double recharge) {
        return Math.toIntExact( (long)(recharge * rule.getPoints() / rule.getRechargingFraction()));
    }

    private Integer getRechargeExperience(Experience experience, Double recharge) {    	
        return Math.toIntExact( (long)(recharge * experience.getExperienceToGive() / experience.getRechargeFraction()));
    }
}
