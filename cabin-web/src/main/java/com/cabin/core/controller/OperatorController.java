package com.cabin.core.controller;

import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.cabin.core.enums.SessionEnum;

/**
 * Handles requests for the application home page.
 */
@Controller
public class OperatorController {

    private static final Logger logger = LoggerFactory.getLogger(OperatorController.class);

    @Autowired
    private HttpSession httpSession;

    /**
     * Simply selects the home view to render by returning its name.
     */
    @RequestMapping(value = "/operator", method = RequestMethod.GET)
    public String home(Locale locale, Model model) {
        logger.info("Welcome home! The client locale is {}.", locale);

        model.addAttribute("employeeId", httpSession.getAttribute(SessionEnum.EMPLOYEE_ID.name()));
        model.addAttribute("headquarterId", httpSession.getAttribute(SessionEnum.HEADQUARTER_ID.name()));

        return "operator";
    }

}
