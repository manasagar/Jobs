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

    @OneToMany(mappedBy = "jobseeker")
    private List<JobApplications> appliedJobs;
}
