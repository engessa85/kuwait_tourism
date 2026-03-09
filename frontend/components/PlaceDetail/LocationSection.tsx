'use client';

import React from 'react';
import Image from 'next/image';

interface LocationSectionProps {
    title: string;
}

const LocationSection: React.FC<LocationSectionProps> = ({ title }) => {
    return (
        <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Location</h2>
            <div className="relative rounded-[2.5rem] overflow-hidden group shadow-md border border-gray-100">
                <div className="aspect-[21/9] relative">
                    <Image
                        src="/kuwait_map.png"
                        alt={`Map location of ${title}`}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-500/5 mix-blend-multiply" />

                    {/* Mock Pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white animate-bounce-slow">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 110-4 2 2 0 010 4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="mt-2 bg-white px-4 py-1.5 rounded-full shadow-lg text-[10px] font-bold text-gray-900 border border-gray-100">
                            {title}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-6 left-6">
                    <button className="bg-white px-6 py-3 rounded-2xl text-gray-900 font-bold text-sm shadow-xl hover:scale-105 transition-transform flex items-center gap-3 border border-gray-100">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Get Directions
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LocationSection;
