package com.Job.restservices.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class JobApplications {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private JobDetails job;

    @ManyToOne
    @JoinColumn(name = "jobseeker_id", nullable = false)
    private Jobseeker jobseeker;

    @Column(name = "application_status")
    private String applicationStatus; // e.g., Applied, Interview, Selected, Rejected

    @Column(name = "applied_on")
    private LocalDate appliedOn;

}
