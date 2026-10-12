
package com.parking.manage.service;

import com.parking.manage.entity.ParkingListing;
import com.parking.manage.repo.ParkingListingRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ParkingListingService {

    private final ParkingListingRepo repo;

    public ParkingListingService(ParkingListingRepo repo) {
        this.repo = repo;
    }

    // Save a new parking offer
    public ParkingListing createListing(ParkingListing listing) {

        listing.setId(null);
        listing.setStatus("PENDING");

        return repo.save(listing);
    }

    // Get every parking offer
    public List<ParkingListing> getAllListings() {
        return repo.findAll();
    }

    // Get offers belonging to one provider
    public List<ParkingListing> getProviderListings(
            String providerEmail) {

        return repo.findByProviderEmail(providerEmail);
    }

    // Get offers waiting for admin approval
    public List<ParkingListing> getPendingListings() {
        return repo.findByStatus("PENDING");
    }

    // Publish or reject an offer
    @Transactional
    public ParkingListing updateStatus(Long id, String status) {

        if (!"PUBLISHED".equals(status)
                && !"REJECTED".equals(status)) {
            throw new IllegalArgumentException(
                "Status must be PUBLISHED or REJECTED"
            );
        }

        ParkingListing listing = repo.findById(id)
            .orElseThrow(() ->
                new RuntimeException("Parking listing not found")
            );

        listing.setStatus(status);

        return repo.save(listing);
    }
}
	