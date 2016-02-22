package com.cabin.core.persistence.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "tarifa")
public class Tariff implements Serializable {

	private static final long serialVersionUID = -199656642718738964L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "nombre", length = 20)
	private String name;

	@Column(name = "fraccion_minima")
	private Double minimumFraction;

	@Column(name = "fraccion_fija")
	private Double fixedFraction;

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

	public Double getMinimumFraction() {
		return minimumFraction;
	}

	public void setMinimumFraction(Double minimumFraction) {
		this.minimumFraction = minimumFraction;
	}

	public Double getFixedFraction() {
		return fixedFraction;
	}

	public void setFixedFraction(Double fixedFraction) {
		this.fixedFraction = fixedFraction;
	}

}
