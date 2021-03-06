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
import com.cabin.core.persistence.domain.Cash;
import com.cabin.core.persistence.domain.Headquarter;
import com.cabin.core.persistence.domain.Status;
import com.cabin.core.persistence.repository.CashRepository;
import com.cabin.core.persistence.repository.ClientRepository;
import com.cabin.core.persistence.repository.EmployeeRepository;
import com.cabin.core.persistence.repository.HeadquarterRepository;

@Controller
public class OperatorController {

    private static final Logger logger = LoggerFactory.getLogger(OperatorController.class);

    @Autowired
    private CashRepository cashRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
	private HeadquarterRepository headquarterRepository;
    
    @RequestMapping(value = "/operator", method = RequestMethod.GET)
    public String home(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        Long userId = (Long) session.getAttribute(SessionEnum.USER_ID.name());
        Long headquarterId = Long.parseLong((String) session.getAttribute(SessionEnum.HEADQUARTER_ID.name()));
        Long employeeId = (Long) session.getAttribute(SessionEnum.EMPLOYEE_ID.name());
        
        Cash cash = cashRepository.findByEmployeeIdAndStatusId(employeeId, Status.ACTIVE);
        boolean isFirst = cash == null;

        if (!isFirst) {
            model.addAttribute("cashId", cash.getId());
        }

        logger.info("Client id is:'" + userId + "'");

        model.addAttribute("employeeId", employeeId);
        model.addAttribute("headquarterId", headquarterId);
        model.addAttribute("isFirst", isFirst);
        model.addAttribute("employee", employeeRepository.findById(employeeId));        
		model.addAttribute("headquarter", headquarterRepository.findById(headquarterId));
        return "operator";
    }

}
