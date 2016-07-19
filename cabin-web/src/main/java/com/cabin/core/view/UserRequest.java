package com.cabin.core.view;

import java.io.Serializable;

public class UserRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    private String name;
    private String pass;
    private Long headquarterId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public Long getHeadquarterId() {
        return headquarterId;
    }

    public void setHeadquarterId(Long headquarterId) {
        this.headquarterId = headquarterId;
    }

}
