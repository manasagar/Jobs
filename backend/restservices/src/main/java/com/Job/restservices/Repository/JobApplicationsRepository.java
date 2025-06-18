package com.Job.restservices.repository;

import com.Job.restservices.entity.JobApplications;
import com.Job.restservices.entity.JobDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobApplicationsRepository extends JpaRepository<JobApplications,Integer> {

}
