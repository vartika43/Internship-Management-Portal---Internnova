import React, { useState, useEffect } from 'react';
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';
import api from '../../api/api';

const Reports = () => {
    const [filterType, setFilterType] = useState('all');
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await api.get('/reports/internship-analytics');
                setAnalytics(res.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load internship analytics');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    const placementRate = analytics ? Math.round(analytics.placementRate || 0) : 0;
    const totalRecords = analytics?.totalRecords || 0;
    const placements = analytics?.placements || 0;
    const internships = analytics?.internships || 0;
    const internshipPPO = analytics?.internshipPPO || 0;
    const lastUpdated = analytics ? new Date().toLocaleString() : '—';

    const stats = [
        { label: 'Total Records', value: String(totalRecords), icon: '📄', color: 'bg-blue-50 text-blue-600' },
        { label: 'Placements', value: String(placements + internshipPPO), icon: '🎓', color: 'bg-green-50 text-green-600' },
        { label: 'Placement Rate', value: `${placementRate}%`, icon: '📊', color: 'bg-purple-50 text-purple-600' },
        { label: 'Last Updated', value: lastUpdated, icon: '🕐', color: 'bg-orange-50 text-orange-600' },
    ];

    const reportCategories = analytics
        ? [
            {
                id: 1,
                title: 'Placement Statistics',
                type: 'Analytics',
                date: `Updated: ${lastUpdated}`,
                chartType: 'pie',
                data: [placements, internships, internshipPPO],
                labels: ['Placement', 'Internship', 'Internship + PPO'],
                icon: '📈',
                color: 'from-green-500 to-green-600',
            },
            {
                id: 2,
                title: 'Internship to PPO Conversion',
                type: 'Analytics',
                date: `Updated: ${lastUpdated}`,
                chartType: 'pie',
                data: [internshipPPO, Math.max(placements + internships, 0)],
                labels: ['Internship + PPO', 'Other (Placement/Internship)'],
                icon: '🎯',
                color: 'from-pink-500 to-pink-600',
            },
        ]
        : [];

    const getTypeColor = (type) => {
        const colors = {
            'Excel': 'bg-green-100 text-green-800',
            'PDF': 'bg-red-100 text-red-800',
            'CSV': 'bg-blue-100 text-blue-800'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    const filteredReports = filterType === 'all'
        ? reportCategories
        : reportCategories.filter(r => r.type === filterType);

    const renderChart = (report) => {
        if (report.chartType === 'pie') {
            const values = report.data.map((v) => Number(v) || 0);
            const total = values.reduce((a, b) => a + b, 0);
            const pct = total === 0 ? values.map(() => 0) : values.map((v) => Math.round((v / total) * 100));
            const firstPct = pct[0] || 0;
            return (
                <div className="flex flex-col items-center justify-center py-4 transition-all duration-500 ease-in-out">
                    <svg width="150" height="150" viewBox="0 0 32 32" className="transform -rotate-90 rounded-full shadow-lg">
                        <circle r="16" cx="16" cy="16" fill="#EEE" />
                        <circle r="16" cx="16" cy="16" fill="transparent" stroke="#4F46E5" strokeWidth="32" strokeDasharray={`${firstPct} 100`} />
                    </svg>
                    <div className="mt-4 grid grid-cols-1 gap-2 text-sm w-full">
                        {report.labels.map((label, idx) => (
                            <div key={label} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className={`w-3 h-3 ${idx === 0 ? 'bg-indigo-600' : idx === 1 ? 'bg-gray-400' : 'bg-emerald-500'} rounded-full mr-2`}></span>
                                    <span className="text-gray-700">{label}</span>
                                </div>
                                <span className="font-semibold text-gray-900">{values[idx]} ({pct[idx]}%)</span>
                            </div>
                        ))}
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar role="faculty" />
                <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {/* Header Section */}
                        <div className="mb-10">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
                            <p className="text-lg text-gray-600">Track and analyze internship data, placements, and student performance</p>
                        </div>

                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                            {loading ? (
                                <div className="col-span-4 flex items-center justify-center">
                                    <div className="text-gray-500">Loading analytics...</div>
                                </div>
                            ) : error ? (
                                <div className="col-span-4 flex items-center justify-center">
                                    <div className="px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm">
                                        {error}
                                    </div>
                                </div>
                            ) : (
                                stats.map((stat, idx) => (
                                    <div key={idx} className={`${stat.color} rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                            </div>
                                            <span className="text-4xl">{stat.icon}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Filter Section */}
                        <div className="mb-8 flex flex-wrap gap-3">
                            <button
                                onClick={() => setFilterType('all')}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                    filterType === 'all'
                                        ? 'bg-indigo-600 text-white shadow-lg'
                                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-indigo-600'
                                }`}
                            >
                                All Reports
                            </button>
                            <button
                                onClick={() => setFilterType('PDF')}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                    filterType === 'PDF'
                                        ? 'bg-red-500 text-white shadow-lg'
                                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-red-500'
                                }`}
                            >
                                PDF Reports
                            </button>
                            <button
                                onClick={() => setFilterType('Excel')}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                    filterType === 'Excel'
                                        ? 'bg-green-500 text-white shadow-lg'
                                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-green-500'
                                }`}
                            >
                                Excel Files
                            </button>
                            <button
                                onClick={() => setFilterType('CSV')}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                    filterType === 'CSV'
                                        ? 'bg-blue-500 text-white shadow-lg'
                                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-500'
                                }`}
                            >
                                CSV Files
                            </button>
                        </div>

                        {/* Reports Grid */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {loading && !error && (
                                <div className="col-span-3 text-center text-gray-500">Loading charts...</div>
                            )}
                            {!loading && error && (
                                <div className="col-span-3 text-center text-red-600">Unable to load charts.</div>
                            )}
                            {!loading && !error && filteredReports.map((report) => (
                                <div
                                    key={report.id}
                                    className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-2 flex flex-col"
                                >
                                    {/* Card Header with Gradient */}
                                    <div className={`bg-gradient-to-r ${report.color} p-6 text-white relative overflow-hidden`}>
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
                                        <div className="flex items-start justify-between relative z-10">
                                            <div>
                                                <p className="text-3xl mb-2">{report.icon}</p>
                                                <h3 className="text-lg font-bold leading-tight">{report.title}</h3>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6 flex-1">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(report.type)}`}>
                                                {report.type}
                                            </span>
                                            <span className="text-xs text-gray-500 font-medium">{report.date}</span>
                                        </div>

                                        {/* Chart Section */}
                                        <div className="mt-4 border-t border-gray-100 pt-4">
                                            {renderChart(report)}
                                        </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                                        <div className="text-sm font-semibold text-indigo-700 flex items-center gap-2">
                                            <span>📈</span>
                                            <span>Live Analytics</span>
                                        </div>
                                        <button className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1">
                                            <span>⬇️</span>
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

<<<<<<< HEAD
export default Reports;
=======

export default Reports;
>>>>>>> a98a36b35ff0b99c15b82464e1347e504a7a0010
