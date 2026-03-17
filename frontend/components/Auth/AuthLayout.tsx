'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useLanguage } from '@/context/LanguageContext';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    mode?: 'login' | 'signup';
}

export default function AuthLayout({ children, title, description, mode }: AuthLayoutProps) {
    const { t, isRTL } = useLanguage();

    const displayTitle = mode ? t.auth[mode].title : title;
    const displayDescription = mode ? t.auth[mode].description : description;

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Side - Image and Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <Image
                    src="/kuwait_auth_bg.png"
                    alt="Kuwait Skyline"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />

                <div className={`absolute top-10 ${isRTL ? 'right-10' : 'left-10'} z-10 space-y-12`}>
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                            <Image src="/logo.png" alt="Logo" width={24} height={24} />
                        </div>
                        <span className="text-white font-bold text-xl drop-shadow-md">Kuwait Tourism</span>
                    </Link>

                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg whitespace-pre-line">
                            {t.auth.layout.title}
                        </h1>
                        <p className="text-xl text-white/90 drop-shadow-md">
                            {t.auth.layout.description}
                        </p>
                    </div>
                </div>

                <div className={`absolute bottom-8 ${isRTL ? 'right-10' : 'left-10'} z-10 text-white/60 text-sm`}>
                    {t.auth.layout.copyright}
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 overflow-y-auto">
                <div className="w-full max-w-md space-y-8">
                    <div className="lg:hidden mb-12 flex justify-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                                <Image src="/logo.png" alt="Logo" width={24} height={24} className="brightness-0 invert" />
                            </div>
                            <span className="text-foreground font-bold text-xl">Kuwait Tourism</span>
                        </Link>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{displayTitle}</h2>
                        <p className="mt-2 text-gray-500">{displayDescription}</p>
                    </div>

                    <div className="mt-10">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
