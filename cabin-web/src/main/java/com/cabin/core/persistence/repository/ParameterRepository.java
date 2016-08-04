package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Parameter;


@RepositoryRestResource(collectionResourceRel = "parametro", path = "parametro")
public interface ParameterRepository extends JpaRepository<Parameter, Long> {

}
