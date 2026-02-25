import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <Image
                                src="/logo.png"
                                alt="Kuwait Tourism"
                                width={32}
                                height={32}
                                className="h-8 w-auto object-contain"
                            />
                            <span className='text-lg font-bold text-gray-900 uppercase tracking-tight'>
                                Kuwait Tourism
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs">
                            The official guide to exploring the hidden gems of the Gulf. Experience tradition, luxury, and adventure.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {/* Instagram */}
                            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white text-gray-500 transition-all duration-300">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            {/* Twitter / X */}
                            <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white text-gray-500 transition-all duration-300">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            {/* Email */}
                            <a href="mailto:info@kuwait-tourism.gov.kw" aria-label="Email" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white text-gray-500 transition-all duration-300">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Explore Column (matches Categories section) */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Explore</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#categories" className="hover:text-primary transition-colors">Historical</a></li>
                            <li><a href="#categories" className="hover:text-primary transition-colors">Modern</a></li>
                            <li><a href="#categories" className="hover:text-primary transition-colors">Nature</a></li>
                            <li><a href="#categories" className="hover:text-primary transition-colors">Shopping</a></li>
                            <li><a href="#categories" className="hover:text-primary transition-colors">Dining</a></li>
                            <li><a href="#categories" className="hover:text-primary transition-colors">Arts</a></li>
                        </ul>
                    </div>

                    {/* Featured Experiences Column (matches Experiences section) */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Featured Experiences</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#experiences" className="hover:text-primary transition-colors">Grand Mosque Guided Tour</a></li>
                            <li><a href="#experiences" className="hover:text-primary transition-colors">Failaka Island Heritage</a></li>
                            <li><a href="#experiences" className="hover:text-primary transition-colors">Mirror House Art Gallery</a></li>
                            <li><a href="#experiences" className="hover:text-primary transition-colors">Al-Salmi Desert Stars</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-400 text-xs text-center md:text-left">
                        © {new Date().getFullYear()} Kuwait Tourism. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-xs text-gray-400 uppercase tracking-widest font-bold">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
