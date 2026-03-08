'use client';

import { useLanguage } from '@/context/LanguageContext';

export const useAttractionsData = () => {
    const { t } = useLanguage();

    const attractions = [
        {
            ...t.experiences.items.kuwait_towers,
            categoryId: 'modern',
            image: '/kuwait_modern_cat.png'
        },
        {
            ...t.experiences.items.mubarakiya,
            categoryId: 'historical',
            image: '/kuwait_historical_cat.png'
        },
        {
            ...t.experiences.items.avenues,
            categoryId: 'shopping',
            image: '/kuwait_shoping.webp'
        },
        {
            ...t.experiences.items.grand_mosque_alt,
            categoryId: 'historical',
            image: '/kuwait_grand_mosque.jpg'
        },
        {
            ...t.experiences.items.shaheed_park,
            categoryId: 'nature',
            image: '/kuwait_nature_cat.png'
        },
        {
            ...t.experiences.items.scientific_center,
            categoryId: 'modern',
            image: '/kuwait_arts.jpg'
        },
        {
            ...t.experiences.items.al_boom,
            categoryId: 'dining',
            image: '/kuwait_Al Boom_Steak_and_Seafood Restaurant.jpeg'
        }
    ];

    return attractions;
};
