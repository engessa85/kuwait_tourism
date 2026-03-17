import React from 'react';
import AuthLayout from '@/components/Auth/AuthLayout';
import SignupForm from '@/components/Auth/SignupForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up | Kuwait Tourism',
    description: 'Create an account to explore the best of Kuwait.',
};

export default function SignupPage() {
    return (
        <AuthLayout
            title="Create an account"
            description="Sign up to start your journey through the hidden gems of Kuwait."
        >
            <SignupForm />
        </AuthLayout>
    );
}
