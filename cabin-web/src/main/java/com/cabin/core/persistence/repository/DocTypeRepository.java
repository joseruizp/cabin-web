package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.DocType;


@RepositoryRestResource(collectionResourceRel = "tipo_documento", path = "tipo_documento")
public interface DocTypeRepository extends JpaRepository<DocType, Long> {

}
