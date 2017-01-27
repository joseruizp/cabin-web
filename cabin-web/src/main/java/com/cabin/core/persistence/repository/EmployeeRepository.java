package com.cabin.core.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Client;
import com.cabin.core.persistence.domain.Employee;

@RepositoryRestResource(collectionResourceRel = "empleado", path = "empleado")
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	public Employee findById(@Param("id") Long id);
	public List<Employee> findByEmail(@Param("email") String email);
	public List<Employee> findByDocCode(@Param("docCode") String docCode);
	public List<Employee> findByUserId(@Param("userId") Long userId);
}
