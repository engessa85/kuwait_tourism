'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAttractionsData } from '@/components/AllCategories/useAttractionsData';
import { LanguageProvider } from '@/context/LanguageContext';
import DetailHeader from '@/components/PlaceDetail/DetailHeader';
import Footer from '@/components/Common/Footer';
import PlaceHeader from '@/components/PlaceDetail/PlaceHeader';
import ImageGallery from '@/components/PlaceDetail/ImageGallery';
import InfoCards from '@/components/PlaceDetail/InfoCards';
import AboutSection from '@/components/PlaceDetail/AboutSection';
import LocationSection from '@/components/PlaceDetail/LocationSection';
import BookingSidebar from '@/components/PlaceDetail/BookingSidebar';

const DetailPageContent = () => {
    const params = useParams();
    const id = params.id as string;
    const attractions = useAttractionsData();
    const { t } = useLanguage();

    const attraction = attractions.find(a => a.id === id) || attractions[0];

    // Fallback/Mock data for details if not present (using Kuwait Towers as base for design)
    const details = attraction.details || attractions[0].details;

    return (
        <div className="min-h-screen bg-white">
            <DetailHeader />
            <main>
                <PlaceHeader title={attraction.title} location={attraction.location} />
                <ImageGallery images={[attraction.image]} />

                <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 pb-8">
                    <div className="lg:col-span-2">
                        <InfoCards
                            hours={details.opening_hours}
                            fee={details.entry_fee}
                            rating={details.rating_summary}
                        />
                        <AboutSection
                            title={attraction.title}
                            description={details.about}
                            extendedDescription={details.about_extended}
                            features={details.features}
                        />
                    </div>

                    <div className="hidden lg:block">
                        <BookingSidebar />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <LocationSection title={attraction.title} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default function AttractionDetailPage() {
    return (
        <LanguageProvider>
            <DetailPageContent />
        </LanguageProvider>
    );
}
