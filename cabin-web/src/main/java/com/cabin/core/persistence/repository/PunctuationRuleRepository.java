package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.PunctuationRule;

@RepositoryRestResource(collectionResourceRel = "regla_puntuacion", path = "regla_puntuacion")
public interface PunctuationRuleRepository extends JpaRepository<PunctuationRule, Long> {

    PunctuationRule findByLevelId(@Param("id") Long idLevel);

}
