package com.cabin.core.persistence.domain;

import java.io.Serializable;

public class Recharge implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long clientId;
    private Double amount;

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

}
