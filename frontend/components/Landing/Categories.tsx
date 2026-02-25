import React from 'react';
import Image from 'next/image';

const categories = [
    { name: 'Historical', image: '/kuwait_historical_cat.png', icon: '🏛️' },
    { name: 'Modern', image: '/kuwait_modern_cat.png', icon: '🏙️' },
    { name: 'Nature', image: '/kuwait_nature_cat.png', icon: '🏜️' },
    { name: 'Shopping', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=400', icon: '🛍️' },
    { name: 'Dining', image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=400', icon: '🍽️' },
    { name: 'Arts', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400', icon: '🎨' },
];

const Categories = () => {
    return (
        <section id="categories" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore by Category</h2>
                <p className="text-gray-500">Find your perfect experience in Kuwait</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div key={category.name} className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
                        <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white text-left">
                            <span className="text-2xl mb-2 block">{category.icon}</span>
                            <h3 className="text-xl font-bold">{category.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
