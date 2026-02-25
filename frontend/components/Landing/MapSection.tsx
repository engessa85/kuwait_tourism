import React from 'react';
import Image from 'next/image';

const MapSection = () => {
    return (
        <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="bg-white rounded-4xl overflow-hidden shadow-2xl shadow-blue-900/5 grid grid-cols-1 lg:grid-cols-2 items-center border border-gray-100">
                {/* Left Content */}
                <div className="p-10 md:p-16">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
                        <span className="text-2xl">🗺️</span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                        Navigate the City's Landmarks
                    </h2>
                    <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                        Plan your itinerary with our interactive map. Discover hidden gems, find the best routes, and explore districts like a local.
                    </p>
                    <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-lg shadow-primary/20 flex items-center gap-3 group">
                        Open Interactive Map
                        <span className="transform group-hover:translate-x-1 transition-transform">↗</span>
                    </button>
                </div>

                {/* Right Map Image */}
                <div className="relative h-[400px] lg:h-full min-h-[500px] w-full bg-blue-50">
                    <Image
                        src="/kuwait_map.png"
                        alt="Kuwait Landmarks Map"
                        fill
                        className="object-cover"
                    />

                    {/* Decorative Map Pins (Visual only) */}
                    <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-xl animate-pulse"></div>
                    <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-accent rounded-full border-4 border-white shadow-xl animate-bounce"></div>
                    <div className="absolute top-2/3 left-1/4 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-xl animate-pulse delay-700"></div>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
