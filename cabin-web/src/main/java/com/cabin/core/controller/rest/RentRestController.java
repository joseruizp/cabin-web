package com.cabin.core.controller.rest;

import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.controller.websocket.ComputerWebSocketController;
import com.cabin.core.enums.RentStatusEnum;
import com.cabin.core.persistence.domain.Client;
import com.cabin.core.persistence.domain.Computer;
import com.cabin.core.persistence.domain.Console;
import com.cabin.core.persistence.domain.PrizesRule;
import com.cabin.core.persistence.domain.Rent;
import com.cabin.core.persistence.domain.Status;
import com.cabin.core.persistence.domain.User;
import com.cabin.core.persistence.repository.ClientRepository;
import com.cabin.core.persistence.repository.ComputerRepository;
import com.cabin.core.persistence.repository.PrizesRuleRepository;
import com.cabin.core.persistence.repository.RentRepository;
import com.cabin.core.persistence.repository.RentStatusRepository;
import com.cabin.core.websocket.ComputerStatus;

@RestController
public class RentRestController {

    @Autowired
    private RentRepository rentRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ComputerRepository computerRepository;

    // @Autowired
    // private ConsoleRepository consoleRepository;

    @Autowired
    private RentStatusRepository rentStatusRepository;

    @Autowired
    private PrizesRuleRepository prizesRuleRepository;

    @Autowired
    private ComputerWebSocketController computerWebSocketController;

