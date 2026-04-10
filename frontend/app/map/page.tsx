'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/MapPage/Sidebar';
import InteractiveMap from '../../components/MapPage/InteractiveMap';
import Header from '../../components/Common/Header';
import { useLanguage } from '../../context/LanguageContext';
import { useCategories, usePlaces } from '@/hooks/useApi';

const API_BASE_URL = 'http://localhost:8000';

const getImageUrl = (imagePath?: string | null) => {
    if (!imagePath) return '/placeholder.png';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    return `${API_BASE_URL}${imagePath}`;
};

export default function MapPage() {
    const { language } = useLanguage();
    const [activePlaceId, setActivePlaceId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const { categories, loading: catLoading } = useCategories();
    const { places, loading: placesLoading } = usePlaces();

    if (catLoading || placesLoading) return <div className="h-screen flex items-center justify-center">Loading map...</div>;

    const dynamicCategories = [
        { id: 'all', label: 'All' },
        ...categories.map((category) => ({
            id: category.slug,
            label: language === 'en' ? category.name_en : category.name_ar,
        })),
    ];

    const validPlaces = places.filter((place) => {
        const lat = Number(place.latitude);
        const lng = Number(place.longitude);
        return Number.isFinite(lat) && Number.isFinite(lng);
    });

    const mappedPlaces = validPlaces.map((place) => ({
        id: place.slug,
        title: language === 'en' ? place.title_en : place.title_ar,
        category: language === 'en'
            ? (place.category_name_en || place.category_name)
            : (place.category_name_ar || place.category_name),
        categorySlug: place.category_slug || String(place.category),
        distance: '', // Calculated dynamic if needed
        rating: place.average_rating || 0,
        reviewsCount: `${place.reviews?.length || 0}`,
        image: getImageUrl(place.image1),
        location: language === 'en'
            ? (place.subtitle_en || '')
            : (place.subtitle_ar || ''),
        description: language === 'en'
            ? (place.description_en || '')
            : (place.description_ar || ''),
        isOpen: true,
        closingTime: '',
        position: { lat: Number(place.latitude), lng: Number(place.longitude) }
    }));

    const filteredPlaces = mappedPlaces.filter(place => {
        const normalizedQuery = searchQuery.toLowerCase();
        const matchesSearch = place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            place.category.toLowerCase().includes(normalizedQuery) ||
            place.location.toLowerCase().includes(normalizedQuery);
        const matchesCategory = activeCategory === 'all' || place.categorySlug === activeCategory;
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
