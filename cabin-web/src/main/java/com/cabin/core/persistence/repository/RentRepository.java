package com.cabin.core.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.cabin.core.persistence.domain.Rent;
import com.cabin.core.valueobject.AmountByMonth;

@RepositoryRestResource(collectionResourceRel = "alquiler", path = "alquiler")
public interface RentRepository extends JpaRepository<Rent, Long> {

    Rent findByClientId(@Param("client_id") Long clientId);
    
    Rent findByClientIdAndRentStatusId(@Param("client_id") Long clientId, @Param("rent_status_id") Long rentStatusId);

    Rent findByComputerId(@Param("computer_id") Long computerId);
    
    Rent findByComputerIdAndRentStatusId(@Param("computer_id") Long computerId, @Param("rent_status_id") Long rentStatusId);

    Rent findByClientIdAndComputerId(@Param("client_id") Long clientId, @Param("computer_id") Long computerId);

    Rent findByClientIdAndConsoleId(@Param("client_id") Long clientId, @Param("console_id") Long consoleId);

    @Query("SELECT count(c) FROM com.cabin.core.persistence.domain.Rent c WHERE MONTH(c.startDate) = MONTH(CURRENT_DATE) AND YEAR(c.startDate) = YEAR(CURRENT_DATE) AND c.rentStatus.id = 1 AND c.computer != NULL")
    Integer getNumberOfRentedComputersInCurrentMonth();

    @Query("SELECT count(c) FROM com.cabin.core.persistence.domain.Rent c WHERE MONTH(c.startDate) = MONTH(CURRENT_DATE) AND YEAR(c.startDate) = YEAR(CURRENT_DATE) AND c.rentStatus.id = 1 AND c.console != NULL")
    Integer getNumberOfRentedConsolesInCurrentMonth();

    @Query("SELECT count(c) FROM com.cabin.core.persistence.domain.Rent c WHERE c.computer.headquarter.id = ?1 AND MONTH(c.startDate) = MONTH(CURRENT_DATE) AND YEAR(c.startDate) = YEAR(CURRENT_DATE) AND c.rentStatus.id = 1 AND c.computer != NULL")
    Integer getNumberOfRentedComputersInCurrentMonthByHeadquarter(Long headquarterId);

    @Query("SELECT count(c) FROM com.cabin.core.persistence.domain.Rent c WHERE c.console.headquarter.id = ?1 AND MONTH(c.startDate) = MONTH(CURRENT_DATE) AND YEAR(c.startDate) = YEAR(CURRENT_DATE) AND c.rentStatus.id = 1 AND c.console != NULL")
    Integer getNumberOfRentedConsolesInCurrentMonthByHeadquarter(Long headquarterId);

    @Query("SELECT new com.cabin.core.valueobject.AmountByMonth(MONTH(c.startDate), sum(c.price)) FROM com.cabin.core.persistence.domain.Rent c WHERE MONTH(c.startDate) = MONTH(CURRENT_DATE) AND YEAR(c.startDate) = YEAR(CURRENT_DATE) AND c.rentStatus.id = 1 AND c.computer != NULL GROUP BY MONTH(c.startDate) ORDER BY MONTH(c.startDate)")
    List<AmountByMonth>  getTotalRentedComputersByMonth();

    @Query("SELECT new com.cabin.core.valueobject.AmountByMonth(MONTH(c.startDate), sum(c.price)) FROM com.cabin.core.persistence.domain.Rent c WHERE MONTH(c.startDate) = MONTH(CURRENT_DATE) AND YEAR(c.startDate) = YEAR(CURRENT_DATE) AND c.rentStatus.id = 1 AND c.console != NULL GROUP BY MONTH(c.startDate) ORDER BY MONTH(c.startDate)")
    List<AmountByMonth>  getTotalRentedConsolesByMonth();

    @Query("SELECT new com.cabin.core.valueobject.AmountByMonth(MONTH(c.startDate), sum(c.price)) FROM com.cabin.core.persistence.domain.Rent c WHERE c.computer.headquarter.id = ?1 AND MONTH(c.startDate) = MONTH(CURRENT_DATE) AND YEAR(c.startDate) = YEAR(CURRENT_DATE) AND c.rentStatus.id = 1 AND c.computer != NULL GROUP BY MONTH(c.startDate) ORDER BY MONTH(c.startDate)")
    List<AmountByMonth>  getTotalRentedComputersByMonthByHeadquarter(Long headquarterId);

    @Query("SELECT new com.cabin.core.valueobject.AmountByMonth(MONTH(c.startDate), sum(c.price)) FROM com.cabin.core.persistence.domain.Rent c WHERE c.console.headquarter.id = ?1 AND MONTH(c.startDate) = MONTH(CURRENT_DATE) AND YEAR(c.startDate) = YEAR(CURRENT_DATE) AND c.rentStatus.id = 1 AND c.console != NULL GROUP BY MONTH(c.startDate) ORDER BY MONTH(c.startDate)")
    List<AmountByMonth>  getTotalRentedConsolesByMonthByHeadquarter(Long headquarterId);

}
