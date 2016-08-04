package com.cabin.core.persistence.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "bonificacion")
public class Bonus implements Serializable {

	private static final long serialVersionUID = 3018012749173085005L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "nombre", length = 20)
	private String name;
	
	@Column(name = "cantidad_experiencia")
	private Integer experienceAmount;
		
	@Column(name = "fraccion_otorgar")
    private Double fractionToGive;
	
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
	
	public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

	public Integer getExperienceAmount() {
		return experienceAmount;
	}

	public void setExperienceAmount(Integer experienceAmount) {
		this.experienceAmount = experienceAmount;
	}

	public Double getFractionToGive() {
		return fractionToGive;
	}

	public void setFractionToGive(Double fractionToGive) {
		this.fractionToGive = fractionToGive;
	}
	
}
