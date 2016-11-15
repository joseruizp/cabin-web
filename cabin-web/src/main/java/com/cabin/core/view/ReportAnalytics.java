package com.cabin.core.view;

import java.io.Serializable;

public class ReportAnalytics implements Serializable {

    private static final long serialVersionUID = 1L;

    private RevenueAnalytics revenue;
    private SalesAnalytics sales;
    private Integer numberOfTickets;
    private Integer ocupiedComputers;
    private Integer ocupiedConsoles;

    public RevenueAnalytics getRevenue() {
        return revenue;
    }

    public void setRevenue(RevenueAnalytics revenue) {
        this.revenue = revenue;
    }

    public SalesAnalytics getSales() {
        return sales;
    }

    public void setSales(SalesAnalytics sales) {
        this.sales = sales;
    }

    public Integer getNumberOfTickets() {
        return numberOfTickets;
    }

    public void setNumberOfTickets(Integer numberOfTickets) {
        this.numberOfTickets = numberOfTickets;
    }

    public Integer getOcupiedComputers() {
        return ocupiedComputers;
    }

    public void setOcupiedComputers(Integer ocupiedComputers) {
        this.ocupiedComputers = ocupiedComputers;
    }

    public Integer getOcupiedConsoles() {
        return ocupiedConsoles;
    }

    public void setOcupiedConsoles(Integer ocupiedConsoles) {
        this.ocupiedConsoles = ocupiedConsoles;
    }

}
