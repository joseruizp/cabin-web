package com.cabin.core.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Ticket;


@RepositoryRestResource(collectionResourceRel = "ticket", path = "ticket")
public interface TicketRepository extends JpaRepository<Ticket, Long> {
	public List<Ticket> findByEmployeeIdAndCashClosingFlag(@Param("employeeId") Long employeeId, @Param("cashClosingFlag") Integer cashClosingFlag);
	public List<Ticket> findByCashClosingId(@Param("cashClosingId") Long cashClosingId);
}
