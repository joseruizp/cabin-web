package com.cabin.core.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Level;

@RepositoryRestResource(collectionResourceRel = "nivel", path = "nivel")
public interface LevelRepository extends JpaRepository<Level, Long> {
	public List<Level> findByStatusId(@Param("statusId") Long statusId);
}
