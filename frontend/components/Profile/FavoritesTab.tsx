'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/utils/api';
import { useLanguage } from '@/context/LanguageContext';
import { API_BASE_URL, buildMediaUrl } from '@/utils/urls';

export default function FavoritesTab() {
    const { language, t } = useLanguage();
    const [favorites, setFavorites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        try {
            const res = await api.get('/places/favorites/');
            if (res.ok) {
                const data = await res.json();
                setFavorites(data);
            }
        } catch (error) {
            console.error("Failed to fetch favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const handleRemove = async (id: number) => {
        try {
            const res = await apiFetch(`/places/favorites/${id}/`, { method: 'DELETE' });
            if (res.ok) {
                setFavorites(favorites.filter(f => f.id !== id));
            }
        } catch (error) {
            console.error("Failed to remove favorite:", error);
        }
    };

    // Helper for apiFetch DELETE since api object doesn't have it explicitly
    const apiFetch = async (endpoint: string, options: any) => {
        const token = localStorage.getItem('access_token');
        return fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                ...options.headers
            }
        });
    };

    if (loading) return <div>Loading favorites...</div>;

    if (favorites.length === 0) {
        return (
            <div className="bg-white rounded-3xl p-12 border border-dashed border-gray-200 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.profile.dashboard.saved_attractions.no_favorites}</h3>
                <p className="text-gray-500 mb-8">{t.profile.dashboard.subtitle}</p>
                <Link href="/categories" className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary/90 transition-all">
                    {t.profile.dashboard.saved_attractions.explore_btn}
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t.profile.sidebar.saved_attractions}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((fav) => {
                    const place = fav.place_details;
                    return (
                        <div key={fav.id} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="aspect-4/5 relative">
                                {place.image1 && (
                                    <Image 
                                        src={buildMediaUrl(place.image1)} 
                                        alt={language === 'en' ? place.title_en : place.title_ar} 
                                        fill 
                                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                )}
                                <button 
                                    onClick={() => handleRemove(fav.id)}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all shadow-lg"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-6">
                                <h4 className="text-lg font-black text-gray-900 mb-1 group-hover:text-primary transition-colors">
                                    {language === 'en' ? place.title_en : place.title_ar}
                                </h4>
                                <p className="text-gray-400 text-xs font-bold mb-4">
                                    {language === 'en' ? place.category_name_en : place.category_name_ar}
                                </p>
                                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                    <p className="text-[10px] text-gray-500 font-medium">{place.price}</p>
                                    <Link href={`/attractions/${place.slug}`} className="text-[10px] font-black text-primary tracking-widest hover:underline uppercase">
                                        {t.profile.dashboard.saved_attractions.view_details}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
