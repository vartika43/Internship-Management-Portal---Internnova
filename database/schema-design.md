# Database Schema Design

## users
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  role: String
}

## students
{
  _id: ObjectId,
  userId: ObjectId,
  rollNo: String,
  program: String,
  semester: Number,
  contactNumber: String
}

## internships
{
  _id: ObjectId,
  studentId: ObjectId,
  companyName: String,
  duration: String,
  status: String,
  startDate: Date,
  endDate: Date
}

## attendance
{
  _id: ObjectId,
  internshipId: ObjectId,
  month: String,
  totalDays: Number,
  daysPresent: Number,
  remarks: String
}

## nocRequests
{
  _id: ObjectId,
  internshipId: ObjectId,
  requestDate: Date,
  approvalStatus: String,
  approvedBy: String,
  approvalDate: Date
}

## documents
{
  _id: ObjectId,
  internshipId: ObjectId,
  documentType: String,
  fileUrl: String,
  uploadedAt: Date
}
