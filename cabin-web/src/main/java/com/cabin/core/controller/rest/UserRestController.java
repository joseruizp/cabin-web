package com.cabin.core.controller.rest;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.persistence.domain.Client;
import com.cabin.core.persistence.domain.User;
import com.cabin.core.persistence.repository.ClientRepository;
import com.cabin.core.persistence.repository.UserRepository;

@RestController
public class UserRestController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ClientRepository clientRepository;

	@RequestMapping(value = "/post/login", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
	public Client login(@RequestBody User user) throws ParseException {

		List<User> users = userRepository.findByNameAndPass(user.getName(), user.getPass());

		List<Client> clients = clientRepository.findByUserId(users.get(0).getId());
		Client client = clients.get(0);

		return client;
	}

}
