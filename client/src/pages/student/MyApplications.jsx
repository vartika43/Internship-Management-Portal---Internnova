import React, { useState, useEffect } from 'react';
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';
import { applicationAPI, nocAPI } from '../../api/api';

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [nocRequests, setNocRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const [appRes, nocRes] = await Promise.all([
                    applicationAPI.getMyApplications(),
                    nocAPI.getMyRequests(),
                ]);
                setApplications(appRes.data || []);
                setNocRequests(nocRes.data || []);
            } catch {
                setApplications([]);
                setNocRequests([]);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const getStatusColor = (status) => {
        if (status === 'approved' || status === 'Approved' || status === 'accepted') return 'bg-green-100 text-green-800';
        if (status === 'rejected' || status === 'Rejected') return 'bg-red-100 text-red-800';
        return 'bg-yellow-100 text-yellow-800';
    };

    const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '-');

    const allItems = [
        ...applications.map((a) => ({
            id: a._id,
            type: 'Internship Application',
            company: a.internshipId?.companyName || 'N/A',
            role: a.internshipId?.title || 'N/A',
            appliedDate: a.createdAt,
            status: a.status,
            remarks: a.status === 'applied' ? 'Under review' : a.status === 'accepted' ? 'Application accepted' : a.status === 'rejected' ? 'Application rejected' : '',
        })),
        ...nocRequests.map((r) => ({
            id: r._id,
            type: 'NOC Request',
            company: r.companyName,
            role: 'NOC Verification',
            appliedDate: r.createdAt,
            status: r.approvalStatus,
            remarks: r.approvalStatus === 'pending' ? 'Under verification by CDC' : r.approvalStatus === 'approved' ? 'NOC Issued' : r.remarks || 'Rejected',
        })),
    ].sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));

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
