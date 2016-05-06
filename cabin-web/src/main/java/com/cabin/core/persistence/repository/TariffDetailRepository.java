package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.TariffDetail;

@RepositoryRestResource(collectionResourceRel = "tarifa_detalle", path = "tarifa_detalle")
public interface TariffDetailRepository extends JpaRepository<TariffDetail, Long> {

}
