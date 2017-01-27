package com.cabin.core.controller;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.cabin.core.enums.SessionEnum;
import com.cabin.core.persistence.domain.Headquarter;
import com.cabin.core.persistence.repository.EmployeeRepository;
import com.cabin.core.persistence.repository.HeadquarterRepository;


/**
 * Handles requests for the application home page.
 */
@Controller
public class AdminController {
	
	private static final Logger logger = LoggerFactory.getLogger(AdminController.class);
	
	@Autowired
	private HeadquarterRepository repository; 
	@Autowired
    private EmployeeRepository employeeRepository;
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/admin", method = RequestMethod.GET)
	public String home(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        Long userId = (Long) session.getAttribute(SessionEnum.USER_ID.name());
        Long employeeId = (Long) session.getAttribute(SessionEnum.EMPLOYEE_ID.name());
        //Headquarter headquarter = headquarterRepository.findByUserId(userId);
        //session.setAttribute(SessionEnum.HEADQUARTER_ID.name(), headquarter.getId());
        
        logger.info("Client id is:'" + userId + "'");
        //logger.info("Headquarter id is:'" + headquarter.getId() + "'");

        model.addAttribute("adminId", session.getAttribute(SessionEnum.EMPLOYEE_ID.name()));
        //model.addAttribute("headquarterId", headquarter.getId());
        model.addAttribute("employee", employeeRepository.findById(employeeId));
        
		return "admin";
	}
	
	@RequestMapping(value = "/home/{id}", method = RequestMethod.POST)	
	//public ModelAndView sendHeadquarter(@RequestParam("id") Long id, Model model) {
	public String sendHeadquarter(@PathVariable Long id, Model model, final RedirectAttributes redirectAttributes) {		
		logger.info("Welcome home! The client locale is {}.");		
		Headquarter headquarter = repository.findById(id);
		model.addAttribute("headquarter", headquarter);
		redirectAttributes.addFlashAttribute("headquarter", headquarter);
		return "redirect:/headquarters";
		//return new ModelAndView("headquarters", "headquarter", headquarter);
	}
	
}
