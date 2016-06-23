package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.PrizesRule;

@RepositoryRestResource(collectionResourceRel = "regla_premio", path = "regla_premio")
public interface PrizesRuleRepository extends JpaRepository<PrizesRule, Long> {

	PrizesRule findByLevelId(@Param("id") Long idLevel);
}
