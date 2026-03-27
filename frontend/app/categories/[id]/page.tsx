'use client';

import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';
import HeaderSection from '@/components/AllCategories/HeaderSection';
import AttractionsGrid from '@/components/AllCategories/AttractionsGrid';
import { LanguageProvider } from '@/context/LanguageContext';
import { useLanguage } from '@/context/LanguageContext';
import { api } from '@/utils/api';
import AttractionCard from '@/components/AllCategories/AttractionCard';

const CategoryPageContent = () => {
    const params = useParams();
    const slug = params.id as string;
    const { t, language } = useLanguage();
    const [category, setCategory] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categories = await api.getCategories();
                const found = categories.find((c: any) => c.slug === slug);
                setCategory(found);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [slug]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!category) return <div className="min-h-screen flex items-center justify-center">Category not found</div>;

    const categoryName = language === 'en' ? category.name_en : category.name_ar;

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <div className="pt-12 pb-6 px-4 md:px-8 max-w-7xl mx-auto">
                    <nav className="flex mb-8 text-sm text-gray-500 gap-2">
                        <a href="/" className="hover:text-primary transition-colors">{t.nav.home}</a>
                        <span>/</span>
                        <a href="/categories" className="hover:text-primary transition-colors">{t.nav.categories}</a>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{categoryName}</span>
                    </nav>
                    
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 capitalize">
                        {categoryName}
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl">
                        {t.categories.description}
                    </p>
                </div>

                <div className="pb-20">
                    <AttractionsGrid activeCategory={slug} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

const CategoryPage = () => {
    return (
        <LanguageProvider>
            <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
                <CategoryPageContent />
            </Suspense>
        </LanguageProvider>
    );
};

export default CategoryPage;
