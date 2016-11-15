package com.cabin.core.persistence.repository;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Ticket;
import com.cabin.core.valueobject.AmountByMonth;

@RepositoryRestResource(collectionResourceRel = "ticket", path = "ticket")
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    public List<Ticket> findByCashId(@Param("cashId") Long cashId);
    
    @Query("SELECT count(t.amount) FROM com.cabin.core.persistence.domain.Ticket t WHERE MONTH(t.date) = MONTH(CURRENT_DATE) AND YEAR(t.date) = YEAR(CURRENT_DATE)")
    public Integer getNumberOfTicketsCurrentMonth();

    @Query("SELECT sum(t.amount) FROM com.cabin.core.persistence.domain.Ticket t WHERE MONTH(t.date) = MONTH(CURRENT_DATE) AND YEAR(t.date) = YEAR(CURRENT_DATE) AND t.rechargingType != NULL")
    public BigDecimal getTotalRechargesCurrentMonth();

    @Query("SELECT sum(t.amount) FROM com.cabin.core.persistence.domain.Ticket t WHERE MONTH(t.date) = MONTH(CURRENT_DATE) AND YEAR(t.date) = YEAR(CURRENT_DATE) AND t.expenseType != NULL")
    public BigDecimal getTotalExpensesCurrentMonth();

    @Query("SELECT sum(t.amount) FROM com.cabin.core.persistence.domain.Ticket t WHERE MONTH(t.date) = (MONTH(CURRENT_DATE) -1) AND YEAR(t.date) = YEAR(CURRENT_DATE) AND t.rechargingType != NULL")
    public BigDecimal getTotalRechargesLastMonth();

    @Query("SELECT sum(t.amount) FROM com.cabin.core.persistence.domain.Ticket t WHERE MONTH(t.date) = (MONTH(CURRENT_DATE) -1) AND YEAR(t.date) = YEAR(CURRENT_DATE) AND t.expenseType != NULL")
    public BigDecimal getTotalExpensesLastMonth();

    @Query("SELECT sum(t.amount) FROM com.cabin.core.persistence.domain.Ticket t WHERE t.date = CURRENT_DATE AND t.rechargingType != NULL")
    public BigDecimal getTotalRechargesCurrentDate();

    @Query("SELECT sum(t.amount) FROM com.cabin.core.persistence.domain.Ticket t WHERE t.date = CURRENT_DATE AND t.expenseType != NULL")
    public BigDecimal getTotalExpensesCurrentDate();

    @Query("SELECT sum(t.amount) FROM com.cabin.core.persistence.domain.Ticket t WHERE t.date between ?1 and ?2 AND t.rechargingType != NULL")
    public BigDecimal getTotalRechargesBetween(Calendar startDate, Calendar endDate);

    @Query("SELECT sum(t.amount) FROM com.cabin.core.persistence.domain.Ticket t WHERE t.date between ?1 and ?2 AND t.expenseType != NULL")
    public BigDecimal getTotalExpensesBetween(Calendar startDate, Calendar endDate);

    @Query("SELECT new com.cabin.core.valueobject.AmountByMonth(MONTH(t.date), sum(t.amount)) FROM com.cabin.core.persistence.domain.Ticket t WHERE YEAR(t.date) = YEAR(CURRENT_DATE) AND t.rechargingType != NULL GROUP BY MONTH(t.date) ORDER BY MONTH(t.date)")
    public List<AmountByMonth> getTotalRechargesByMonth();

    @Query("SELECT new com.cabin.core.valueobject.AmountByMonth(MONTH(t.date), sum(t.amount)) FROM com.cabin.core.persistence.domain.Ticket t WHERE YEAR(t.date) = YEAR(CURRENT_DATE) AND t.expenseType != NULL GROUP BY MONTH(t.date) ORDER BY MONTH(t.date)")
    public List<AmountByMonth> getTotalExpensesByMonth();
}
