package com.Job.restservices.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data

@Table(name = "job_applications")
public class JobApplications {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private JobDetails job;
    @ManyToOne
    @JoinColumn(name = "jobseeker_id", nullable = false)
    private Jobseeker jobseeker;
    @Column(name = "application_status")
    private String applicationStatus; // e.g., Applied, Interview, Selected, Rejected
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "schedule_meet_id", referencedColumnName = "id")
    private Meeting scheduleMeet;
    @Column(name="meet")
    private boolean meet;
    @Column(name ="is_saved")
    private boolean saved;
    @Column(name = "applied_on")
    private LocalDate appliedOn;
    @Column(name = "recruiter_application_status")
    private String recruiterApplicationStatus;
    public boolean getSaved(){
        return saved;
    }
}
