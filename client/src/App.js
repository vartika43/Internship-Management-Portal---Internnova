import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentDashboard from './pages/student/Dashboard';
import Internships from './pages/student/Internships';
import Profile from './pages/student/Profile';
import NOCRequest from './pages/student/NOCRequest';
import MyApplications from './pages/student/MyApplications';
import FacultyDashboard from './pages/faculty/Dashboard';
import AttendanceDashboard from './pages/faculty/AttendanceDashboard';
import AttendanceMonitoring from './pages/faculty/AttendanceMonitoring';
import Reports from './pages/faculty/Reports';
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import ApproveInternships from './pages/admin/ApproveInternships';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/internships" element={<ProtectedRoute allowedRoles={['student']}><Internships /></ProtectedRoute>} />
          <Route path="/student/profile" element={<ProtectedRoute allowedRoles={['student']}><Profile /></ProtectedRoute>} />
          <Route path="/student/noc-request" element={<ProtectedRoute allowedRoles={['student']}><NOCRequest /></ProtectedRoute>} />
          <Route path="/student/applications" element={<ProtectedRoute allowedRoles={['student']}><MyApplications /></ProtectedRoute>} />
          <Route path="/faculty/dashboard" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyDashboard /></ProtectedRoute>} />
          <Route path="/faculty/attendance" element={<ProtectedRoute allowedRoles={['faculty']}><AttendanceDashboard /></ProtectedRoute>} />
          <Route path="/faculty/attendance-monitoring" element={<ProtectedRoute allowedRoles={['faculty']}><AttendanceMonitoring /></ProtectedRoute>} />
          <Route path="/faculty/reports" element={<ProtectedRoute allowedRoles={['faculty']}><Reports /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute>} />
          <Route path="/admin/internships" element={<ProtectedRoute allowedRoles={['admin']}><ApproveInternships /></ProtectedRoute>} />
          <Route path="*" element={<div className="p-10 text-center">404 - Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
