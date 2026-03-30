'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/utils/api';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';

interface BookingSidebarProps {
    price?: string;
    placeId: number;
    initialIsFavorite?: boolean;
}

const BookingSidebar = ({ price, placeId, initialIsFavorite = false }: BookingSidebarProps) => {
    const { isAuthenticated, fetchMe } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsFavorite(initialIsFavorite);
    }, [initialIsFavorite]);

    const toggleFavorite = async () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        setLoading(true);
        try {
            if (isFavorite) {
                // If it's a favorite, we need to find the favorite ID to delete it.
                // Or better, we can have a toggle endpoint. 
                // Since we don't have a toggle endpoint, we fetch existing favorites for this place.
                const favRes = await api.get('/places/favorites/');
                if (favRes.ok) {
                    const favorites = await favRes.json();
                    const fav = favorites.find((f: any) => f.place === placeId);
                    if (fav) {
                        const delRes = await api.delete(`/places/favorites/${fav.id}/`);
                        if (delRes.ok) {
                            setIsFavorite(false);
                            fetchMe(); // Re-fetch user stats
                        }
                    }
                }
            } else {
                const res = await api.post('/places/favorites/', { place: placeId });
                if (res.ok) {
                    setIsFavorite(true);
                    fetchMe(); // Re-fetch user stats
                }
            }
        } catch (error) {
            console.error("Failed to toggle favorite:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <aside className="sticky top-24">
            <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-500/5">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">{t.profile.dashboard.saved_attractions.explore_btn.split(' ')[0]} starting from</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-gray-900">{price || 'KD 0.000'}</span>
                            <span className="text-xs text-gray-400 font-medium">/person</span>
                        </div>
                    </div>
                    <div className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-lg border border-green-100 uppercase tracking-tighter">
                        Available
                    </div>
                </div>

                <button 
                    onClick={toggleFavorite}
                    disabled={loading}
                    className={`w-full py-4 rounded-[1.5rem] font-bold transition-all shadow-lg flex items-center justify-center gap-3 active:scale-[0.98] group ${
                        isFavorite 
                        ? 'bg-red-50 text-red-500 shadow-red-500/10 border border-red-100' 
                        : 'bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-700'
                    }`}
                >
                    {isFavorite ? 'Removed from favourite' : 'Add to favourite'}
                    <svg 
                        className={`w-5 h-5 transition-transform group-hover:scale-110 ${isFavorite ? 'fill-current' : 'fill-none stroke-current stroke-2'}`} 
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </button>

                <p className="text-[10px] text-gray-400 text-center mt-4 font-medium italic">
                    Instant confirmation • Mobile tickets accepted
                </p>
            </div>

            <div className="mt-6 bg-blue-600/5 p-6 rounded-[2.5rem] border border-blue-50">
                <h3 className="text-sm font-bold text-gray-900 mb-2">{t.nav.help || 'Need Help?'}</h3>
                <p className="text-xs text-gray-500 font-medium mb-4 leading-relaxed">Call our tourism hotline for assistance with your visit.</p>
                <a href="tel:+96512345678" className="flex items-center gap-3 text-blue-600 text-sm font-black hover:underline">
                    <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xs">
                        📞
                    </div>
                    +965 123 45678
                </a>
            </div>
        </aside>
    );
};

export default BookingSidebar;
