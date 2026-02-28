'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Lightbulb,
    BarChart3,
    Zap,
    CircleDollarSign,
    GraduationCap,
    TrendingUp,
    Settings,
    LogOut
} from 'lucide-react';
import { logout } from '../utils/auth';

const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Ideation', href: '/ideation', icon: Lightbulb },
    { name: 'Business Planning', href: '/business-planning', icon: BarChart3 },
    { name: 'Technical Co-Founder', href: '/technical-cofounder', icon: Zap },
    { name: 'Fundraising', href: '/fundraising', icon: CircleDollarSign },
    { name: 'Learning', href: '/learning', icon: GraduationCap },
    { name: 'Market Intelligence', href: '/market-intelligence', icon: TrendingUp },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen bg-white border-r border-[#E5E7EB] flex flex-col fixed left-0 top-0 z-50">
            <div className="p-6 flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#1E3A8A] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl leading-none">A</span>
                </div>
                <span className="text-lg font-semibold text-[#111827]">AI CoFounder</span>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-saas ${isActive
                                    ? 'bg-blue-50 text-[#1E3A8A]'
                                    : 'text-[#374151] hover:bg-[#F9FAFB] hover:text-[#111827]'
                                }`}
                        >
                            <item.icon size={20} className={isActive ? 'text-[#1E3A8A]' : 'text-[#6B7280]'} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-[#E5E7EB] space-y-1">
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-[#374151] hover:bg-[#F9FAFB] transition-saas">
                    <Settings size={20} className="text-[#6B7280]" />
                    <span className="font-medium">Settings</span>
                </button>
                <button
                    onClick={() => logout()}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-saas"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}
