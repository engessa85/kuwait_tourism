'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/MapPage/Sidebar';
import InteractiveMap from '../../components/MapPage/InteractiveMap';
import Header from '../../components/Common/Header';
import { LanguageProvider } from '../../context/LanguageContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCategories, usePlaces } from '@/hooks/useApi';

export default function MapPage() {
    const { language, t } = useLanguage();
    const [activePlaceId, setActivePlaceId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const { categories, loading: catLoading } = useCategories();
    const { places, loading: placesLoading } = usePlaces();

    if (catLoading || placesLoading) return <div className="h-screen flex items-center justify-center">Loading map...</div>;

    const dynamicCategories = ['All', ...categories.map(c => language === 'en' ? c.name_en : c.name_ar)];

    const validPlaces = places.filter(p => p.latitude && p.longitude);

    const mappedPlaces = validPlaces.map(p => ({
        id: p.slug,
        title: language === 'en' ? p.title_en : p.title_ar,
        category: p.category_name,
        distance: '', // Calculated dynamic if needed
        rating: p.average_rating || 0,
        reviewsCount: `${p.reviews?.length || 0}`,
        image: p.image1 || '/placeholder.png',
        location: language === 'en' ? p.subtitle_en : p.subtitle_ar,
        description: language === 'en' ? p.description_en : p.description_ar,
        isOpen: true,
        closingTime: '',
        position: { lat: parseFloat(p.latitude as string), lng: parseFloat(p.longitude as string) }
    }));

    const filteredPlaces = mappedPlaces.filter(place => {
        const matchesSearch = place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            place.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || place.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
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
                    categories={dynamicCategories}
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
    );
}
