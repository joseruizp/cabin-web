package com.cabin.core.persistence.domain;

import java.io.Serializable;

public class RechargeInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    private Double minimumFraction;
    private Double maximumFraction;
    private Double rechargeFraction;

    public Double getMinimumFraction() {
        return minimumFraction;
    }

    public void setMinimumFraction(Double minimumFraction) {
        this.minimumFraction = minimumFraction;
    }

    public Double getMaximumFraction() {
        return maximumFraction;
    }

    public void setMaximumFraction(Double maximumFraction) {
        this.maximumFraction = maximumFraction;
    }

    public Double getRechargeFraction() {
        return rechargeFraction;
    }

    public void setRechargeFraction(Double rechargeFraction) {
        this.rechargeFraction = rechargeFraction;
    }

}
