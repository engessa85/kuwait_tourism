import { useState, useEffect } from 'react';
import { api } from '@/utils/api';

type ApiCollection<T> = T[] | { results?: T[] } | null | undefined;

type ApiError = {
    message?: string;
};

const normalizeCollection = <T,>(data: ApiCollection<T>): T[] => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    return [];
};

export const usePlaces = (params?: string) => {
    const [places, setPlaces] = useState<unknown[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlaces = async () => {
            setLoading(true);
            try {
                const data = await api.getPlaces(params);
                setPlaces(normalizeCollection(data));
            } catch (err: unknown) {
                setError((err as ApiError).message || 'Failed to load places');
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, [params]);

    return { places, loading, error };
};

export const useCategories = () => {
    const [categories, setCategories] = useState<unknown[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await api.getCategories();
                setCategories(normalizeCollection(data));
            } catch (err: unknown) {
                setError((err as ApiError).message || 'Failed to load categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};

export const usePlace = (slug: string) => {
    const [place, setPlace] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;
        
        const fetchPlace = async () => {
            try {
                const data = await api.getPlace(slug);
                setPlace(data);
            } catch (err: unknown) {
                setError((err as ApiError).message || 'Failed to load place');
            } finally {
                setLoading(false);
            }
        };

        fetchPlace();
    }, [slug]);

    return { place, loading, error };
};
