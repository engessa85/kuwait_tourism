'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { ChevronDown } from 'lucide-react';

function Header({ showNav = true }: { showNav?: boolean }) {
    const { language, setLanguage, t, isRTL } = useLanguage();
    const { isAuthenticated, user, logout } = useAuth();
    const pathname = usePathname();
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    const categories = Object.entries(t.categories.items)
        .filter(([key]) => key !== 'all')
        .map(([key, name]) => ({ id: key, name: name as string }));

    return (
        <header className='bg-white border-b border-gray-100 sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto flex justify-between items-center px-4 py-4 md:px-8'>
                {/* Logo Section */}
                <Link href="/" className='flex items-center gap-3 hover:opacity-80 transition-opacity'>
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

                {/* Navigation Links */}
                {showNav && (
                    <nav className='hidden md:block'>
                        <ul className='flex gap-8 text-[14px] font-medium text-gray-600 items-center'>
                            <li><Link href="/" className='hover:text-primary cursor-pointer transition-colors duration-200'>{t.nav.home}</Link></li>
                            
                            {/* Categories Dropdown */}
                            <li 
                                className='relative group'
                                onMouseEnter={() => setIsCategoryOpen(true)}
                                onMouseLeave={() => setIsCategoryOpen(false)}
                            >
                                <button className='flex items-center gap-1 hover:text-primary cursor-pointer transition-colors duration-200 py-2'>
                                    {t.nav.categories}
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180 text-primary' : ''}`} />
                                </button>
                                
                                {isCategoryOpen && (
                                    <div className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} pt-2 w-56 animate-in fade-in slide-in-from-top-2 duration-200`}>
                                        <div className='bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 backdrop-blur-xl bg-white/95'>
                                                <Link 
                                                href="/categories" 
                                                className='block px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-50'
                                            >
                                                {t.categories.view_all}
                                            </Link>
                                            {categories.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    href={`/categories/${cat.id}`}
                                                    className='block px-4 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors text-[13.5px]'
                                                >
                                                    {cat.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </li>

                            <li><Link href="/#experiences" className='hover:text-primary cursor-pointer transition-colors duration-200'>{t.nav.experiences}</Link></li>
                            <li><Link href="/#map" className='hover:text-primary cursor-pointer transition-colors duration-200'>{t.nav.map}</Link></li>
                        </ul>
                    </nav>
                )}

                {/* Action / Language Switcher */}
                <div className='flex items-center gap-4'>
                    <button
                        onClick={toggleLanguage}
                        className='bg-white border border-gray-200 text-gray-700 text-[12px] font-bold px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200'
                    >
                        {language === 'en' ? 'AR' : 'EN'}
                    </button>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-3">
                            <Link href="/profile" className="flex items-center gap-2 group">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 group-hover:border-primary transition-colors">
                                    <svg className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <span className="hidden sm:block text-[14px] font-medium text-gray-700 group-hover:text-primary transition-colors">
                                    {user?.full_name.split(' ')[0]}
                                </span>
                            </Link>
                            <button
                                onClick={logout}
                                className="text-[12px] text-gray-400 hover:text-red-500 transition-colors font-medium border-l pl-3 border-gray-100"
                            >
                                {language === 'en' ? 'Logout' : 'خروج'}
                            </button>
                        </div>
                    ) : (
                        <Link href="/login">
                            <button className="bg-primary text-white text-[12px] font-bold px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm shadow-primary/20">
                                {language === 'en' ? 'Login' : 'دخول'}
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;