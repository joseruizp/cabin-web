package com.cabin.core.view;

import java.io.Serializable;

public class StartCash implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long employeeId;
    private Long headquarterId;
    private Double amount;

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getHeadquarterId() {
        return headquarterId;
    }

    public void setHeadquarterId(Long headquarterId) {
        this.headquarterId = headquarterId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

}
