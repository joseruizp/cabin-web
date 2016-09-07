package com.cabin.core.persistence.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Headquarter;

@RepositoryRestResource(collectionResourceRel = "sede", path = "sede")
public interface HeadquarterRepository extends JpaRepository<Headquarter, Long> {
	Headquarter findById(@Param("id") Long id);
	Headquarter findByUserId(@Param("userId") Long userId);
}
