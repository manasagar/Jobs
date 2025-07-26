package com.Job.restservices.controller;

import com.Job.restservices.entity.JobDetails;
import com.Job.restservices.entity.Meeting;
import com.Job.restservices.entity.MeetingRequest;
import com.Job.restservices.service.MeetingService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;

@RestController
@RequestMapping(value="/meeting")
@CrossOrigin(origins = {"http://localhost:3000"})
public class MeetingController {
    @Autowired
    private MeetingService meetingService;


    @PostMapping("/welcome")
    public ResponseEntity<?>welcome(@RequestBody Meeting meeting, Principal principal) throws Exception {

        return ResponseEntity.ok(meetingService.addMeeting(meeting,principal.getName()));
    }
    @GetMapping ("/recruiter/{jobId}")
    public ResponseEntity<?> meetingTiming(@PathVariable Integer jobId){
        return ResponseEntity.ok(meetingService.meetingTime(jobId));
    }

//    @PostMapping("/selection")
//    public ResponseEntity<?>selection(@RequestBody  Meeting meeting,Principal principal) throws MessagingException {
//        return ResponseEntity.ok(meetingService.selectCandidate(meeting,principal.getName()));
//    }
    @PostMapping("/addMeeting")
    public ResponseEntity<?>addMeeting(@RequestBody Meeting meeting, Principal principal) throws Exception {

        return ResponseEntity.ok(meetingService.addMeeting(meeting,principal.getName()));
    }

    @PostMapping("/finalise")
    public ResponseEntity<?>finaliseMeet(@RequestBody Meeting meeting,Principal principal) throws Exception {
        return ResponseEntity.ok(meetingService.finalise(meeting, principal.getName()));
    }
}
