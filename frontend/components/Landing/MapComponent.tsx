'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom pin component to match the design style
const CustomMarker = ({ position, name, color }: { position: [number, number], name: string, color: string }) => {
    const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="bg-white px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 border border-gray-100 whitespace-nowrap">
             <div class="w-2 h-2 rounded-full" style="background-color: ${color}"></div>
             <span class="text-[11px] font-bold text-gray-900">${name}</span>
           </div>`,
        iconSize: [120, 30],
        iconAnchor: [60, 15],
    });

    return (
        <Marker position={position} icon={customIcon}>
            <Popup>
                <span className="font-bold">{name}</span>
            </Popup>
        </Marker>
    );
};

const MapComponent = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return (
        <div className="w-full h-full bg-blue-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    // Center of Kuwait City
    const center: [number, number] = [29.3759, 47.9774];

    return (
        <div className="h-full w-full">
            <MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // Applying a grayscale/light filter via CSS in globals.css for "Google Maps" aesthetic
                />

                {/* Kuwait Towers */}
                <CustomMarker position={[29.3892, 48.0031]} name="Kuwait Towers" color="#2563eb" />

                {/* The Avenues */}
                <CustomMarker position={[29.3039, 47.9356]} name="The Avenues" color="#f59e0b" />

                {/* Al Shaheed Park */}
                <CustomMarker position={[29.3662, 47.9897]} name="Al Shaheed Park" color="#10b981" />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
