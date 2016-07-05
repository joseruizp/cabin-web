package com.cabin.core.persistence.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "tarifa_por_grupo_sede")
public class TariffByGroup implements Serializable {

	private static final long serialVersionUID = -1437142536425820290L;

	public static final String PC = "P";
	public static final String CONSOLE = "C";
	
	public static final Long GROUP_DEFAULT = 1L;
	public static final Long GROUP_VIP = 2L;
	public static final Long GROUP_MAINTENANCE = 3L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "id_sede")
	private Headquarter headquarter;

	@ManyToOne
	@JoinColumn(name = "id_grupo")
	private Group group;

	@ManyToOne
	@JoinColumn(name = "id_tarifa")
	private Tariff tariff;

	@Column(name = "pc_consola", length = 1)
	private String pcConsoleFlag;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Headquarter getHeadquarter() {
		return headquarter;
	}

	public void setHeadquarter(Headquarter headquarter) {
		this.headquarter = headquarter;
	}

	public Group getGroup() {
		return group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

	public Tariff getTariff() {
		return tariff;
	}

	public void setTariff(Tariff tariff) {
		this.tariff = tariff;
	}

	public String getPcConsoleFlag() {
		return pcConsoleFlag;
	}

	public void setPcConsoleFlag(String pcConsoleFlag) {
		this.pcConsoleFlag = pcConsoleFlag;
	}

}
