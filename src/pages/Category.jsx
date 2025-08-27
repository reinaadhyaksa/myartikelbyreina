// src/pages/Category.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArticleList from '../components/ArticleList';

const Category = () => {
    const { categoryName } = useParams();
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState(null);
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('https://api-artikel-delta.vercel.app/article');
                const data = await response.json();

                const filteredArticles = data.filter(article =>
                    article.category && article.category.includes(categoryName)
                );

                setArticles(filteredArticles);

                const categoryCount = {};
                data.forEach(article => {
                    if (article.category && Array.isArray(article.category)) {
                        article.category.forEach(cat => {
                            categoryCount[cat] = (categoryCount[cat] || 0) + 1;
                        });
                    }
                });

                // Convert to array
                const categoryArray = Object.keys(categoryCount).map(name => ({
                    name,
                    count: categoryCount[name]
                }));

                setAllCategories(categoryArray);

                // Set current category
                const currentCat = categoryArray.find(cat => cat.name === categoryName);
                setCategory(currentCat || { name: categoryName, count: filteredArticles.length });

            } catch (error) {
                console.error('Error fetching articles:', error);
                // Fallback data
                setArticles([
                    {
                        id: "aB3cD7eF9gH",
                        title: "Cara Membuat Website dengan HTML dan CSS",
                        images: "https://res.cloudinary.com/dc9q58yts/image/upload/v1756034722/nivoh2ezoxclotgpnp5n.jpg",
                        descriptions: "Panduan lengkap untuk pemula yang ingin belajar membuat website dari dasar menggunakan HTML dan CSS.",
                        date: "2025-08-24T11:37:23.645Z",
                        category: ["sains", "tech"]
                    },
                    {
                        id: "q1mkFTlZt9",
                        title: "Tips Produktivitas Kerja dari Rumah",
                        images: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                        descriptions: "Bagaimana tetap produktif saat bekerja dari rumah dengan mengatur waktu dan ruang kerja yang nyaman.",
                        date: "2025-08-23T09:15:10.123Z",
                        category: ["tech"]
                    }
                ]);

                setCategory({ name: categoryName, count: 2 });
                setAllCategories([
                    { name: 'tech', count: 3 },
                    { name: 'sains', count: 2 }
                ]);
            }
        };

        fetchArticles();
    }, [categoryName]);

    return (
        <div className="pt-20 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 capitalize">
                        Kategori: {categoryName}
                    </h1>
                    {category && (
                        <p className="text-gray-600 text-lg">
                            {category.count} artikel ditemukan dalam kategori ini
                        </p>
                    )}
                </div>

                <ArticleList
                    articles={articles}
                    title={`Artikel dalam kategori ${categoryName}`}
                />

                {allCategories.length > 0 && (
                    <div className="mt-16" data-aos="fade-up">
                        <h2 className="text-2xl font-bold mb-6 text-center">Kategori Lainnya</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {allCategories
                                .filter(cat => cat.name !== categoryName)
                                .map((cat, index) => (
                                    <a
                                        key={cat.name}
                                        href={`/category/${cat.name}`}
                                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-center"
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100}
                                    >
                                        <h3 className="font-semibold capitalize mb-2">{cat.name}</h3>
                                        <p className="text-gray-600 text-sm">{cat.count} artikel</p>
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Category;