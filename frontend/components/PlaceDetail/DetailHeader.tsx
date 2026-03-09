'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

function DetailHeader() {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    return (
        <header className='bg-white border-b border-gray-100 sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto flex justify-between items-center px-4 py-4 md:px-8'>
                {/* Logo Section */}
                <Link href="/" className='flex items-center gap-3'>
                    <Image
                        src="/logo.png"
                        alt="Kuwait Tourism"
                        width={32}
                        height={32}
                        className="h-8 w-auto object-contain"
                    />
                    <span className='text-lg font-bold text-gray-900'>
                        Kuwait Tourism
                    </span>
                </Link>

                {/* Navigation Links - REMOVED AS REQUESTED */}

                {/* Right Side Actions */}
                <div className='flex items-center gap-4'>


                    <button
                        onClick={toggleLanguage}
                        className='bg-white border border-gray-200 text-gray-700 text-[12px] font-bold px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200'
                    >
                        {language === 'en' ? 'AR' : 'EN'}
                    </button>

                    <button className="bg-primary text-white text-[12px] font-bold px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm shadow-primary/20">
                        Login
                    </button>
                </div>
            </div>
        </header>
    );
}

export default DetailHeader;
