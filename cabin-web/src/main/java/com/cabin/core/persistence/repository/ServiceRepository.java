package com.cabin.core.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Service;

@RepositoryRestResource(collectionResourceRel = "servicio", path = "servicio")
public interface ServiceRepository extends JpaRepository<Service, Long> {
	
}
