package com.Job.restservices.repository;

import com.Job.restservices.entity.JobDetails;
import com.Job.restservices.entity.Recruiter;
import com.Job.restservices.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResumeRepository extends JpaRepository<Resume,Long> {

    @Query(value = "SELECT * FROM resume where id in (:ids)",nativeQuery = true)
    public List<Resume> getApplications(@Param("ids") List<Long> ids);

}
