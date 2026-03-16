'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/MapPage/Sidebar';
import InteractiveMap from '../../components/MapPage/InteractiveMap';
import { MAP_PLACES } from '../../components/MapPage/mockData';
import Header from '../../components/Common/Header';
import { LanguageProvider } from '../../context/LanguageContext';

export default function MapPage() {
    const [activePlaceId, setActivePlaceId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPlaces = MAP_PLACES.filter(place => {
        const matchesSearch = place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            place.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || place.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <LanguageProvider>
            <div className="flex flex-col h-screen overflow-hidden">
                <Header showNav={false} />
                <div className="flex flex-1 bg-gray-50 overflow-hidden">
                    <Sidebar
                        places={filteredPlaces}
                        activePlaceId={activePlaceId}
                        onPlaceSelect={setActivePlaceId}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />
                    <div className="flex-1 relative">
                        <InteractiveMap
                            places={filteredPlaces}
                            activePlaceId={activePlaceId}
                            onPlaceSelect={setActivePlaceId}
                        />
                    </div>
                </div>
            </div>
        </LanguageProvider>
    );
}
