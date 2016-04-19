package com.cabin.core.controller;

import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.cabin.core.persistence.domain.Employee;
import com.cabin.core.persistence.domain.Headquarter;
import com.cabin.core.persistence.repository.EmployeeRepository;
import com.cabin.core.persistence.repository.HeadquarterRepository;


/**
 * Handles requests for the application home page.
 */
@Controller
public class HeadquarterController {
	
	private static final Logger logger = LoggerFactory.getLogger(HeadquarterController.class);
	
	@Autowired
	EmployeeRepository repository; 
	/*@Autowired
	MaterialService materialService;*/
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/headquarters", method = RequestMethod.GET)
	public String home(Locale locale, Model model, @ModelAttribute("headquarter") final Headquarter headquarter) {
		logger.info("Welcome home! The client locale is {}.", locale);
		model.addAttribute("headquarter", headquarter);
		List<Employee> employeeList =  repository.findByEmail(headquarter.getUser().getName());		
		model.addAttribute("employee", employeeList.get(0));
		//materialService.findByCriteria("Hola");		
		return "headquarters";
	}
	
}
