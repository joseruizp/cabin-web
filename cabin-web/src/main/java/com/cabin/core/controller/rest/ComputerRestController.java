package com.cabin.core.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Computer;
import com.cabin.core.persistence.domain.Group;
import com.cabin.core.persistence.domain.Status;
import com.cabin.core.persistence.repository.ComputerRepository;
import com.cabin.core.persistence.repository.GroupRepository;
import com.cabin.core.persistence.repository.RentRepository;
import com.cabin.core.view.ComputerGroup;

@RestController
public class ComputerRestController {

    @Autowired
    private ComputerRepository computerRepository;
    
    @Autowired
    private RentRepository rentRepository;
    
    @Autowired
    private GroupRepository groupRepository;
    
    @RequestMapping(value = "/get/computersByHeadquarter", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public List<Computer> getComputersByHeadquarter(@RequestParam(value = "id", required = true) Long id) {
        System.out.println("headquarterId ::: " + id);
        List<Computer> computers = computerRepository.findByHeadquarterId(id);
        computers.forEach(c -> c.setRented(rentRepository.findByComputerIdAndRentStatusId(c.getId(), Status.ACTIVE) != null));
        return computers;
    }

    @RequestMapping(value = "/get/computer", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public Computer getComputer(@RequestParam(value = "id", required = true) Long id) {
        System.out.println("computerId ::: " + id);
        return computerRepository.findOne(id);
    }
    
    @RequestMapping(value = "/post/updateComputerGroup", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public Computer updateGroup(@RequestBody ComputerGroup computerGroup) {
        Computer computer = computerRepository.findOne(computerGroup.getComputerId());
        Group group = groupRepository.findOne(computerGroup.getGroupId());
        computer.setGroup(group);
        return computerRepository.saveAndFlush(computer); 
    }
}
