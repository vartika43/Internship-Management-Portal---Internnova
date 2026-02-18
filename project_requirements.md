# Project Requirements / Report

(Please paste your report content here)
1.INTRODUCTION

In academic institutions, particularly at the university level, managing student internship records plays a critical role in maintaining academic standards, ensuring proper evaluation, and fulfilling institutional and accreditation requirements. However, traditional record-keeping methods—primarily manual and paper-based—have long been a major source of inefficiency. These practices often lead to data mismanagement, duplication of effort, difficulty in tracking student progress, and the absence of a centralized documentation system.
At K.R. Mangalam University, Gurgaon, these challenges have become increasingly evident as the number of students participating in internships continues to grow every semester. Faculty members and coordinators are required to invest substantial time and effort in collecting, organizing, verifying, and maintaining individual internship records. The manual handling of documents such as offer letters, internship reports, completion certificates, attendance sheets, and mentor details not only increases administrative workload but also introduces risks of human error, data loss, and miscommunication. Furthermore, retrieving specific records when required becomes a labor-intensive task, which delays academic evaluations, reporting, and institutional audits.
To overcome these challenges and enable digital transformation in academic administration, the Internship Management Portal – Internnova has been conceptualized and developed. Internnova is a dedicated web-based platform that provides a centralized, secure, and user-friendly interface for managing all student internship records efficiently. By eliminating dependence on physical paperwork and fragmented digital files, the portal significantly reduces administrative overhead and enhances operational productivity.
Internnova incorporates role-based authentication to ensure data security and confidentiality, granting system access only to authorized faculty members and administrators. It supports intelligent filtering, sorting, and structured storage of internship records based on parameters such as academic session, program, semester, organization, domain, and duration. The portal also enables secure document uploads and downloads, along with standardized report generation in formats such as PDF and Excel. These features ensure accuracy, transparency, and easy accessibility of institutional data.
By allowing faculty to focus more on academic mentoring rather than administrative tasks, Internnova strengthens the overall internship management ecosystem of the university. The project is a direct response to K.R. Mangalam University’s need for a modern, integrated solution that supports both academic and operational objectives. It aligns with the institution’s vision of leveraging technology for academic excellence and establishes a strong foundation for future digital enhancements in university administration.
________________________________________
2.PROBLEM STATEMENT

At K.R. Mangalam University, Gurgaon, the management of student internship documentation involves multiple stakeholders such as students, faculty members, the CDC department, and academic authorities. Currently, this process relies heavily on manual procedures, physical documents, and scattered Excel-based records to handle activities such as NOC requests, offer letter verification, attendance tracking, and report generation. As the number of students participating in internships, PPOs, and industry training increases each academic session, these traditional practices have become inefficient, time-consuming, and difficult to scale.
The existing system lacks a centralized digital platform to manage the complete internship lifecycle—from NOC submission and CDC verification to monthly attendance monitoring and institutional reporting. Manual handling of documents such as offer letters, NOC forms, and attendance sheets increases the risk of data inconsistency, document loss, and human error. Additionally, tracking internship status, approvals, and compliance across departments becomes challenging due to fragmented data storage and limited visibility.
Security and access control also remain major concerns in the current setup. Sensitive academic and professional data is often shared through emails or physical files without structured role-based permissions, increasing the risk of unauthorized access and data misuse. Furthermore, the absence of intelligent filtering, search, and automated reporting mechanisms results in delays in retrieving student records and preparing official reports for academic audits and decision-making.
To address these challenges, there is a critical need for a centralized, secure, and automated internship management system. The Internship Management Portal – Internnova is proposed as a comprehensive digital solution to streamline NOC processing, CDC verification, attendance tracking, and report generation. Internnova aims to improve data accuracy, enhance transparency, reduce administrative workload, and provide a user-friendly platform that supports efficient internship management and academic oversight.
3. OBJECTIVES
The primary objective of the Internship Management Portal – Internnova is to provide a centralized, efficient, and intelligent digital platform tailored to the academic and administrative needs of K.R. Mangalam University, Gurgaon. The system is designed to enhance the way faculty members and coordinators manage, access, and maintain student internship records, thereby reducing manual workload and improving accuracy, transparency, and operational efficiency.
One of the core goals of Internnova is to streamline the management of student internships by enabling the digital recording, organization, and monitoring of key details such as internship titles, organization information, industry mentors, internship duration, contact details, and assigned faculty supervisors. This facilitates structured tracking of student internships and improves coordination between the university and external organizations.
Another important objective is to provide faculty members with powerful tools to efficiently monitor and evaluate internship activities. Features such as domain classification, internship status tracking, intelligent filtering, and document verification ensure complete oversight of each student’s professional training journey.
To minimize administrative burdens, Internnova incorporates role-based access control that allows authorized users to securely view, filter, update, and manage records. This ensures that data handling remains fast, reliable, and protected, eliminating the inefficiencies associated with manual registers and scattered digital files.
A key objective of the portal is to establish a centralized digital repository for internship-related documents, including offer letters, reports, attendance records, and completion certificates. Faculty members can upload, download, review, and print these documents directly through the platform, promoting systematic, paperless, and audit-ready documentation practices.
Finally, Internnova emphasizes the secure handling of sensitive academic and professional data. Through strong user authentication, access control mechanisms, and planned AI-supported validation processes, the system ensures that only authorized personnel can access or modify records, thereby maintaining data confidentiality, integrity, and institutional trust.
 
