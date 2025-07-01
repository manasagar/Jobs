package com.Job.restservices.service;

import com.Job.restservices.dto.JwtResponse;
import com.Job.restservices.entity.JobApplications;
import com.Job.restservices.entity.JobDetails;
import com.Job.restservices.entity.Jobseeker;
import com.Job.restservices.repository.JobApplicationsRepository;
import com.Job.restservices.repository.JobDetailsRepository;
import com.Job.restservices.repository.JobseekerRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class JobseekerService {
    @Autowired
    JobseekerRepository jobseekerRepository;
    @Autowired
    JobApplicationsRepository jobApplicationsRepository;
    @Autowired
    JobDetailsRepository jobDetailsRepository;
    @Autowired
    JwtService jwtService;
    @Autowired
    PasswordEncoder passwordEncoder;


    public JwtResponse addJobseeker(Jobseeker jobseeker) throws Exception{
        if(jobseekerRepository.findById(jobseeker.getEmail()).isPresent())
            throw new BadRequestException("UserExists");
            jobseeker.setPassword(passwordEncoder.encode(jobseeker.getPassword()));
         jobseekerRepository.save(jobseeker);
         return new JwtResponse(jwtService.generateToken(jobseeker.getEmail()),new Date(),jobseeker.getRole().toString());
    }
    public Page<JobApplications> savedJobs(String jobseekerId,Pageable pageable){
        return jobApplicationsRepository.findByJobAndJobseekerAndSaved(jobseekerId,pageable);
    }
    public Page<JobApplications> appliedJobs(String jobseekerId,Pageable pageable){
        return jobApplicationsRepository.findByJobAndJobseekerAndApplied(jobseekerId,pageable);
    }
    public JobApplications addJobApplication(String jobseekerId, int jobId){
        Jobseeker jobseeker = jobseekerRepository.findById(jobseekerId).get();
        JobDetails jobDetails=jobDetailsRepository.findById(jobId).get();
        JobApplications jobApplications= new JobApplications();
        if(jobApplicationsRepository.findByJobAndJobseeker(jobseekerId,jobId).isPresent()){
            jobApplications=jobApplicationsRepository.findByJobAndJobseeker(jobseekerId,jobId).get();
            if(jobApplications.getApplicationStatus()==null) {
                jobApplications.setApplicationStatus("applied");
                jobApplications.setAppliedOn(LocalDate.now());
            }
        }
        else {
            jobApplications.setJob(jobDetails);
            jobApplications.setJobseeker(jobseeker);
            jobApplications.setApplicationStatus("applied");
            jobApplications.setAppliedOn(LocalDate.now());
        }
        return jobApplicationsRepository.save(jobApplications);
    }
    public JobApplications saveJobApplication(String jobseekerId, int jobId) throws Exception{
        Jobseeker jobseeker = jobseekerRepository.findById(jobseekerId).get();
        JobDetails jobDetails=jobDetailsRepository.findById(jobId).get();
            JobApplications jobApplications= new JobApplications();
        if(jobApplicationsRepository.findByJobAndJobseeker(jobseekerId,jobId).isPresent()){
            jobApplications=jobApplicationsRepository.findByJobAndJobseeker(jobseekerId,jobId).get();
            if(!jobApplications.getSaved())
                jobApplications.setSaved(true);
            else
                jobApplications.setSaved(false);
        }
        else {
            jobApplications.setJob(jobDetails);
            jobApplications.setJobseeker(jobseeker);

            if(!jobApplications.getSaved())
                jobApplications.setSaved(true);
            else
                jobApplications.setSaved(false);
        }

            return jobApplicationsRepository.save(jobApplications);

    }
    public Page<JobApplications> getJobApplications(String jobseekerId,String location,String status,Pageable pageable){
        return jobApplicationsRepository.findByJobAndJobseekerAndApplied(jobseekerId,pageable);
    }
    public Page<JobDetails> getJobs(String company,String location,Pageable pageable){
        return jobDetailsRepository.findFilteredJobs(company,location,pageable);
    }
    public void updateResume(String jobseekerName,byte[] resume) throws  Exception{
        Jobseeker jobseeker=jobseekerRepository.findById(jobseekerName).get();
        jobseeker.setResume(resume);
        jobseekerRepository.save(jobseeker);

    }

}
