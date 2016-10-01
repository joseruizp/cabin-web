package com.cabin.core.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.cabin.core.enums.SessionEnum;
import com.cabin.core.persistence.repository.HeadquarterRepository;


/**
 * Handles requests for the application home page.
 */
@Controller
public class HeadquarterController {
	
	@Autowired
	private HeadquarterRepository headquarterRepository; 
	/*@Autowired
	MaterialService materialService;*/
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/headquarters", method = RequestMethod.GET)
	public String home(Model model, HttpServletRequest request) {
	    String headquarterId = (String) request.getSession().getAttribute(SessionEnum.HEADQUARTER_ID.name());
		model.addAttribute("headquarter", headquarterRepository.findById(Long.parseLong(headquarterId)));
		return "headquarters";
	}
	
}
