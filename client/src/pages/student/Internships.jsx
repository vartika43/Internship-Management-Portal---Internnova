import React, { useState, useEffect } from 'react';
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';
import { internshipAPI, applicationAPI } from '../../api/api';

const Internships = () => {
    const [internships, setInternships] = useState([]);
    const [appliedIds, setAppliedIds] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await internshipAPI.getAll();
                setInternships(res.data);
            } catch (err) {
                setInternships([]);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    useEffect(() => {
        const fetchApplied = async () => {
            try {
                const res = await applicationAPI.getMyApplications();
                const ids = new Set((res.data || []).map((a) => a.internshipId?._id || a.internshipId));
                setAppliedIds(ids);
            } catch {
                // Not logged in or no applications
            }
        };
        fetchApplied();
    }, []);

    const handleApply = async (id) => {
        setApplying(id);
        try {
            await applicationAPI.apply(id);
            setAppliedIds((prev) => new Set([...prev, id]));
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to apply');
        } finally {
            setApplying(null);
        }
    };

    const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '-');

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar role="student" />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Available Internships</h1>

                        {loading ? (
                            <div className="text-center py-12 text-gray-500">Loading...</div>
                        ) : internships.length === 0 ? (
                            <div className="bg-white shadow rounded-lg p-8 text-center text-gray-500">
                                No internships available at the moment.
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {internships.map((job) => (
                                    <div key={job._id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="p-5">
                                            <h3 className="text-lg font-medium text-primary">{job.title}</h3>
                                            <p className="text-sm text-gray-600 mt-1">{job.companyName}</p>
                                            <p className="text-sm text-gray-500 mt-2 line-clamp-3">{job.description}</p>
                                            <div className="mt-3 flex flex-wrap gap-1">
                                                {job.requiredSkills?.slice(0, 4).map((s, i) => (
                                                    <span key={i} className="px-2 py-0.5 text-xs bg-indigo-50 text-indigo-700 rounded">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="mt-3 flex justify-between text-sm text-gray-500">
                                                <span>Duration: {job.duration}</span>
                                                <span>Deadline: {formatDate(job.deadline)}</span>
                                            </div>
                                            <button
                                                onClick={() => handleApply(job._id)}
                                                disabled={applying === job._id || appliedIds.has(job._id)}
                                                className={`mt-4 w-full py-2 rounded-lg text-sm font-medium disabled:opacity-50 ${
                                                    appliedIds.has(job._id)
                                                        ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                                                        : 'bg-primary text-white hover:bg-indigo-700'
                                                }`}
                                            >
                                                {applying === job._id ? 'Applying...' : appliedIds.has(job._id) ? 'Applied' : 'Apply'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Internships;
