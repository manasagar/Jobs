package com.Job.restservices.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "JOBSEEKER")
public class Jobseeker extends User{
    @Column(name="resume")
    String resume;

    @ManyToMany
    @JoinTable(
            name = "job_applications",
            joinColumns = @JoinColumn(name = "jobseeker_id"),
            inverseJoinColumns = @JoinColumn(name = "job_id")
    )
    private List<JobDetails> appliedJobs;
}
