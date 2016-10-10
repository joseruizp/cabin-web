package com.cabin.core.persistence.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "usuario")
public class User implements Serializable {

    private static final long serialVersionUID = 2701948806122433973L;

    public static final String IS_ANONYMOUS = "1";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "nombre", length = 50)
    private String name;

    @Column(name = "clave", length = 20)
    private String pass;

    @Column(name = "anonimo", length = 1)
    private String anonymous;

    @ManyToOne
    @JoinColumn(name = "id_perfil")
    private Profile profile;

    @ManyToOne
    @JoinColumn(name = "id_estado")
    private Status status;

    @ManyToOne
    @JoinColumn(name = "id_sede")
    private Headquarter headquarter;

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

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public boolean isAnonymous() {
        return IS_ANONYMOUS.equals(this.anonymous);
    }

    public String getAnonymous() {
        return anonymous;
    }

    public void setAnonymous(String anonymous) {
        this.anonymous = anonymous;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Headquarter getHeadquarter() {
        return headquarter;
    }

    public void setHeadquarter(Headquarter headquarter) {
        this.headquarter = headquarter;
    }

}
