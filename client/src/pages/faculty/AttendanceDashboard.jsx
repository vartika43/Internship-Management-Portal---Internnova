import React, { useState, useEffect } from 'react';
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';
import { attendanceAPI } from '../../api/api';

const AttendanceDashboard = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewLogStudentId, setViewLogStudentId] = useState(null);
    const [studentLogs, setStudentLogs] = useState([]);

    const fetchLogs = async () => {
        try {
            const res = await attendanceAPI.getAllLogs();
            setLogs(res.data || []);
        } catch {
            setLogs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleViewLog = async (studentId) => {
        try {
            const res = await attendanceAPI.getLogsByStudent(studentId);
            setStudentLogs(res.data || []);
            setViewLogStudentId(studentId);
        } catch {
            setStudentLogs([]);
        }
    };

    const handleApprove = async (logId) => {
        try {
            await attendanceAPI.approve(logId);
            fetchLogs();
            if (viewLogStudentId) {
                const res = await attendanceAPI.getLogsByStudent(viewLogStudentId);
                setStudentLogs(res.data || []);
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to approve');
        }
    };

    const pct = (log) => (log.totalDays ? Math.round((log.daysPresent / log.totalDays) * 100) : 0);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar role="faculty" />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Attendance Monitoring</h1>

                        <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Internship</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance %</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                                        </tr>
                                    ) : logs.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No attendance logs yet.</td>
                                        </tr>
                                    ) : (
                                        logs.map((log) => {
                                            const attendance = pct(log);
                                            return (
                                                <tr key={log._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{log.studentId?.name || 'N/A'}</div>
                                                        <div className="text-sm text-gray-500">{log.studentId?.email || ''}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.internshipId?.title || '-'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.month}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${attendance >= 75 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                            {attendance}%
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            log.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                            log.status === 'pending_review' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-blue-100 text-blue-800'
                                                        }`}>
                                                            {log.status?.replace('_', ' ') || 'submitted'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                        <button onClick={() => handleViewLog(log.studentId?._id || log.studentId)} className="text-primary hover:text-indigo-900">
                                                            View Log
                                                        </button>
                                                        {log.status !== 'approved' && (
                                                            <button onClick={() => handleApprove(log._id)} className="text-green-600 hover:text-green-900">
                                                                Approve
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            {viewLogStudentId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setViewLogStudentId(null)}>
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance History</h3>
                            {studentLogs.length === 0 ? (
                                <p className="text-gray-500">No logs for this student.</p>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {studentLogs.map((l) => (
                                        <li key={l._id} className="py-3 flex justify-between items-center">
                                            <span className="text-sm text-gray-900">{l.month} - {l.internshipId?.title}</span>
                                            <span className="text-sm">{pct(l)}% ({l.daysPresent}/{l.totalDays})</span>
                                            <span className={`px-2 text-xs font-semibold rounded-full ${l.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {l.status}
                                            </span>
                                            {l.status !== 'approved' && (
                                                <button onClick={() => handleApprove(l._id)} className="text-green-600 text-sm hover:text-green-900">Approve</button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <button onClick={() => setViewLogStudentId(null)} className="mt-4 px-4 py-2 border border-gray-300 rounded-md text-sm">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttendanceDashboard;
