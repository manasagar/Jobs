package com.Job.restservices.repository;

import com.Job.restservices.entity.JobApplications;
import com.Job.restservices.entity.JobDetails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JobApplicationsRepository extends JpaRepository<JobApplications,Integer> {

    @Query(nativeQuery = true,value="select * from job_applications where job_id=?1 and application_status is not NULL AND application_status != 'Rejected'  ")
    public Page<JobApplications> findByJob(int job,Pageable pageable);
    @Query(nativeQuery = true,value="select * from job_applications where jobseeker_id=?1 and job_id=?2 ")
    public Optional<JobApplications> findByJobAndJobseeker(String  jobseekerId,int jobDetailsId);
    @Query(nativeQuery = true,value="select * from job_applications where jobseeker_id=?1  and is_saved = true")
    public Page<JobApplications> findByJobAndJobseekerAndSaved(String  jobseekerId,Pageable pageable);
    @Query(nativeQuery = true,value="select * from job_applications where jobseeker_id=?1  and application_status is not NULL ")
    public Page<JobApplications> findByJobAndJobseekerAndApplied(String  jobseekerId,Pageable pageable);
    @Query(nativeQuery = true,value="select * from job_applications where job_id=?1  and application_status is not NULL ")
    public Page<JobApplications> findByJob(String jobId,Pageable pageable);
}
