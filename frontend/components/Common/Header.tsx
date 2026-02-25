import React from 'react';
import Image from 'next/image';

function Header() {
    return (
        <header className='bg-white border-b border-gray-100 sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto flex justify-between items-center px-4 py-4 md:px-8'>
                {/* Logo Section */}
                <div className='flex items-center gap-3'>
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
                </div>

                {/* Navigation Links */}
                <nav className='hidden md:block'>
                    <ul className='flex gap-8 text-[14px] font-medium text-gray-600'>
                        <li><a href="#home" className='hover:text-primary cursor-pointer transition-colors duration-200'>Home</a></li>
                        <li><a href="#categories" className='hover:text-primary cursor-pointer transition-colors duration-200'>Categories</a></li>
                        <li><a href="#experiences" className='hover:text-primary cursor-pointer transition-colors duration-200'>Experiences</a></li>
                        <li><a href="#map" className='hover:text-primary cursor-pointer transition-colors duration-200'>Map</a></li>
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