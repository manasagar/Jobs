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
    @Column(name="CANDIDATE")
    String candidate;
    @Column(name="TIME")
    LocalDateTime time;
    @Column(name="APPLIED")
    boolean applied;
    @Column(name="JOB")
    int job;
    @Column(name="ZOOM_LINK")
    String zoomLink;
    @ManyToOne
    @JoinColumn(name = "job_applications_id")
    private JobApplications jobApplications;

}
