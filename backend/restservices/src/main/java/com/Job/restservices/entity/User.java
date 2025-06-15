package com.Job.restservices.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;


@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "USERS")
public  class User {
    @Id
    @Column(name="email",nullable = false, unique = true)
    protected String email;
    @Column(name="name",nullable = false)
    protected String name;
    @Column(name="password")
    protected String password;
    @Enumerated(EnumType.STRING)
    protected Role role;



}
