package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Rent;

@RepositoryRestResource(collectionResourceRel = "alquiler", path = "alquiler")
public interface RentRepository extends JpaRepository<Rent, Long> {

    Rent findByClientId(@Param("client_id") Long clientId);

    Rent findByClientIdAndComputerId(@Param("client_id") Long clientId, @Param("computer_id") Long computerId);

    Rent findByClientIdAndConsoleId(@Param("client_id") Long clientId, @Param("console_id") Long consoleId);

}
