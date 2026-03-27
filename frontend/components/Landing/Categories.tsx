'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCategories } from '@/hooks/useApi';

const Categories = () => {
    const { t, language } = useLanguage();
    const { categories, loading, error } = useCategories();

    if (loading) return <div className="py-20 text-center text-gray-400">Loading categories...</div>;
    if (error) return null; // Or handle error

    return (
        <section id="categories" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="text-center md:text-left rtl:text-right rtl:md:text-right">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.categories.title}</h2>
                    <p className="text-gray-500">{t.categories.description}</p>
                </div>
                <Link
                    href="/categories"
                    className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all group"
                >
                    {t.categories.view_all}
                    <span className="rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <Link 
                        key={category.id} 
                        href={`/categories/${category.slug}`}
                        className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer block"
                    >
                        <Image
                            src={category.image || '/placeholder.png'}
                            alt={language === 'en' ? category.name_en : category.name_ar}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6 text-white text-left rtl:text-right">
                            <span className="text-2xl mb-2 block">{category.icon_emoji}</span>
                            <h3 className="text-xl font-bold">
                                {language === 'en' ? category.name_en : category.name_ar}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Categories;
