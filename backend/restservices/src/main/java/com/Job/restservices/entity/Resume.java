package com.Job.restservices.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "resume")
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
    @Lob
    @Column(length = 5242880)
    public byte[] resume;
    @Column(name="dates",columnDefinition = "JSON")
    @Convert(converter = StringListConverter.class)
    public List<String> dates;
    @Column(name="locations",columnDefinition = "JSON")
    @Convert(converter = StringListConverter.class)
    public List<String> locations;
    @Column(name="organizations",columnDefinition = "JSON")
    @Convert(converter = StringListConverter.class)
    public List<String> orgs;
    @Column(name="skills",columnDefinition = "JSON")
    @Convert(converter = StringListConverter.class)
    public List<String> skills;

}
