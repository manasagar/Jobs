package com.Job.restservices.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "JOBSEEKER")

public class Jobseeker extends User{
    @Lob
    @Column(length = 5242880)
    private byte[] resume;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "resume_id")
    private Resume resumeDetails;
    @Column(name="specialisation")
    List<String> skills;

    public Jobseeker() {}
    public Jobseeker(User user){
        this.name=user.getName();
        this.email=user.getEmail();
        this.password=user.getPassword();
        this.role=user.getRole();
    }

}
