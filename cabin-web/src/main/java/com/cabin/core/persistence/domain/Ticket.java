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

@Entity(name = "ticket")
public class Ticket implements Serializable {

    private static final long serialVersionUID = 3787779533719287687L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss", timezone="America/Lima")
	@Column(name = "fecha")
	private Calendar date;
    
    @Column(name = "monto_recarga")
	private Double rechargingAmount;
    
	@Column(name = "flag_cierre_caja")
	private Integer cashClosingFlag;
    
    @ManyToOne
	@JoinColumn(name = "id_cliente")
	private Client client;

    @ManyToOne
	@JoinColumn(name = "id_empleado")
	private Employee employee;

    @ManyToOne
	@JoinColumn(name = "id_tipo_recarga")
	private RechargingType rechargingType;
    
    @ManyToOne
   	@JoinColumn(name = "id_cierre_caja")
   	private CashClosing cashClosing;

    @ManyToOne
	@JoinColumn(name = "id_estado")
	private Status status;
    
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Calendar getDate() {
		return date;
	}

	public void setDate(Calendar date) {
		this.date = date;
	}

	public Double getRechargingAmount() {
		return rechargingAmount;
	}

	public void setRechargingAmount(Double rechargingAmount) {
		this.rechargingAmount = rechargingAmount;
	}

	public Integer getCashClosingFlag() {
		return cashClosingFlag;
	}

	public void setCashClosingFlag(Integer cashClosingFlag) {
		this.cashClosingFlag = cashClosingFlag;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public RechargingType getRechargingType() {
		return rechargingType;
	}

	public void setRechargingType(RechargingType rechargingType) {
		this.rechargingType = rechargingType;
	}

	public CashClosing getCashClosing() {
		return cashClosing;
	}

	public void setCashClosing(CashClosing cashClosing) {
		this.cashClosing = cashClosing;
	}
}
