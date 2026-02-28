'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Zap,
  Target,
  BarChart3,
  Rocket,
  ClipboardList,
  Cpu,
  DollarSign,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Globe,
  Clock,
  ArrowUpRight
} from 'lucide-react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: "Startup Ideation",
      desc: "Generate and validate startup ideas with real-time market data and AI analysis.",
      icon: Rocket,
      color: "bg-blue-50 text-[#1E3A8A]"
    },
    {
      title: "Business Planning",
      desc: "Create comprehensive business models, lean canvases, and financial projections.",
      icon: ClipboardList,
      color: "bg-sky-50 text-[#0EA5E9]"
    },
    {
      title: "Technical Co-Founder",
      desc: "Architect your MVP, generate system designs, and get technical guidance.",
      icon: Cpu,
      color: "bg-amber-50 text-[#F59E0B]"
    },
    {
      title: "Fundraising Support",
      desc: "Simulate investor Q&As, get pitch deck feedback, and match with investors.",
      icon: DollarSign,
      color: "bg-green-50 text-[#10B981]"
    },
    {
      title: "Market Analysis",
      desc: "AI-driven market research and competitive analysis to keep you ahead.",
      icon: BarChart3,
      color: "bg-purple-50 text-[#8B5CF6]"
    },
    {
      title: "Expert Mentorship",
      desc: "Connect with industry experts and follow personalized learning paths.",
      icon: GraduationCap,
      color: "bg-rose-50 text-[#F43F5E]"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#111827] selection:bg-[#1E3A8A] selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-saas ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-[#E5E7EB]' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#1E3A8A] rounded-xl flex items-center justify-center text-white shadow-lg">
              <Zap size={24} fill="currentColor" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#111827]">AI CoFounder</span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <a href="#features" className="text-sm font-bold text-[#374151] hover:text-[#1E3A8A] uppercase tracking-widest transition-saas">Features</a>
            <a href="#metrics" className="text-sm font-bold text-[#374151] hover:text-[#1E3A8A] uppercase tracking-widest transition-saas">Impact</a>
            <Link href="/login" className="text-sm font-bold text-[#1E3A8A] uppercase tracking-widest transition-saas px-4 py-2 border border-[#E5E7EB] rounded-xl hover:bg-white shadow-sm">Sign In</Link>
            <Link href="/signup" className="btn-primary py-3 px-8 text-sm uppercase tracking-widest font-bold shadow-md">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative pt-44 pb-32 px-6 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      >
        {/* A semi-transparent overlay to ensure text readability */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-0"></div>

        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl z-0 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl z-0 animate-pulse delay-1000"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-[#E5E7EB] text-[#1E3A8A] text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#1E3A8A] mr-3 animate-ping"></span>
            The Future of Startup Building is Here
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 tracking-tighter text-[#111827] leading-[1.1]">
            Your Intelligent <br />
            <span className="text-[#1E3A8A]">Startup Co-Founder</span>
          </h1>
          <p className="text-xl text-[#6B7280] mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
            AI CoFounder platform guides you from your first spark of inspiration to a successful exit. Experience the ultimate synergy of human vision and artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/signup" className="btn-primary py-5 px-10 text-lg font-bold shadow-xl flex items-center justify-center">
              Start Building Now <ArrowRight size={20} className="ml-3" />
            </Link>
            <Link href="/login" className="btn-secondary py-5 px-10 text-lg font-bold flex items-center justify-center shadow-sm">
              Explore Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-[#111827] tracking-tight">Everything You Need to Scale</h2>
            <p className="text-[#6B7280] text-lg font-medium leading-relaxed">
              Our comprehensive toolset handles the complexity, so you can focus on what matters most: your vision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="card-saas p-10 hover:border-[#1E3A8A] transition-saas group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${feature.color} group-hover:scale-110 transition-saas shadow-sm`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#111827]">{feature.title}</h3>
                  <p className="text-[#6B7280] leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                  <div className="mt-8 pt-8 border-t border-[#F3F4F6]">
                    <Link href="/signup" className="text-[#1E3A8A] text-xs font-bold uppercase tracking-widest flex items-center group-hover:underline">
                      Learn More <ArrowUpRight size={14} className="ml-2" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats/Metrics */}
      <section id="metrics" className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="text-[#1E3A8A] font-bold uppercase tracking-widest text-xs mb-4">Market Impact</div>
            <h2 className="text-4xl font-bold mb-8 text-[#111827] tracking-tight">Join the next generation of billionaire founders</h2>
            <p className="text-lg text-[#6B7280] mb-12 font-medium leading-relaxed">
              AI CoFounder is more than a platform—it's your strategic advantage in a hyper-competitive market. We provide the data, insight, and speed required to win.
            </p>
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-2">
                <p className="text-5xl font-bold text-[#1E3A8A] tracking-tighter">$50M+</p>
                <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">Total Funding Raised</p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-bold text-[#1E3A8A] tracking-tighter">1.2k</p>
                <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">Successful Launches</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-[#1E3A8A] rounded-3xl p-1 shadow-2xl overflow-hidden aspect-video relative group">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm group-hover:bg-transparent transition-saas"></div>
              <div className="w-full h-full bg-[#111827] flex items-center justify-center">
                <Zap size={64} className="text-white animate-pulse" />
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white rounded-2xl shadow-xl border border-[#E5E7EB] p-6 hidden md:block animate-bounce animation-duration-5000">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-4">
                <ShieldCheck size={20} />
              </div>
              <p className="text-xs font-bold text-[#111827] mb-1">Investor Ready</p>
              <p className="text-[10px] text-[#6B7280] font-medium">Validated by top-tier VC firms globally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto bg-[#1E3A8A] rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_100%)]"></div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">Ready to accelerate your <br />startup vision?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-medium">Join 5,000+ founders worldwide who trust AI CoFounder to lead their journey.</p>
          <Link href="/signup" className="bg-white text-[#1E3A8A] px-12 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-saas shadow-lg transform hover:-translate-y-1">
            Get Started for Free
          </Link>
          <p className="mt-8 text-blue-200 text-sm font-medium">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-[#E5E7EB] bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-[#1E3A8A] rounded-xl flex items-center justify-center text-white">
                <Zap size={20} fill="currentColor" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#111827]">AI CoFounder</span>
            </div>
            <p className="text-[#6B7280] max-w-sm font-medium leading-relaxed">
              Empowering founders with the wisdom of thousands of successful startups through cutting-edge artificial intelligence.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-[#111827] mb-6 uppercase tracking-widest text-xs">Platform</h4>
            <ul className="space-y-4 text-sm font-medium text-[#6B7280]">
              <li><Link href="/ideation" className="hover:text-[#1E3A8A] transition-saas">Ideation</Link></li>
              <li><Link href="/business-planning" className="hover:text-[#1E3A8A] transition-saas">Planning</Link></li>
              <li><Link href="/fundraising" className="hover:text-[#1E3A8A] transition-saas">Fundraising</Link></li>
              <li><Link href="/learning" className="hover:text-[#1E3A8A] transition-saas">Learning</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#111827] mb-6 uppercase tracking-widest text-xs">Compay</h4>
            <ul className="space-y-4 text-sm font-medium text-[#6B7280]">
              <li><a href="#" className="hover:text-[#1E3A8A] transition-saas">About Us</a></li>
              <li><a href="#" className="hover:text-[#1E3A8A] transition-saas">Privacy</a></li>
              <li><a href="#" className="hover:text-[#1E3A8A] transition-saas">Terms</a></li>
              <li><a href="#" className="hover:text-[#1E3A8A] transition-saas">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-[#F3F4F6] flex flex-col md:flex-row justify-between items-center text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">
          <p>© {new Date().getFullYear()} AI CoFounder. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#1E3A8A]">Twitter</a>
            <a href="#" className="hover:text-[#1E3A8A]">LinkedIn</a>
            <a href="#" className="hover:text-[#1E3A8A]">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
