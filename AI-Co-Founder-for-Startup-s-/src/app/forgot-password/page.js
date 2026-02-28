'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, RefreshCw, CheckCircle2, Zap } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-[440px]">
          <div className="flex justify-center mb-10">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#1E3A8A] rounded-xl flex items-center justify-center text-white shadow-lg">
                <Zap size={24} fill="currentColor" />
              </div>
              <span className="text-2xl font-bold text-[#111827] tracking-tight">AI CoFounder</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-10 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#1E3A8A]">
              <CheckCircle2 size={32} />
            </div>
            <h1 className="text-2xl font-bold text-[#111827] mb-4">Check Your Email</h1>
            <p className="text-[#6B7280] mb-8 leading-relaxed">
              We've sent a password reset link to <br /><strong className="text-[#111827]">{email}</strong>
            </p>

            <div className="space-y-4">
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-primary w-full py-3.5 font-bold"
              >
                Resend Link
              </button>
              <Link
                href="/login"
                className="btn-secondary w-full py-3.5 font-bold flex items-center justify-center"
              >
                <ArrowLeft size={18} className="mr-2" /> Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-10">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold text-[#111827] mb-2">Reset Password</h1>
            <p className="text-[#6B7280]">Enter your email and we'll send you instructions.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[#111827] focus:ring-2 focus:ring-[#1E3A8A]/10 focus:border-[#1E3A8A] outline-none transition-saas"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3.5 flex items-center justify-center font-bold"
            >
              {isLoading ? (
                <RefreshCw className="animate-spin mr-2" size={18} />
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/login" className="text-sm font-bold text-[#1E3A8A] hover:text-[#1D4ED8] transition-saas flex items-center justify-center">
              <ArrowLeft size={16} className="mr-2" /> Back horizontally to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
