package com.Job.restservices.repository;

import com.Job.restservices.entity.Jobseeker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobseekerRepository extends JpaRepository<Jobseeker,String> {
}
