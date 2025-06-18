package com.Job.restservices.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class JwtResponse {
    String jwtToken;
    Date expiryDate;
}
