'use client';

import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import PlaceInfoWindow from './PlaceInfoWindow';

interface InteractiveMapProps {
    places: any[];
    activePlaceId: string | null;
    onPlaceSelect: (id: string | null) => void;
}

export default function InteractiveMap({ places, activePlaceId, onPlaceSelect }: InteractiveMapProps) {
    const defaultCenter = { lat: 29.35, lng: 47.98 }; // General Kuwait bounds
    const activePlace = places.find(p => p.id === activePlaceId);

    // Map center prioritizing active place if set
    const center = activePlace ? activePlace.position : defaultCenter;

    const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY || '';
    const GOOGLE_MAPS_MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID';

    if (!GOOGLE_MAPS_API_KEY) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <div className="bg-red-50 p-4 rounded-full mb-4">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Google Maps API Key Missing</h3>
                <p className="text-gray-600 max-w-sm">
                    Please ensure <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> is set in your <code>.env.local</code> file and restart the development server.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative">
            <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                <Map
                    defaultZoom={11}
                    center={center}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    className="w-full h-full"
                    mapId={GOOGLE_MAPS_MAP_ID}
                >
                    {/* Render Markers */}
                    {places.map(place => {
                        // Skip rendering if position is invalid
                        if (!place.position || isNaN(place.position.lat) || isNaN(place.position.lng)) {
                            return null;
                        }

                        return (
                            <AdvancedMarker
                                key={`marker-${place.id}`}
                                position={place.position}
                                onClick={() => onPlaceSelect(place.id)}
                            >
                                <Pin
                                    background={activePlaceId === place.id ? '#1a4eff' : '#ea4335'}
                                    borderColor={activePlaceId === place.id ? '#ffffff' : '#992116'}
                                    glyphColor={'#ffffff'}
                                    scale={activePlaceId === place.id ? 1.2 : 1}
                                />
                            </AdvancedMarker>
                        );
                    })}

                    {/* Render InfoWindow directly without Google Maps InfoWindow component for exact UI overlay positioning relative to right side layout or center overlay? 
                    The design shows the InfoWindow as a floating card overlay right on the map, near the bottom right. We will render it as a standard absolute positioned div inside the map container instead of a true InfoWindow which follows the pin, as it matches the design better for a fixed info panel or we can use generic CSS placing since the image shows a large card covering the bottom right map area. Let's place it absolutely for now. */}
                </Map>
            </APIProvider>

            {/* Custom Info Window Overlay (Positioned bottom right on map area, left of controls) */}
            {activePlace && (
                <div className="absolute bottom-6 right-20 z-10 animate-fade-in-up">
                    <PlaceInfoWindow
                        place={activePlace}
                        onClose={() => onPlaceSelect(null)}
                    />
                </div>
            )}

            {/* Map Controls (Positioned bottom right) */}
            <div className="absolute right-6 bottom-6 flex flex-col gap-2 z-10">
                <div className="bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
                    <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors border-b border-gray-100">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                    </button>
                </div>
                <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
            </div>
        </div>
    );
}
