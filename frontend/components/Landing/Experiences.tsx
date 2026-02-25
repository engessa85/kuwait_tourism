import React from 'react';
import Image from 'next/image';

const experiences = [
    {
        title: 'Grand Mosque Tour',
        category: 'Culture',
        price: '15 KWD',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=400',
        description: 'Explore the architectural marvel and spiritual heart of Kuwait City.'
    },
    {
        title: 'Failaka Island Ferry',
        category: 'Adventure',
        price: '22 KWD',
        image: 'https://images.unsplash.com/photo-1544735745-b40b85292451?auto=format&fit=crop&q=80&w=400',
        description: 'Journey through history on an island filled with archaeological wonders.'
    },
    {
        title: 'Mirror House Visit',
        category: 'Art',
        price: '10 KWD',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400',
        description: 'Step into a glittering world of mosaic art entirely covering a private residence.'
    },
    {
        title: 'Desert Stargazing',
        category: 'Nature',
        price: '40 KWD',
        image: 'https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?auto=format&fit=crop&q=80&w=400',
        description: 'Experience the serenity of the Kuwaiti desert under a canopy of stars.'
    }
];

const Experiences = () => {
    return (
        <section id="experiences" className="py-20 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <span className="text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full mb-4 inline-block">
                        Curated For You
                    </span>
                    <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Featured Experiences</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Immerse yourself in the unique activities that make Kuwait unforgettable, from the desert to the sea.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {experiences.map((exp) => (
                        <div key={exp.title} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
                            <div className="relative h-60 w-full">
                                <Image
                                    src={exp.image}
                                    alt={exp.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-gray-900 shadow-sm border border-gray-100">
                                    From <span className="text-primary">{exp.price}</span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col grow">
                                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="w-1 h-1 bg-primary rounded-full"></span>
                                    {exp.category}
                                </span>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{exp.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 grow">
                                    {exp.description}
                                </p>
                                <button className="w-full border border-primary/20 hover:border-primary text-primary font-bold py-3 rounded-xl text-sm transition-all hover:bg-primary/5">
                                    More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experiences;
