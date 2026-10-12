package com.parking.manage.controller;

import com.parking.manage.entity.ParkingUser;
import com.parking.manage.service.ParkingService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/parking")
public class ParkingController {

    @Autowired
    ParkingService service;

    @PostMapping("/register")
    public ParkingUser register(@RequestBody ParkingUser user) {
        return service.register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody ParkingUser user) {
        return service.login(user);
    }

    @PutMapping("/update/{id}")
    public ParkingUser update(
            @PathVariable Long id,
            @RequestBody ParkingUser user) {
        return service.updateUser(id, user);
    }
    @GetMapping("/users")
    public List<ParkingUser> Users() {
    	return service.getUsers();
    }
    
    @DeleteMapping("/delete/{id}")
	public void deleteBYID(@PathVariable Long id) {
		service.deleteByID(id);
	}
}