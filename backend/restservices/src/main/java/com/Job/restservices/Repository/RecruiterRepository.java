package com.Job.restservices.Repository;

import com.Job.restservices.Dto.JobFilter;
import com.Job.restservices.entity.JobDetails;
import com.Job.restservices.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecruiterRepository extends JpaRepository<User,String> {
    @Query(value = "select * from JOBS where stipend >= ?1 AND company_name like ?2",nativeQuery = true)
    public List<JobDetails> getUsers(Integer stipend,String companyName);

}
