import React from 'react';
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

    if (loading) return <div className="py-20 text-center text-gray-400">Loading attractions...</div>;
    if (error) return null;

    return (
        <section className="px-4 md:px-8 max-w-7xl mx-auto pb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {places.map((place, idx) => (
                    <AttractionCard
                        key={idx}
                        id={place.slug}
                        title={language === 'en' ? place.title_en : place.title_ar}
                        category={place.category_name}
                        location={language === 'en' ? place.subtitle_en : place.subtitle_ar}
                        rating={place.average_rating || 0}
                        description={language === 'en' ? place.description_en : place.description_ar}
                        image={place.image1 || '/placeholder.png'}
                        reviews={`${place.reviews?.length || 0} reviews`}
                    />
                ))}
            </div>

            {/* <div className="mt-16 flex justify-center">
                <button className="px-8 py-3.5 rounded-full border border-gray-200 text-gray-900 font-bold hover:bg-gray-50 transition-all flex items-center gap-2 group">
                    {t.categories.page.load_more}
                    <span className="transition-transform group-hover:translate-y-0.5">▼</span>
                </button>
            </div> */}
        </section>
    );
};

export default AttractionsGrid;
