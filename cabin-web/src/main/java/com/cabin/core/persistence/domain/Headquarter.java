package com.cabin.core.persistence.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "sede")
public class Headquarter implements Serializable {

    private static final long serialVersionUID = 3787779533719287687L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "nombre", length = 20)
    private String name;

    @Column(name = "direccion", length = 200)
    private String address;
    
    @Column(name = "cantidad_maxima_operador")
	private Integer maxAmountOperator;
    
    @ManyToOne
	@JoinColumn(name = "id_tipo_operario")
	private OperatorType operatorType;

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Integer getMaxAmountOperator() {
		return maxAmountOperator;
	}

	public void setMaxAmountOperator(Integer maxAmountOperator) {
		this.maxAmountOperator = maxAmountOperator;
	}

	public OperatorType getOperatorType() {
		return operatorType;
	}

	public void setOperatorType(OperatorType operatorType) {
		this.operatorType = operatorType;
	}
}
