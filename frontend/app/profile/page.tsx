'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Common/Header';

export default function ProfilePage() {
    const { user, isAuthenticated, loading, logout } = useAuth();
    const { t, isRTL } = useLanguage();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('dashboard');

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

    return (
        <div className={`min-h-screen bg-white ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <Header showNav={false} />

            <div className="flex">
                {/* Sidebar */}
                <aside className={`w-72 border-${isRTL ? 'l' : 'r'} border-gray-100 flex flex-col p-8 sticky top-[73px] h-[calc(100vh-73px)] shrink-0 bg-white`}>
                    <div className="flex flex-col items-center mb-12">
                        <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mb-4 border-2 border-gray-100 shadow-sm text-gray-400">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold text-gray-900 leading-tight text-center">{user?.full_name}</h2>
                    </div>

                    <nav className="flex-1 space-y-2">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'dashboard'
                                ? 'bg-primary/10 text-primary font-bold shadow-sm'
                                : 'text-gray-500 hover:bg-gray-50 font-medium'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            <span className="text-[14px] font-bold">{t.profile.sidebar.dashboard}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('saved')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'saved'
                                ? 'bg-primary/10 text-primary font-bold shadow-sm'
                                : 'text-gray-500 hover:bg-gray-50 font-medium'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className="text-[14px] font-medium">{t.profile.sidebar.saved_attractions}</span>
                        </button>

                        <Link href="/" className="w-full h-10 flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 font-medium mt-auto" >
                            <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="text-[14px] font-medium">{t.nav.home}</span>
                        </Link>
                    </nav>

                    {/* Signout button */}
                    <button
                        onClick={logout}
                        className="w-full py-4 mt-8 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-[1.02] transition-all duration-200"
                    >
                        {t.profile.sidebar.signout}
                    </button>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-12 overflow-y-auto bg-gray-50/30">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-12">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                {t.profile.dashboard.greeting.replace('{{name}}', firstName)}
                            </h1>
                            <p className="text-gray-500 font-medium">{t.profile.dashboard.subtitle}</p>
                        </div>



                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Saved Attractions Gallery */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-black text-gray-900 tracking-tight">{t.profile.dashboard.saved_attractions.title}</h3>
                                    <div className="flex gap-2">
                                        <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {[
                                        { name: 'The Grand Mosque', cat: 'Cultural Heritage', img: '/kuwait_grand_mosque.jpg', rate: 4.8, rev: 120, time: 'Open today until 5 PM' },
                                        { name: 'Souq Al-Mubarakiya', cat: 'Market & Dining', img: '/kuwait_historical_cat.png', rate: 4.9, rev: 850, time: 'Always Open' },
                                        { name: 'Kuwait Towers', cat: 'Landmark', img: '/kuwait_modern_cat.png', rate: 4.7, rev: 340, time: 'Closing soon' }
                                    ].map((attr, idx) => (
                                        <div key={idx} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                                            <div className="aspect-4/5 relative">
                                                <Image src={attr.img} alt={attr.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all shadow-lg">
                                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-500 mb-2">
                                                    <span>⭐</span>
                                                    <span>{attr.rate} ({attr.rev} reviews)</span>
                                                </div>
                                                <h4 className="text-lg font-black text-gray-900 mb-1 group-hover:text-primary transition-colors">{attr.name}</h4>
                                                <p className="text-gray-400 text-xs font-bold mb-4">{attr.cat}</p>
                                                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                                    <p className="text-[10px] text-gray-500 font-medium">{attr.time}</p>
                                                    <Link href="#" className="text-[10px] font-black text-primary tracking-widest hover:underline uppercase">
                                                        {t.profile.dashboard.saved_attractions.view_details}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>




                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
