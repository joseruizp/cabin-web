package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Experience;

@RepositoryRestResource(collectionResourceRel = "experiencia", path = "experiencia")
public interface ExperienceRepository extends JpaRepository<Experience, Long> {

    Experience findByLevelId(@Param("id") Long idLevel);
}
