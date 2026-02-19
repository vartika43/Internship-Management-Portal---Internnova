# InternNova Database Setup

## Overview
This database was designed and deployed using MongoDB (Local + MongoDB Atlas Cloud).

The database name is: `internnova`

## Technologies Used
- MongoDB
- MongoDB Compass
- MongoDB Atlas
- Node.js

## Collections Created
1. users
2. students
3. internships
4. attendance
5. nocRequests
6. documents

## Relationships
- users → students (via userId)
- students → internships (via studentId)
- internships → attendance (via internshipId)
- internships → nocRequests (via internshipId)
- internships → documents (via internshipId)

## Deployment
- Cluster created on MongoDB Atlas (AWS Mumbai region)
- IP Access configured
- Database user created
- Cloud connection verified successfully

## Contribution
Database schema design, relationship modeling, sample data creation,
local testing, and cloud deployment were completed.
