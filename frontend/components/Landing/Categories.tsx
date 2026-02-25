'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const Categories = () => {
    const { t } = useLanguage();

    const categories = [
        { name: t.categories.items.historical, image: '/kuwait_historical_cat.png', icon: '🏛️' },
        { name: t.categories.items.modern, image: '/kuwait_modern_cat.png', icon: '🏙️' },
        { name: t.categories.items.nature, image: '/kuwait_nature_cat.png', icon: '🏜️' },
        { name: t.categories.items.shopping, image: '/kuwait_shoping.webp', icon: '🛍️' },
        { name: t.categories.items.dining, image: '/kuwait_dinning.webp', icon: '🍽️' },
        { name: t.categories.items.arts, image: '/kuwait_arts.jpg', icon: '🎨' },
    ];

    return (
        <section id="categories" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.categories.title}</h2>
                <p className="text-gray-500">{t.categories.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div key={category.name} className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
                        <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6 text-white text-left rtl:text-right">
                            <span className="text-2xl mb-2 block">{category.icon}</span>
                            <h3 className="text-xl font-bold">{category.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
