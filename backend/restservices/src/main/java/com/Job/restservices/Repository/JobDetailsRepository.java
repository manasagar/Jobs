package com.Job.restservices.repository;

import com.Job.restservices.entity.JobDetails;
import com.Job.restservices.entity.Jobseeker;
import com.Job.restservices.entity.Resume;
import com.Job.restservices.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface JobDetailsRepository extends JpaRepository<JobDetails,Integer> {
    Optional<JobDetails> findById(int user_id);
    @Query(nativeQuery = true,value="SELECT * FROM job ")
    public Page<JobDetails> findFilteredJobs(  Pageable pageable);
    @Query(nativeQuery = true,value="SELECT * FROM job WHERE RECRUITER_ID=?1")
    public Page<JobDetails>findByRecruiter(String recruiter,Pageable pageable);
    @Query(value = "SELECT * FROM job where id in (:ids)",nativeQuery = true)
    public List<JobDetails> getJobs(@Param("ids") List<Long> ids);
}
