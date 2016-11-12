package com.cabin.core.controller.rest;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.view.ReportAnalytics;

@RestController
public class ReportRestController {

    @RequestMapping(value = "/get/reportAnalytics", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public ReportAnalytics getReportAnalytics() {
        return null;
    }

    @RequestMapping(value = "/get/reportAnalytics/{headquarterId}", method = RequestMethod.GET, produces = { "application/json;charset=UTF-8" })
    public ReportAnalytics getReportAnalytics(@PathVariable(value = "headquarterId") Long headquarterId) {
        return null;
    }
}
