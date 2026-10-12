package com.parking.manage.service;

import com.parking.manage.entity.ParkingUser;
import com.parking.manage.repo.ParkingRepo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ParkingService {

    @Autowired
    ParkingRepo repo;

    @Autowired
    JwtService jwtService;

    public ParkingUser register(ParkingUser user) {
        return repo.save(user);
    }

    public ResponseEntity<?> login(ParkingUser user) {

    	ParkingUser existingUser =
                repo.findByEmailAndPassword(
                        user.getEmail(),
                        user.getPassword()
                );

        if (existingUser == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Email or Password is Wrong");
        }

        String token =
                jwtService.generateToken(existingUser.getEmail());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", existingUser.getRole());

        return ResponseEntity.ok(response);
    }
    
    public List<ParkingUser> getUsers() {
    	return repo.findAll();
    }

    public ParkingUser updateUser(Long id, ParkingUser user) {

        ParkingUser existingUser = repo.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User Not Found"));

        existingUser.setName(user.getName());
        existingUser.setPhone(user.getPhone());
        existingUser.setEmail(user.getEmail());

        return repo.save(existingUser);
    }
    
    public void deleteByID(Long id) {
		repo.deleteById(id);
	}
}