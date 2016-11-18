package com.cabin.core.view;

import java.io.Serializable;
import java.util.Calendar;

public class TicketReport implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long cashId;
    private String name;
    private String lastname;
    private Double rechargeAmount;
    private Double expenseAmount;
    private Calendar startDate;
    private Calendar modificationDate;

    public TicketReport(Long cashId, String name, String lastname, Calendar startDate, Calendar modificationDate, Double rechargeAmount, Double expenseAmount) {
        super();
        this.cashId = cashId;
        this.name = name;
        this.lastname = lastname;
        this.rechargeAmount = rechargeAmount;
        this.expenseAmount = expenseAmount;
        this.startDate = startDate;
        this.modificationDate = modificationDate;
    }

    public Long getCashId() {
        return cashId;
    }

    public void setCashId(Long cashId) {
        this.cashId = cashId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Double getRechargeAmount() {
        return rechargeAmount;
    }

    public void setRechargeAmount(Double rechargeAmount) {
        this.rechargeAmount = rechargeAmount;
    }

    public Double getExpenseAmount() {
        return expenseAmount;
    }

    public void setExpenseAmount(Double expenseAmount) {
        this.expenseAmount = expenseAmount;
    }

    public Calendar getStartDate() {
        return startDate;
    }

    public void setStartDate(Calendar startDate) {
        this.startDate = startDate;
    }

    public Calendar getModificationDate() {
        return modificationDate;
    }

    public void setModificationDate(Calendar modificationDate) {
        this.modificationDate = modificationDate;
    }

}
