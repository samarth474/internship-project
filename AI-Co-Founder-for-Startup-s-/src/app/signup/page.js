'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../../utils/auth';
import {
  Zap,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  User,
  Building2,
  Briefcase,
  Rocket,
  Target,
  CheckCircle2,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    startupName: '',
    industry: '',
    stage: 'idea',
    fundingStage: 'pre-seed'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const roles = [
    {
      id: 'founder',
      title: 'Startup Founder',
      icon: Rocket,
      description: 'Building the next big thing',
      features: ['AI-powered ideation', 'Business planning tools', 'Technical guidance', 'Fundraising support']
    },
    {
      id: 'developer',
      title: 'Freelancer / Developer',
      icon: Briefcase,
      description: 'Building technical solutions',
      features: ['Code generation', 'Architecture guidance', 'Best practices', 'Tech stack advice']
    },
    {
      id: 'investor',
      title: 'Investor',
      icon: Target,
      description: 'Funding innovative startups',
      features: ['Deal flow access', 'Startup analytics', 'Due diligence tools', 'Portfolio management']
    },
    {
      id: 'mentor',
      title: 'Mentor',
      icon: User,
      description: 'Sharing expertise & guidance',
      features: ['Mentee matching', 'Expert network', 'Knowledge sharing', 'Impact tracking']
    }
  ];

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce', 'SaaS', 'AI/ML', 'Clean Energy',
    'Biotech', 'Fintech', 'Edtech', 'Healthtech', 'Real Estate', 'Transportation', 'Entertainment', 'Other'
  ];

  const stages = [
    { value: 'idea', label: 'Just an idea' },
    { value: 'mvp', label: 'Building MVP' },
    { value: 'early-traction', label: 'Early traction' },
    { value: 'growth', label: 'Growing fast' },
    { value: 'scaling', label: 'Scaling up' },
    { value: 'exit', label: 'Planning exit' }
  ];

  const fundingStages = [
    { value: 'pre-seed', label: 'Pre-seed' },
    { value: 'seed', label: 'Seed' },
    { value: 'series-a', label: 'Series A' },
    { value: 'series-b', label: 'Series B' },
    { value: 'series-c', label: 'Series C' },
    { value: 'exit', label: 'Exit' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setCurrentStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const signupData = {
        ...formData,
        role: selectedRole
      };

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/login?message=Account created successfully! Please sign in.');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setSelectedRole('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col justify-center items-center py-12 px-6">
      <div className="w-full max-w-5xl">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-[#1E3A8A] rounded-xl flex items-center justify-center text-white shadow-lg transition-saas group-hover:scale-105">
              <Zap size={24} fill="currentColor" />
            </div>
            <span className="text-2xl font-bold text-[#111827] tracking-tight">AI CoFounder</span>
          </Link>
        </div>

        {/* Progress Tracker */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-saas ${currentStep >= 1 ? 'bg-[#1E3A8A] text-white shadow-md' : 'bg-white text-[#6B7280] border border-[#E5E7EB]'}`}>1</div>
            <div className={`w-16 h-1 transition-saas ${currentStep >= 2 ? 'bg-[#1E3A8A]' : 'bg-[#E5E7EB]'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-saas ${currentStep >= 2 ? 'bg-[#1E3A8A] text-white shadow-md' : 'bg-white text-[#6B7280] border border-[#E5E7EB]'}`}>2</div>
          </div>
        </div>

        {/* Step 1: Role Selection */}
        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-[#111827] mb-3">Choose Your Focus</h1>
              <p className="text-[#6B7280] text-lg">Select the role that best describes your startup journey.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className="card-saas p-8 text-left transition-saas hover:border-[#1E3A8A] hover:bg-blue-50/30 group"
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#1E3A8A] mb-6 group-hover:bg-[#1E3A8A] group-hover:text-white transition-saas">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-[#111827] mb-2">{role.title}</h3>
                    <p className="text-sm text-[#6B7280] mb-6 leading-relaxed">{role.description}</p>
                    <ul className="space-y-3">
                      {role.features.map((feature, index) => (
                        <li key={index} className="text-xs font-medium text-[#4B5563] flex items-center">
                          <CheckCircle2 size={14} className="text-[#1E3A8A] mr-2 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Registration Form */}
        {currentStep === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto w-full">
            <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
              <div className="p-8 border-b border-[#F3F4F6] flex items-center justify-between bg-[#F9FAFB]">
                <button
                  onClick={goBack}
                  className="text-[#6B7280] hover:text-[#1E3A8A] transition-saas flex items-center text-sm font-bold uppercase tracking-widest"
                >
                  <ArrowLeft size={16} className="mr-2" /> Back
                </button>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest block">Selected Role</span>
                  <span className="text-sm font-bold text-[#1E3A8A]">{roles.find(r => r.id === selectedRole)?.title}</span>
                </div>
              </div>

              <div className="p-8 md:p-10">
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-[#111827] mb-2">Create Your Profile</h2>
                  <p className="text-[#6B7280]">Join the community and start building.</p>
                </div>

                {error && (
                  <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center">
                    <span className="mr-2">⚠️</span> {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#6B7280] uppercase tracking-widest pl-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[#111827] focus:ring-2 focus:ring-[#1E3A8A]/10 focus:border-[#1E3A8A] outline-none transition-saas"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#6B7280] uppercase tracking-widest pl-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[#111827] focus:ring-2 focus:ring-[#1E3A8A]/10 focus:border-[#1E3A8A] outline-none transition-saas"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-widest pl-1">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF] group-focus-within:text-[#1E3A8A] transition-saas">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[#111827] focus:ring-2 focus:ring-[#1E3A8A]/10 focus:border-[#1E3A8A] outline-none transition-saas"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#6B7280] uppercase tracking-widest pl-1">Password</label>
                      <div className="relative group">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          minLength="8"
                          className="w-full px-4 pr-12 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[#111827] focus:ring-2 focus:ring-[#1E3A8A]/10 focus:border-[#1E3A8A] outline-none transition-saas"
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
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#6B7280] uppercase tracking-widest pl-1">Confirm</label>
                      <div className="relative group">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          minLength="8"
                          className="w-full px-4 pr-12 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[#111827] focus:ring-2 focus:ring-[#1E3A8A]/10 focus:border-[#1E3A8A] outline-none transition-saas"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#9CA3AF] hover:text-[#111827] transition-saas"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {selectedRole === 'founder' && (
                    <div className="space-y-8 pt-4 border-t border-[#F3F4F6]">
                      <h3 className="font-bold text-[#111827]">Startup Details</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#6B7280] uppercase tracking-widest pl-1">Startup Name</label>
                          <input
                            type="text"
                            name="startupName"
                            value={formData.startupName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[#111827] focus:ring-2 focus:ring-[#1E3A8A]/10 focus:border-[#1E3A8A] outline-none transition-saas"
                            placeholder="Acme Inc."
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#6B7280] uppercase tracking-widest pl-1">Industry</label>
                          <select
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[#111827] focus:ring-2 focus:ring-[#1E3A8A]/10 focus:border-[#1E3A8A] outline-none transition-saas appearance-none cursor-pointer"
                          >
                            <option value="">Select industry</option>
                            {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#6B7280] uppercase tracking-widest pl-1">Current Stage</label>
                          <select
                            name="stage"
                            value={formData.stage}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[#111827] focus:ring-2 focus:ring-[#1E3A8A]/10 focus:border-[#1E3A8A] outline-none transition-saas appearance-none cursor-pointer"
                          >
                            {stages.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#6B7280] uppercase tracking-widest pl-1">Funding</label>
                          <select
                            name="fundingStage"
                            value={formData.fundingStage}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[#111827] focus:ring-2 focus:ring-[#1E3A8A]/10 focus:border-[#1E3A8A] outline-none transition-saas appearance-none cursor-pointer"
                          >
                            {fundingStages.map((fs) => <option key={fs.value} value={fs.value}>{fs.label}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        required
                        className="w-4 h-4 border-[#E5E7EB] rounded text-[#1E3A8A] focus:ring-[#1E3A8A]/10 transition-saas cursor-pointer"
                      />
                    </div>
                    <label className="ml-3 text-sm text-[#6B7280] font-medium leading-normal">
                      I agree to the <Link href="/terms" className="text-[#1E3A8A] font-bold hover:underline">Terms</Link> and <Link href="/privacy" className="text-[#1E3A8A] font-bold hover:underline">Privacy Policy</Link>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full py-4 flex items-center justify-center font-bold shadow-md transition-saas text-base"
                  >
                    {isLoading ? (
                      <RefreshCw className="animate-spin mr-2" size={20} />
                    ) : (
                      <>Create Account <ArrowRight size={20} className="ml-2" /></>
                    )}
                  </button>
                </form>

                <div className="mt-10 pt-10 border-t border-[#F3F4F6] text-center">
                  <p className="text-[#6B7280] text-sm font-medium">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#1E3A8A] font-bold hover:text-[#1D4ED8] transition-saas">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-[#9CA3AF] text-xs font-medium">
            &copy; {new Date().getFullYear()} AI CoFounder. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
