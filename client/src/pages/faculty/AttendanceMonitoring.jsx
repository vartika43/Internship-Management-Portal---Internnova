import React, { useState, useEffect } from 'react';
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';
import { attendanceAPI } from '../../api/api';

const AttendanceMonitoring = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAttendance = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await attendanceAPI.getInternshipAttendance();
                setRows(res.data || []);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load internship attendance');
                setRows([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar role="faculty" />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Attendance Monitoring</h1>

                        {loading ? (
                            <div className="bg-white shadow rounded-lg p-8 text-center text-gray-500">
                                Loading internship attendance...
                            </div>
                        ) : error ? (
                            <div className="bg-white shadow rounded-lg p-8 text-center text-red-600">
                                {error}
                            </div>
                        ) : rows.length === 0 ? (
                            <div className="bg-white shadow rounded-lg p-8 text-center text-gray-500">
                                No attendance records found.
                            </div>
                        ) : (
                            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Internship Attendance Records</h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                            Showing {rows.length} records from internshipRecords.
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Student
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Roll No.
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Internship
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Program / Semester
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Month
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Attendance Flag
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {rows.map((row, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                                        {row.studentName || '-'}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                                        {row.rollNumber || '-'}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                                        {row.internship || '-'}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                                        {row.program || '-'}{row.semester ? ` • Sem ${row.semester}` : ''}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                                        {row.month}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                                        {row.attendance ?? '-'}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap">
                                                        <span
                                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                row.status === 'Present'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-yellow-100 text-yellow-800'
                                                            }`}
                                                        >
                                                            {row.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                                                        <button className="text-indigo-600 hover:text-indigo-900 text-xs font-medium">
                                                            View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AttendanceMonitoring;
<<<<<<< HEAD
=======






>>>>>>> a98a36b35ff0b99c15b82464e1347e504a7a0010
