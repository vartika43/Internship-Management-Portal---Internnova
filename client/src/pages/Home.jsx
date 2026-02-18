import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Streamlining Internship</span>{' '}
                                    <span className="block text-primary xl:inline">& NOC Management</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Experience the future of academic management with our AI-powered portal. Automated NOCs, real-time tracking, and seamless CDC verification for the School of Engineering & Technology (SOET).
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link to="/login" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-200">
                                            Login
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <Link to="/student/noc-request" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition-all duration-200">
                                            Apply for NOC
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-50 flex items-center justify-center">
                    <div className="p-10">
                        <img className="object-cover object-center rounded-lg shadow-xl" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80" alt="Students collaboration" />
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Core Features</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            A Complete Internship Ecosystem
                        </p>
                    </div>

                    <div className="mt-10">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            {[
                                { title: "Digital NOC Submission", desc: "Paperless workflow for students to request and track NOCs instantly." },
                                { title: "CDC Verification Workflow", desc: "Admins can verify offer letters and approve internships with one click." },
                                { title: "Faculty Attendance Monitoring", desc: "Track student progress with monthly logs and attendance reports." },
                                { title: "AI Document Validation", desc: "Smart detection of offer letters and fraud prevention (NLP)." },
                            ].map((feature, idx) => (
                                <div key={idx} className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">
                                        {feature.desc}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Access Dashboards Section */}
            <div className="py-16 bg-indigo-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-white">Access Portals</h2>
                        <p className="mt-4 text-xl text-indigo-200">Direct access to role-based dashboards.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link to="/student/dashboard" className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all group">
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">Student Dashboard &rarr;</h3>
                            <p className="text-indigo-100">Apply for NOC, Track Status, submit Internship Logs.</p>
                        </Link>

                        <Link to="/faculty/dashboard" className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all group">
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Faculty Dashboard &rarr;</h3>
                            <p className="text-indigo-100">Monitor Mentees, Verify Attendance, View Reports.</p>
                        </Link>

                        <Link to="/admin/dashboard" className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all group">
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">CDC Admin Portal &rarr;</h3>
                            <p className="text-indigo-100">Verify Companies, Approve Internships, Statistics.</p>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="py-12 bg-gray-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Total Internships", value: "450+" },
                            { label: "PPO Offers", value: "85" },
                            { label: "Verified Companies", value: "120+" },
                            { label: "Compliance Rate", value: "98%" }
                        ].map((stat, idx) => (
                            <div key={idx}>
                                <div className="text-4xl font-extrabold text-primary">{stat.value}</div>
                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex justify-center md:justify-start">
                            <span className="text-2xl font-bold text-gray-900">InternNova</span>
                        </div>
                        <div className="mt-8 md:mt-0">
                            <p className="text-center text-base text-gray-400">
                                &copy; 2026 School of Engineering & Technology (SOET). All rights reserved.
                            </p>
                            <p className="text-center text-sm text-gray-400 mt-1">
                                Secure & Role-Based Access Control Enabled.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
