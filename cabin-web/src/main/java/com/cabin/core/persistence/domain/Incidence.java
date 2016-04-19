package com.cabin.core.persistence.domain;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Entity(name = "incidencia")
public class Incidence implements Serializable {
	
	private static final long serialVersionUID = -2807727072524370082L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "fecha")
	private Calendar date;

	@Column(name = "trabajo_realizado", length = 500)
	private String work;

	@Column(name = "cantidad")
	private Integer amount;

	@ManyToOne
	@JoinColumn(name = "id_empleado")
	private Employee employee;

	@ManyToOne
	@JoinColumn(name = "id_servicio")
	private Service service;
	
	@ManyToOne
	@JoinColumn(name = "id_sede")
	private Headquarter headquarter;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Calendar getDate() {
		return date;
	}

	public void setDate(Calendar date) {
		this.date = date;
	}

	public String getWork() {
		return work;
	}

	public void setWork(String work) {
		this.work = work;
	}

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Service getService() {
		return service;
	}

	public void setService(Service service) {
		this.service = service;
	}

	public Headquarter getHeadquarter() {
		return headquarter;
	}

	public void setHeadquarter(Headquarter headquarter) {
		this.headquarter = headquarter;
	}
	

}
