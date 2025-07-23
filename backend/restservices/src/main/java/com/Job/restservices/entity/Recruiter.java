package com.Job.restservices.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "Recruiter")

public class Recruiter extends User {
    @Column(name="company_name",nullable = false)
    String companyName;
    @JsonBackReference("recruiter-jobs")
    @OneToMany(mappedBy="recruiter", cascade = CascadeType.ALL)
    List<JobDetails> jobs;
    @Column(name="current_position")
    String currentPosition;
    @Column(name="specialisation")
    List<String> skills;
    @Column(name="linkedein_profile")
    String linkedein;
    @OneToMany(mappedBy = "recruiter",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference("recruiter-meeting")
    List<Meeting> meetings;

}
