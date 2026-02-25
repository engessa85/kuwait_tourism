import React from 'react';
import Image from 'next/image';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-blue-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    )
});

const MapSection = () => {
    return (
        <section id="map" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="bg-white rounded-4xl overflow-hidden shadow-2xl shadow-blue-900/5 grid grid-cols-1 lg:grid-cols-2 border border-gray-100 min-h-[600px]">
                {/* Left Content */}
                <div className="p-10 md:p-16 flex flex-col justify-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 7m0 10V7" />
                        </svg>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                        Navigate the City's Landmarks
                    </h2>
                    <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                        Plan your itinerary with our interactive map. Discover hidden gems, find the best routes, and explore districts like a local.
                    </p>
                    <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-lg shadow-primary/20 flex items-center gap-3 w-fit group">
                        Open Interactive Map
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </button>
                </div>

                {/* Right Interactive Map */}
                <div className="relative h-[500px] lg:h-full w-full z-0">
                    <MapComponent />
                </div>
            </div>
        </section>
    );
};

export default MapSection;
