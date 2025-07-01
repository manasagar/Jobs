package com.Job.restservices.service;

import com.Job.restservices.dto.JobFilter;
import com.Job.restservices.dto.JwtResponse;
import com.Job.restservices.entity.JobApplications;
import com.Job.restservices.entity.JobDetails;
import com.Job.restservices.entity.Recruiter;
import com.Job.restservices.entity.User;
import com.Job.restservices.notifications.NotificationTypes;
import com.Job.restservices.notifications.annotations.Notify;
import com.Job.restservices.repository.JobApplicationsRepository;
import com.Job.restservices.repository.JobDetailsRepository;
import com.Job.restservices.repository.RecruiterRepository;
import com.Job.restservices.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
        public List<JobDetails>getJobs(JobFilter jobFilter,String recruiterId){
                List<JobDetails> jobs=recruiterRepository.findById(recruiterId).get().getJobs();
                jobs=jobs.stream().filter(job->{
                    if(job.getStipend()>=jobFilter.getStipend())
                        return true;
                    return false;
                }).collect(Collectors.toList());
            return jobs;
        }
      //  @Notify(mandatory = true,notificationTypes = {NotificationTypes.EMAIL})
        public JobApplications changeJobStatus(String recruiterId, JobApplications jobApplications){
           return jobApplicationsRepository.save(jobApplications);
        }
//        public
}
