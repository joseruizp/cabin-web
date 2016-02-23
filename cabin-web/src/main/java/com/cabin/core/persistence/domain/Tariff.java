package com.cabin.core.persistence.domain;

import java.io.Serializable;
import java.util.Calendar;

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

	@Column(name = "fraccion_minima")
	private Double minimumFraction;
	
	@Column(name = "precio_hora")
	private Double price;
	
	@Column(name = "hora_inicio")
	private Calendar startTime;

	@Column(name = "hora_fin")
	private Calendar endTime;
	
	@Column(name = "dias")
	private String days;
		
	@Column(name = "descripcion")
	private String description;


	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Calendar getStartTime() {
		return startTime;
	}

	public void setStartTime(Calendar startTime) {
		this.startTime = startTime;
	}

	public Calendar getEndTime() {
		return endTime;
	}

	public void setEndTime(Calendar endTime) {
		this.endTime = endTime;
	}

	public String getDays() {
		return days;
	}

	public void setDays(String days) {
		this.days = days;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Double getMinimumFraction() {
		return minimumFraction;
	}

	public void setMinimumFraction(Double minimumFraction) {
		this.minimumFraction = minimumFraction;
	}


}
