'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/utils/api';
import { useLanguage } from '@/context/LanguageContext';

interface ReviewItem {
    id: number;
    place: number;
    place_slug: string;
    place_title_en: string;
    place_title_ar: string;
    rating: number;
    comment: string;
    created_at: string;
}

export default function ReviewsTab() {
    const { language, t } = useLanguage();
    const [reviews, setReviews] = useState<ReviewItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editComment, setEditComment] = useState('');
    const [editRating, setEditRating] = useState(5);

    const fetchReviews = async () => {
        try {
            const res = await api.get('/places/reviews/?user_me=true'); 
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            }
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        try {
            const res = await api.delete(`/places/reviews/${id}/`);
            if (res.ok) {
                setReviews(reviews.filter(r => r.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete review:", error);
        }
    };

    const handleUpdate = async (id: number) => {
        try {
            const res = await api.patch(`/places/reviews/${id}/`, {
                comment: editComment,
                rating: editRating
            });
            if (res.ok) {
                const updated = await res.json();
                setReviews(reviews.map(r => r.id === id ? updated : r));
                setEditingId(null);
            }
        } catch (error) {
            console.error("Failed to update review:", error);
        }
    };

    if (loading) return <div>Loading reviews...</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t.profile.dashboard.reviews.title}</h2>
            <div className="space-y-6">
                {reviews.length === 0 ? (
                    <p className="text-gray-500">{t.profile.dashboard.reviews.no_reviews}</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400 mb-2">
                                        Reviewed Place
                                    </p>
                                    <Link
                                        href={`/attractions/${review.place_slug}`}
                                        className="inline-flex items-center gap-2 font-bold text-gray-900 hover:text-primary transition-colors"
                                    >
                                        <span>{language === 'en' ? review.place_title_en : review.place_title_ar}</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                    <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => {
                                            setEditingId(review.id);
                                            setEditComment(review.comment);
                                            setEditRating(review.rating);
                                        }}
                                        className="p-2 text-gray-400 hover:text-primary transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(review.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {editingId === review.id ? (
                                <div className="mt-4 space-y-4">
                                    <div className="flex gap-2 mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button 
                                                key={star} 
                                                onClick={() => setEditRating(star)}
                                                className={`text-2xl ${star <= editRating ? 'text-yellow-500' : 'text-gray-200'}`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                    <textarea 
                                        value={editComment}
                                        onChange={(e) => setEditComment(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none min-h-[100px]"
                                    />
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleUpdate(review.id)}
                                            className="bg-primary text-white font-bold py-2 px-6 rounded-xl text-sm"
                                        >
                                            Update
                                        </button>
                                        <button 
                                            onClick={() => setEditingId(null)}
                                            className="bg-gray-100 text-gray-600 font-bold py-2 px-6 rounded-xl text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-600 text-sm italic leading-relaxed">
                                    &quot;{review.comment}&quot;
                                </p>
                            )}
                            <p className="text-[10px] text-gray-400 mt-4">{new Date(review.created_at).toLocaleDateString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
