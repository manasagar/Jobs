package com.Job.restservices.service;

import com.Job.restservices.dto.JobFilter;
import com.Job.restservices.dto.JwtResponse;
import com.Job.restservices.entity.*;
import com.Job.restservices.notifications.NotificationTypes;
import com.Job.restservices.notifications.annotations.Notify;
import com.Job.restservices.repository.JobApplicationsRepository;
import com.Job.restservices.repository.JobDetailsRepository;
import com.Job.restservices.repository.RecruiterRepository;
import com.Job.restservices.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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
    public Recruiter getSelf(Principal principal){
        return recruiterRepository.findById(principal.getName()).get();
    }
        public JwtResponse addRecruiter(Recruiter recruiter) throws Exception{
            recruiter.setPassword(passwordEncoder.encode(recruiter.getPassword()));
            recruiterRepository.save(recruiter);
            return new JwtResponse(jwtService.generateToken(recruiter.getEmail()),new Date(),recruiter.getRole().toString());
        }
        public JobDetails addJob(JobDetails jobDetails,  String recruiterId){
            Recruiter recruiter=recruiterRepository.findById(recruiterId).get();
            jobDetails.setRecruiter(recruiter);
           return jobDetailsRepository.save(jobDetails);
        }
        public List<JobDetails> getJobs(String recruiterId){
           return recruiterRepository.findById(recruiterId).get().getJobs();
        }
        public Page<JobDetails>getJobs(String recruiterId,Pageable pageable){
            return jobDetailsRepository.findByRecruiter(recruiterId,pageable);
        }
      //  @Notify(mandatory = true,notificationTypes = {NotificationTypes.EMAIL})
        public JobApplications changeJobStatus(String recruiterId, JobApplications jobApplications){
           return jobApplicationsRepository.save(jobApplications);
        }
        public Page<JobApplications> getApplications(int jobId, Pageable pageable){
            return jobApplicationsRepository.findByJob(jobId,pageable);
        }
//        public
}
