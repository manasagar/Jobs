package com.Job.restservices.repository;

import com.Job.restservices.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepository extends JpaRepository<Resume,Long> {

}
