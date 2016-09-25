package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.OperatorType;


@RepositoryRestResource(collectionResourceRel = "tipo_operario", path = "tipo_operario")
public interface OperatorTypeRepository extends JpaRepository<OperatorType, Long> {

}
