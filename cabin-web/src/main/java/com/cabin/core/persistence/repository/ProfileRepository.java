package com.cabin.core.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Profile;

@RepositoryRestResource(collectionResourceRel = "perfil", path = "perfil")
public interface ProfileRepository extends JpaRepository<Profile, Long> {

}
