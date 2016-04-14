package com.cabin.core.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Computer;

@RepositoryRestResource(collectionResourceRel = "equipo", path = "equipo")
public interface ComputerRepository extends JpaRepository<Computer, Long> {

	List<Computer> findByHeadquarterId(@Param("id") Long id);
}
