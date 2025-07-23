package com.Job.restservices.entity;

import lombok.Data;

@Data
public class MeetingRequest {
    private String topic;
    private String startTime;
    private int duration;
    private String email;
}