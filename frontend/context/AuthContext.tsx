'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../utils/api';

interface User {
    id: number;
    email: string;
    full_name: string;
    profile_picture: string | null;
    language_preference: 'en' | 'ar';
    date_joined: string;
    reviews_count: number;
    favorites_count: number;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (full_name: string, email: string, password: string, confirm_password: string) => Promise<boolean>;
    logout: () => void;
    updateProfile: (data: FormData) => Promise<boolean>;
    fetchMe: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchMe = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const res = await api.get('/accounts/me/');
            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
            } else {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
            }
        } catch (error) {
            console.error("Failed to fetch user:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await api.post('/accounts/login/', { email, password });
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                await fetchMe();
                return true;
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
        return false;
    };

    const signup = async (full_name: string, email: string, password: string, confirm_password: string) => {
        try {
            const res = await api.post('/accounts/signup/', { full_name, email, password, confirm_password });
            if (res.ok) {
                // Auto login after signup
                return await login(email, password);
            }
        } catch (error) {
            console.error("Signup failed:", error);
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    const updateProfile = async (formData: FormData) => {
        try {
            const token = localStorage.getItem('access_token');
            const res = await fetch('http://localhost:8000/api/accounts/me/', {
                method: 'PATCH',
                headers: {
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
                body: formData
            });
            
            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
                return true;
            }
        } catch (error) {
            console.error("Profile update failed:", error);
        }
        return false;
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateProfile, fetchMe, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
