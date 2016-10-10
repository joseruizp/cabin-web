package com.cabin.core.view;

import java.io.Serializable;

public class CloseCash implements Serializable {

    private static final long serialVersionUID = 1L;

    private Double enteredAmount;
    private Double justifiedAmount;

    public CloseCash() {
    }

    public CloseCash(Double enteredAmount, Double justifiedAmount) {
        super();
        this.enteredAmount = enteredAmount;
        this.justifiedAmount = justifiedAmount;
    }

    public Double getEnteredAmount() {
        return enteredAmount;
    }

    public void setEnteredAmount(Double enteredAmount) {
        this.enteredAmount = enteredAmount;
    }

    public Double getJustifiedAmount() {
        return justifiedAmount;
    }

    public void setJustifiedAmount(Double justifiedAmount) {
        this.justifiedAmount = justifiedAmount;
    }

    public Double getRest() {
        return this.justifiedAmount - this.enteredAmount;
    }

}
