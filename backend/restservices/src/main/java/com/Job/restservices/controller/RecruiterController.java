package com.Job.restservices.controller;

import com.Job.restservices.entity.*;
import com.Job.restservices.service.MeetingService;
import com.Job.restservices.service.QueryRewriteService;
import com.Job.restservices.service.RecruiterService;
import com.Job.restservices.service.ResumeService;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.concurrent.ExecutionException;

@Slf4j
@RestController
@RequestMapping(value="/recruiter")
public class RecruiterController {
    @Autowired
    ResumeService resumeService;
    @Autowired
    RecruiterService recruiterService;
    @Autowired
    MeetingService meetingService;
    @Autowired
    QueryRewriteService queryRewriteService;
    @GetMapping(path="/self",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> self(Principal principal){
        return ResponseEntity.ok(recruiterService.getSelf(principal));
    }
    @PostMapping(path = "/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addJob(@RequestBody JobDetails jobDetails,Principal principal) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(recruiterService.addJob(jobDetails, principal.getName()));
    }
    @PostMapping(path ="/register",consumes =MediaType.APPLICATION_JSON_VALUE,produces =MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addRecruiter(@RequestBody  Recruiter recruiter) throws Exception{
        return ResponseEntity.ok(recruiterService.addRecruiter(recruiter));
    }
    @GetMapping(path= "/get", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getJobs(Principal principal,
                                    @RequestParam(defaultValue = "3") int size,
                                    @RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "id") String sortBy

    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        //return ResponseEntity.ok("hello");
        return  ResponseEntity.ok(recruiterService.getJobs(principal.getName(),pageable));
    }
    @GetMapping(path="/meeting",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> meetings(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "3") int size,
                                      @RequestParam(defaultValue = "id") String sortBy,
                                      Principal principal){
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return ResponseEntity.ok(recruiterService.getMeeting(principal.getName(), pageable));
    }
    @PostMapping(path ="/edit",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public JobApplications updateJobApplication(Principal principal,
                                                @RequestBody Meeting meeting,
                                                @RequestParam Integer jobApplicationId,
                                                @RequestParam String note,
                                                @RequestParam String status) throws BadRequestException, MessagingException {
        log.info("{} {} {} {}",jobApplicationId,note,status,principal.getName());
        return recruiterService.changeJobStatus(principal.getName(),meeting, jobApplicationId,status,note);
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
    @PostMapping(path = "/query",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getApplications(@RequestBody String text,@RequestParam int jobId) throws Exception {
        log.info("jobId {}",jobId);
        if(text.length()<40)
            text=queryRewriteService.rewriteQuery(text);
        return ResponseEntity.ok(resumeService.queryApplications(text, String.valueOf(jobId)));
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
