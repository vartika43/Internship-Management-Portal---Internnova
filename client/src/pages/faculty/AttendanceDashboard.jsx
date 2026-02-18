import React from 'react';
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';

const AttendanceDashboard = () => {
    // Mock Data for Attendance
    const attendanceLogs = [
        { id: 1, student: 'Rahul Sharma', enrollment: '00123402720', month: 'April 2025', status: 'Submitted', attendance: '85%' },
        { id: 2, student: 'Priya Verma', enrollment: '00312302720', month: 'April 2025', status: 'Pending Review', attendance: '92%' },
        { id: 3, student: 'Amit Singh', enrollment: '00545602720', month: 'April 2025', status: 'Approved', attendance: '78%' },
    ];

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
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Student Details
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Month
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Attendance %
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {attendanceLogs.map((log) => (
                                        <tr key={log.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{log.student}</div>
                                                        <div className="text-sm text-gray-500">{log.enrollment}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{log.month}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${parseInt(log.attendance) >= 75 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {log.attendance}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {log.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-primary hover:text-indigo-900 mr-4">View Log</button>
                                                <button className="text-green-600 hover:text-green-900">Approve</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AttendanceDashboard;
