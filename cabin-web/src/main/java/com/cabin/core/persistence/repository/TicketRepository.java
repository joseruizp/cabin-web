package com.cabin.core.persistence.repository;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Ticket;
import com.cabin.core.view.TicketReport;

@RepositoryRestResource(collectionResourceRel = "ticket", path = "ticket")
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    public List<Ticket> findByCashId(@Param("cashId") Long cashId);

    @Query("SELECT count(t) FROM com.cabin.core.persistence.domain.Ticket t WHERE MONTH(t.date) = MONTH(CURRENT_DATE) AND YEAR(t.date) = YEAR(CURRENT_DATE) AND t.client != null")
    public Integer getNumberOfTicketsCurrentMonth();

    @Query("SELECT count(t) FROM com.cabin.core.persistence.domain.Ticket t WHERE t.cash.headquarter.id = ?1 AND MONTH(t.date) = MONTH(CURRENT_DATE) AND YEAR(t.date) = YEAR(CURRENT_DATE) AND t.client != null")
    public Integer getNumberOfTicketsCurrentMonthByHeadquarter(Long headquarterId);

    @Query("SELECT coalesce(SUM(t.rechargeAmount),0) - coalesce(SUM(t.expenseAmount),0) FROM com.cabin.core.persistence.domain.Ticket t WHERE MONTH(t.date) = MONTH(CURRENT_DATE) AND YEAR(t.date) = YEAR(CURRENT_DATE) AND t.client != null")
    public BigDecimal getTotalRevenueCurrentMonth();

    @Query("SELECT coalesce(SUM(t.rechargeAmount),0) - coalesce(SUM(t.expenseAmount),0) FROM com.cabin.core.persistence.domain.Ticket t WHERE t.cash.headquarter.id = ?1 AND MONTH(t.date) = MONTH(CURRENT_DATE) AND YEAR(t.date) = YEAR(CURRENT_DATE) AND t.client != null")
    public BigDecimal getTotalRevenueCurrentMonthByHeadquarter(Long headquarterId);

    @Query("SELECT coalesce(SUM(t.rechargeAmount),0) - coalesce(SUM(t.expenseAmount),0) FROM com.cabin.core.persistence.domain.Ticket t WHERE MONTH(t.date) = (MONTH(CURRENT_DATE) -1) AND YEAR(t.date) = YEAR(CURRENT_DATE) AND t.client != null")
    public BigDecimal getTotalRevenueLastMonth();

    @Query("SELECT coalesce(SUM(t.rechargeAmount),0) - coalesce(SUM(t.expenseAmount),0) FROM com.cabin.core.persistence.domain.Ticket t WHERE t.cash.headquarter.id = ?1 AND MONTH(t.date) = (MONTH(CURRENT_DATE) -1) AND YEAR(t.date) = YEAR(CURRENT_DATE) AND t.client != null")
    public BigDecimal getTotalRevenueLastMonthByHeadquarter(Long headquarterId);

    @Query("SELECT coalesce(SUM(t.rechargeAmount),0) - coalesce(SUM(t.expenseAmount),0) FROM com.cabin.core.persistence.domain.Ticket t WHERE DATE(t.date) = CURRENT_DATE AND t.client != null")
    public BigDecimal getTotalRevenueCurrentDate();

    @Query("SELECT coalesce(SUM(t.rechargeAmount),0) - coalesce(SUM(t.expenseAmount),0) FROM com.cabin.core.persistence.domain.Ticket t WHERE t.cash.headquarter.id = ?1 AND DATE(t.date) = CURRENT_DATE AND t.client != null")
    public BigDecimal getTotalRevenueCurrentDateByHeadquarter(Long headquarterId);

    @Query("SELECT coalesce(SUM(t.rechargeAmount),0) - coalesce(SUM(t.expenseAmount),0) FROM com.cabin.core.persistence.domain.Ticket t WHERE t.date between ?1 and ?2 AND t.client != null")
    public BigDecimal getTotalRevenueBetween(Calendar startDate, Calendar endDate);

    @Query("SELECT coalesce(SUM(t.rechargeAmount),0) - coalesce(SUM(t.expenseAmount),0) FROM com.cabin.core.persistence.domain.Ticket t WHERE t.cash.headquarter.id = ?3 AND t.date between ?1 and ?2 AND t.client != null")
    public BigDecimal getTotalRevenueBetweenByHeadquarter(Calendar startDate, Calendar endDate, Long headquarterId);

    @Query("SELECT new com.cabin.core.view.TicketReport" +
            "(t.cash.id, t.employee.name, t.employee.lastname, t.cash.startDate, t.cash.modificationDate, " +
            "coalesce(SUM(t.rechargeAmount),0), coalesce(SUM(t.expenseAmount),0))" +
            "FROM com.cabin.core.persistence.domain.Ticket t " +
            "WHERE t.cash.headquarter.id = ?1 AND t.date between ?2 and ?3 AND t.client != null " +
            "GROUP BY t.cash.id, t.employee.name, t.employee.lastname, t.cash.startDate, t.cash.modificationDate " +
            "ORDER BY t.cash.id DESC")
    public List<TicketReport> getTicketReport(Long headquarterId, Calendar startCalendar, Calendar endCalendar);
    
    @Query("SELECT new com.cabin.core.view.TicketReport" +
            "(t.cash.id, t.employee.name, t.employee.lastname, t.cash.startDate, t.cash.modificationDate, " +
            "coalesce(SUM(t.rechargeAmount),0), coalesce(SUM(t.expenseAmount),0))" +
            "FROM com.cabin.core.persistence.domain.Ticket t " +
            "WHERE t.date between ?1 and ?2 AND t.client != null " +
            "GROUP BY t.cash.id, t.employee.name, t.employee.lastname, t.cash.startDate, t.cash.modificationDate " +
            "ORDER BY t.cash.id DESC")
    public List<TicketReport> getTicketReport(Calendar startCalendar, Calendar endCalendar);
}
