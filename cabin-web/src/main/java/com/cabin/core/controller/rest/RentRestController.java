package com.cabin.core.controller.rest;

import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.enums.RentStatusEnum;
import com.cabin.core.persistence.domain.Client;
import com.cabin.core.persistence.domain.Computer;
import com.cabin.core.persistence.domain.Console;
import com.cabin.core.persistence.domain.PrizesRule;
import com.cabin.core.persistence.domain.Rent;
import com.cabin.core.persistence.repository.ClientRepository;
import com.cabin.core.persistence.repository.ComputerRepository;
import com.cabin.core.persistence.repository.ConsoleRepository;
import com.cabin.core.persistence.repository.PrizesRuleRepository;
import com.cabin.core.persistence.repository.RentRepository;
import com.cabin.core.persistence.repository.RentStatusRepository;

@RestController
public class RentRestController {

    @Autowired
    private RentRepository rentRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ComputerRepository computerRepository;

    @Autowired
    private ConsoleRepository consoleRepository;

    @Autowired
    private RentStatusRepository rentStatusRepository;

    @Autowired
    private PrizesRuleRepository prizesRuleRepository;

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

    @RequestMapping(value = "/put/rentComputer", method = RequestMethod.PUT, produces = { "application/json;charset=UTF-8" })
    public Rent rentComputer(@RequestParam(value = "client_id", required = true) Long clientId, @RequestParam(value = "computer_id", required = true) Long computerId,
            @RequestParam(value = "rent_time", required = true) Double rentTime, @RequestParam(value = "price", required = true) Double price,
            @RequestParam(value = "bonusPoints", required = false) Integer bonusPoints) {
        System.out.println("clientId ::: " + clientId);
        System.out.println("computerId ::: " + computerId);
        System.out.println("rentTime ::: " + rentTime);
        System.out.println("price ::: " + price);
        System.out.println("bonusPoints ::: " + bonusPoints);

        Rent rent = new Rent();
        rent.setStartDate(Calendar.getInstance());
        rent.setModificationDate(Calendar.getInstance());
        rent.setRentTime(getHoursAsString(rentTime));
        rent.setPrice(price);

        rent.setComputer(computerRepository.getOne(computerId));
        rent.setRentStatus(rentStatusRepository.getOne(RentStatusEnum.RENTED.getId()));
        rent.setClient(updateBonusBalance(clientId, bonusPoints));

        return rentRepository.saveAndFlush(rent);
    }

    @RequestMapping(value = "/put/rentConsole", method = RequestMethod.PUT, produces = { "application/json;charset=UTF-8" })
    public Rent rentConsole(@RequestParam(value = "client_id", required = true) Long clientId, @RequestParam(value = "console_id", required = true) Long consoleId,
            @RequestParam(value = "rent_time", required = true) Double rentTime, @RequestParam(value = "price", required = true) Double price,
            @RequestParam(value = "bonusPoints", required = false) Integer bonusPoints) {
        System.out.println("clientId ::: " + clientId);
        System.out.println("consoleId ::: " + consoleId);
        System.out.println("rentTime ::: " + rentTime);
        System.out.println("price ::: " + price);
        System.out.println("bonusPoints ::: " + bonusPoints);

        Rent rent = new Rent();
        rent.setStartDate(Calendar.getInstance());
        rent.setModificationDate(Calendar.getInstance());
        rent.setRentTime(getHoursAsString(rentTime));
        rent.setPrice(price);

        rent.setConsole(consoleRepository.getOne(consoleId));
        rent.setRentStatus(rentStatusRepository.getOne(RentStatusEnum.RENTED.getId()));
        rent.setClient(updateBonusBalance(clientId, bonusPoints));

        return rentRepository.saveAndFlush(rent);
    }

    private Client updateBonusBalance(Long clientId, Integer bonusPoints) {
        Client client = clientRepository.getOne(clientId);
        Double bonusBalance = getBonusBalance(client.getLevel().getId(), bonusPoints);
        client.setBalance(client.getBalance() + bonusBalance);
        client.setPoints(client.getPoints() - bonusPoints);
        return clientRepository.saveAndFlush(client);
    }

    private Double getBonusBalance(Long idLevel, Integer points) {
        PrizesRule rule = prizesRuleRepository.findByLevelId(idLevel);
        return points * rule.getBalanceFraction() / rule.getPoints();
    }

    private String getHoursAsString(double hours) {
        double rounded = round(hours);
        long hour = (long) rounded;
        double fraction = rounded - hour;
        String hourString = hour < 10 ? ("0" + hour) : (Long.toString(hour));
        return hourString + ":" + (long) (60 * fraction);
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
