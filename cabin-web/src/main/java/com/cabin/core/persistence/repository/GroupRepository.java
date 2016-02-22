package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Group;

@RepositoryRestResource(collectionResourceRel = "grupo", path = "grupo")
public interface GroupRepository extends JpaRepository<Group, Long> {

}
