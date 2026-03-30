'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { usePlace } from '@/hooks/useApi';
import { LanguageProvider } from '@/context/LanguageContext';
import DetailHeader from '@/components/PlaceDetail/DetailHeader';
import Footer from '@/components/Common/Footer';
import PlaceHeader from '@/components/PlaceDetail/PlaceHeader';
import ImageGallery from '@/components/PlaceDetail/ImageGallery';
import InfoCards from '@/components/PlaceDetail/InfoCards';
import AboutSection from '@/components/PlaceDetail/AboutSection';
import LocationSection from '@/components/PlaceDetail/LocationSection';
import BookingSidebar from '@/components/PlaceDetail/BookingSidebar';
import ReviewsSection from '@/components/PlaceDetail/ReviewsSection';

const DetailPageContent = () => {
    const params = useParams();
    const slug = params.id as string;
    const { language, t } = useLanguage();
    const { place, loading, error } = usePlace(slug);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error || !place) return <div className="min-h-screen flex items-center justify-center text-red-500">Place not found</div>;

    const images = [place.image1, place.image2, place.image3, place.image4].filter(Boolean);

    return (
        <div className="min-h-screen bg-white">
            <DetailHeader />
            <main>
                <PlaceHeader
                    title={language === 'en' ? place.title_en : place.title_ar}
                    location={language === 'en' ? place.subtitle_en : place.subtitle_ar}
                />
                <ImageGallery images={images.length > 0 ? images : ['/placeholder.png']} />

                <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 pb-8">
                    <div className="lg:col-span-2">
                        <AboutSection
                            title={language === 'en' ? place.title_en : place.title_ar}
                            description={language === 'en' ? place.description_en : place.description_ar}
                            extendedDescription={""} // Add if needed in model
                            features={[]} // Add if needed in model
                        />
                        <ReviewsSection placeId={place.id} initialReviews={place.reviews} />
                    </div>

                    <div className="hidden lg:block">
                        <BookingSidebar 
                            price={place.price} 
                            placeId={place.id} 
                            initialIsFavorite={place.is_favorite} 
                        />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <LocationSection
                        title={language === 'en' ? place.title_en : place.title_ar}
                        lat={place.latitude}
                        lng={place.longitude}
                    />
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
