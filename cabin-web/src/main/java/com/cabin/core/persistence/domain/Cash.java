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

@Entity(name = "caja")
public class Cash implements Serializable {

    private static final long serialVersionUID = 3787779533719287687L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss", timezone = "America/Lima")
    @Column(name = "fecha_apertura")
    private Calendar startDate;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss", timezone = "America/Lima")
    @Column(name = "fecha_modificacion")
    private Calendar modificationDate;

    @ManyToOne
    @JoinColumn(name = "id_estado")
    private Status status;

    @ManyToOne
    @JoinColumn(name = "id_empleado")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "id_sede")
    private Headquarter headquarter;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Calendar getStartDate() {
        return startDate;
    }

    public void setStartDate(Calendar startDate) {
        this.startDate = startDate;
    }

    public Calendar getModificationDate() {
        return modificationDate;
    }

    public void setModificationDate(Calendar modificationDate) {
        this.modificationDate = modificationDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Headquarter getHeadquarter() {
        return headquarter;
    }

    public void setHeadquarter(Headquarter headquarter) {
        this.headquarter = headquarter;
    }
}
