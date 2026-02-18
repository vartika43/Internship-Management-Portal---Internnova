import React, { useState } from 'react';
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';

const NOCRequest = () => {
    const [formData, setFormData] = useState({
        internshipType: '', // Industry or Summer
        companyName: '',
        companyType: '', // Corporate, Research, etc.
        domain: '',
        location: '',
        stipendType: '', // Paid or Unpaid
        stipend: '',
        duration: '',
        hrName: '',
        hrEmail: '',
        hrPhone: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('NOC Request Submitted Successfully! (Mock)');
        // In real app, submit formData and file to backend
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar role="student" />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-3xl mx-auto bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Request NOC for Internship</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Please provide details about the internship offer. You need to upload your offer letter for verification.
                            </p>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Internship Type */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">Internship Category</h4>
                                    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2">
                                        <div className="flex items-center">
                                            <input
                                                id="type-industry"
                                                name="internshipType"
                                                type="radio"
                                                value="Industry"
                                                required
                                                onChange={handleChange}
                                                className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                                            />
                                            <label htmlFor="type-industry" className="ml-3 block text-sm font-medium text-gray-700">
                                                Industry Internship (Final Year)
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="type-summer"
                                                name="internshipType"
                                                type="radio"
                                                value="Summer"
                                                required
                                                onChange={handleChange}
                                                className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                                            />
                                            <label htmlFor="type-summer" className="ml-3 block text-sm font-medium text-gray-700">
                                                Summer Internship (1st-3rd Year)
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Internship Details */}
                                <div className="pt-6 border-t border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">Company & Internship Details</h4>
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                                                Company Name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="companyName"
                                                    id="companyName"
                                                    required
                                                    value={formData.companyName}
                                                    onChange={handleChange}
                                                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
                                                Domain (e.g. Web Dev, AI/ML)
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="domain"
                                                    id="domain"
                                                    required
                                                    value={formData.domain}
                                                    onChange={handleChange}
                                                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="companyType" className="block text-sm font-medium text-gray-700">
                                                Company Type
                                            </label>
                                            <div className="mt-1">
                                                <select
                                                    id="companyType"
                                                    name="companyType"
                                                    required
                                                    onChange={handleChange}
                                                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                                >
                                                    <option value="">Select Type</option>
                                                    <option value="Corporate">Corporate</option>
                                                    <option value="Research">Research Lab/Institute</option>
                                                    <option value="Global">Global/MNC</option>
                                                    <option value="Startup">Startup</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                                Location
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="location"
                                                    id="location"
                                                    required
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    placeholder="City or Remote"
                                                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="stipendType" className="block text-sm font-medium text-gray-700">
                                                Stipend Type
                                            </label>
                                            <div className="mt-1">
                                                <select
                                                    id="stipendType"
                                                    name="stipendType"
                                                    required
                                                    onChange={handleChange}
                                                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="Paid">Paid</option>
                                                    <option value="Unpaid">Unpaid</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="stipend" className="block text-sm font-medium text-gray-700">
                                                Stipend Amount (if paid)
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="number"
                                                    name="stipend"
                                                    id="stipend"
                                                    value={formData.stipend}
                                                    onChange={handleChange}
                                                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                                                Duration (Months)
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="number"
                                                    name="duration"
                                                    id="duration"
                                                    required
                                                    value={formData.duration}
                                                    onChange={handleChange}
                                                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* HR Contact Details */}
                                <div className="pt-6 border-t border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">HR Contact Details</h4>
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-2">
                                            <label htmlFor="hrName" className="block text-sm font-medium text-gray-700">
                                                HR Name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="hrName"
                                                    id="hrName"
                                                    required
                                                    value={formData.hrName}
                                                    onChange={handleChange}
                                                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="hrEmail" className="block text-sm font-medium text-gray-700">
                                                HR Email
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="email"
                                                    name="hrEmail"
                                                    id="hrEmail"
                                                    required
                                                    value={formData.hrEmail}
                                                    onChange={handleChange}
                                                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="hrPhone" className="block text-sm font-medium text-gray-700">
                                                HR Phone
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="tel"
                                                    name="hrPhone"
                                                    id="hrPhone"
                                                    required
                                                    value={formData.hrPhone}
                                                    onChange={handleChange}
                                                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Document Upload */}
                                <div className="pt-6 border-t border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">Documents</h4>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <div className="flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                                                >
                                                    <span>Upload Offer Letter</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" required />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-5">
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                        >
                                            Submit NOC Request
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default NOCRequest;
