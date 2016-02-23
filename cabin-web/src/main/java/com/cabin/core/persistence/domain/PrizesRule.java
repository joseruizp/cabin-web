package com.cabin.core.persistence.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "regla_premio")
public class PrizesRule implements Serializable {

	private static final long serialVersionUID = 4994410937056685560L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "nombre", length = 100)
	private String name;

	@Column(name = "fraccion_saldo")
	private Double balanceFraction;

	@Column(name = "puntos")
	private Integer points;

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

	public Double getBalanceFraction() {
		return balanceFraction;
	}

	public void setBalanceFraction(Double balanceFraction) {
		this.balanceFraction = balanceFraction;
	}

	public Integer getPoints() {
		return points;
	}

	public void setPoints(Integer points) {
		this.points = points;
	}

}
