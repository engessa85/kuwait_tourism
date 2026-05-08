'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { usePlaces } from '@/hooks/useApi';

const Experiences = () => {
    const { t, language } = useLanguage();
    const { places, loading, error } = usePlaces();
    const [visibleCount, setVisibleCount] = useState(4);

    if (loading) return <div className="py-20 text-center text-gray-400">Loading experiences...</div>;
    if (error) return null;

    const visiblePlaces = (places || []).slice(0, visibleCount);
    const hasMore = (places || []).length > visibleCount;
    const canShowLess = visibleCount > 4;

    const handleViewMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    const handleShowLess = () => {
        setVisibleCount(prev => Math.max(4, prev - 4));
    };

    return (
        <section id="experiences" className="py-20 bg-gray-50/50 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full mb-4 inline-block">
                        {t.experiences.curated_badge}
                    </span>
                    <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">{t.experiences.title}</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        {t.experiences.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {visiblePlaces.map((place, idx) => (
                        <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
                            <div className="relative h-60 w-full">
                                <Link href={`/attractions/${place.slug}`}>
                                    <Image
                                        src={place.image1 || '/placeholder.png'}
                                        alt={language === 'en' ? place.title_en : place.title_ar}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </Link>
                                <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-gray-900 shadow-sm border border-gray-100">
                                    <span className="rtl:hidden">From </span><span className="text-primary">{place.price || 'KD 0.000'}</span><span className="hidden rtl:inline"> تبدأ من</span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col grow text-left rtl:text-right">
                                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2 rtl:flex-row-reverse">
                                    <span className="w-1 h-1 bg-primary rounded-full"></span>
                                    {place.category_name || place.category_name_en || place.category_name_ar || 'Attraction'}
                                </span>
                                <Link href={`/attractions/${place.slug}`}>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                        {language === 'en' ? place.title_en : place.title_ar}
                                    </h3>
                                </Link>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 grow line-clamp-2">
                                    {language === 'en' ? place.description_en : place.description_ar}
                                </p>
                                <Link href={`/attractions/${place.slug}`} className="w-full border border-primary/20 hover:border-primary text-primary font-bold py-3 rounded-xl text-sm transition-all hover:bg-primary/5 text-center">
                                    {t.experiences.more}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Buttons */}
                <div className="flex justify-center gap-4">
                    {hasMore && (
                        <button 
                            onClick={handleViewMore}
                            className="bg-primary text-white font-bold py-3 px-8 rounded-xl text-sm transition-all hover:bg-primary/90 shadow-lg shadow-primary/20"
                        >
                            {t.experiences.view_more}
                        </button>
                    )}
                    {canShowLess && (
                        <button 
                            onClick={handleShowLess}
                            className="bg-white border border-gray-200 text-gray-600 font-bold py-3 px-8 rounded-xl text-sm transition-all hover:bg-gray-50"
                        >
                            {t.experiences.show_less}
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};


export default Experiences;
