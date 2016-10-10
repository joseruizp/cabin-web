package com.cabin.core.view;

import java.io.Serializable;

public class Recharge implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long clientId;
    private Double amount;
    private Long employeeId;
    private Long cashId;

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getCashId() {
        return cashId;
    }

    public void setCashId(Long cashId) {
        this.cashId = cashId;
    }

}
