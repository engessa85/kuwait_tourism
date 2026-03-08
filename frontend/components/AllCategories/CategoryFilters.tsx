'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface CategoryFiltersProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    resultsCount: number;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ activeCategory, onCategoryChange, resultsCount }) => {
    const { t, isRTL } = useLanguage();

    const filters = [
        { id: 'all', label: t.categories.items.all },
        { id: 'historical', label: t.categories.items.historical },
        { id: 'modern', label: t.categories.items.modern },
        { id: 'nature', label: t.categories.items.nature },
        { id: 'shopping', label: t.categories.items.shopping },
        { id: 'dining', label: t.categories.items.dining },
    ];

    return (
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-12">
            <div className="flex flex-wrap items-center justify-between gap-6 border-y border-gray-100 py-6">
                <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => onCategoryChange(filter.id)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === filter.id
                                ? 'bg-gray-900 text-white shadow-lg'
                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between mt-8">
                <p className="text-gray-500 text-sm">
                    {t.categories.page.showing_results.replace('{{count}}', resultsCount.toString())}
                </p>
            </div>
        </section>
    );
};

export default CategoryFilters;
