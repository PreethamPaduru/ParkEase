package com.parking.manage.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.parking.manage.entity.ParkingUser;



@Repository
public interface ParkingRepo extends JpaRepository<ParkingUser, Long>{
	ParkingUser findByEmailAndPassword(String email, String password);
}
