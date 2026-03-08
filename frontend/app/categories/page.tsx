'use client';

import React, { useState } from 'react';
import CategoriesHeader from '@/components/AllCategories/CategoriesHeader';
import Footer from '@/components/Common/Footer';
import HeaderSection from '@/components/AllCategories/HeaderSection';
import CategoryFilters from '@/components/AllCategories/CategoryFilters';
import AttractionsGrid from '@/components/AllCategories/AttractionsGrid';
import { LanguageProvider } from '@/context/LanguageContext';

const AllCategoriesPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    return (
        <LanguageProvider>
            <div className="min-h-screen bg-white">
                <CategoriesHeader />
                <main>
                    <HeaderSection />
                    <CategoryFilters
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />
                    <AttractionsGrid activeCategory={activeCategory} />
                </main>
                <Footer />
            </div>
        </LanguageProvider>
    );
};

export default AllCategoriesPage;
