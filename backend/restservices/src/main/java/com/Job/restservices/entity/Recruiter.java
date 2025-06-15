package com.Job.restservices.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "Recruiter")
public class Recruiter extends User {
    @Column(name="company_name",nullable = false)
    String CompanyName;
    @OneToMany(mappedBy="id")
    List<JobDetails> jobs;


}
