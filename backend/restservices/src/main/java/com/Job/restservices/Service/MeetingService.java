package com.Job.restservices.service;

import com.Job.restservices.entity.JobApplications;
import com.Job.restservices.entity.JobDetails;
import com.Job.restservices.entity.Meeting;
import com.Job.restservices.entity.Recruiter;
import com.Job.restservices.repository.JobApplicationsRepository;
import com.Job.restservices.repository.JobDetailsRepository;
import com.Job.restservices.repository.MeetingRepository;
import com.Job.restservices.repository.RecruiterRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicBoolean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
@Slf4j
@Service
public class MeetingService {
    @Autowired
    ZoomTokenService zoomTokenService;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private RecruiterRepository recruiterRepository;
    @Autowired
    private JobApplicationsRepository jobApplicationsRepository;
    @Autowired
    private MeetingRepository meetingRepository;
    @Autowired
    private JobDetailsRepository jobDetailsRepository;
  //  @Scheduled(cron = "0 10 14 * * ?", zone = "Asia/Kolkata") // use zone if needed
  //  private void runMonthlyJob() {
//        System.out.println("Running job at 2 PM on the 10th!");
//        log.info("lets go bitches");
  //  }
//    public String beginSchedule(String email) throws MessagingException {
//        MimeMessage message = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, true);
//        helper.setTo("manasagarwal1209@gmail.com");
//
//        helper.setText("Please find your Zoom meeting calendar invite attached.");
//    }

