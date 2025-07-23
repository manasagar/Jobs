package com.Job.restservices.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@Entity
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "recruiter_id")
    @JsonBackReference("recruiter-meeting")
    private Recruiter recruiter;
    String candidate;
    LocalDateTime time;
    boolean applied;
    int job;

}
