'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLayout from '../../components/AppLayout';
import { getUserInfo } from '../../utils/auth';
import { TrendingUp, CircleDollarSign, BarChart3 } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Get user info from auth utility
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
    // Trigger background competitor refresh (poor man's cron)
    const runRefresh = async () => {
      try {
        setRefreshing(true);
        await fetch('/api/competitors/refresh', { method: 'POST' });
      } catch (e) {
        // ignore errors silently for UX
      } finally {
        setRefreshing(false);
      }
    };
    const loadEvents = async () => {
      try {
        const res = await fetch('/api/competitors/events?limit=10');
        if (res.ok) {
          const data = await res.json();
          setEvents(data.events || []);
        }
      } catch (e) { }
    };
    const loadAlerts = async () => {
      try {
        const res = await fetch('/api/alerts/list?limit=10');
        if (res.ok) {
          const data = await res.json();
          setAlerts(data.alerts || []);
        }
      } catch (e) { }
    };
    runRefresh().then(() => Promise.all([loadEvents(), loadAlerts()]));
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const getRoleDisplayName = (role) => {
    const roleNames = {
      founder: '🚀 Startup Founder',
      investor: '💰 Investor',
      mentor: '🎓 Mentor',
      developer: '💻 Developer',
      advisor: '📋 Business Advisor'
    };
    return roleNames[role] || role;
  };

  const getStageDisplayName = (stage) => {
    const stageNames = {
      idea: '💡 Just an idea',
      mvp: '🔨 Building MVP',
      'early-traction': '📈 Early traction',
      growth: '🚀 Growing fast',
      scaling: '⚡ Scaling up',
      exit: '🎯 Planning exit'
    };
    return stageNames[stage] || stage;
  };

  return (
    <AppLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#111827] mb-2">
          Welcome back, {user?.profile?.firstName || 'User'}! 👋
        </h1>
        <p className="text-[#6B7280]">
          Here's what's happening with your startup today.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Link href="/ideation" className="card-saas p-6 flex flex-col group">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-2xl mb-4 text-[#1E3A8A] group-hover:scale-110 transition-transform">
            💡
          </div>
          <h3 className="text-lg font-semibold text-[#111827] mb-2">Startup Ideation</h3>
          <p className="text-sm text-[#6B7280] mb-6">Generate and validate startup ideas with AI</p>
          <div className="mt-auto text-[#1E3A8A] font-medium text-sm flex items-center">
            Start Ideating <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </Link>

        <Link href="/business-planning" className="card-saas p-6 flex flex-col group">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-2xl mb-4 text-[#1E3A8A] group-hover:scale-110 transition-transform">
            📊
          </div>
          <h3 className="text-lg font-semibold text-[#111827] mb-2">Business Planning</h3>
          <p className="text-sm text-[#6B7280] mb-6">Create business models and financial plans</p>
          <div className="mt-auto text-[#1E3A8A] font-medium text-sm flex items-center">
            Plan Business <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </Link>

        <Link href="/technical-cofounder" className="card-saas p-6 flex flex-col group">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-2xl mb-4 text-[#1E3A8A] group-hover:scale-110 transition-transform">
            ⚡
          </div>
          <h3 className="text-lg font-semibold text-[#111827] mb-2">Technical Co-Founder</h3>
          <p className="text-sm text-[#6B7280] mb-6">Build MVP and technical architecture</p>
          <div className="mt-auto text-[#1E3A8A] font-medium text-sm flex items-center">
            Start Building <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </Link>
      </div>

      {/* Startup Info & Market Watch */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Your Startup */}
        <div className="card-saas p-6">
          <h2 className="text-lg font-semibold text-[#111827] mb-6 flex items-center">
            <TrendingUp size={20} className="mr-2 text-[#1E3A8A]" />
            Your Startup
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-[#F3F4F6]">
              <span className="text-[#6B7280]">Name</span>
              <span className="font-medium text-[#111827]">{user?.startup?.name || 'Not specified'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#F3F4F6]">
              <span className="text-[#6B7280]">Industry</span>
              <span className="font-medium text-[#111827]">{user?.startup?.industry || 'Not specified'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#F3F4F6]">
              <span className="text-[#6B7280]">Stage</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-[#1E3A8A]">
                {getStageDisplayName(user?.startup?.stage)}
              </span>
            </div>
          </div>
        </div>

        {/* Market Watch */}
        <div className="card-saas p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[#111827] flex items-center">
              <TrendingUp size={20} className="mr-2 text-[#1E3A8A]" />
              Market Watch
            </h2>
            <button
              onClick={async () => {
                setRefreshing(true);
                try {
                  await fetch('/api/competitors/refresh', { method: 'POST' });
                  const res = await fetch('/api/competitors/events?limit=5');
                  if (res.ok) {
                    const data = await res.json();
                    setEvents(data.events || []);
                  }
                } finally {
                  setRefreshing(false);
                }
              }}
              className="text-xs text-[#1E3A8A] font-medium hover:text-[#1D4ED8] transition-colors"
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          <div className="space-y-4">
            {events.length === 0 ? (
              <p className="text-sm text-[#6B7280]">No recent market events.</p>
            ) : (
              events.slice(0, 3).map((e) => (
                <div key={e._id} className="group">
                  <a href={e.url} target="_blank" rel="noreferrer" className="text-sm font-medium text-[#111827] hover:text-[#1E3A8A] line-clamp-1 block">
                    {e.title}
                  </a>
                  <p className="text-xs text-[#6B7280] mt-1">{e.source} • {new Date(e.publishedAt).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="card-saas p-6">
        <h2 className="text-lg font-semibold text-[#111827] mb-6 flex items-center">
          <CircleDollarSign size={20} className="mr-2 text-[#1E3A8A]" />
          Recent Alerts
        </h2>
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-green-600 text-sm">✅</span>
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">Account Ready</p>
              <p className="text-xs text-green-700">Explore your dashboard to get started.</p>
            </div>
            <span className="text-xs text-green-600 ml-auto">Now</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
