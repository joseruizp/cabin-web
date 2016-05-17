package com.cabin.core.persistence.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "experiencia")
public class Experience implements Serializable {

    private static final long serialVersionUID = -78899037337240066L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "nombre", length = 100)
    private String name;

    @Column(name = "fraccion_recarga")
    private Double rechargeFraction;

    @Column(name = "experiencia_otorgar")
    private Integer experienceToGive;

    @ManyToOne
    @JoinColumn(name = "id_nivel")
    private Level level;

    @ManyToOne
    @JoinColumn(name = "id_estado")
    private Status status;

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

    public Double getRechargeFraction() {
        return rechargeFraction;
    }

    public void setRechargeFraction(Double rechargeFraction) {
        this.rechargeFraction = rechargeFraction;
    }

    public Integer getExperienceToGive() {
        return experienceToGive;
    }

    public void setExperienceToGive(Integer experienceToGive) {
        this.experienceToGive = experienceToGive;
    }

    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

}
