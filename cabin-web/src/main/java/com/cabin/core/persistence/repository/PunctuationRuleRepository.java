package com.cabin.core.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Bonus;
import com.cabin.core.persistence.domain.PunctuationRule;

@RepositoryRestResource(collectionResourceRel = "regla_puntuacion", path = "regla_puntuacion")
public interface PunctuationRuleRepository extends JpaRepository<PunctuationRule, Long> {

    PunctuationRule findByLevelId(@Param("id") Long idLevel);
    PunctuationRule findByLevelIdAndStatusId(@Param("id") Long idLevel, @Param("status_id") Long statusId);
    public List<PunctuationRule> findByStatusId(@Param("statusId") Long statusId);
}