    private String createMeeting(String topic, String startTimeUTC, int durationMinutes) throws Exception {
        String token = zoomTokenService.getAccessToken();

        String body = """
        {
          "topic": "%s",
          "type": 2,
          "start_time": "%s",
          "duration": %d,
          "timezone": "UTC"
        }
        """.formatted(topic, startTimeUTC, durationMinutes);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.zoom.us/v2/users/me/meetings"))
                .header("Authorization", "Bearer " + token)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(response.body());
        log.info(node.toString());
        return node.get("join_url").asText();
    }
    public String scheduleMeet(String topic, String startTimeUTC, int durationMinutes,String mail1,String mail2) throws Exception{
        String location="online";
        LocalDateTime localDateTime = LocalDateTime.parse(startTimeUTC);
        OffsetDateTime startTime = localDateTime.atOffset(ZoneOffset.UTC);
        OffsetDateTime endTime = startTime.plusMinutes(durationMinutes);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd'T'HHmmss'Z'")
                .withZone(ZoneOffset.UTC);
        String endTimeUTC = formatter.format(endTime);
        startTimeUTC=formatter.format(startTime);
        String description="invited for interview";
        String summary=createMeeting("interview",startTimeUTC,durationMinutes);

       String ics=generateIcs(topic,description,startTimeUTC,endTimeUTC,location);
       log.info("ics {} endTime {} startTime{} summary{}",ics,endTimeUTC,startTimeUTC,summary);
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(mail1);
        helper.setSubject(description);
        helper.setText("Please find your Zoom meeting calendar invite attached."+summary);
        helper.addAttachment("meeting.ics", new ByteArrayResource(ics.getBytes()), "text/calendar");
        mailSender.send(message);
        helper.setTo(mail2);
        mailSender.send(message);
        return message.toString();
    }
    private String generateIcs(String summary, String description, String startTime, String endTime, String location){
        return(
                "BEGIN:VCALENDAR\r\n" +
                                     "VERSION:2.0\r\n" +
                                     "PRODID:-//Your Company//Meeting Scheduler//EN\r\n" +
                                     "CALSCALE:GREGORIAN\r\n" +
                                     "METHOD:REQUEST\r\n" +
                                     "BEGIN:VEVENT\r\n" +
                                     "UID:" + UUID.randomUUID() + "\r\n" +
                                     "DTSTAMP:" + formatICSTime(LocalDateTime.now()) + "\r\n" +
                                     "DTSTART:" + startTime + "\r\n" +
                                     "DTEND:" + endTime + "\r\n" +
                                     "SUMMARY:" + summary + "\r\n" +
                                     "DESCRIPTION:" + description + "\r\n" +
                                     "LOCATION:" + location + "\r\n" +
                                     "STATUS:CONFIRMED\r\n" +
                                     "SEQUENCE:0\r\n" +
                                     "END:VEVENT\r\n" +
                                     "END:VCALENDAR"
        );

    }
    public Page<Meeting> getMeetingByJob(int jobId,Pageable pageable){
        return meetingRepository.findByJob(jobId,pageable);
    }
    public String finalise(Meeting meeting) throws Exception {
        JobDetails jobDetails=jobDetailsRepository.findById(meeting.getJob()).get();
        meeting.setRecruiter(jobDetails.getRecruiter());
        Recruiter recruiter=meeting.getRecruiter();
        AtomicBoolean flag= new AtomicBoolean(true);
        recruiter.getMeetings().forEach(meet->{
            if(meet.getTime()!=null&&meet.getTime().isEqual(meeting.getTime())){
                if(meet.isApplied()){
                    flag.set(false);
                }
                else{
                    meet.setApplied(true);
                    meet.setCandidate(meeting.getCandidate());
                    meeting.setApplied(true);
                }

            }
        });
        if(!flag.get())
            return "slot filled";
        else{
            ZoneId istZone = ZoneId.of("Asia/Kolkata");
            ZonedDateTime zonedIST = meeting.getTime().atZone(istZone);
            ZonedDateTime zonedUTC = zonedIST.withZoneSameInstant(ZoneOffset.UTC);
            LocalDateTime utcDateTime = zonedUTC.toLocalDateTime();
            scheduleMeet("create the meeting",utcDateTime.toString(),90,meeting.getCandidate(),meeting.getRecruiter().getEmail());

            recruiterRepository.save(recruiter);
            JobApplications jobApplications=jobApplicationsRepository.findByJobAndJobseeker(meeting.getCandidate(), meeting.getJob()).get();
            if(!jobApplications.isMeet())
                throw new BadRequestException("invaid");
            log.info("schedule {}",meeting);
            jobApplications.setScheduleMeet(meeting);
            jobApplicationsRepository.save(jobApplications);
            return "slot applied";
        }
    }
    public List<LocalDateTime> meetingTime(Integer jobId){
        JobDetails jobDetails=jobDetailsRepository.findById(jobId).get();
        Recruiter recruiter=jobDetails.getRecruiter();
        List<LocalDateTime> availaibleslot=new ArrayList<>();
        log.info("meeting {}",recruiter.getEmail());
        recruiter.getMeetings().forEach(meeting -> {
            log.info("applied {} job {}",meeting.isApplied(),meeting.getJob());
            if(!meeting.isApplied()&&jobId==meeting.getJob())
                availaibleslot.add(meeting.getTime());
        });
        return availaibleslot;
    }
    public String selectCandidate(Meeting meeting,String interviewer) throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setSubject("Congrats Interview");
        helper.setTo(meeting.getCandidate());
        helper.setText("You are invited to interview at "+meeting.getJob()+" please schedule meeting immediatly");
        JobApplications jobApplications=jobApplicationsRepository.findByJobAndJobseeker(meeting.getCandidate(),meeting.getJob()).get();
        jobApplications.setMeet(true);

        Recruiter recruiter=recruiterRepository.findById(interviewer).get();
        meeting.setRecruiter(recruiter);
        jobApplications.setScheduleMeet(meeting);
        jobApplicationsRepository.save(jobApplications);
        mailSender.send(message);
        return "ok";
    }

    public Meeting addMeeting(Meeting meeting,String interviewer) throws Exception{

       Recruiter recruiter= recruiterRepository.findById(interviewer).get();
       meeting.setRecruiter(recruiter);
       if(meeting.getJob()==0)
           throw  new ResponseStatusException(HttpStatus.BAD_REQUEST, "no Job");
       recruiter.getMeetings().forEach(meet ->{
           if(meet.getTime()==null||meet.getTime().isAfter(meeting.getTime().plusMinutes(90))||meet.getTime().plusMinutes(90).isBefore(meeting.getTime()))
           {

           }
           else
               throw  new ResponseStatusException(HttpStatus.BAD_REQUEST, "Overlapping schedule");
       } );

       meetingRepository.save(meeting);
       return meeting;
    }
    private String formatICSTime(LocalDateTime time) {
        return time.format(DateTimeFormatter.ofPattern("yyyyMMdd'T'HHmmss'Z'"));
    }

}