4.Tools/Technologies Used

TECHNOLOGY STACK USED

The development of the Internship Management Portal – Internnova is based on a modern full-stack web architecture. A combination of powerful frontend and backend technologies has been employed to ensure performance, scalability, security, and a smooth user experience.

FRONTEND TECHNOLOGIES

1. Programming Language: TypeScript

TypeScript is used as the primary frontend programming language. It extends JavaScript by adding static typing, which helps in early error detection, improved code quality, and better maintainability. TypeScript ensures the development of a robust, scalable, and reliable user interface for Internnova.

2. Frontend Framework: React.js

React.js is an open-source JavaScript library used to build dynamic and interactive user interfaces. Its component-based architecture allows the application to be divided into reusable UI components such as dashboards, tables, filters, and forms. This improves development speed, scalability, and performance.

3. Styling Frameworks: Tailwind CSS & ShadCN UI

Tailwind CSS is used for designing responsive and modern layouts using utility-based styling. ShadCN UI provides accessible and customizable UI components such as modals, dropdowns, buttons, and tables, ensuring a professional and consistent design system.

BACKEND TECHNOLOGIES

4. Backend Runtime: Node.js

Node.js is used to build the server-side application of Internnova. Its non-blocking, event-driven architecture allows efficient handling of multiple client requests, such as authentication, document management, and data retrieval.

5. Backend Framework: Express.js

Express.js is used to develop RESTful APIs that connect the frontend with the backend. It manages routing, authentication, middleware, and server logic, ensuring smooth and secure data exchange.

6. Database System: PostgreSQL / MySQL

A relational database system is used to store structured internship records securely. The database maintains information such as student details, organization data, mentor information, documents, and reports, ensuring data integrity, consistency, and scalability.

7. API Architecture: RESTful APIs

REST APIs are used for communication between frontend, backend, and AI services. They support secure data transactions, real-time operations, and system integration.

8. AI & INTELLIGENT MODULES

Python-based AI services and machine learning tools are integrated to support:
•	Automated document classification
•	Intelligent record validation
•	Smart analytics and reporting
•	Predictive insights and anomaly detection
 
1.	METHODOLOGY

The Internship Management Portal – Internnova is proposed to be developed using a structured, process-oriented methodology after detailed analysis of the current internship handling system followed at SOET. The methodology focuses on converting the existing manual and semi-digital procedures into a centralized, secure, and intelligent web-based platform that manages the complete internship lifecycle.

