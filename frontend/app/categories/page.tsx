'use client';

import React, { useState } from 'react';
import CategoriesHeader from '@/components/AllCategories/CategoriesHeader';
import Footer from '@/components/Common/Footer';
import HeaderSection from '@/components/AllCategories/HeaderSection';
import CategoryFilters from '@/components/AllCategories/CategoryFilters';
import AttractionsGrid from '@/components/AllCategories/AttractionsGrid';
import { LanguageProvider } from '@/context/LanguageContext';
import { useAttractionsData } from '@/components/AllCategories/useAttractionsData';

const AllCategoriesPageContent = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const attractions = useAttractionsData();

    const resultsCount = activeCategory === 'all'
        ? attractions.length
        : attractions.filter(attr => attr.categoryId === activeCategory).length;

    return (
        <div className="min-h-screen bg-white">
            <CategoriesHeader />
            <main>
                <HeaderSection />
                <CategoryFilters
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    resultsCount={resultsCount}
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
            <AllCategoriesPageContent />
        </LanguageProvider>
    );
};

export default AllCategoriesPage;
