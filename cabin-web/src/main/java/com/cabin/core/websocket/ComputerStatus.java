package com.cabin.core.websocket;

import java.io.Serializable;

public class ComputerStatus implements Serializable {

    private static final long serialVersionUID = 1L;

    public static final Long AVALIABLE = 1L;
    public static final Long OCUPIED = 2L;
    public static final Long MAINTENANCE = 3L;
    public static final Long RESTARTING = 4L;
    public static final Long TURNING_OFF = 5L;
    public static final Long TURNED_OFF = 6L;

    private Long computerId;
    private Long statusId;

    public Long getComputerId() {
        return computerId;
    }

    public void setComputerId(Long computerId) {
        this.computerId = computerId;
    }

    public Long getStatusId() {
        return statusId;
    }

    public void setStatusId(Long statusId) {
        this.statusId = statusId;
    }

}
