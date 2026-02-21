import React from 'react';
import Image from 'next/image';

function Header() {
    return (
        <header className='bg-white border-b border-gray-100 sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto flex justify-between items-center px-4 py-3 md:px-8 shadow-sm lg:shadow-none'>
                {/* Logo Section */}
                <div className='flex items-center gap-3'>
                    <Image
                        src="/logo.png"
                        alt="Kuwait Tourism"
                        width={32}
                        height={32}
                        className="h-8 w-auto object-contain"
                    />
                    <span className='text-xl font-extrabold text-[#003580] tracking-tight'>
                        Kuwait Tourism
                    </span>
                </div>

                {/* Navigation Links */}
                <nav className='hidden md:block'>
                    <ul className='flex gap-10 text-[13px] font-semibold text-gray-800 uppercase tracking-wider'>
                        <li className='hover:text-primary cursor-pointer transition-colors duration-200'>Explore</li>
                        <li className='hover:text-primary cursor-pointer transition-colors duration-200'>Stay</li>
                        <li className='hover:text-primary cursor-pointer transition-colors duration-200'>Events</li>
                        <li className='hover:text-primary cursor-pointer transition-colors duration-200'>Plan Your Trip</li>
                    </ul>
                </nav>

                {/* Action / Language Switcher */}
                <div className='flex items-center'>
                    <button className='bg-primary text-white text-[11px] font-bold px-5 py-2 rounded-sm hover:opacity-90 transition-all duration-200 uppercase shadow-md shadow-blue-200'>
                        EN/AR
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;