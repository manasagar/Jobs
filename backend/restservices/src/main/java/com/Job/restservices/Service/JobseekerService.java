package com.Job.restservices.service;

import com.Job.restservices.entity.JobApplications;
import com.Job.restservices.entity.JobDetails;
import com.Job.restservices.entity.Jobseeker;
import com.Job.restservices.repository.JobApplicationsRepository;
import com.Job.restservices.repository.JobDetailsRepository;
import com.Job.restservices.repository.JobseekerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class JobseekerService {
    @Autowired
    JobseekerRepository jobseekerRepository;
    @Autowired
    JobApplicationsRepository jobApplicationsRepository;
    @Autowired
    JobDetailsRepository jobDetailsRepository;

    public Jobseeker addJobseeker(Jobseeker jobseeker){
        return jobseekerRepository.save(jobseeker);
    }
    public JobApplications addJobApplication(String jobseekerId, JobDetails jobDetails){
        Jobseeker jobseeker = jobseekerRepository.findById(jobseekerId).get();
        JobApplications jobApplications= new JobApplications();
        jobApplications.setJob(jobDetails);
        jobApplications.setJobseeker(jobseeker);
        jobApplications.setApplicationStatus("applied");
        jobApplications.setAppliedOn(LocalDate.now());
        return jobApplicationsRepository.save(jobApplications);
    }
    public List<JobDetails> getJobs(){
        return jobDetailsRepository.findAll();
    }

}
