import React from 'react';
import Image from 'next/image';

const experiences = [
    {
        title: 'Grand Mosque Guided Tour',
        category: 'Heritage',
        price: '15 KWD',
        image: '/kuwait_grand_mosque.jpg',
        description: 'Guided tour through the largest mosque in Kuwait, showcasing Islamic architecture and grandeur.'
    },
    {
        title: 'Failaka Island Heritage',
        category: 'History',
        price: '22 KWD',
        image: '/kuwait_Failaka_Island.jpg',
        description: 'Explore the historical ruins and ancient Greek temples on this significant Kuwaiti island.'
    },
    {
        title: 'Mirror House Art Gallery',
        category: 'Culture',
        price: '10 KWD',
        image: '/kuwait_mirror_house.jpg',
        description: 'Visit the world-renowned private museum entirely covered in intricate mirrored mosaics.'
    },
    {
        title: 'Al-Salmi Desert Stars',
        category: 'Nature',
        price: '40 KWD',
        image: '/kuwait_salmi_desert.jpg',
        description: 'Experience a magical night of stargazing under the clear skies of the Kuwaiti desert.'
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
