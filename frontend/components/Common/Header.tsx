import React from 'react';
import Image from 'next/image';

function Header() {
    return (
        <header className='bg-white border-b border-gray-100 sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto flex justify-between items-center px-4 py-4 md:px-8'>
                {/* Logo Section */}
                <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-primary rounded-sm flex items-center justify-center'>
                        <div className='w-4 h-4 bg-white transform rotate-45 opacity-20'></div>
                    </div>
                    <span className='text-lg font-bold text-gray-900'>
                        Kuwait Tourism
                    </span>
                </div>

                {/* Navigation Links */}
                <nav className='hidden md:block'>
                    <ul className='flex gap-8 text-[14px] font-medium text-gray-600'>
                        <li className='hover:text-primary cursor-pointer transition-colors duration-200'>Explore</li>
                        <li className='hover:text-primary cursor-pointer transition-colors duration-200'>Events</li>
                    </ul>
                </nav>

                {/* Action / Language Switcher */}
                <div className='flex items-center'>
                    <button className='bg-primary text-white text-[12px] font-bold px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm'>
                        EN/AR
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;