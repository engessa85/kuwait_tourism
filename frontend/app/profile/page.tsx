'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Common/Header';
import ProfileTab from '@/components/Profile/ProfileTab';
import FavoritesTab from '@/components/Profile/FavoritesTab';
import ReviewsTab from '@/components/Profile/ReviewsTab';
import SettingsTab from '@/components/Profile/SettingsTab';

export default function ProfilePage() {
    const { user, isAuthenticated, loading, logout } = useAuth();
    const { t, isRTL } = useLanguage();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, loading, router]);

    if (loading || !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    const firstName = user?.full_name.split(' ')[0] || '';

    const renderContent = () => {
        switch (activeTab) {
            case 'profile': return <ProfileTab />;
            case 'favorites': return <FavoritesTab />;
            case 'reviews': return <ReviewsTab />;
            case 'settings': return <SettingsTab />;
            default: return <ProfileTab />;
        }
    };

    return (
        <div className={`min-h-screen bg-white ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <Header showNav={false} />

            <div className="flex flex-col md:flex-row min-h-[calc(100vh-73px)]">
                {/* Desktop Sidebar */}
                <aside className={`hidden md:flex w-72 border-${isRTL ? 'l' : 'r'} border-gray-100 flex-col p-8 sticky top-[73px] h-[calc(100vh-73px)] shrink-0 bg-white`}>
                    <div className="flex-1 space-y-2">
                        {[
                            { id: 'profile', label: t.profile.sidebar.profile, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> },
                            { id: 'favorites', label: t.profile.sidebar.favorites, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /> },
                            { id: 'reviews', label: t.profile.sidebar.reviews, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /> },
                            { id: 'settings', label: t.profile.sidebar.settings, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /> },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === tab.id
                                    ? 'bg-primary/10 text-primary font-bold shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-50 font-medium'
                                    }`}
                            >
                                <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">{tab.icon}</svg>
                                <span className="text-[14px]">{tab.label}</span>
                            </button>
                        ))}

                        <div className="pt-8 mt-8 border-t border-gray-100">
                            <Link href="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 font-medium transition-all" >
                                <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span className="text-[14px]">{t.nav.home}</span>
                            </Link>
 
                            <button
                                onClick={logout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-bold transition-all mt-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="text-[14px]">{t.profile.sidebar.signout}</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Mobile Tab Bar */}
                <div className="md:hidden sticky top-[73px] bg-white border-b border-gray-100 z-10 overflow-x-auto scrollbar-none shadow-sm">
                    <div className="flex px-4 py-2 min-w-max">
                        {[
                            { id: 'profile', label: t.profile.sidebar.profile },
                            { id: 'favorites', label: t.profile.sidebar.favorites },
                            { id: 'reviews', label: t.profile.sidebar.reviews },
                            { id: 'settings', label: t.profile.sidebar.settings },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === tab.id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-gray-50/30">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8 md:mb-12">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                {t.profile.dashboard.greeting.replace('{{name}}', firstName)}
                            </h1>
                            <p className="text-gray-500 font-medium">{t.profile.dashboard.subtitle}</p>
                        </div>

                        {renderContent()}

                        {/* Mobile Logout (Show at bottom of profile page on mobile) */}
                        <div className="md:hidden mt-12 pt-8 border-t border-gray-100 flex flex-col gap-4">
                            <Link href="/" className="flex items-center gap-3 text-gray-500 font-bold">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                {t.nav.home}
                            </Link>
                            <button onClick={logout} className="flex items-center gap-3 text-red-500 font-bold">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                {t.profile.sidebar.signout}
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
