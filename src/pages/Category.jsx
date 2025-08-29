import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ArticleList from '../components/ArticleList';
import SEO from '../components/SEO';
import { fetchArticles, fetchCategoriesFromArticles } from '../functionality/apiFunctions';
import { generateCategorySchema } from '../functionality/schemaGenerators';

const Category = () => {
    const { categoryName } = useParams();
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState(null);
    const [allCategories, setAllCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const decodedCategoryName = decodeURIComponent(categoryName).toLowerCase();
                const [allArticles, categories] = await Promise.all([
                    fetchArticles(),
                    fetchCategoriesFromArticles()
                ]);

                const filteredArticles = allArticles.filter(article =>
                    article.category && article.category.some(cat =>
                        cat && cat.toLowerCase() === decodedCategoryName
                    )
                );

                setArticles(filteredArticles);
                setAllCategories(categories);

                const currentCat = categories.find(cat =>
                    cat.name.toLowerCase() === decodedCategoryName
                );

                setCategory(currentCat || {
                    name: decodedCategoryName,
                    count: filteredArticles.length,
                    slug: categoryName
                });

            } catch (error) {
                console.error('Error loading category data:', error);
                setArticles([]);
                setCategory({
                    name: categoryName,
                    count: 0,
                    slug: categoryName
                });
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [categoryName]);

    if (loading) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const decodedCategoryName = decodeURIComponent(categoryName);
    const pageTitle = `Kategori ${decodedCategoryName} - ${category?.count} Artikel`;
    const pageDescription = `Jelajahi ${category?.count} artikel dalam kategori ${decodedCategoryName}. Temukan konten menarik dan informatif seputar ${decodedCategoryName}.`;

    const categorySchema = generateCategorySchema(articles, decodedCategoryName);

    return (
        <div className="pt-20 min-h-screen">
            <SEO
                title={pageTitle}
                description={pageDescription}
                keywords={`${decodedCategoryName}, artikel, blog, informasi`}
            />

            <script type="application/ld+json">
                {JSON.stringify(categorySchema)}
            </script>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 capitalize">
                        Kategori: {decodedCategoryName}
                    </h1>
                    {category && (
                        <p className="text-gray-600 text-lg">
                            {category.count} artikel ditemukan dalam kategori ini
                        </p>
                    )}
                </div>

                <ArticleList
                    articles={articles}
                    title={`Artikel dalam kategori ${decodedCategoryName}`}
                />

                {allCategories.length > 0 && (
                    <div className="mt-16" data-aos="fade-up">
                        <h2 className="text-2xl font-bold mb-6 text-center">Kategori Lainnya</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {allCategories
                                .filter(cat => cat.name.toLowerCase() !== decodedCategoryName.toLowerCase())
                                .map((cat, index) => (
                                    <Link
                                        key={cat.name}
                                        to={`/category/${cat.slug}`}
                                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-center"
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100}
                                        aria-label={`Jelajahi kategori ${cat.name} dengan ${cat.count} artikel`}
                                    >
                                        <h3 className="font-semibold capitalize mb-2">{cat.name}</h3>
                                        <p className="text-gray-600 text-sm">{cat.count} artikel</p>
                                    </Link>
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