package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Client;

@RepositoryRestResource(collectionResourceRel = "cliente", path = "cliente")
public interface ClientRepository extends JpaRepository<Client, Long> {

}
