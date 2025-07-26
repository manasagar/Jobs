package com.Job.restservices.controller;

import com.Job.restservices.dto.JobFilter;
import com.Job.restservices.entity.*;
import com.Job.restservices.repository.JobApplicationsRepository;
import com.Job.restservices.service.MeetingService;
import com.Job.restservices.service.RecruiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    @Autowired
    MeetingService meetingService;
    @GetMapping(path="/self",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> self(Principal principal){
        return ResponseEntity.ok(recruiterService.getSelf(principal));
    }
    @PostMapping(path = "/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public JobDetails addJob(@RequestBody JobDetails jobDetails,Principal principal) {
        return recruiterService.addJob(jobDetails, principal.getName());
    }
    @PostMapping(path ="/register",consumes =MediaType.APPLICATION_JSON_VALUE,produces =MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addRecruiter(@RequestBody  Recruiter recruiter) throws Exception{
        return ResponseEntity.ok(recruiterService.addRecruiter(recruiter));
    }
    @GetMapping(path= "/get", produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<JobDetails> getJobs(Principal principal,
                                    @RequestParam(defaultValue = "3") int size,
                                    @RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "id") String sortBy

    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return  recruiterService.getJobs(principal.getName(),pageable);
    }

    @PutMapping(path ="/edit",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public JobApplications updateJobApplication(Principal principal,JobApplications jobApplications){
        return recruiterService.changeJobStatus(principal.getName(), jobApplications);
    }
    @GetMapping(path="/getMeeting/{jobId}",produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<Meeting> getMeeting(@PathVariable int jobId,
                                    @RequestParam(defaultValue = "3") int size,
                                    @RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "id") String sortBy)
    {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return meetingService.getMeetingByJob(jobId,pageable);
    }
    @GetMapping(path="/get_applications/{jobId}",produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<JobApplications> getApplications(@PathVariable int jobId,
                                                 @RequestParam(defaultValue = "3") int size,
                                                 @RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "id") String sortBy

    ){
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return recruiterService.getApplications(jobId,pageable);
    }



}
