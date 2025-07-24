package com.Job.restservices.repository;

import com.Job.restservices.entity.JobApplications;
import com.Job.restservices.entity.Meeting;
import com.Job.restservices.entity.Recruiter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.GetMapping;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting,Long> {
    @Query(value="SELECT * FROM MEETING WHERE JOB=?1 AND CANDIDATE IS NOT NULL ",nativeQuery = true)
    public Page<Meeting> findByJob(int job, Pageable pageable);
    @Query(value="SELECT * FROM MEETING WHERE CANDIDATE=?1 ",nativeQuery = true)
    public Page<Meeting>findByCandidate(String candidate,Pageable pageable);
    @Query(value="SELECT TIME FROM MEETING WHERE JOB=?1 AND APPLIED=false AND TIME IS NOT NULL",nativeQuery = true)
    public List<Timestamp> findAvailaible(int job);
    @Query(value="SELECT COUNT(*) as total FROM MEETING WHERE RECRUITER_ID IS NOT NULL AND RECRUITER_ID=?2 AND TIME IS NOT NULL AND \n"
    +"NOT((TIME + INTERVAL 90 MINUTE < ?1) OR (?1 + INTERVAL 90 MINUTE < TIME )) AND APPLIED=true",nativeQuery = true)
    public Long findConflict(LocalDateTime startTime, String  recruiter);
    @Query(value="SELECT *  FROM MEETING WHERE RECRUITER_ID IS NOT NULL AND RECRUITER_ID=?2 AND TIME IS NOT NULL AND \n"
            +"TIME BETWEEN (?1 - INTERVAL 1 SECOND) AND (?1 + INTERVAL 1 SECOND) AND APPLIED=false",nativeQuery = true)
    public Meeting findMeeting(LocalDateTime startTime, String  recruiter);
    @Query(value="SELECT COUNT(*) as total FROM MEETING WHERE RECRUITER_ID IS NOT NULL AND RECRUITER_ID=?2 AND TIME IS NOT NULL AND \n"
            +"NOT((TIME + INTERVAL 90 MINUTE < ?1) OR (?1 + INTERVAL 90 MINUTE < TIME )) ",nativeQuery = true)
    public Long findAllConflict(LocalDateTime startTime, String  recruiter);


}
