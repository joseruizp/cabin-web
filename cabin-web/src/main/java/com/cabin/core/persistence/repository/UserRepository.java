package com.cabin.core.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.User;

@RepositoryRestResource(collectionResourceRel = "usuario", path = "usuario")
public interface UserRepository extends JpaRepository<User, Long> {

	public List<User> findByNameAndPass(@Param("name") String name, @Param("pass") String pass);
	public List<User> findByName(@Param("name") String name);
}
