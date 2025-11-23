package com.Job.restservices.service;

import com.Job.restservices.dto.JwtResponse;
import com.Job.restservices.entity.*;
import com.Job.restservices.repository.*;
import io.qdrant.client.QdrantClient;
import jakarta.mail.MessagingException;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class RecruiterService {
    @Autowired
    RecruiterRepository recruiterRepository;
    @Autowired
    JobDetailsRepository jobDetailsRepository;
    @Autowired
    JobApplicationsRepository jobApplicationsRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtService jwtService;
    @Autowired
    MeetingRepository meetingRepository;
    @Autowired
    MeetingService meetingService;
    @Autowired
    ResumeService resumeService;
    public Recruiter getSelf(Principal principal){
        return recruiterRepository.findById(principal.getName()).get();
    }
        public JwtResponse addRecruiter(Recruiter recruiter) throws Exception{
            recruiter.setPassword(passwordEncoder.encode(recruiter.getPassword()));
            recruiterRepository.save(recruiter);
            return new JwtResponse(jwtService.generateToken(recruiter.getEmail()),new Date(),recruiter.getRole().toString());
        }
        public JobDetails addJob(JobDetails jobDetails,  String recruiterId) throws ExecutionException, InterruptedException {
            Recruiter recruiter=recruiterRepository.findById(recruiterId).get();

            jobDetails.setRecruiter(recruiter);
            JobDetails job=jobDetailsRepository.save(jobDetails);
            resumeService.addJob(job.getJobDescription(), (long) job.getId());
            resumeService.createVectorStore(String.valueOf(job.getId()));
           return job;
        }
        public List<JobDetails> getJobs(String recruiterId){
           return recruiterRepository.findById(recruiterId).get().getJobs();
        }
        public Page<JobDetails> getJobs(String recruiterId,Pageable pageable){
            return jobDetailsRepository.findByRecruiter(recruiterId,pageable);
        }
        public JobApplications changeJobStatus(String interview,Meeting meeting, Integer jobApplicationId,String status,String note) throws BadRequestException, MessagingException {
        log.info("1");
        if(jobApplicationsRepository.findById(jobApplicationId).isEmpty()){
            log.info("what {}",Status.Rejected.toString());
        }
        JobApplications jobApplications=jobApplicationsRepository.findById(jobApplicationId).get();
            log.info("2");

            if(status.equals(Status.NextRound.toString())){
                log.info("3");
                meetingService.selectCandidate(meeting,interview,note,jobApplicationId);
            }
            else if(status.equals(Status.Rejected.toString())){
                log.info("4");
               meetingService.finalCommunication(meeting,status,note);
               jobApplications.setApplicationStatus(Status.Rejected);
            }
            else if(status.equals(Status.Selected.toString())){
                log.info("5");
                meetingService.finalCommunication(meeting,status,note);
                jobApplications.setApplicationStatus(Status.Selected);
            }
            else{
                throw new BadRequestException("wrong request");
            }
           return jobApplicationsRepository.save(jobApplications);
        }
        public Page<JobApplications> getApplications(int jobId, Pageable pageable){
            return jobApplicationsRepository.findByJob(jobId,pageable);
        }
        public Page<Meeting> getMeeting(String recruiter_id,Pageable pageable){
            return meetingRepository.getMeetingByRecruiter(recruiter_id,pageable);
        }
//        public
}
