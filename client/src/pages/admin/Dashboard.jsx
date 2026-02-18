import React, { useState } from 'react';
import Sidebar from '../../layout/Sidebar';
import Navbar from '../../layout/Navbar';

const AdminDashboard = () => {
    // Mock Data for Pending NOCs
    const [pendingNOCs, setPendingNOCs] = useState([
        { id: 1, studentName: 'Rahul Sharma', enrollment: '00123402720', program: 'B.Tech CSE', company: 'Google', status: 'Pending', date: '2025-05-10' },
        { id: 2, studentName: 'Priya Verma', enrollment: '00312302720', program: 'B.Tech ECE', company: 'Microsoft', status: 'Pending', date: '2025-05-11' },
        { id: 3, studentName: 'Amit Singh', enrollment: '00545602720', program: 'BCA', company: 'TCS', status: 'Pending', date: '2025-05-12' },
    ]);

    const handleApprove = (id) => {
        setPendingNOCs(pendingNOCs.filter(noc => noc.id !== id));
        alert(`NOC for Student ID ${id} Approved!`);
    };

    const handleReject = (id) => {
        setPendingNOCs(pendingNOCs.filter(noc => noc.id !== id));
        alert(`NOC for Student ID ${id} Rejected.`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar role="admin" />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Career Development Centre (CDC)</h1>
                            <p className="text-sm text-gray-500 mt-1">School of Engineering & Technology (SOET) - Admin Portal</p>
                        </div>

                        {/* System Stats - Branch Wise */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                            <div className="bg-white overflow-hidden shadow rounded-lg border-t-4 border-indigo-500">
                                <div className="p-5">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Pending NOCs</dt>
                                        <dd className="mt-1 text-3xl font-semibold text-primary">{pendingNOCs.length}</dd>
                                        <dd className="mt-1 text-sm text-red-500">Across all branches</dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg border-t-4 border-blue-500">
                                <div className="p-5">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">CSE Placements</dt>
                                        <dd className="mt-1 text-3xl font-semibold text-gray-900">85</dd>
                                        <dd className="mt-1 text-sm text-green-600">Top Recruiters: Google, MS</dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg border-t-4 border-orange-500">
                                <div className="p-5">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">ECE Placements</dt>
                                        <dd className="mt-1 text-3xl font-semibold text-gray-900">42</dd>
                                        <dd className="mt-1 text-sm text-gray-500">Core companies: 15</dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg border-t-4 border-purple-500">
                                <div className="p-5">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Internship + PPO</dt>
                                        <dd className="mt-1 text-3xl font-semibold text-purple-600">18</dd>
                                        <dd className="mt-1 text-sm text-gray-500">Conversion Rate: 12%</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        {/* NOC Verification Table */}
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Pending NOC Requests</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Verify offer letters and approve student internships.</p>
                            </div>
                            <div className="border-t border-gray-200">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Details</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offer Letter</th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {pendingNOCs.map((noc) => (
                                                <tr key={noc.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">{noc.studentName}</div>
                                                                <div className="text-sm text-gray-500">{noc.program} | {noc.enrollment}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{noc.company}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{noc.date}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <a href="#" className="text-primary hover:text-indigo-900">View PDF</a>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                        <button
                                                            onClick={() => handleApprove(noc.id)}
                                                            className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded-full border border-green-200"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(noc.id)}
                                                            className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-full border border-red-200"
                                                        >
                                                            Reject
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {pendingNOCs.length === 0 && (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                                        No pending NOC requests.
                                                    </td>
                                                </tr>
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

export default AdminDashboard;
