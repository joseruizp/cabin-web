package com.cabin.core.controller;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.cabin.core.enums.SessionEnum;
import com.cabin.core.persistence.repository.EmployeeRepository;


/**
 * Handles requests for the application home page.
 */
@Controller
public class IncidenceController {
	
	private static final Logger logger = LoggerFactory.getLogger(IncidenceController.class);
	
	@Autowired
    private EmployeeRepository employeeRepository;
	
	@RequestMapping(value = "/incidence", method = RequestMethod.GET)
	public String home(HttpServletRequest request, Model model) {
		logger.info("Welcome to the incidence page.");
		
		HttpSession session = request.getSession();                
        Long employeeId = (Long) session.getAttribute(SessionEnum.EMPLOYEE_ID.name());        
        model.addAttribute("employee", employeeRepository.findById(employeeId));        
		
		return "incidence";
	}
	
}
