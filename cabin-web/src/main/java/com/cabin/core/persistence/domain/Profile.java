package com.cabin.core.persistence.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.cabin.core.enums.Role;

@Entity(name = "perfil")
public class Profile implements Serializable {

    private static final long serialVersionUID = -2185823049272069007L;

    public static final Long ADMIN = 1L;
    public static final Long EMPLOYEE = 2L;
    public static final Long CLIENT = 3L;
    public static final Long INCIDENCE = 4L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "nombre", length = 20)
    private String name;

    @Column(name = "descripcion", length = 200)
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public static Role getRole(Long profileId) {
        if (ADMIN == profileId) {
            return Role.ADMIN;
        } else if (EMPLOYEE == profileId) {
            return Role.OPERATOR;
        } else if (CLIENT == profileId) {
            return Role.USER;
        } else if (INCIDENCE == profileId) {
            return Role.INCIDENCE;
        }
        return Role.USER;
    }
}
