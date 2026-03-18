'use client';

import React from 'react';
import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
    const { user, isAuthenticated, loading } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, loading, router]);

    if (loading || !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header showNav={false} />

            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Profile Header */}
                    <div className="h-32 bg-primary/10 relative">
                        <div className="absolute -bottom-12 left-8">
                            <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center border-4 border-white shadow-md">
                                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 pb-8 px-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{user?.full_name}</h1>
                                <p className="text-gray-500">{user?.email}</p>
                            </div>
                            <button className="px-6 py-2 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                                {t.language === 'en' ? 'Edit Profile' : 'تعديل الملف'}
                            </button>
                        </div>

                        {/* Stats / Info */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <span className="text-sm text-gray-500 font-medium block">
                                    {t.language === 'en' ? 'Favorite Places' : 'الأماكن المفضلة'}
                                </span>
                                <span className="text-2xl font-bold text-gray-900 mt-1">0</span>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <span className="text-sm text-gray-500 font-medium block">
                                    {t.language === 'en' ? 'Reviews' : 'التقييمات'}
                                </span>
                                <span className="text-2xl font-bold text-gray-900 mt-1">0</span>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <span className="text-sm text-gray-500 font-medium block">
                                    {t.language === 'en' ? 'Member Since' : 'عضو منذ'}
                                </span>
                                <span className="text-lg font-bold text-gray-900 mt-1">
                                    {new Date().getFullYear()}
                                </span>
                            </div>
                        </div>

                        {/* Placeholder for future features */}
                        <div className="mt-12 border-t pt-12 text-center text-gray-400">
                            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <p className="text-lg font-medium text-gray-500">
                                {t.language === 'en' ? 'Your favorite places will appear here' : 'الأماكن المفضلة لديك ستظهر هنا'}
                            </p>
                            <p className="text-sm mt-2">
                                {t.language === 'en' ? "Start exploring the heart of the gulf to add sights to your list!" : "ابدأ استكشاف قلب الخليج لإضافة معالم إلى قائمتك!"}
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
