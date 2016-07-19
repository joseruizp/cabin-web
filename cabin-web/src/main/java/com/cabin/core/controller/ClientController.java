package com.cabin.core.controller;

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
public class ClientController {

    private static final Logger logger = LoggerFactory.getLogger(ClientController.class);

    @Autowired
    private HttpSession httpSession;

    /**
     * Simply selects the home view to render by returning its name.
     */
    @RequestMapping(value = "/client", method = RequestMethod.GET)
    public String home(Model model) {
        logger.info("Client id is:'" + httpSession.getAttribute(SessionEnum.CLIENT_ID.name()) + "'");
        logger.info("Headquarter id is:'" + httpSession.getAttribute(SessionEnum.HEADQUARTER_ID.name()) + "'");

        model.addAttribute("clientId", httpSession.getAttribute(SessionEnum.CLIENT_ID.name()));
        model.addAttribute("headquarterId", httpSession.getAttribute(SessionEnum.HEADQUARTER_ID.name()));
        logger.info("adding attribute headquarter for client");
        return "client";
    }

}
