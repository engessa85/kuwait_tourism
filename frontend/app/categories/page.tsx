'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CategoriesHeader from '@/components/AllCategories/CategoriesHeader';
import Footer from '@/components/Common/Footer';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import HeaderSection from '@/components/AllCategories/HeaderSection';
import CategoryFilters from '@/components/AllCategories/CategoryFilters';
import AttractionsGrid from '@/components/AllCategories/AttractionsGrid';
import { useCategories, usePlaces } from '@/hooks/useApi';

const AllCategoriesPageContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const filterParam = searchParams.get('filter') || 'all';
    const { t } = useLanguage();
    
    // Use the URL param as the source of truth
    const activeCategory = filterParam;
    const setActiveCategory = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === 'all') {
            params.delete('filter');
        } else {
            params.set('filter', category);
        }
        router.push(`/categories?${params.toString()}`, { scroll: false });
    };

    const { categories, loading: catLoading } = useCategories();
    // For resultsCount, we fetch all places initially or filter them
    const { places, loading: placesLoading } = usePlaces(activeCategory !== 'all' ? `category_slug=${activeCategory}` : '');

    if (catLoading || placesLoading) return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;

    const resultsCount = places.length;

    return (
        <div className="min-h-screen bg-white">
            <CategoriesHeader />
            <main>
                <HeaderSection />
                <CategoryFilters
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    resultsCount={resultsCount}
                    categories={categories}
                />
                <AttractionsGrid activeCategory={activeCategory} />
            </main>
            <Footer />
        </div>
    );
};

const AllCategoriesPage = () => {
    return (
        <LanguageProvider>
            <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
                <AllCategoriesPageContent />
            </Suspense>
        </LanguageProvider>
    );
};

export default AllCategoriesPage;
