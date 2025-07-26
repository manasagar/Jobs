package com.Job.restservices.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@Entity
@Table(name = "MEETING")
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "recruiter_id")
    private Recruiter recruiter;
    String candidate;
    LocalDateTime time;
    boolean applied;
    int job;
    String zoomLink;
    @ManyToOne
    @JoinColumn(name = "job_applications_id")
    private JobApplications jobApplications;

}
