import React, { useState } from 'react';
import AttractionCard from '@/components/AllCategories/AttractionCard';
import { useLanguage } from '@/context/LanguageContext';
import { usePlaces } from '@/hooks/useApi';

interface AttractionsGridProps {
    activeCategory: string; // This can be 'all' or a category slug
}

const AttractionsGrid: React.FC<AttractionsGridProps> = ({ activeCategory }) => {
    const { t, language } = useLanguage();
    const params = activeCategory !== 'all' ? `category_slug=${activeCategory}` : '';
    const { places, loading, error } = usePlaces(params);
    const [sortBy, setSortBy] = useState<'none' | 'az' | 'za' | 'rating-high' | 'rating-low'>('none');

    if (loading) return <div className="py-20 text-center text-gray-400">Loading attractions...</div>;
    if (error) return null;

    const sortedPlaces = [...places].sort((a, b) => {
        const titleA = (language === 'en' ? a.title_en : a.title_ar) || '';
        const titleB = (language === 'en' ? b.title_en : b.title_ar) || '';
        
        switch (sortBy) {
            case 'az':
                return titleA.localeCompare(titleB, language);
            case 'za':
                return titleB.localeCompare(titleA, language);
            case 'rating-high':
                return (b.average_rating || 0) - (a.average_rating || 0);
            case 'rating-low':
                return (a.average_rating || 0) - (b.average_rating || 0);
            default:
                return 0;
        }
    });

    const SortButton = ({ type, label }: { type: typeof sortBy, label: string }) => (
        <button
            onClick={() => setSortBy(sortBy === type ? 'none' : type)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                sortBy === type 
                ? 'bg-primary border-primary text-white shadow-md shadow-primary/20' 
                : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200 hover:bg-gray-50'
            }`}
        >
            {label}
        </button>
    );

    return (
        <section className="px-4 md:px-8 max-w-7xl mx-auto pb-20">
            {/* Sorting Buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
                <SortButton type="az" label={t.categories.page.az} />
                <SortButton type="za" label={t.categories.page.za} />
                <SortButton type="rating-high" label={t.categories.page.rating_high} />
                <SortButton type="rating-low" label={t.categories.page.rating_low} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {sortedPlaces.map((place, idx) => (
                    <AttractionCard
                        key={idx}
                        id={place.slug}
                        title={language === 'en' ? place.title_en : place.title_ar}
                        category={place.category_name || place.category_name_en || place.category_name_ar || 'Attraction'}
                        location={language === 'en' ? place.subtitle_en : place.subtitle_ar}
                        rating={place.average_rating || 0}
                        description={language === 'en' ? place.description_en : place.description_ar}
                        image={place.image1 || '/placeholder.png'}
                        reviews={`${place.reviews?.length || 0} reviews`}
                    />
                ))}
            </div>
        </section>
    );
};

export default AttractionsGrid;
