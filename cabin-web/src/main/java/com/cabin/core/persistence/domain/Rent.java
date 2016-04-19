package com.cabin.core.persistence.domain;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity(name = "alquiler")
public class Rent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "fecha_inicio")
    private Calendar startDate;

    @Column(name = "fecha_modificacion")
    private Calendar modificationDate;

    @Column(name = "tiempo_alquiler")
    private Double rentTime;

    @OneToOne
    @JoinColumn(name = "id_estado_alquiler")
    private RentStatus rentStatus;

    @OneToOne
    @JoinColumn(name = "id_cliente")
    private Client client;

    @OneToOne
    @JoinColumn(name = "id_equipo")
    private Computer computer;

    @OneToOne
    @JoinColumn(name = "id_consola")
    private Console console;

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

    public Double getRentTime() {
        return rentTime;
    }

    public void setRentTime(Double rentTime) {
        this.rentTime = rentTime;
    }

    public RentStatus getRentStatus() {
        return rentStatus;
    }

    public void setRentStatus(RentStatus rentStatus) {
        this.rentStatus = rentStatus;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Computer getComputer() {
        return computer;
    }

    public void setComputer(Computer computer) {
        this.computer = computer;
    }

    public Console getConsole() {
        return console;
    }

    public void setConsole(Console console) {
        this.console = console;
    }

}
