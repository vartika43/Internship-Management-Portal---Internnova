import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (role) => {
        // In a real app, we would validate credentials here
        console.log(`Logging in as ${role}...`);
        if (role === 'student') navigate('/student/dashboard');
        else if (role === 'faculty') navigate('/faculty/dashboard');
        else if (role === 'admin') navigate('/admin/dashboard');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="mb-4 flex justify-center">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-3">
                                <span className="text-3xl">🏫</span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">University Portal</h1>
                        <p className="text-gray-600">Sign in to your account</p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@university.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label htmlFor="remember-me" className="flex items-center cursor-pointer group">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                                />
                                <span className="ml-2 text-gray-700 group-hover:text-gray-900">Remember me</span>
                            </label>
                            <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        <div className="space-y-3 pt-4">
                            <p className="text-center text-xs font-medium text-gray-600 uppercase tracking-wide">Select role to continue</p>
                            <button
                                type="button"
                                onClick={() => handleLogin('student')}
                                className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <span>👨‍🎓</span> Login as Student
                            </button>
                            <button
                                type="button"
                                onClick={() => handleLogin('faculty')}
                                className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <span>👨‍🏫</span> Login as Faculty
                            </button>
                            <button
                                type="button"
                                onClick={() => handleLogin('admin')}
                                className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-lg hover:from-gray-800 hover:to-gray-900 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <span>⚙️</span> Login as Admin
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600 text-center">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Security Badge */}
                <div className="text-center mt-4 text-xs text-gray-500">
                    <p>🔒 Secure authentication • Data Privacy Protected</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
