package com.Job.restservices.repository;

import com.Job.restservices.entity.JobDetails;
import com.Job.restservices.entity.Recruiter;
import com.Job.restservices.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface RecruiterRepository extends JpaRepository<Recruiter,String> {
//    @Query(value = "select * from JOBS where stipend >= ?1 AND company_name like ?2 ",nativeQuery = true)
//    public List<JobDetails> getUsers(Integer stipend,String companyName,Recruiter recruiter);

}
