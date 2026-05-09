'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { buildMediaUrl } from '@/utils/urls';

export default function ProfileTab() {
    const { user, updateProfile } = useAuth();
    const { t } = useLanguage();
    const [fullName, setFullName] = useState(user?.full_name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const formData = new FormData();
        formData.append('full_name', fullName);
        formData.append('email', email);

        const success = await updateProfile(formData);
        if (success) {
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } else {
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        }
        setLoading(false);
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('profile_picture', file);
        
        const success = await updateProfile(formData);
        if (success) {
            setMessage({ type: 'success', text: 'Profile picture updated!' });
        } else {
            setMessage({ type: 'error', text: 'Failed to upload image.' });
        }
        setLoading(false);
    };

    return (
        <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t.profile.sidebar.profile}</h2>
            
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 text-center sm:text-left">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-50 border-2 border-gray-100 shadow-sm shrink-0">
                        {user?.profile_picture ? (
                            <Image 
                                src={buildMediaUrl(user.profile_picture)} 
                                alt={user.full_name} 
                                fill 
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        )}
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImageChange} 
                            className="hidden" 
                            accept="image/*"
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-gray-900">{user?.full_name}</h3>
                        <p className="text-sm text-gray-500">{t.profile.sidebar.member_since.replace('{{year}}', new Date(user?.date_joined || '').getFullYear().toString())}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.auth.signup.name_label}</label>
                        <input 
                            type="text" 
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                            placeholder={t.auth.signup.name_placeholder}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.auth.signup.email_label}</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                            placeholder={t.auth.signup.email_placeholder}
                        />
                    </div>
                    
                    {message.text && (
                        <div className={`p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            {message.text}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full sm:w-auto bg-primary text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm font-medium mb-1">{t.profile.dashboard.stats.total_reviews}</p>
                    <p className="text-3xl font-black text-gray-900">{user?.reviews_count}</p>
                </div>
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm font-medium mb-1">{t.profile.dashboard.stats.saved_places}</p>
                    <p className="text-3xl font-black text-gray-900">{user?.favorites_count}</p>
                </div>
            </div>
        </div>
    );
}
