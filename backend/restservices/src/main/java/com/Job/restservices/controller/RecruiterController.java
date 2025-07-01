package com.Job.restservices.controller;

import com.Job.restservices.dto.JobFilter;
import com.Job.restservices.entity.JobApplications;
import com.Job.restservices.entity.JobDetails;
import com.Job.restservices.entity.Recruiter;
import com.Job.restservices.entity.User;
import com.Job.restservices.repository.JobApplicationsRepository;
import com.Job.restservices.service.RecruiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value="/recruiter")
@CrossOrigin(origins = {"http://localhost:3000"})
public class RecruiterController {
    @Autowired
    RecruiterService recruiterService;
    @PostMapping(path = "/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public JobDetails addJob(@RequestBody JobDetails jobDetails,Principal principal) {
        return recruiterService.addJob(jobDetails, principal.getName());
    }
    @PostMapping(path ="/register",consumes =MediaType.APPLICATION_JSON_VALUE,produces =MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addRecruiter(@RequestBody  Recruiter recruiter) throws Exception{
        return ResponseEntity.ok(recruiterService.addRecruiter(recruiter));
    }
    @GetMapping(path= "/get", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<JobDetails> getJobs(Principal principal) {
        return  recruiterService.getJobs(principal.getName());
    }
    @PostMapping(path = "/filter_get",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<JobDetails> getFilteredJobs(JobFilter jobFilter,Principal principal){
        return recruiterService.getJobs(jobFilter, principal.getName());
    }
    @PutMapping(path ="/edit",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public JobApplications updateJobApplication(Principal principal,JobApplications jobApplications){
        return recruiterService.changeJobStatus(principal.getName(), jobApplications);
    }



}
