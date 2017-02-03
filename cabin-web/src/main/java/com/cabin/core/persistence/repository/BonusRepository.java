package com.cabin.core.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Bonus;


@RepositoryRestResource(collectionResourceRel = "bonificacion", path = "bonificacion")
public interface BonusRepository extends JpaRepository<Bonus, Long> {
    public List<Bonus> findByStatusId(@Param("statusId") Long statusId);
}
