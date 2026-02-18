import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role = 'student' }) => {
    const menus = {
        student: [
            { replace: false, label: "Overview", path: "/student/dashboard", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
            { replace: false, label: "Request NOC", path: "/student/noc-request", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> },
            { replace: false, label: "My Applications", path: "/student/applications", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /> },
            { replace: false, label: "Profile", path: "/student/profile", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> },
        ],
        faculty: [
            { replace: false, label: "Overview", path: "/faculty/dashboard", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> },
            { replace: false, label: "Attendance", path: "/faculty/attendance", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
            { replace: false, label: "Reports", path: "/faculty/reports", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> },
        ],
        admin: [
            { replace: false, label: "Overview", path: "/admin/dashboard", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /> },
            { replace: false, label: "User Management", path: "/admin/users", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /> },
            { replace: false, label: "Approve Internships", path: "/admin/internships", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> },
        ]
    };

    const currentMenu = menus[role] || menus.student;

    return (
        <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
            <div className="flex items-center justify-center h-16 border-b border-gray-200">
                <span className="text-xl font-bold text-primary capitalize">{role} Dashboard</span>
            </div>
            <div className="flex-1 overflow-y-auto">
                <nav className="flex-1 px-2 py-4 space-y-2">
                    {currentMenu.map((item, index) => (
                        <Link key={index} to={item.path} className="flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-primary rounded-lg transition-colors duration-200">
                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {item.icon}
                            </svg>
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
