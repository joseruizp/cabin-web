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

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity(name = "cierre_caja")
public class CashClosing implements Serializable {

    private static final long serialVersionUID = 3787779533719287687L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss", timezone="America/Lima")
	@Column(name = "fecha")
	private Calendar date;
    
    @Column(name = "monto_total")
	private Double totalAmount;
    
	@Column(name = "cantidad_tickets")
	private Integer ticketsAmount;    
    
    @ManyToOne
	@JoinColumn(name = "id_empleado")
	private Employee employee;
    
    
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

	
	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Integer getTicketsAmount() {
		return ticketsAmount;
	}

	public void setTicketsAmount(Integer ticketsAmount) {
		this.ticketsAmount = ticketsAmount;
	}
	
}
