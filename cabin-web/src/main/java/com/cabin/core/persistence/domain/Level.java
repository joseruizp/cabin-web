package com.cabin.core.persistence.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "nivel")
public class Level implements Serializable {

	private static final long serialVersionUID = 8629686850429438279L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "nombre", length = 20)
	private String name;
	
	@Column(name = "experiencia_inicial")
	private Integer initialExperience;	

	@Column(name = "experiencia_final")
	private Integer finalExperience;

	@Column(name = "pregunta", length = 20)
	private String question;

	public Integer getInitialExperience() {
		return initialExperience;
	}

	public void setInitialExperience(Integer initialExperience) {
		this.initialExperience = initialExperience;
	}

	public Integer getFinalExperience() {
		return finalExperience;
	}

	public void setFinalExperience(Integer finalExperience) {
		this.finalExperience = finalExperience;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

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
}
