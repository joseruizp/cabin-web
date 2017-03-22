package com.cabin.core.scheduler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.cabin.core.persistence.domain.Client;
import com.cabin.core.persistence.domain.Status;
import com.cabin.core.persistence.domain.User;
import com.cabin.core.persistence.repository.ClientRepository;

@Component
public class Scheduler {
	
	@Autowired
	private ClientRepository clientRepository;

	@Scheduled(cron = "0 0/30 * * * ?")
	public void updateAnonymousUsers() {
		List<Client> clients = clientRepository.findByStatusIdAndUserAnonymous(Status.INACTIVE, User.IS_ANONYMOUS);
		clients.stream().filter(c -> c.getBalance() > 0).forEach(c -> {
			c.setBalance(0.0);
			c.setPoints(0);
			c.setExperience(0);
			clientRepository.saveAndFlush(c);
		});
	}
}
