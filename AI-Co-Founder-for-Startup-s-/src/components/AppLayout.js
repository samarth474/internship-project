'use client';

import Sidebar from './Sidebar';
import AuthGuard from './AuthGuard';

export default function AppLayout({ children }) {
    return (
        <AuthGuard>
            <div className="flex min-h-screen bg-[#F5F7FA]">
                <Sidebar />
                <main className="flex-1 ml-64 p-8">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </AuthGuard>
    );
}
