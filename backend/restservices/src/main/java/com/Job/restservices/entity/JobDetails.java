package com.Job.restservices.entity;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name="JOB")
public class JobDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="job_description")
    private String jobDescription;
    @Column(name="job_requirement")
    private String jobRequirements;
    @ManyToOne
    @JoinColumn(name = "recruiter_id", nullable = false)
    private Recruiter recruiter;
    @OneToMany (mappedBy = "job")
    private List<JobApplications> applications;
    @Column(name="status")
    private String status;
    @Column(name="stipend")
    private int stipend;


}
