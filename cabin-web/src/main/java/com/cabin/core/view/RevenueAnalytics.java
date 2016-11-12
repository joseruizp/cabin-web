package com.cabin.core.view;

import java.io.Serializable;
import java.math.BigDecimal;

public class RevenueAnalytics implements Serializable {

    private static final long serialVersionUID = 1L;

    private BigDecimal monthly;
    private BigDecimal targetMonthly;
    private BigDecimal targetToday;
    private BigDecimal today;
    private BigDecimal lastWeek;
    private BigDecimal lastMont;

    public BigDecimal getMonthly() {
        return monthly;
    }

    public void setMonthly(BigDecimal monthly) {
        this.monthly = monthly;
    }

    public BigDecimal getTargetMonthly() {
        return targetMonthly;
    }

    public void setTargetMonthly(BigDecimal targetMonthly) {
        this.targetMonthly = targetMonthly;
    }

    public BigDecimal getTargetToday() {
        return targetToday;
    }

    public void setTargetToday(BigDecimal targetToday) {
        this.targetToday = targetToday;
    }

    public BigDecimal getToday() {
        return today;
    }

    public void setToday(BigDecimal today) {
        this.today = today;
    }

    public BigDecimal getLastWeek() {
        return lastWeek;
    }

    public void setLastWeek(BigDecimal lastWeek) {
        this.lastWeek = lastWeek;
    }

    public BigDecimal getLastMont() {
        return lastMont;
    }

    public void setLastMont(BigDecimal lastMont) {
        this.lastMont = lastMont;
    }

}
