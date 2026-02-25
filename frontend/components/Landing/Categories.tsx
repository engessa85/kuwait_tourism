import React from 'react';
import Image from 'next/image';

const categories = [
    { name: 'Historical', image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=400', icon: '🏛️' },
    { name: 'Modern', image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e03a?auto=format&fit=crop&q=80&w=400', icon: '🏙️' },
    { name: 'Nature', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=400', icon: '🏜️' },
    { name: 'Shopping', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400', icon: '🛍️' },
    { name: 'Dining', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400', icon: '🍽️' },
    { name: 'Arts', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=400', icon: '🎨' },
];

const Categories = () => {
    return (
        <section id="categories" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore by Category</h2>
                    <p className="text-gray-500">Find your perfect experience in Kuwait</p>
                </div>
                <button className="text-primary font-bold hover:underline">View All Categories →</button>
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
