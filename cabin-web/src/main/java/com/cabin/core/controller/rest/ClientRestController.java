package com.cabin.core.controller.rest;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.text.ParseException;
import java.util.Calendar;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.apache.commons.lang.BooleanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.enums.RentStatusEnum;
import com.cabin.core.enums.SessionEnum;
import com.cabin.core.persistence.domain.Bonus;
import com.cabin.core.persistence.domain.Cash;
import com.cabin.core.persistence.domain.Client;
import com.cabin.core.persistence.domain.Employee;
import com.cabin.core.persistence.domain.Experience;
import com.cabin.core.persistence.domain.Level;
import com.cabin.core.persistence.domain.Profile;
import com.cabin.core.persistence.domain.PunctuationRule;
import com.cabin.core.persistence.domain.RechargingType;
import com.cabin.core.persistence.domain.Rent;
import com.cabin.core.persistence.domain.Ticket;
import com.cabin.core.persistence.domain.User;
import com.cabin.core.persistence.repository.BonusRepository;
import com.cabin.core.persistence.repository.CashRepository;
import com.cabin.core.persistence.repository.ClientRepository;
import com.cabin.core.persistence.repository.ExperienceRepository;
import com.cabin.core.persistence.repository.LevelRepository;
import com.cabin.core.persistence.repository.PunctuationRuleRepository;
import com.cabin.core.persistence.repository.RentRepository;
import com.cabin.core.persistence.repository.TicketRepository;
import com.cabin.core.persistence.repository.UserRepository;
import com.cabin.core.view.Recharge;
import com.cabin.core.websocket.ComputerStatus;
import com.cabin.core.websocket.RechargeClientEndpoint;

@RestController
public class ClientRestController {

	@Autowired
    private BonusRepository bonusRepository;
	
    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private PunctuationRuleRepository punctuationRuleRepository;

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private LevelRepository levelRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CashRepository cashRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private RentRepository rentRepository;

