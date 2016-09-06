package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Failure;

@RepositoryRestResource(collectionResourceRel = "falla", path = "falla")
public interface FailureRepository extends JpaRepository<Failure, Long> {

}
