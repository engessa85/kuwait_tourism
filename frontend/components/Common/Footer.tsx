import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className='w-8 h-8 bg-primary rounded-sm flex items-center justify-center'>
                                <div className='w-4 h-4 bg-white transform rotate-45 opacity-20'></div>
                            </div>
                            <span className='text-lg font-bold text-gray-900 uppercase tracking-tight'>
                                Kuwait Tourism
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            The official guide to exploring the hidden gems of the Gulf. Experience tradition, luxury, and adventure.
                        </p>
                        <div className="flex gap-4">
                            {['🐦', '📸', '📘', '🔗'].map((icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 font-primary">Discover</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-primary transition-colors">Historical Sites</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Modern Architecture</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Beaches & Islands</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Desert Adventures</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Shopping Destinations</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 font-primary">Plan Your Trip</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-primary transition-colors">How to get here</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Best time to visit</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Entry Requirements</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Travel Tips</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 font-primary">Events</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-primary transition-colors">Upcoming Festivals</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Art Exhibitions</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Food Festivals</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Sports Events</a></li>
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
                        <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
