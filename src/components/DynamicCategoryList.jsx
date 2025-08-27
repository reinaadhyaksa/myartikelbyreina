// src/components/DynamicCategoryList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DynamicCategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://api-artikel-delta.vercel.app/article');
                const articles = await response.json();

                // Extract and count categories
                const categoryCount = {};
                articles.forEach(article => {
                    if (article.category && Array.isArray(article.category)) {
                        article.category.forEach(cat => {
                            categoryCount[cat] = (categoryCount[cat] || 0) + 1;
                        });
                    }
                });

                // Convert to array and get top 6 categories
                const categoryArray = Object.keys(categoryCount).map(name => ({
                    name,
                    count: categoryCount[name]
                })).sort((a, b) => b.count - a.count).slice(0, 6);

                setCategories(categoryArray);
            } catch (error) {
                console.error('Error fetching categories:', error);
                // Fallback categories
                setCategories([
                    { name: 'tech', count: 3 },
                    { name: 'sains', count: 2 },
                    { name: 'lifestyle', count: 5 },
                    { name: 'education', count: 4 },
                    { name: 'health', count: 3 },
                    { name: 'business', count: 2 }
                ]);
            }
        };

        fetchCategories();
    }, []);

    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-8" data-aos="fade-up">
                    Kategori Artikel
                </h2>

                {categories.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">Belum ada kategori yang tersedia.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, index) => (
                            <Link
                                key={category.name}
                                to={`/category/${category.name}`}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold capitalize">{category.name}</h3>
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                        {category.count} artikel
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <span className="text-blue-600 font-medium flex items-center">
                                        Jelajahi kategori
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="text-center mt-10" data-aos="fade-up" data-aos-delay="400">
                    <Link
                        to="/categories"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Lihat semua kategori
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default DynamicCategoryList;