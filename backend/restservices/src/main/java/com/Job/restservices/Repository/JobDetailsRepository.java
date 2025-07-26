package com.Job.restservices.repository;

import com.Job.restservices.entity.JobDetails;
import com.Job.restservices.entity.Jobseeker;
import com.Job.restservices.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface JobDetailsRepository extends JpaRepository<JobDetails,Integer> {
    Optional<JobDetails> findById(int user_id);
    @Query(nativeQuery = true,value="select * from job ")
    public Page<JobDetails> findFilteredJobs(  Pageable pageable);
    @Query(nativeQuery = true,value="select * from job where recruiter_id=?1")
    public Page<JobDetails>findByRecruiter(String recruiter,Pageable pageable);
}
