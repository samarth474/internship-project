'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../../utils/auth';
import { ArrowRight, Eye, EyeOff, Lock, Mail, RefreshCw, Zap } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userProfile', JSON.stringify(data.profile));
        localStorage.setItem('userStartup', JSON.stringify(data.startup));
        router.push('/dashboard');
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Connection failed. Please check your network.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-[440px]">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-[#1E3A8A] rounded-xl flex items-center justify-center text-white shadow-lg transition-saas group-hover:scale-105">
              <Zap size={24} fill="currentColor" />
            </div>
            <span className="text-2xl font-bold text-[#111827] tracking-tight">AI CoFounder</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-10">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold text-[#111827] mb-2">Welcome Back</h1>
            <p className="text-[#6B7280]">Please enter your details to sign in.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center">
              <span className="mr-2">⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold text-[#6B7280] uppercase tracking-widest pl-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF] group-focus-within:text-[#1E3A8A] transition-saas">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[#111827] placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#1E3A8A]/10 focus:border-[#1E3A8A] outline-none transition-saas"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label htmlFor="password" className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">
                  Password
                </label>
                <Link href="/forgot-password" size="sm" className="text-xs font-bold text-[#1E3A8A] hover:text-[#1D4ED8] transition-saas">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF] group-focus-within:text-[#1E3A8A] transition-saas">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-12 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[#111827] placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#1E3A8A]/10 focus:border-[#1E3A8A] outline-none transition-saas"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#9CA3AF] hover:text-[#111827] transition-saas"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3.5 flex items-center justify-center font-bold shadow-md hover:shadow-lg transition-saas text-base"
            >
              {isLoading ? (
                <RefreshCw className="animate-spin mr-2" size={18} />
              ) : (
                <>Sign In <ArrowRight size={18} className="ml-2" /></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#F3F4F6] text-center">
            <p className="text-[#6B7280] text-sm font-medium">
              New to AI CoFounder?{' '}
              <Link href="/signup" className="text-[#1E3A8A] font-bold hover:text-[#1D4ED8] transition-saas">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-[#9CA3AF] text-xs font-medium">
            &copy; {new Date().getFullYear()} AI CoFounder. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-3">
            <Link href="/terms" className="text-[#9CA3AF] hover:text-[#374151] text-xs font-semibold underline-offset-4 decoration-[#E5E7EB]">Terms</Link>
            <Link href="/privacy" className="text-[#9CA3AF] hover:text-[#374151] text-xs font-semibold underline-offset-4 decoration-[#E5E7EB]">Privacy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
