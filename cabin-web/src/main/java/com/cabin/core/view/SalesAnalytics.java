package com.cabin.core.view;

import java.io.Serializable;
import java.util.Map;

public class SalesAnalytics implements Serializable {

    private static final long serialVersionUID = 1L;

    private Map<Integer, Double> computerSalesByMonth;
    private Map<Integer, Double> consoleSalesByMonth;

    public Map<Integer, Double> getComputerSalesByMonth() {
        return computerSalesByMonth;
    }

    public void setComputerSalesByMonth(Map<Integer, Double> computerSalesByMonth) {
        this.computerSalesByMonth = computerSalesByMonth;
    }

    public Map<Integer, Double> getConsoleSalesByMonth() {
        return consoleSalesByMonth;
    }

    public void setConsoleSalesByMonth(Map<Integer, Double> consoleSalesByMonth) {
        this.consoleSalesByMonth = consoleSalesByMonth;
    }

}
