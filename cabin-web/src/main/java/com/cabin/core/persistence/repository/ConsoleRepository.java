package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Console;

@RepositoryRestResource(collectionResourceRel = "consola", path = "consola")
public interface ConsoleRepository extends JpaRepository<Console, Long> {

}
