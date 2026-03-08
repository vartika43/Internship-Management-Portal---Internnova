import React, { useState, useEffect } from 'react';
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';
import { nocAPI } from '../../api/api';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ApproveInternships = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            const res = await nocAPI.getPending();
            setRequests(res.data || []);
        } catch {
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleApprove = async (id) => {
        try {
            await nocAPI.approve(id);
            fetchRequests();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to approve');
        }
    };

    const handleReject = async (id) => {
        const remarks = window.prompt('Rejection reason (optional):');
        if (remarks === null) return;
        try {
            await nocAPI.reject(id, remarks);
            fetchRequests();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to reject');
        }
    };

    const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '-');

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar role="admin" />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Approve Internship Requests</h1>

                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Pending NOC Requests</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Verify offer letters and approve student internship requests.</p>
                            </div>
                            <div className="border-t border-gray-200">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Offer Letter</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {loading ? (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                                                </tr>
                                            ) : requests.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No pending requests.</td>
                                                </tr>
                                            ) : (
                                                requests.map((r) => (
                                                    <tr key={r._id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {r.studentId?.name || 'N/A'}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {r.studentId?.email || ''} {r.studentId?.department ? `| ${r.studentId.department}` : ''}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.companyName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(r.createdAt)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            {r.offerLetterUrl ? (
                                                                <a
                                                                    href={`${API_BASE.replace('/api', '')}${r.offerLetterUrl}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-primary hover:text-indigo-900"
                                                                >
                                                                    View PDF
                                                                </a>
                                                            ) : (
                                                                <span className="text-gray-400">No file</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                            <button
                                                                onClick={() => handleApprove(r._id)}
                                                                className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded-full border border-green-200"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(r._id)}
                                                                className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-full border border-red-200"
                                                            >
                                                                Reject
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ApproveInternships;
