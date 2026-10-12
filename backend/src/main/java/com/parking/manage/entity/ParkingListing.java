
package com.parking.manage.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "parking_listings")
public class ParkingListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String offerName;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String street;
    private String city;

    @Column(nullable = false)
    private Integer availableSpaces;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerHour;

    @ElementCollection
    @CollectionTable(
        name = "listing_supported_vehicles",
        joinColumns = @JoinColumn(name = "listing_id")
    )
    @Column(name = "vehicle_type")
    private List<String> supportedVehicles = new ArrayList<>();

    private LocalTime opens;
    private LocalTime closes;

    private boolean covered;
    private boolean evCharging;
    private boolean cctv;
    private boolean open24x7;

    private String providerEmail;

    @Column(nullable = false)
    private String status = "PENDING";

    public ParkingListing() {
    }

    public Long getId() {
        return id;
    }

    public String getOfferName() {
        return offerName;
    }

    public void setOfferName(String offerName) {
        this.offerName = offerName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Integer getAvailableSpaces() {
        return availableSpaces;
    }

    public void setAvailableSpaces(Integer availableSpaces) {
        this.availableSpaces = availableSpaces;
    }

    public BigDecimal getPricePerHour() {
        return pricePerHour;
    }

    public void setPricePerHour(BigDecimal pricePerHour) {
        this.pricePerHour = pricePerHour;
    }

    public List<String> getSupportedVehicles() {
        return supportedVehicles;
    }

    public void setSupportedVehicles(List<String> supportedVehicles) {
        this.supportedVehicles = supportedVehicles;
    }

    public LocalTime getOpens() {
        return opens;
    }

    public void setOpens(LocalTime opens) {
        this.opens = opens;
    }

    public LocalTime getCloses() {
        return closes;
    }

    public void setCloses(LocalTime closes) {
        this.closes = closes;
    }

    public boolean isCovered() {
        return covered;
    }

    public void setCovered(boolean covered) {
        this.covered = covered;
    }

    public boolean isEvCharging() {
        return evCharging;
    }

    public void setEvCharging(boolean evCharging) {
        this.evCharging = evCharging;
    }

    public boolean isCctv() {
        return cctv;
    }
    
    public void setId(Long id) {
    	this.id=id;
    }

    public void setCctv(boolean cctv) {
        this.cctv = cctv;
    }

    public boolean isOpen24x7() {
        return open24x7;
    }

    public void setOpen24x7(boolean open24x7) {
        this.open24x7 = open24x7;
    }

    public String getProviderEmail() {
        return providerEmail;
    }

    public void setProviderEmail(String providerEmail) {
        this.providerEmail = providerEmail;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
