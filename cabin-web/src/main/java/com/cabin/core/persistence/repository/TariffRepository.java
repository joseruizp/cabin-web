package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Tariff;

@RepositoryRestResource(collectionResourceRel = "tarifa", path = "tarifa")
public interface TariffRepository extends JpaRepository<Tariff, Long> {

}
