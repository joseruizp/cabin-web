package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.CashClosing;


@RepositoryRestResource(collectionResourceRel = "cierre_caja", path = "cierre_caja")
public interface CashClosingRepository extends JpaRepository<CashClosing, Long> {

}
