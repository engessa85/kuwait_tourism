'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Star } from 'lucide-react';
import { api } from '@/utils/api';

interface Review {
    id: string;
    userName: string;
    userId: string;
    rating: number;
    comment: string;
    date: string;
}

interface ReviewsSectionProps {
    placeId: number;
    initialReviews?: any[];
}

const ReviewsSection = ({ placeId, initialReviews = [] }: ReviewsSectionProps) => {
    const { t, isRTL } = useLanguage();
    const { isAuthenticated, user, fetchMe } = useAuth();
    
    // Map backend reviews to local Review interface
    const mapReviews = (revs: any[]) => revs.map(r => ({
        id: r.id.toString(),
        userName: r.user_full_name || t.experiences.reviews.anonymous,
        userId: r.user.toString(),
        rating: r.rating,
        comment: r.comment,
        date: r.created_at ? new Date(r.created_at).toISOString().split('T')[0] : ''
    }));

    const [reviews, setReviews] = useState<Review[]>(mapReviews(initialReviews));
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [hoverRating, setHoverRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update reviews if initialReviews changes (e.g. on slug change)
    useEffect(() => {
        setReviews(mapReviews(initialReviews));
    }, [initialReviews]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newRating === 0 || !newComment.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const res = await api.post('/places/reviews/', {
                place: placeId,
                rating: newRating,
                comment: newComment
            });
            
            if (!res.ok) throw new Error('Failed to submit review');
            const data = await res.json();
            
            // Backend returns the created review
            const newReview: Review = {
                id: data.id.toString(),
                userName: data.user_full_name || user?.full_name || t.experiences.reviews.anonymous,
                userId: data.user.toString(),
                rating: data.rating,
                comment: data.comment,
                date: new Date(data.created_at).toISOString().split('T')[0]
            };

            setReviews([newReview, ...reviews]);
            setNewRating(0);
            setNewComment('');
            fetchMe(); // Refresh stats
        } catch (err) {
            console.error('Failed to submit review:', err);
            alert('Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        
        try {
            const res = await api.delete(`/places/reviews/${id}/`);
            if (res.ok) {
                setReviews(reviews.filter(r => r.id !== id));
                fetchMe(); // Refresh stats
            }
        } catch (err) {
            console.error("Failed to delete review:", err);
        }
    };

    return (
        <section className="py-12 border-t border-gray-100 mt-12">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">{t.experiences.reviews.title}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Review Form */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                        <h3 className="text-lg font-bold mb-4">{t.experiences.reviews.add_review}</h3>
                        
                        {isAuthenticated ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t.experiences.reviews.rating_label}
                                    </label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => setNewRating(i)}
                                                onMouseEnter={() => setHoverRating(i)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    className={`w-8 h-8 ${
                                                        (hoverRating || newRating) >= i
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-gray-300'
                                                    }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t.experiences.reviews.comment_label}
                                    </label>
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder={t.experiences.reviews.comment_placeholder}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={newRating === 0 || !newComment.trim()}
                                    className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {t.experiences.reviews.submit}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-gray-500 mb-4">{t.experiences.reviews.login_to_review}</p>
                                <a
                                    href="/login"
                                    className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-all"
                                >
                                    {t.auth.login.submit}
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-2 space-y-6">
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id} className="p-6 rounded-2xl border border-gray-100 hover:border-primary/20 transition-all group">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                                            {review.userName}
                                        </h4>
                                        <div className="flex gap-0.5 mt-1">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${
                                                        review.rating >= i ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-gray-400">{review.date}</span>
                                        {user?.id.toString() === review.userId && (
                                            <button 
                                                onClick={() => handleDelete(review.id)}
                                                className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 transition-all"
                                                title="Delete Review"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-3xl">
                            <p className="text-gray-500">{t.experiences.reviews.no_reviews}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
