import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentDashboard from './pages/student/Dashboard';
import NOCRequest from './pages/student/NOCRequest';
import MyApplications from './pages/student/MyApplications';
import FacultyDashboard from './pages/faculty/Dashboard';
import AttendanceDashboard from './pages/faculty/AttendanceDashboard';
import Reports from './pages/faculty/Reports';
import AdminDashboard from './pages/admin/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/noc-request" element={<NOCRequest />} />
        <Route path="/student/applications" element={<MyApplications />} />
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/faculty/attendance" element={<AttendanceDashboard />} />
        <Route path="/faculty/reports" element={<Reports />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* Placeholder for other routes */}
        <Route path="*" element={<div className="p-10 text-center">404 - Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
