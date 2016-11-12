package com.cabin.core.view;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Map;

public class SalesAnalytics implements Serializable {

    private static final long serialVersionUID = 1L;

    private Map<String, BigDecimal> computerSalesByMonth;
    private Map<String, BigDecimal> consoleSalesByMonth;

    public Map<String, BigDecimal> getComputerSalesByMonth() {
        return computerSalesByMonth;
    }

    public void setComputerSalesByMonth(Map<String, BigDecimal> computerSalesByMonth) {
        this.computerSalesByMonth = computerSalesByMonth;
    }

    public Map<String, BigDecimal> getConsoleSalesByMonth() {
        return consoleSalesByMonth;
    }

    public void setConsoleSalesByMonth(Map<String, BigDecimal> consoleSalesByMonth) {
        this.consoleSalesByMonth = consoleSalesByMonth;
    }

}
