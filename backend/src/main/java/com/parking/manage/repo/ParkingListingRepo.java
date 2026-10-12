
package com.parking.manage.repo;

import com.parking.manage.entity.ParkingListing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParkingListingRepo
        extends JpaRepository<ParkingListing, Long> {

    List<ParkingListing> findByProviderEmail(String providerEmail);

    List<ParkingListing> findByStatus(String status);

    List<ParkingListing> findByProviderEmailAndStatus(
        String providerEmail,
        String status
    );
}
