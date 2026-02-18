import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../layout/Sidebar';
import Navbar from '../../layout/Navbar';

const StudentDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar role="student" />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                            <Link to="/student/noc-request" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200">
                                + Request NOC
                            </Link>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 bg-indigo-50 rounded-md p-3">
                                            <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">Applied Internships</dt>
                                                <dd>
                                                    <div className="text-lg font-medium text-gray-900">12</div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 bg-green-50 rounded-md p-3">
                                            <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">Interviews Scheduled</dt>
                                                <dd>
                                                    <div className="text-lg font-medium text-gray-900">3</div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 bg-yellow-50 rounded-md p-3">
                                            <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                            </svg>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">New Notifications</dt>
                                                <dd>
                                                    <div className="text-lg font-medium text-gray-900">5</div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Applications Table */}
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Applications</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Details of your most recent internship applications.</p>
                            </div>
                            <div className="border-t border-gray-200">
                                <ul className="divide-y divide-gray-200">
                                    {[
                                        { company: 'TechCorp', role: 'Frontend Developer Intern', status: 'Applied', date: 'Oct 24, 2023' },
                                        { company: 'InnovateInc', role: 'UX/UI Designer Intern', status: 'Interview', date: 'Oct 22, 2023' },
                                        { company: 'DataSystems', role: 'Backend Developer Intern', status: 'Rejected', date: 'Oct 20, 2023' },
                                    ].map((app, index) => (
                                        <li key={index}>
                                            <div className="px-4 py-4 sm:px-6">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-primary truncate">{app.role}</p>
                                                    <div className="ml-2 flex-shrink-0 flex">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${app.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                                                                app.status === 'Interview' ? 'bg-green-100 text-green-800' :
                                                                    'bg-red-100 text-red-800'}`}>
                                                            {app.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mt-2 sm:flex sm:justify-between">
                                                    <div className="sm:flex">
                                                        <p className="flex items-center text-sm text-gray-500">
                                                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                            {app.company}
                                                        </p>
                                                    </div>
                                                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <p>Applied on {app.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StudentDashboard;
