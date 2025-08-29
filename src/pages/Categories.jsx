import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { fetchCategoriesFromArticles } from '../functionality/apiFunctions';
import { generateAllCategoriesSchema } from '../functionality/schemaGenerators';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchCategoriesFromArticles();
            setCategories(data);
        };

        loadCategories();
    }, []);

    const categorySchema = generateAllCategoriesSchema(categories);

    return (
        <div className="pt-20 min-h-screen bg-gray-50">
            <SEO
                title="Semua Kategori Artikel - Telusuri Topik Menarik"
                description="Telusuri semua kategori artikel yang tersedia di platform kami. Temukan artikel berdasarkan topik seperti teknologi, sains, lifestyle, edukasi, kesehatan, dan bisnis."
                keywords="kategori artikel, teknologi, sains, lifestyle, edukasi, kesehatan, bisnis, topik artikel"
            />

            <script type="application/ld+json">
                {JSON.stringify(categorySchema)}
            </script>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Semua Kategori</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Telusuri semua kategori artikel yang tersedia di platform kami
                    </p>
                </div>

                {categories.length === 0 ? (
                    <div className="text-center py-12" data-aos="fade-up">
                        <p className="text-gray-500 text-lg">Belum ada kategori yang tersedia.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, index) => (
                            <Link
                                key={category.name}
                                to={`/category/${category.slug}`}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                aria-label={`Jelajahi kategori ${category.name} dengan ${category.count} artikel`}
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold capitalize">{category.name}</h2>
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                        {category.count} artikel
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <span className="text-blue-600 font-medium flex items-center">
                                        Lihat semua artikel
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Categories;