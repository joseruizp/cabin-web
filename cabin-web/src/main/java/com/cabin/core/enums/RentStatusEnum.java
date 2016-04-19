package com.cabin.core.enums;

public enum RentStatusEnum {

    RENTED(1L),
    STOPPED(2L);

    private Long id;

    private RentStatusEnum(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