    @RequestMapping(value = "/get/statusComputer", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Long getStatusComputer(@RequestParam(value = "id", required = true) Long clientId) {
        System.out.println("clientId ::: " + clientId);
        Rent rent = rentRepository.findByClientId(clientId);
        return rent.getRentStatus().getId();
    }

    @RequestMapping(value = "/get/computerInformation", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Computer getComputerInformation(@RequestParam(value = "id", required = true) Long clientId) {
        System.out.println("clientId ::: " + clientId);
        Rent rent = rentRepository.findByClientId(clientId);
        return rent.getComputer();
    }

    @RequestMapping(value = "/get/consoleInformation", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Console getConsoleInformation(@RequestParam(value = "id", required = true) Long clientId) {
        System.out.println("clientId ::: " + clientId);
        Rent rent = rentRepository.findByClientId(clientId);
        return rent.getConsole();
    }

    @RequestMapping(value = "/put/startRentComputer", method = RequestMethod.PUT, produces = { "application/json;charset=UTF-8" })
    public Long startRentComputer(@RequestParam(value = "client_id", required = true) Long clientId,
            @RequestParam(value = "computer_id", required = true) Long computerId) {
        System.out.println("clientId ::: " + clientId);

        Rent rent = new Rent();
        rent.setStartDate(Calendar.getInstance());
        rent.setModificationDate(Calendar.getInstance());

        rent.setComputer(computerRepository.getOne(computerId));
        rent.setRentStatus(rentStatusRepository.getOne(RentStatusEnum.RENTED.getId()));
        rent.setClient(clientRepository.getOne(clientId));

        computerWebSocketController.getComputersStatus(new ComputerStatus(computerId, ComputerStatus.OCUPIED));

        Rent rentSaved = rentRepository.saveAndFlush(rent);
        return rentSaved.getId();
    }

    @RequestMapping(value = "/put/endRentComputer", method = RequestMethod.PUT, produces = { "application/json;charset=UTF-8" })
    public Rent endRentComputer(@RequestParam(value = "rent_id", required = true) Long rentId, @RequestParam(value = "rent_time", required = true) Double rentTime,
            @RequestParam(value = "price", required = true) Double price) {
        System.out.println("rentId ::: " + rentId);
        System.out.println("rentTime ::: " + rentTime);
        System.out.println("price ::: " + price);

        Rent rent = rentRepository.findOne(rentId);
        rent.setModificationDate(Calendar.getInstance());
        rent.setRentTime(getHoursAsString(rentTime));
        rent.setPrice(price);

        Client client = rent.getClient();
        Double balance = round(client.getBalance() - price);
        if ( balance < 0 )
        	balance = 0.0;
        client.setBalance(balance);

        rent.setRentStatus(rentStatusRepository.getOne(RentStatusEnum.STOPPED.getId()));

        if (User.IS_ANONYMOUS.equals(client.getUser().getAnonymous())) {
            client.setStatus(new Status());
            client.getStatus().setId(Status.INACTIVE);
        }

        if (Status.ACTIVE == rent.getComputer().getStatus().getId()) {
            computerWebSocketController.getComputersStatus(new ComputerStatus(rent.getComputer().getId(), ComputerStatus.AVALIABLE));
        }
        client.getUser().setStatus(new Status());
        client.getUser().getStatus().setId(Status.INACTIVE);
        clientRepository.save(client);
        rent.setClient(client);
        return rentRepository.saveAndFlush(rent);
    }

    @RequestMapping(value = "/put/exchangePoints", method = RequestMethod.PUT, produces = { "application/json;charset=UTF-8" })
    public Client exchangePoints(@RequestParam(value = "rent_id", required = true) Long rentId, @RequestParam(value = "bonusPoints", required = true) Integer bonusPoints) {
        System.out.println("rentId ::: " + rentId);
        System.out.println("bonusPoints ::: " + bonusPoints);

        Rent rent = rentRepository.findOne(rentId);
        rent.setModificationDate(Calendar.getInstance());

        rent.setRentStatus(rentStatusRepository.getOne(RentStatusEnum.RENTED.getId()));
        rent.setClient(updateBonusBalance(rent.getClient(), bonusPoints));

        rentRepository.saveAndFlush(rent);
        return rent.getClient();
    }
    
    private Client updateBonusBalance(Client client, Integer bonusPoints) {
        if (bonusPoints != null) {
            Double bonusBalance = round(getBonusBalance(client.getLevel().getId(), bonusPoints));
            client.setBalance(client.getBalance() + bonusBalance);
            client.setPoints(client.getPoints() - bonusPoints);
        }
        return clientRepository.saveAndFlush(client);
    }

    private Double getBonusBalance(Long idLevel, Integer points) {
    	long statusId = 1;
        PrizesRule rule = prizesRuleRepository.findByLevelIdAndStatusId(idLevel, statusId);
        return points * rule.getBalanceFraction() / rule.getPoints();
    }

    private String getHoursAsString(double hours) {
        double rounded = round(hours);
        long hour = (long) rounded;
        double fraction = hours - hour;
        String hourString = hour < 10 ? ("0" + hour) : (Long.toString(hour));
        long minutes = Math.round(60 * fraction);
        String minutesString = minutes < 10 ? ("0" + minutes) : (Long.toString(minutes));
        return hourString + ":" + minutesString;
    }

    private double round(double value) {
        long factor = (long) Math.pow(10, 2);
        double factorValue = value * factor;
        long tmp = Math.round(factorValue);
        return (double) tmp / factor;
    }

    @RequestMapping(value = "/patch/stopRentingComputer", method = RequestMethod.PATCH, produces = { "application/json;charset=UTF-8" })
    public Rent stopRentingComputer(@RequestParam(value = "client_id", required = true) Long clientId,
            @RequestParam(value = "computer_id", required = true) Long computerId) {
        System.out.println("clientId ::: " + clientId);
        System.out.println("computerId ::: " + computerId);

        Rent rent = rentRepository.findByClientIdAndComputerId(clientId, computerId);
        rent.setRentStatus(rentStatusRepository.getOne(RentStatusEnum.STOPPED.getId()));

        return rentRepository.saveAndFlush(rent);
    }

    @RequestMapping(value = "/patch/stopRentingConsole", method = RequestMethod.PATCH, produces = { "application/json;charset=UTF-8" })
    public Rent stopRentingConsole(@RequestParam(value = "client_id", required = true) Long clientId, @RequestParam(value = "console_id", required = true) Long consoleId) {
        System.out.println("clientId ::: " + clientId);
        System.out.println("consoleId ::: " + consoleId);
        Rent rent = rentRepository.findByClientIdAndConsoleId(clientId, consoleId);
        rent.setModificationDate(Calendar.getInstance());
        rent.setRentStatus(rentStatusRepository.getOne(RentStatusEnum.STOPPED.getId()));

        return rentRepository.saveAndFlush(rent);
    }

    @RequestMapping(value = "/patch/rechargeComputer", method = RequestMethod.PATCH, produces = { "application/json;charset=UTF-8" })
    public Rent rechargeComputer(@RequestParam(value = "client_id", required = true) Long clientId, @RequestParam(value = "console_id", required = true) Long consoleId) {
        System.out.println("clientId ::: " + clientId);
        System.out.println("consoleId ::: " + consoleId);
        Rent rent = rentRepository.findByClientIdAndConsoleId(clientId, consoleId);
        rent.setModificationDate(Calendar.getInstance());
        rent.setRentStatus(rentStatusRepository.getOne(RentStatusEnum.STOPPED.getId()));

        return rentRepository.saveAndFlush(rent);
    }
}
