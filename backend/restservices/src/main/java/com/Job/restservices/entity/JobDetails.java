package com.Job.restservices.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Data

@Table(name="JOB")
public class JobDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name="job_title")
    private String  jobTitle;
    @Column(name="job_description")
    private String jobDescription;
    @Column(name="skills")
    private String skills;
    @Column(name="deadline")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate deadline;
    @Column(name="type")
    private String type;
    @Column(name="location")
    private String location;
    @ManyToOne
    @JoinColumn(name = "recruiter_id", nullable = false)
    @JsonManagedReference
    private Recruiter recruiter;
    @OneToMany (mappedBy = "job")
   @JsonBackReference
    private List<JobApplications> applications;
    @Column(name="status")
    private String status;
    @Column(name="stipend")
    private int stipend;
}
