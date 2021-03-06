package com.cabin.core.persistence.domain;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity(name = "tarifa")
public class Tariff implements Serializable {

	private static final long serialVersionUID = -199656642718738964L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "descripcion")
	private String description;

	@Column(name = "precio")
	private Double price;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "tariff")
	private Set<TariffDetail> tariffDetails;
	
	@ManyToOne
	@JoinColumn(name = "id_estado")
	private Status status;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public Set<TariffDetail> getTariffDetails() {
		return tariffDetails;
	}

	public void setTariffDetails(Set<TariffDetail> tariffDetails) {
		this.tariffDetails = tariffDetails;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
}
