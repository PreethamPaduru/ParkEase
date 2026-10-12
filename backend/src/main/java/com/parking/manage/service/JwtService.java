package com.parking.manage.service;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    public SecretKey secret =
            Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generateToken(String email) {

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(
                    new Date(System.currentTimeMillis() + 30 * 1000)
                )
                .signWith(secret, SignatureAlgorithm.HS256)
                .compact();
    }

    public void validateToken(String token) {

        Jwts.parser()
                .verifyWith(secret)
                .build()
                .parseSignedClaims(token);
    }
}