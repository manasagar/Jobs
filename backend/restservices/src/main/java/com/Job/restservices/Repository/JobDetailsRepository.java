package com.Job.restservices.repository;

import com.Job.restservices.entity.JobDetails;
import com.Job.restservices.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface JobDetailsRepository extends JpaRepository<JobDetails,Integer> {
    Optional<User> findById(int user_id);
}
