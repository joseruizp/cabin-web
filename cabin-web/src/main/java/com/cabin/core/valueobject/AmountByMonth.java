package com.cabin.core.valueobject;

public class AmountByMonth {

    private Integer month;
    private Double amount;

    public AmountByMonth(Integer month, Double amount) {
        super();
        this.month = month;
        this.amount = amount;
    }

    public Integer getMonth() {
        return month;
    }

    public Double getAmount() {
        return amount;
    }

}
