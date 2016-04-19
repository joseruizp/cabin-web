package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.RentStatus;

@RepositoryRestResource(collectionResourceRel = "estado_alquiler", path = "estado_alquiler")
public interface RentStatusRepository extends JpaRepository<RentStatus, Long> {

}
