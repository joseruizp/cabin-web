package com.cabin.core.view;

import java.io.Serializable;

public class ComputerGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long computerId;
    private Long groupId;

    public Long getComputerId() {
        return computerId;
    }

    public void setComputerId(Long computerId) {
        this.computerId = computerId;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

}
