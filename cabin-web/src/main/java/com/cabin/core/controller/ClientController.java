package com.cabin.core.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.cabin.core.enums.SessionEnum;

/**
 * Handles requests for the application home page.
 */
@Controller
public class ClientController {

    private static final Logger logger = LoggerFactory.getLogger(ClientController.class);

    @PreAuthorize("hasAuthority('USER')")
    @RequestMapping(value = "/client", method = RequestMethod.GET)
    public String home(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        
        logger.info("Client id is:'" + session.getAttribute(SessionEnum.CLIENT_ID.name()) + "'");
        logger.info("Headquarter id is:'" + session.getAttribute(SessionEnum.HEADQUARTER_ID.name()) + "'");

        model.addAttribute("clientId", session.getAttribute(SessionEnum.CLIENT_ID.name()));
        model.addAttribute("headquarterId", session.getAttribute(SessionEnum.HEADQUARTER_ID.name()));
        logger.info("adding attribute headquarter for client");
        return "client";
    }

}
