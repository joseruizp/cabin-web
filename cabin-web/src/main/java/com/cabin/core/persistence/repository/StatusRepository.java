package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Status;

@RepositoryRestResource(collectionResourceRel = "estado", path = "estado")
public interface StatusRepository extends JpaRepository<Status, Long> {

}
