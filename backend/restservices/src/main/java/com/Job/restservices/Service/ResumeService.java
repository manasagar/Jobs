package com.Job.restservices.service;

import com.Job.restservices.entity.Jobseeker;
import com.Job.restservices.entity.Resume;
import com.Job.restservices.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class ResumeService {
    @Autowired
    ResumeRepository resumeRepository;
    @Autowired
    ParseResume parseResume;

    public void updateResume(byte[] resume) throws Exception {
        resumeRepository.save(parseResume.parse(resume));
        return;
    }

}