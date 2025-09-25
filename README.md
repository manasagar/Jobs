# 💼 JobsToday

Jobs is a web application designed to simplify job applications and postings.  
It provides a seamless experience for candidates and recruiters with secure authentication, efficient API performance, and automated meeting scheduling.

## Table of Content
1. [How it Works](#How-it-Works)
2. [Features](#Features)
3. [Run Locally](#Run-Locally)
4. [Demo](#Demo)


## How it Works
The application is built with **Spring Boot** and follows a modular, secure design:

- **Spring Boot REST APIs** power the backend for job posting, applications, and user management.  
- **Spring Security** enforces role-based access control with roles like Admin, Recruiter, and Candidate.  
- **Quartz Scheduler + Zoom API** enable automated meeting scheduling between recruiters and candidates, with reminders.  
- The system is performance-tested with **JMeter**, ensuring scalability and reliability under heavy load.  

---

## Features
- **Role-Based Access**:
  - **Admin** → Manage platform users and jobs.  
  - **Recruiter** → Post jobs, review applications, schedule interviews.  
  - **Candidate** → Apply to jobs, track applications, attend interviews.  
- **Spring Boot REST APIs** → Clean, modular, and secure endpoints.  
- **Automated Scheduling** → Meetings managed via Quartz Scheduler and Zoom API.  
- **Notifications & Reminders** → Automatic reminders for scheduled interviews.  
- **Scalable Performance** → Tested to handle thousands of requests with low latency.  
- **Secure Authentication** → Spring Security with JWT/session-based protection.  

---

## Run Locally
Clone the Project
```bash
git clone https://github.com/manasagar/Jobs.git
cd Jobs
```
Start backend
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```
Start frontend
```bash
cd frontend/my-app
npm install
npm start
```
## Demo
https://www.youtube.com/watch?v=BA5oAzJL3zM

```
