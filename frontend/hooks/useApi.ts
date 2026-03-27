import { useState, useEffect } from 'react';
import { api } from '@/utils/api';

export const usePlaces = (params?: string) => {
    const [places, setPlaces] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const data = await api.getPlaces(params);
                setPlaces(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, [params]);

    return { places, loading, error };
};

export const useCategories = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await api.getCategories();
                setCategories(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};

export const usePlace = (slug: string) => {
    const [place, setPlace] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;
        
        const fetchPlace = async () => {
            try {
                const data = await api.getPlace(slug);
                setPlace(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlace();
    }, [slug]);

    return { place, loading, error };
};
