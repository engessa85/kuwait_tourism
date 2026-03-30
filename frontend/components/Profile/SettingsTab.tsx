'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

export default function SettingsTab() {
    const { language, setLanguage, t } = useLanguage();
    const { updateProfile } = useAuth();

    const handleLanguageChange = async (lang: 'en' | 'ar') => {
        setLanguage(lang);
        const formData = new FormData();
        formData.append('language_preference', lang);
        await updateProfile(formData);
    };

    return (
        <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t.profile.sidebar.settings}</h2>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <div className="mb-8">
                    <h3 className="font-bold text-gray-900 mb-4">{t.profile.dashboard.settings.language}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => handleLanguageChange('en')}
                            className={`p-4 rounded-2xl border-2 transition-all text-left ${language === 'en' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}
                        >
                            <div className="font-bold mb-1">English</div>
                            <div className="text-xs opacity-70">Current site language</div>
                        </button>
                        <button
                            onClick={() => handleLanguageChange('ar')}
                            className={`p-4 rounded-2xl border-2 transition-all text-right ${language === 'ar' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}
                        >
                            <div className="font-bold mb-1 font-arabic">العربية</div>
                            <div className="text-xs opacity-70 font-arabic">لغة الموقع الحالية</div>
                        </button>
                    </div>
                </div>

                {/* <div className="pt-8 border-t border-gray-100">
                    <h3 className="font-bold text-red-600 mb-4">{t.profile.dashboard.settings.danger_zone}</h3>
                    <button className="text-sm font-bold text-red-500 hover:underline">
                        {t.profile.dashboard.settings.delete_account}
                    </button>
                </div> */}
            </div>
        </div>
    );
}
