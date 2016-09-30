package com.cabin.core.controller;

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
import com.cabin.core.persistence.domain.Headquarter;
import com.cabin.core.persistence.repository.HeadquarterRepository;

/**
 * Handles requests for the application home page.
 */
@Controller
public class OperatorController {

    private static final Logger logger = LoggerFactory.getLogger(OperatorController.class);

    @Autowired
    private HeadquarterRepository headquarterRepository;

    /**
     * Simply selects the home view to render by returning its name.
     */
    @RequestMapping(value = "/operator", method = RequestMethod.GET)
    public String home(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        Long userId = (Long) session.getAttribute(SessionEnum.USER_ID.name());

        //Headquarter headquarter = headquarterRepository.findByUserId(userId);
        //session.setAttribute(SessionEnum.HEADQUARTER_ID.name(), headquarter.getId());
        
        logger.info("Client id is:'" + userId + "'");
        //logger.info("Headquarter id is:'" + headquarter.getId() + "'");

        model.addAttribute("employeeId", session.getAttribute(SessionEnum.EMPLOYEE_ID.name()));
        //model.addAttribute("headquarterId", headquarter.getId());

        return "operator";
    }

}
