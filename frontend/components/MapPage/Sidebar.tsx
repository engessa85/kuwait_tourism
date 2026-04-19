'use client';

import React from 'react';
import PlaceCard from './PlaceCard';

interface CategoryOption {
    id: string;
    label: string;
}

interface SidebarPlace {
    id: string;
    title: string;
    category: string;
    distance: string;
    rating: number;
    reviewsCount: string;
    image: string;
}

interface SidebarProps {
    places: SidebarPlace[];
    activePlaceId: string | null;
    onPlaceSelect: (id: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    categories?: CategoryOption[];
}

export default function Sidebar({
    places,
    activePlaceId,
    onPlaceSelect,
    searchQuery,
    onSearchChange,
    activeCategory,
    onCategoryChange,
    categories = []
}: SidebarProps) {
    const displayCategories = categories.length > 0
        ? categories
        : [{ id: 'all', label: 'All' }];
    return (
        <div className="w-[380px] bg-white h-full border-r border-gray-100 flex flex-col shadow-sm z-10 shrink-0">
            {/* Header: Search and Categories */}
            <div className="p-6 pb-2">
                {/* Search Bar */}
                <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-sm text-gray-900 placeholder-gray-400"
                        placeholder="Search attractions, food, hotels..."
                    />
                    {searchQuery && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute inset-y-0 right-12 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}

                </div>

                {/* Categories */}
                <div className="flex gap-2 mb-2 overflow-x-auto pb-2 scrollbar-none">
                    {displayCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shadow-sm transition-colors ${activeCategory === category.id
                                ? 'bg-gray-900 text-white'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {category.id === 'all' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* List Header */}
            <div className="px-6 py-2 pb-0">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Popular Nearby</h3>
            </div>

            {/* Places List (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {places.length > 0 ? (
                    places.map(place => (
                        <PlaceCard
                            key={place.id}
                            {...place}
                            isActive={activePlaceId === place.id}
                            onClick={() => onPlaceSelect(place.id)}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 mt-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-sm font-medium">No places found</p>
                        <p className="text-gray-400 text-xs mt-1">Try a different search term</p>
                    </div>
                )}
            </div>
        </div>
    );
}
