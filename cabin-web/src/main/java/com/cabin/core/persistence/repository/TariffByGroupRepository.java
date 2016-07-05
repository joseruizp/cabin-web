package com.cabin.core.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.TariffByGroup;

@RepositoryRestResource(collectionResourceRel = "tarifa_por_grupo_sede", path = "tarifa_por_grupo_sede")
public interface TariffByGroupRepository extends JpaRepository<TariffByGroup, Long> {

	List<TariffByGroup> findByHeadquarterIdAndGroupId(@Param("idHeadquarter") Long idHeadquarter,
			@Param("idGroup") Long idGroup);

	List<TariffByGroup> findByHeadquarterIdAndGroupIdAndPcConsoleFlag(@Param("idHeadquarter") Long idHeadquarter,
			@Param("idGroup") Long idGroup, @Param("pcConsole") String pcConsole);
}
