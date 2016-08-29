package com.cabin.core.persistence.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "tarifa_detalle")
public class TariffDetail implements Serializable {

    private static final long serialVersionUID = 426366428063983856L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "precio_hora")
    private Double price;

    @Column(name = "hora_inicio")
    private String startTime;

    @Column(name = "hora_fin")
    private String endTime;

    @Column(name = "dias")
    private String days;

    @ManyToOne
    @JoinColumn(name = "id_tarifa")
    private Tariff tariff;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getDays() {
        return days;
    }

    public void setDays(String days) {
        this.days = days;
    }

    public void setTariff(Tariff tariff) {
        this.tariff = tariff;
    }

}
