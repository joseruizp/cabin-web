package com.cabin.core.controller.rest;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Client;
import com.cabin.core.persistence.domain.Status;
import com.cabin.core.persistence.domain.User;
import com.cabin.core.persistence.repository.ClientRepository;
import com.cabin.core.persistence.repository.UserRepository;
import com.cabin.core.view.UserRequest;

@RestController
public class UserRestController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ClientRepository clientRepository;

	@RequestMapping(value = "/post/loginClient", method = RequestMethod.POST, produces = {
			"application/json;charset=UTF-8" })
	public Client loginClient(@RequestBody UserRequest user) throws ParseException {

		List<User> users = userRepository.findByNameAndPass(user.getName(), user.getPass());

		if (users.isEmpty()) {
			return null;
		}

		if (Status.ACTIVE == users.get(0).getStatus().getId()) {
			throw new AccessDeniedException("User already active");
		}

		List<Client> clients = clientRepository.findByUserId(users.get(0).getId());
		Client client = clients.get(0);

		if (Status.INACTIVE == client.getStatus().getId()) {
			if (0 == Integer.parseInt(client.getUser().getAnonymous()))
				return null;
			else {
				Status status = new Status();
				status.setId(Status.ACTIVE);
				client.setStatus(status);

			}
		}

		client.getUser().setStatus(new Status());
		client.getUser().getStatus().setId(Status.ACTIVE);
		clientRepository.save(client);
		return client;
	}

	@RequestMapping(value = "/get/anonymous", method = RequestMethod.GET, produces = {
			"application/json;charset=UTF-8" })
	public User getAnonymousUser() throws ParseException {

		List<Client> inactiveClients = clientRepository.findByStatusIdAndUserAnonymous(Status.INACTIVE,
				User.IS_ANONYMOUS);
		Client client = new Client();
		User user = new User();
		for (Client inactiveClient : inactiveClients) {
			client = inactiveClient;
			if (client.getBalance() == 0) {
				user = client.getUser();
				return user;
			}
		}
		return user;
	}

	@ExceptionHandler(AccessDeniedException.class)
	public String handleAccessDeniedException() {
		return "ACCESS_DENIED";
	}

}
