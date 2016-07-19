package com.cabin.core.controller.rest;

import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.enums.RentStatusEnum;
import com.cabin.core.persistence.domain.Computer;
import com.cabin.core.persistence.domain.Console;
import com.cabin.core.persistence.domain.Rent;
import com.cabin.core.persistence.domain.RentStatus;
import com.cabin.core.persistence.repository.ClientRepository;
import com.cabin.core.persistence.repository.ComputerRepository;
import com.cabin.core.persistence.repository.ConsoleRepository;
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
            @RequestParam(value = "rent_time", required = true) Double rentTime) {
        System.out.println("clientId ::: " + clientId);
        System.out.println("computerId ::: " + computerId);
        System.out.println("rentTime ::: " + rentTime);

        Rent rent = new Rent();
        rent.setStartDate(Calendar.getInstance());
        rent.setModificationDate(Calendar.getInstance());
        rent.setRentTime(rentTime);
        rent.setClient(clientRepository.getOne(clientId));
        rent.setComputer(computerRepository.getOne(computerId));
        rent.setRentStatus(rentStatusRepository.getOne(RentStatusEnum.RENTED.getId()));

        return rentRepository.saveAndFlush(rent);
    }

    @RequestMapping(value = "/put/rentConsole", method = RequestMethod.PUT, produces = { "application/json;charset=UTF-8" })
    public Rent rentConsole(@RequestParam(value = "client_id", required = true) Long clientId, @RequestParam(value = "console_id", required = true) Long consoleId,
            @RequestParam(value = "rent_time", required = true) Double rentTime) {
        System.out.println("clientId ::: " + clientId);
        System.out.println("consoleId ::: " + consoleId);
        System.out.println("rentTime ::: " + rentTime);

        Rent rent = new Rent();
        rent.setStartDate(Calendar.getInstance());
        rent.setModificationDate(Calendar.getInstance());
        rent.setRentTime(rentTime);
        rent.setClient(clientRepository.getOne(clientId));
        rent.setConsole(consoleRepository.getOne(consoleId));
        rent.setRentStatus(rentStatusRepository.getOne(RentStatusEnum.RENTED.getId()));

        return rentRepository.saveAndFlush(rent);
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
