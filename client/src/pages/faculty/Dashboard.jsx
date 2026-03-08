import React, { useState, useEffect } from 'react';
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';
import { internshipAPI, applicationAPI } from '../../api/api';

const FacultyDashboard = () => {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        companyName: '',
        description: '',
        requiredSkills: '',
        duration: '',
        deadline: '',
    });

    const fetchListings = async () => {
        try {
            const res = await internshipAPI.getMyListings();
            setInternships(res.data || []);
        } catch {
            setInternships([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const openCreate = () => {
        setEditingId(null);
        setFormData({
            title: '',
            companyName: '',
            description: '',
            requiredSkills: '',
            duration: '',
            deadline: '',
        });
        setShowModal(true);
    };

    const openEdit = (job) => {
        setEditingId(job._id);
        setFormData({
            title: job.title,
            companyName: job.companyName,
            description: job.description,
            requiredSkills: Array.isArray(job.requiredSkills) ? job.requiredSkills.join(', ') : job.requiredSkills || '',
            duration: job.duration,
            deadline: job.deadline ? new Date(job.deadline).toISOString().slice(0, 10) : '',
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                requiredSkills: formData.requiredSkills ? formData.requiredSkills.split(',').map((s) => s.trim()).filter(Boolean) : [],
            };
            if (editingId) {
                await internshipAPI.update(editingId, payload);
            } else {
                await internshipAPI.create(payload);
            }
            setShowModal(false);
            fetchListings();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to save');
        }
    };

    const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '-');
    const getApplicantCount = async (id) => {
        try {
            const res = await applicationAPI.getByInternship(id);
            return res.data?.length || 0;
        } catch {
            return 0;
        }
    };

    const [applicantCounts, setApplicantCounts] = useState({});
    useEffect(() => {
        internships.forEach(async (job) => {
            const count = await getApplicantCount(job._id);
            setApplicantCounts((prev) => ({ ...prev, [job._id]: count }));
        });
    }, [internships]);

    const activeCount = internships.filter((i) => i.status === 'active').length;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar role="faculty" />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Faculty Dashboard</h1>
                            <button
                                onClick={openCreate}
                                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200"
                            >
                                + Post New Internship
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Active Internships</dt>
                                        <dd className="text-lg font-medium text-gray-900">{activeCount}</dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Applicants</dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {Object.values(applicantCounts).reduce((a, b) => a + b, 0)}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Active Listings</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your currently active internship postings.</p>
                            </div>
                            <div className="border-t border-gray-200">
                                {loading ? (
                                    <div className="p-6 text-center text-gray-500">Loading...</div>
                                ) : internships.length === 0 ? (
                                    <div className="p-6 text-center text-gray-500">No internships posted yet.</div>
                                ) : (
                                    <ul className="divide-y divide-gray-200">
                                        {internships.map((job) => (
                                            <li key={job._id}>
                                                <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-medium text-primary truncate">{job.title}</p>
                                                        <p className="text-sm text-gray-500">
                                                            Posted {formatDate(job.createdAt)} • {job.companyName}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            {job.status || 'Active'}
                                                        </span>
                                                        <span className="text-sm text-gray-500">{applicantCounts[job._id] ?? '-'} Applicants</span>
                                                        <button
                                                            onClick={() => openEdit(job)}
                                                            className="p-1 text-gray-400 hover:text-primary rounded"
                                                            title="Edit"
                                                        >
                                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                {editingId ? 'Edit Internship' : 'Post New Internship'}
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Company/Organization</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        required
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        required
                                        rows={3}
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Required Skills (comma-separated)</label>
                                    <input
                                        type="text"
                                        name="requiredSkills"
                                        value={formData.requiredSkills}
                                        onChange={handleChange}
                                        placeholder="e.g. JavaScript, React, Python"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        required
                                        value={formData.duration}
                                        onChange={handleChange}
                                        placeholder="e.g. 3 months"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Deadline</label>
                                    <input
                                        type="date"
                                        name="deadline"
                                        required
                                        value={formData.deadline}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border"
                                    />
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                                    >
                                        {editingId ? 'Update' : 'Post'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FacultyDashboard;
