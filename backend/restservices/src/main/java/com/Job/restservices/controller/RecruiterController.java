package com.Job.restservices.controller;

import com.Job.restservices.Dto.JobFilter;
import com.Job.restservices.Service.RecruiterService;
import com.Job.restservices.Service.UserService;
import com.Job.restservices.entity.JobDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/recruiter")
public class RecruiterController {
    @Autowired
    RecruiterService recruiterService;
//    @PostMapping(name = "/add", consumes = MediaType.APPLICATION_JSON_VALUE)
//    public void addJob() {
//
//    }

//    @GetMapping(name = "/get", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public List<JobDetails> getJobs() {
//
//    }
//    @PostMapping(name = "filter_get",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public List<JobDetails>getFilteredJobs(JobFilter jobFilter){
//        return recruiterService
//    }



}
