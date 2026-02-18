import React from 'react';
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';

const MyApplications = () => {
    // Mock Data for Applications
    const applications = [
        {
            id: 1,
            type: 'NOC Request',
            company: 'Google India',
            role: 'Software Engineer Intern',
            appliedDate: '2025-05-10',
            status: 'Pending',
            remarks: 'Under verification by CDC'
        },
        {
            id: 2,
            type: 'NOC Request',
            company: 'Microsoft',
            role: 'Research Intern',
            appliedDate: '2025-04-15',
            status: 'Approved',
            remarks: 'NOC Issued. Download from documents.'
        },
        {
            id: 3,
            type: 'Internship Application',
            company: 'TCS',
            role: 'System Engineer',
            appliedDate: '2025-02-20',
            status: 'Rejected',
            remarks: 'Profile did not match requirements.'
        }
    ];

    const getStatusColor = (status) => {
        if (status === 'Approved') return 'bg-green-100 text-green-800';
        if (status === 'Rejected') return 'bg-red-100 text-red-800';
        return 'bg-yellow-100 text-yellow-800';
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar role="student" />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Applications</h1>

                        <div className="bg-white shadow overflow-hidden sm:rounded-md">
                            <ul className="divide-y divide-gray-200">
                                {applications.map((app) => (
                                    <li key={app.id}>
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-primary truncate">
                                                        {app.company} - {app.role}
                                                    </p>
                                                    <div className="mt-2 flex">
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            Applied on {app.appliedDate}
                                                        </div>
                                                        <div className="ml-6 flex items-center text-sm text-gray-500">
                                                            <span className="truncate">{app.type}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-shrink-0 flex flex-col items-end space-y-2">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(app.status)}`}>
                                                        {app.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-sm text-gray-500">
                                                <span className="font-medium">Remarks:</span> {app.remarks}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MyApplications;