1. Requirement Study and Process Analysis

The initial phase will involve a detailed study of the existing manual workflow currently followed by SOET for internship management. At present, students receive internship, PPO, or placement offers and then apply for NOC approval by submitting physical documents and Excel-based records. This involves multiple stakeholders such as students, CDC department, faculty members, and academic authorities.
The following aspects will be analyzed:
•	NOC request and approval procedure
•	CDC verification workflow
•	Maintenance of Excel sheets and physical files
•	Attendance monitoring formats
•	Reporting requirements
This study will form the basis for designing the digital workflow of Internnova.

2. Proposed Digital Workflow (Internnova Process Flow)





Internnova is proposed to digitize the entire internship process through the following structured flow:

Step 1: Student NOC Request Submission

Students will submit internship details through the portal by filling out digital forms and uploading required documents such as:
•	Offer letter
•	Company details
•	Student identification proof
•	Required institutional approvals
The system will automatically check document completeness before submission.

Step 2: CDC Verification
The submitted request will be routed to the CDC department. CDC officials will verify:

•	Authenticity of the offer letter
•	Student eligibility criteria
•	Internship/PPO terms and duration
•	Institutional compliance requirements
If documents are incomplete, the application will be rejected.
If discrepancies are found, it will be referred back to the concerned school or student for clarification.

Step 3: NOC Approval and Record Creation
Once verified, Internnova will digitally issue the NOC and generate a permanent internship record.
All approved records will be stored securely and shared digitally with COE, Deans, and faculty coordinators.
This stage establishes the official internship profile of the student in the system.

Step 4: Attendance and Internship Monitoring
Students will submit monthly attendance through the portal using a standardized digital format.
Faculty and administrators will be able to:
•	Monitor attendance trends
•	Track ongoing internship status
•	Identify irregularities or non-compliance

Step 5: Report Generation
Internnova will support automatic generation of reports for:
•	Internship records
•	Internship + PPO mapping
•	Attendance summaries
•	Institutional documentation
Reports will be exportable in PDF and Excel formats, reducing manual compilation work.

 3. Proposed System Modules
The system is proposed to be divided into the following functional modules:
•	Student Internship Registration Module
•	NOC Verification and Approval Module
•	CDC & Faculty Dashboard
•	Document Upload and Management Module
•	Attendance Monitoring Module
•	Report Generation and Export Module
•	AI-Assisted Validation and Analytics Module

•	Role-Based Access Control System
Each module will work in coordination to provide a seamless academic workflow.

4. Proposed Data Structure and Record Design
Based on the currently used Excel formats and manual records, Internnova will maintain structured digital records including:
•	Student information (Name, Roll No, Program, Semester, Contact)
•	Internship information (Organization, designation, duration, paid/unpaid, stipend)
•	PPO and placement indicators
•	Offer letter and NOC uploads
•	Monthly attendance records
•	Faculty mentor and reporting officer details
These datasets will guide the database schema and form designs of the portal.

 5. Security and Access Control
To protect sensitive academic data, Internnova will implement Role-Based Access Control (RBAC):
•	Students: Submit applications and attendance
•	Faculty: Verify records and monitor progress

•	CDC/Admin: Approve NOC, manage records, and generate reports
Authentication mechanisms will ensure confidentiality, integrity, and controlled system access.

 6. Automation and Intelligence Layer
Internnova is proposed to integrate AI-assisted features to:
•	Identify incomplete or inconsistent records
•	Classify uploaded documents
•	Analyze attendance trends
•	Support automated report summarization and analytics
These capabilities aim to enhance decision-making and reduce administrative workload.

 7. Development Life Cycle Strategy
The project will follow a structured SDLC approach consisting of:
•	Requirement analysis
•	System design and architecture
•	Module-wise implementation
•	Testing and validation
•	Secure deployment
•	Continuous improvement and maintenance
 
