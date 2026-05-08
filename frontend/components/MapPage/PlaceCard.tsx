import React from 'react';
import Image from 'next/image';

interface PlaceCardProps {
    id: string;
    title: string;
    category: string;
    distance: string;
    rating: number;
    reviewsCount: string;
    image: string;
    isOpen?: boolean;
    isClosingSoon?: boolean;
    closingTime?: string;
    isTopRated?: boolean;
    isActive?: boolean;
    onClick?: () => void;
}

export default function PlaceCard({
    title, category, distance, rating, reviewsCount, image,
    isOpen, isClosingSoon, closingTime, isTopRated, isActive, onClick
}: PlaceCardProps) {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer rounded-2xl border transition-all duration-200 overflow-hidden shrink-0 ${isActive
                ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/20'
                : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                }`}
        >
            <div className="p-3 flex gap-4">
                {/* Image Thumbnail */}
                <div className="relative w-[84px] h-[84px] rounded-xl overflow-hidden shrink-0">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 py-4 flex flex-col justify-center">
                    <h4 className="font-bold text-gray-900 text-base mb-1 truncate">{title}</h4>
                    <p className="text-gray-500 text-xs mb-2 flex items-center gap-1">
                        {category} • {distance}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs">
                            <span className="text-orange-400 font-bold">★</span>
                            <span className="font-bold text-gray-900">{rating}</span>
                            <span className="text-gray-400 text-[10px]">({reviewsCount})</span>
                        </div>

                        {closingTime && (
                            <div className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Closes {closingTime}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

