package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Cash;

@RepositoryRestResource(collectionResourceRel = "caja", path = "caja")
public interface CashRepository extends JpaRepository<Cash, Long> {

    Cash findByEmployeeIdAndHeadquarterIdAndStatusId(Long employeeId, Long headquarterId, Long active);

}
