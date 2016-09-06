package com.cabin.core.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.FailureByComputer;

@RepositoryRestResource(collectionResourceRel = "falla_por_equipo", path = "falla_por_equipo")
public interface FailureByComputerRepository extends JpaRepository<FailureByComputer, Long> {

    public List<FailureByComputer> findByComputerIdAndStatusId(@Param("computerId") Long computerId, @Param("statusId") Long statusId);
}
