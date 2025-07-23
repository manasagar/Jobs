package com.Job.restservices.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "USERS")
@Component
public  class User {
    @Id
    @Column(name="email",nullable = false, unique = true)
    protected String email;
    @Column(name="name",nullable = false)
    protected String name;
    @Column(name="password")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    protected String password;
    @Enumerated(EnumType.STRING)
    @Column(name="role",nullable = false)
    protected Role role;


}
