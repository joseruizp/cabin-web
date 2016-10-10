package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.ExpenseType;


@RepositoryRestResource(collectionResourceRel = "tipo_gasto", path = "tipo_gasto")
public interface ExpenseTypeRepository extends JpaRepository<ExpenseType, Long> {

}
