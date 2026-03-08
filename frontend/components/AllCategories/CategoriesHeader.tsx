'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

function CategoriesHeader() {
    const { language, setLanguage, t } = useLanguage();

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

                {/* Action / Language Switcher */}
                <div className='flex items-center gap-4'>
                    <button
                        onClick={toggleLanguage}
                        className='bg-primary text-white text-[12px] font-bold px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm'
                    >
                        {language === 'en' ? 'AR' : 'EN'}
                    </button>

                    {/* Add icons from screenshot for premium feel */}
                    <div className="hidden md:flex items-center gap-4 ml-4 rtl:ml-0 rtl:mr-4 border-l rtl:border-l-0 rtl:border-r border-gray-100 pl-4 rtl:pl-0 rtl:pr-4">

                        <button className="bg-primary text-white text-[12px] font-bold px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default CategoriesHeader;
