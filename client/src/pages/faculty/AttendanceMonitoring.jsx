import React, { useState, useEffect } from 'react';
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';
import { attendanceAPI } from '../../api/api';

const AttendanceMonitoring = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showLogModal, setShowLogModal] = useState(false);
    const [attendanceLogs, setAttendanceLogs] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await attendanceAPI.getStudents();
            setStudents(res.data || []);
        } catch (err) {
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchAttendanceLogs = async (studentId) => {
        try {
            const res = await attendanceAPI.getLogsByStudent(studentId);
            setAttendanceLogs(res.data || []);
        } catch (err) {
            setAttendanceLogs([]);
        }
    };

    const handleViewLog = (student) => {
        setSelectedStudent(student);
        setShowLogModal(true);
        fetchAttendanceLogs(student._id);
    };

    const handleApprove = async (logId) => {
        try {
            await attendanceAPI.approve(logId);
            alert('Attendance approved successfully');
            fetchAttendanceLogs(selectedStudent._id);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to approve');
        }
    };

    const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '-');

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex flex-1">
                    <Sidebar role="faculty" />
                    <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                        <div className="text-center py-12 text-gray-500">Loading...</div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar role="faculty" />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Attendance Monitoring</h1>

                        {students.length === 0 ? (
                            <div className="bg-white shadow rounded-lg p-8 text-center text-gray-500">
                                No students currently doing internships.
                            </div>
                        ) : (
                            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Students with Active Internships</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Monitor and approve student attendance.</p>
                                </div>
                                <div className="border-t border-gray-200">
                                    <ul className="divide-y divide-gray-200">
                                        {students.map((student) => (
                                            <li key={student._id}>
                                                <div className="px-4 py-4 sm:px-6">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-sm font-medium text-primary truncate">
                                                                {student.name}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                {student.department} • {student.year}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                Internship: {student.internship?.title || 'N/A'}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                onClick={() => handleViewLog(student)}
                                                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                                            >
                                                                View Log
                                                            </button>
                                                            <button
                                                                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                                                            >
                                                                Approve
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {showLogModal && selectedStudent && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Attendance Log - {selectedStudent.name}
                                </h3>
                                <button
                                    onClick={() => setShowLogModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {attendanceLogs.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    No attendance logs found for this student.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {attendanceLogs.map((log) => (
                                        <div key={log._id} className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {formatDate(log.date)}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Hours: {log.hours || 'N/A'}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Status: {log.status || 'Pending'}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    {log.status === 'pending' && (
                                                        <button
                                                            onClick={() => handleApprove(log._id)}
                                                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                                                        >
                                                            Approve
                                                        </button>
                                                    )}
                                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                                        log.status === 'approved' 
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {log.status || 'Pending'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttendanceMonitoring;
