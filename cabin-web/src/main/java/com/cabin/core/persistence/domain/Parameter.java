package com.cabin.core.persistence.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "parametro")
public class Parameter implements Serializable {

	private static final long serialVersionUID = 3018012749173085005L;
	
	public static Long RECHARGE_FRACTION = 1L;
	public static Long MINIMUN_RECHARGE = 2L;
	public static Long MAXIMUM_RECHARGE = 3L;
	public static Long MAXIMUM_NUMBER_OF_FAILURES = 4L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "nombre", length = 20)
	private String name;
	
	@Column(name = "valor")
	private String value;
	
	@ManyToOne
    @JoinColumn(name = "id_estado")
    private Status status;

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

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
	public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
	
}
