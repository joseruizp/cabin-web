package com.cabin.core.persistence.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "regla_puntuacion")
public class PunctuationRule implements Serializable {

	private static final long serialVersionUID = 7245718039530870377L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "nombre", length = 100)
	private String name;

	@Column(name = "fraccion_recarga")
	private Double rechargingFraction;

	@Column(name = "puntos")
	private Integer points;

	@ManyToOne
	@JoinColumn(name = "id_estado")
	private Status status;
	
	@ManyToOne
	@JoinColumn(name = "id_nivel")
	private Level level;
	
	
	public Level getLevel() {
		return level;
	}

	public void setLevel(Level level) {
		this.level = level;
	}

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

	public Double getRechargingFraction() {
		return rechargingFraction;
	}

	public void setRechargingFraction(Double rechargingFraction) {
		this.rechargingFraction = rechargingFraction;
	}

	public Integer getPoints() {
		return points;
	}

	public void setPoints(Integer points) {
		this.points = points;
	}

	 public Status getStatus() {
	    return status;
	 }

	 public void setStatus(Status status) {
	    this.status = status;
	 }

}
