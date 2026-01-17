import React from 'react';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import { useProducts } from '../context/ProductContext';
import Gallery from '../components/Gallery';

const Home = () => {
    const { products } = useProducts();
    // Extract unique categories for the category section
    // We'll pick a few representative images for the categories
    const categories = [
        {
            name: 'Healthcare',
            description: 'State-of-the-art medical equipment and furniture designed for modern healthcare facilities.',
            image: products.find(p => p.category === 'Healthcare')?.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2053'
        },
        {
            name: 'Food Indutries Furniture', // Keeping original folder name or mapping it? Let's map it to display name
            displayName: 'Food Industry',
            description: 'Durable and hygienic furniture solutions for cafeterias and food processing units.',
            image: products.find(p => p.category === 'Food Indutries Furniture')?.image || 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2070'
        }
    ].map(c => ({
        ...c,
        name: c.displayName || c.name // Use displayName if available
    }));

    return (
        <div className="animate-fade-in">
            <Hero />

            {/* About Us Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-secondary-900 mb-6">About Us</h2>
                        <p className="text-lg text-secondary-600 leading-relaxed">
                            PoojaTech Complete Solutions is a trusted manufacturer and service provider delivering comprehensive solutions across multiple industries including healthcare, pharmaceutical, chemical, and engineering sectors. With a strong foundation built on quality, reliability, and technical expertise, we specialize in providing end-to-end industrial and infrastructure solutions tailored to meet the evolving needs of our clients.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Expertise Section */}
            <section className="py-20 bg-secondary-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">Our Core Expertise</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Industrial Manufacturing */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-primary-600 hover:transform hover:-translate-y-2 transition-all duration-300">
                            <h3 className="text-xl font-bold text-secondary-900 mb-4">Industrial Manufacturing & Services</h3>
                            <p className="text-secondary-600 text-sm mb-4">Customized manufacturing for Healthcare, Pharma, Chemical, and Engineering industries.</p>
                            <ul className="text-sm text-secondary-500 space-y-2">
                                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>Healthcare Industries</li>
                                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>Pharmaceutical Industries</li>
                            </ul>
                        </div>

                        {/* Interior Designing */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-healthcare-500 hover:transform hover:-translate-y-2 transition-all duration-300">
                            <h3 className="text-xl font-bold text-secondary-900 mb-4">Interior Designing & Space Management</h3>
                            <p className="text-secondary-600 text-sm mb-4">Complete interior solutions for commercial, industrial, and healthcare facilities.</p>
                            <ul className="text-sm text-secondary-500 space-y-2">
                                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-healthcare-500 rounded-full mr-2"></span>Commercial Spaces</li>
                                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-healthcare-500 rounded-full mr-2"></span>Laboratories</li>
                            </ul>
                        </div>

                        {/* Manpower Solutions */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-purple-500 hover:transform hover:-translate-y-2 transition-all duration-300">
                            <h3 className="text-xl font-bold text-secondary-900 mb-4">Manpower Solutions</h3>
                            <p className="text-secondary-600 text-sm mb-4">Skilled and semi-skilled manpower for industrial operations and facility management.</p>
                            <ul className="text-sm text-secondary-500 space-y-2">
                                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>Industrial Operations</li>
                                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>Technical Projects</li>
                            </ul>
                        </div>

                        {/* Security Solutions */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-industrial-600 hover:transform hover:-translate-y-2 transition-all duration-300">
                            <h3 className="text-xl font-bold text-secondary-900 mb-4">Security Solutions</h3>
                            <p className="text-secondary-600 text-sm mb-4">Professional security services for plants, offices, and hospitals.</p>
                            <ul className="text-sm text-secondary-500 space-y-2">
                                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-industrial-600 rounded-full mr-2"></span>Industrial Plants</li>
                                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-industrial-600 rounded-full mr-2"></span>Hospitals</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <CategorySection categories={[
                {
                    name: 'Healthcare',
                    description: 'State-of-the-art medical equipment and furniture designed for modern healthcare facilities.',
                    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2053'
                },
                {
                    name: 'Surgical Items',
                    description: 'Precision instruments and essential equipment for operating theaters and surgical procedures.',
                    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2000'
                },
                {
                    name: 'Food Industry',
                    description: 'Durable and hygienic furniture solutions for cafeterias and food processing units.',
                    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2070'
                }
            ]} />

            {/* Gallery Section */}
            <Gallery />

            {/* Vision & Mission */}
            <section className="py-20 bg-primary-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-primary-300">Our Vision</h3>
                            <p className="text-lg leading-relaxed text-primary-50">
                                To become a leading and trusted solutions partner across healthcare, pharmaceutical, chemical, and engineering industries by delivering innovative, reliable, and high-quality manufacturing and service solutions, while setting benchmarks in interior design and space optimization.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-primary-300">Our Mission</h3>
                            <ul className="space-y-4 text-primary-50">
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1.5 w-2 h-2 bg-primary-400 rounded-full flex-shrink-0"></span>
                                    <span>To provide world-class manufacturing and service solutions that meet the highest standards of quality.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1.5 w-2 h-2 bg-primary-400 rounded-full flex-shrink-0"></span>
                                    <span>To deliver customized, cost-effective, and timely solutions tailored to our clients’ needs.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1.5 w-2 h-2 bg-primary-400 rounded-full flex-shrink-0"></span>
                                    <span>To design and develop functional, efficient, and aesthetically superior spaces.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-secondary-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">Why Choose PoojaTech?</h2>
                        <p className="text-secondary-600 max-w-2xl mx-auto">We stand as a trusted partner for organizations seeking reliable manufacturing, project, manpower, interior, and security solutions under one roof.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Multi-sector Expertise', desc: 'Comprehensive solutions across diverse industries.' },
                            { title: 'Customized Solutions', desc: 'Tailored projects to meet specific client requirements.' },
                            { title: 'Professional Workforce', desc: 'Skilled team ensuring quality-driven execution.' },
                            { title: 'Quality Commitment', desc: 'Strict adherence to industry standards and safety norms.' },
                            { title: 'Client-centric Approach', desc: 'Building long-term partnerships through satisfaction.' },
                            { title: 'End-to-End Support', desc: 'From concept to execution and maintenance.' }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-secondary-100">
                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 text-primary-600 font-bold text-xl">
                                    {index + 1}
                                </div>
                                <h3 className="text-lg font-bold text-secondary-900 mb-2">{item.title}</h3>
                                <p className="text-secondary-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
