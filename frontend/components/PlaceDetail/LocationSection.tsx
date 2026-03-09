'use client';

import React from 'react';
import Image from 'next/image';

interface LocationSectionProps {
    title: string;
}

const LocationSection: React.FC<LocationSectionProps> = ({ title }) => {
    // Encode title for Google Maps query
    const mapQuery = encodeURIComponent(`${title}, Kuwait`);
    // Using the public Google Maps embed URL which doesn't strictly require a production API key for basic display
    const embedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <div className="mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Location</h2>
            <div className="relative rounded-[2.5rem] overflow-hidden group shadow-md border border-gray-100 bg-gray-50 h-[1000px]">
                <iframe
                    width="100%"
                    height="100%"
                    id="gmap_canvas"
                    src={embedUrl}
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    title={`Google Map showing ${title}`}
                ></iframe>
            </div>
        </div>
    );
};

export default LocationSection;
