package com.cabin.core.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Client;

@RepositoryRestResource(collectionResourceRel = "cliente", path = "cliente")
public interface ClientRepository extends JpaRepository<Client, Long> {

	public Client findById(@Param("id") Long id);
	
	public List<Client> findByUserId(@Param("userId") Long userId);

    public List<Client> findByStatusId(@Param("statusId") Long statusId);

    public List<Client> findByStatusIdAndUserAnonymous(@Param("statusId") Long statusId, @Param("anonymous") String anonymous);

    public List<Client> findByUserHeadquarterIdAndUserAnonymous(@Param("headquarterId") Long headquarterId, @Param("anonymous") String anonymous);

    public List<Client> findByName(@Param("name") String name);
}
