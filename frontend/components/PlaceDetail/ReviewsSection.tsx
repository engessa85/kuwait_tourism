'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Star } from 'lucide-react';

interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

const ReviewsSection = () => {
    const { t, isRTL } = useLanguage();
    const { isAuthenticated, user } = useAuth();
    
    const [reviews, setReviews] = useState<Review[]>([
        {
            id: '1',
            userName: 'Ahmed Al-Kuwaiti',
            rating: 5,
            comment: 'Absolutely stunning architecture! A must-visit landmark.',
            date: '2024-03-15'
        },
        {
            id: '2',
            userName: 'Sarah Jones',
            rating: 4,
            comment: 'Very Peaceful and well-maintained. The guided tour was very informative.',
            date: '2024-03-10'
        }
    ]);

    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [hoverRating, setHoverRating] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newRating === 0 || !newComment.trim()) return;

        const review: Review = {
            id: Date.now().toString(),
            userName: user?.full_name || t.experiences.reviews.anonymous,
            rating: newRating,
            comment: newComment,
            date: new Date().toISOString().split('T')[0]
        };

        setReviews([review, ...reviews]);
        setNewRating(0);
        setNewComment('');
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
                                    <span className="text-sm text-gray-400">{review.date}</span>
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
