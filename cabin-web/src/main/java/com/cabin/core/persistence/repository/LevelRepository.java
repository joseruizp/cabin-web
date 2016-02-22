package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Level;

@RepositoryRestResource(collectionResourceRel = "nivel", path = "nivel")
public interface LevelRepository extends JpaRepository<Level, Long> {

}