    @RequestMapping(value = "/get/allClients", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Client> getAllClient() {
        long status = 1;
        return clientRepository.findByStatusId(status);
    }
    
    @RequestMapping(value = "/get/allClientsAndAnonymous", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Client> allClientsAndAnonymous() {        
        return clientRepository.findAll();
    }

    @RequestMapping(value = "/get/allActiveUsersByHeadquarter", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Client> getAllActiveUsersByHeadquarter(@RequestParam(value = "headquarterId", required = true) Long headquarterId,
            @RequestParam(value = "anonymous", required = true) Boolean anonymous) {
        return clientRepository.findByUserHeadquarterIdAndUserAnonymous(headquarterId, anonymous ? "1" : "0");
    }

    @RequestMapping(value = "/get/client", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Client getClient(@RequestParam(value = "id", required = true) Long id) {
        System.out.println("clientId ::: " + id);
        return clientRepository.findOne(id);
    }

    @RequestMapping(value = "/post/client", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    @Transactional
    public Client postClient(@RequestBody(required = true) Client client) throws ParseException {
        Long clientId = client.getId();
        client.getBirthDate().set(Calendar.HOUR_OF_DAY, 12);
        User user = client.getUser();

        if (clientId != null && clientId != 0) {
            Client original = clientRepository.findOne(clientId);
            original.getUser().setName(client.getUser().getName());
            original.getUser().setPass(client.getUser().getPass());
        } else {
            user.setAnonymous("0");
            user.setProfile(new Profile());
            user.getProfile().setId(Profile.CLIENT);
            client.setUser(userRepository.saveAndFlush(user));
        }

        return clientRepository.saveAndFlush(client);
    }

    @RequestMapping(value = "/post/recharge", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    @Transactional
    public Client recharge(@RequestBody(required = true) Recharge recharge, HttpServletRequest request) throws ParseException {
        Client client = clientRepository.findOne(recharge.getClientId());
        client.setBalance(round(client.getBalance() + recharge.getAmount()));
        String change_level= "1";
        HttpSession session = request.getSession();
        //Boolean isAnonymous = (Boolean) session.getAttribute(SessionEnum.IS_ANONYMOUS.name());
        Boolean isAnonymous = Integer.parseInt(client.getUser().getAnonymous()) == 1;
        
        if (BooleanUtils.isTrue(isAnonymous)) {
            String password = generatePassword();
            client.getUser().setPass(password);
        } else {
        	Long statusId = (long) 1;
        	
            PunctuationRule punctuationRule = punctuationRuleRepository.findByLevelIdAndStatusId(client.getLevel().getId(), statusId );

            Experience experience = experienceRepository.findByLevelIdAndStatusId(client.getLevel().getId(), statusId );

            client.setPoints(client.getPoints() + getRechargePoints(punctuationRule, recharge.getAmount()));
            Integer newExperience = client.getExperience() + getRechargeExperience(experience, recharge.getAmount());
            client.setExperience(newExperience);
            
            
            List<Level> levels = levelRepository.findByStatusId(statusId);
            for (Level level : levels) {
                Integer finalExperience = level.getFinalExperience();
                if (finalExperience == null) {
                    finalExperience = Integer.MAX_VALUE;
                }
                if (newExperience >= level.getInitialExperience() && newExperience <= finalExperience) {
                	if ( client.getLevel().getId() != level.getId() )
                		client.setChange_level(change_level);
                    client.setLevel(level);
                }
            }
            
            List<Bonus> bonusList = bonusRepository.findByStatusId(statusId);
            for (Bonus bonus : bonusList) {
            	Long bonusId = (long) 0;
            	Bonus bonusAux = new Bonus();
            	int clientBonusExperience = 0;
            	String bonusChange = "1";
            	if ( client.getId_bonification() != null ){            	
            		bonusId = client.getId_bonification();                
            		bonusAux = bonusRepository.findOne(bonusId);
            		clientBonusExperience = bonusAux.getExperienceAmount();
            	}
                if ( client.getExperience() >= bonus.getExperienceAmount() && bonusId != bonus.getId()  && bonus.getExperienceAmount() > clientBonusExperience ) {
                	client.setId_bonification(bonus.getId());                	
                	client.setBonus(bonusChange);
                }
            }
            
        }
        Cash cash = new Cash();
        Ticket ticket = new Ticket();
        if ( recharge.getCashId() != null ){
	        Calendar now = Calendar.getInstance();
	        cash = cashRepository.findOne(recharge.getCashId());
	        cash.setModificationDate(now);
	        cashRepository.saveAndFlush(cash);
	        ticket.setCash(cash);
        }
        Double expenseAmount = 0.0;
        ticket.setRechargeAmount(recharge.getAmount());
        ticket.setExpenseAmount(expenseAmount); 
        ticket.setClient(client);
        if ( recharge.getEmployeeId() != null ){
	        ticket.setEmployee(new Employee());
	        ticket.getEmployee().setId(recharge.getEmployeeId());
        }        
        ticket.setDate(Calendar.getInstance());
        ticket.setRechargingType(new RechargingType());
        ticket.getRechargingType().setId(RechargingType.MANUAL);
        ticketRepository.saveAndFlush(ticket);

        Rent rent = rentRepository.findByClientIdAndRentStatusId(client.getId(), RentStatusEnum.RENTED.getId());
        if (rent != null) {
            System.out.println("client is active");
            System.out.println("computer ip address: " + rent.getComputer().getIpAddress());
            new RechargeClientEndpoint(rent.getComputer().getIpAddress()).sendMessage(String.valueOf(recharge.getAmount()));
        }

        return clientRepository.saveAndFlush(client);
    }    
    
    @RequestMapping(value = "/put/changeLevel", method = RequestMethod.PUT, produces = { "application/json;charset=UTF-8" })
    public Client changeLevel(@RequestParam(value = "rent_id", required = true) Long rentId, @RequestParam(value = "change_level", required = true) String change_level) {
        
    	Rent rent = rentRepository.findOne(rentId);
    	System.out.println("Update change level, clientId ::: " + rent.getClient().getId());        
        Client client = clientRepository.findOne(rent.getClient().getId());
        client.setChange_level(change_level);
        rent.setClient( clientRepository.saveAndFlush(client));
        rentRepository.saveAndFlush(rent);
        return rent.getClient();

    }
    
    @RequestMapping(value = "/put/changeBonification", method = RequestMethod.PUT, produces = { "application/json;charset=UTF-8" })
    public Client changeBonification(@RequestParam(value = "rent_id", required = true) Long rentId, @RequestParam(value = "bonus", required = true) String bonus) {
        
    	Rent rent = rentRepository.findOne(rentId);
    	System.out.println("Update bonification, clientId ::: " + rent.getClient().getId());        
        Client client = clientRepository.findOne(rent.getClient().getId());
        client.setBonus(bonus);
        Bonus bonusAux = bonusRepository.findOne(client.getId_bonification());
        Double bonification = bonusAux.getFractionToGive();
    	client.setBalance( client.getBalance() + bonification);        
        rent.setClient( clientRepository.saveAndFlush(client));
        rentRepository.saveAndFlush(rent);
        return rent.getClient();

    }
    
    @RequestMapping(value = "/get/bonification", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Double getBonification(@RequestParam(value = "bonus_id", required = true) Long bonusId) {
    	return bonusRepository.findOne(bonusId).getFractionToGive();
    }
    
    private String generatePassword() {
        SecureRandom random = new SecureRandom();
        return new BigInteger(40, random).toString(32).substring(0, 6);
    }

    private Integer getRechargePoints(PunctuationRule rule, Double recharge) {
        return Math.toIntExact( (long)(recharge * rule.getPoints() / rule.getRechargingFraction()));
    }

    private Integer getRechargeExperience(Experience experience, Double recharge) {    	
        return Math.toIntExact( (long)(recharge * experience.getExperienceToGive() / experience.getRechargeFraction()));
    }
    
    private double round(double value) {
        long factor = (long) Math.pow(10, 2);
        double factorValue = value * factor;
        long tmp = Math.round(factorValue);
        return (double) tmp / factor;
    }
}
