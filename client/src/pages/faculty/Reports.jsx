import React, { useState } from 'react';
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';

const Reports = () => {
    const [selectedReport, setSelectedReport] = useState(null);

    const reportCategories = [
        { id: 1, title: 'Internship Records (Batch 2025)', type: 'Excel', date: 'Generated: Today', chartType: 'pie', data: [70, 30], labels: ['Placed', 'Seeking'] },
        { id: 2, title: 'Placement Statistics', type: 'PDF', date: 'Generated: Yesterday', chartType: 'bar', data: [45, 80, 20], labels: ['CSE', 'ECE', 'Mech'] },
        { id: 3, title: 'Monthly Attendance Summary', type: 'PDF', date: 'Generated: 2 days ago', chartType: 'pie', data: [85, 15], labels: ['Present', 'Absent'] },
        { id: 4, title: 'Pending NOC Requests', type: 'CSV', date: 'Generated: Today', chartType: 'bar', data: [12, 5, 8], labels: ['CSE', 'ECE', 'BCA'] },
        { id: 5, title: 'Internship to PPO Conversion', type: 'PDF', date: 'Generated: Today', chartType: 'pie', data: [40, 60], labels: ['Converted', 'Intern Only'] },
    ];

    const renderChart = (report) => {
        if (report.chartType === 'pie') {
            const [v1, v2] = report.data;
            const dashArray = `${v1} ${100 - v1}`;
            return (
                <div className="flex flex-col items-center justify-center py-4 transition-all duration-500 ease-in-out">
                    <svg width="150" height="150" viewBox="0 0 32 32" className="transform -rotate-90 rounded-full shadow-lg">
                        <circle r="16" cx="16" cy="16" fill="#EEE" />
                        <circle r="16" cx="16" cy="16" fill="transparent" stroke="#4F46E5" strokeWidth="32" strokeDasharray={`${v1} 100`} />
                    </svg>
                    <div className="mt-4 flex space-x-4 text-sm">
                        <div className="flex items-center"><span className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></span>{report.labels[0]}: {v1}%</div>
                        <div className="flex items-center"><span className="w-3 h-3 bg-gray-200 rounded-full mr-2"></span>{report.labels[1]}: {v2}%</div>
                    </div>
                </div>
            );
        } else if (report.chartType === 'bar') {
            const maxVal = Math.max(...report.data);
            return (
                <div className="flex flex-col items-center justify-center py-4 w-full h-48 transition-all duration-500 ease-in-out">
                    <div className="flex items-end space-x-4 h-32 w-full justify-center">
                        {report.data.map((val, idx) => (
                            <div key={idx} className="flex flex-col items-center group">
                                <div
                                    className="w-12 bg-indigo-500 rounded-t-md shadow-md hover:bg-indigo-600 transition-all duration-300 relative"
                                    style={{ height: `${(val / maxVal) * 100}%` }}
                                >
                                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">{val}</span>
                                </div>
                                <span className="mt-2 text-xs font-medium text-gray-600">{report.labels[idx]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar role="faculty" />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports & Analytics</h1>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {reportCategories.map((report) => (
                                <div key={report.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-all duration-300 flex flex-col">
                                    <div className="p-5 flex-1">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <svg className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div className="ml-5 w-0 flex-1">
                                                    <dl>
                                                        <dt className="text-sm font-medium text-gray-900 truncate">
                                                            {report.title}
                                                        </dt>
                                                        <dd>
                                                            <div className="text-xs text-gray-500 mt-1">
                                                                {report.type} • {report.date}
                                                            </div>
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Chart Section */}
                                        {selectedReport === report.id && (
                                            <div className="mt-4 border-t border-gray-100 pt-4 animate-fadeIn">
                                                {renderChart(report)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center">
                                        <button
                                            onClick={() => setSelectedReport(selectedReport === report.id ? null : report.id)}
                                            className="text-sm font-medium text-indigo-600 hover:text-indigo-900 focus:outline-none"
                                        >
                                            {selectedReport === report.id ? 'Hide Visuals' : 'View Visuals'}
                                        </button>
                                        <button className="text-sm font-medium text-gray-500 hover:text-gray-900">
                                            Download
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Reports;
