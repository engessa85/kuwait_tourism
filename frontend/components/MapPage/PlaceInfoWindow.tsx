'use client';

import React from 'react';
import Image from 'next/image';

interface PlaceInfoWindowProps {
    place: {
        title: string;
        category: string;
        rating: number;
        reviewsCount: string;
        image: string;
        location: string;
        distance: string;
        description: string;
        isOpen?: boolean;
    };
    onClose: () => void;
}

export default function PlaceInfoWindow({ place, onClose }: PlaceInfoWindowProps) {
    return (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-[380px] font-sans border border-gray-100">
            {/* Image Header */}
            <div className="relative h-[220px] w-full">
                <Image
                    src={place.image}
                    alt={place.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 via-transparent to-transparent"></div>

                {/* Top Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Status Tags */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                    {place.isOpen && (
                        <span className="bg-gray-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10">
                            Open Now
                        </span>
                    )}
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-primary/50 shadow-sm">
                        {place.category}
                    </span>
                </div>
            </div>

            {/* Content Details */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-bold text-gray-900 leading-tight pr-4">{place.title}</h2>
                    <div className="flex flex-col items-end shrink-0">
                        <div className="flex items-center gap-1 text-primary pr-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            <span className="font-bold">{place.rating}</span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium underline decoration-slate-200 underline-offset-2">{place.reviewsCount} reviews</span>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mb-6">{place.location}</p>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-3 gap-2 mb-6 text-sm text-gray-600 font-medium pb-5 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {place.distance}
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        3 KWD
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        8 AM - 11 PM
                    </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {place.description}
                </p>

                {/* Action Buttons */}
                <div className="flex">
                    <button className="flex-1 bg-[#1a4eff] hover:bg-[#163fcc] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        Get Directions
                    </button>
                </div>
            </div>
        </div>
    );
}
