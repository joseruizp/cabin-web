package com.cabin.core.persistence.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;


import com.cabin.core.persistence.domain.Incidence;

@RepositoryRestResource(collectionResourceRel = "incidencia", path = "incidencia")
public interface IncidenceRepository extends JpaRepository<Incidence, Long> {
	
}
