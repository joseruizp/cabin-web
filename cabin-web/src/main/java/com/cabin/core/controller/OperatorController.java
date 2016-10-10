package com.cabin.core.controller;

import java.util.List;

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
import com.cabin.core.persistence.domain.Cash;
import com.cabin.core.persistence.domain.Profile;
import com.cabin.core.persistence.domain.Status;
import com.cabin.core.persistence.domain.User;
import com.cabin.core.persistence.repository.CashRepository;
import com.cabin.core.persistence.repository.UserRepository;

@Controller
public class OperatorController {

    private static final Logger logger = LoggerFactory.getLogger(OperatorController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CashRepository cashRepository;

    @RequestMapping(value = "/operator", method = RequestMethod.GET)
    public String home(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        Long userId = (Long) session.getAttribute(SessionEnum.USER_ID.name());
        Long headquarterId = Long.parseLong((String) session.getAttribute(SessionEnum.HEADQUARTER_ID.name()));
        Long employeeId = (Long) session.getAttribute(SessionEnum.EMPLOYEE_ID.name());

        List<User> users = userRepository.findByProfileIdAndStatusIdAndHeadquarterId(Profile.EMPLOYEE, Status.ACTIVE, headquarterId);
        boolean isFirst = users.size() == 0;

        if (!isFirst) {
            Cash cash = cashRepository.findByEmployeeIdAndHeadquarterIdAndStatusId(employeeId, headquarterId, Status.ACTIVE);
            model.addAttribute("cashId", cash.getId());
        }

        logger.info("Client id is:'" + userId + "'");

        model.addAttribute("employeeId", employeeId);
        model.addAttribute("headquarterId", headquarterId);
        model.addAttribute("isFirst", isFirst);

        return "operator";
    }

}
