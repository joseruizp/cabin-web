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
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity(name = "cliente")
public class Client implements Serializable {

	private static final long serialVersionUID = 3018012749173085005L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "correo", length = 80)
	private String email;

	@Column(name = "nombre", length = 100)
	private String name;
	
	@Column(name = "apellido", length = 100)
	private String lastname;
	
	@ManyToOne
    @JoinColumn(name = "id_tipo_documento")
    private DocType docType;

    @Column(name = "n_documento", length = 15)
    private String docCode;

	@Column(name = "sexo", length = 1)
	private String gender;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	@Column(name = "fechaNacimiento")
	private Calendar birthDate;

	@Column(name = "saldo")
	private Double balance;

	@Column(name = "puntos")
	private Integer points;
	
	@Column(name = "experiencia")
	private Integer experience;
	
	@Column(name = "cambio_nivel", length = 1)
    private String change_level;

	@ManyToOne
	@JoinColumn(name = "id_estado")
	private Status status;

	@ManyToOne
	@JoinColumn(name = "id_nivel")
	private Level level;
	
	@OneToOne
	@JoinColumn(name = "id_usuario")
	private User user;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Calendar getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Calendar birthDate) {
		this.birthDate = birthDate;
	}

	public Double getBalance() {
		return balance;
	}

	public void setBalance(Double balance) {
		this.balance = balance;
	}

	public Integer getPoints() {
		return points == null ? 0 : points;
	}

	public void setPoints(Integer points) {
		this.points = points;
	}
	
	public Integer getExperience() {
		return experience == null ? 0 : experience;
	}

	public void setExperience(Integer experience) {
		this.experience = experience;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Level getLevel() {
		return level;
	}

	public void setLevel(Level level) {
		this.level = level;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public DocType getDocType() {
		return docType;
	}

	public void setDocType(DocType docType) {
		this.docType = docType;
	}

	public String getDocCode() {
		return docCode;
	}

	public void setDocCode(String docCode) {
		this.docCode = docCode;
	}

	public String getChange_level() {
		return change_level;
	}

	public void setChange_level(String change_level) {
		this.change_level = change_level;
	}

}
