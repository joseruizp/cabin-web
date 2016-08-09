package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.RechargingType;


@RepositoryRestResource(collectionResourceRel = "tipo_recarga", path = "tipo_recarga")
public interface RechargingTypeRepository extends JpaRepository<RechargingType, Long> {

}
