import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ShareButtons from '../components/ShareButtons';
import SEO from '../components/SEO';
import {
    fetchArticleById,
    fetchArticles,
    getRelatedArticles,
    optimizeCloudinaryImage,
    generateImageAltText,
    formatDate,
    getIconClass,
    generateMetaDescription
} from '../functionality/apiFunctions';
import { generateBreadcrumbSchema } from '../functionality/schemaGenerators';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedArticles, setRelatedArticles] = useState([]);

    useEffect(() => {
        const loadArticle = async () => {
            try {
                const articleData = await fetchArticleById(id);
                if (articleData) {
                    setArticle(articleData);

                    const allArticles = await fetchArticles();
                    const related = await getRelatedArticles(articleData, allArticles);
                    setRelatedArticles(related);
                }
            } catch (error) {
                console.error('Error loading article:', error);
            } finally {
                setLoading(false);
            }
        };

        loadArticle();
    }, [id]);

    if (loading) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Artikel tidak ditemukan</h1>
                    <Link to="/articles" className="text-blue-600 hover:underline">
                        Kembali ke daftar artikel
                    </Link>
                </div>
            </div>
        );
    }

    const optimizedImageUrl = optimizeCloudinaryImage(article.images);
    const imageAltText = generateImageAltText(article.title, article.category);
    const metaDescription = generateMetaDescription(article);
    const breadcrumbSchema = generateBreadcrumbSchema(article, id);

    return (
        <div className="pt-20 min-h-screen bg-gray-50">
            <SEO
                title={article.title}
                description={metaDescription}
                keywords={article.category ? article.category.join(', ') : ''}
                article={true}
                publishedTime={article.date}
                author="Admin ArtikelKu"
                image={optimizedImageUrl}
                url={`${window.location.origin}/article/${id}`}
            />

            <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </script>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" itemScope itemType="https://schema.org/Article">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <nav aria-label="Breadcrumb" className="mb-6">
                        <ol className="flex items-center space-x-2 text-sm text-gray-600">
                            <li>
                                <Link to="/" className="hover:text-blue-600">Home</Link>
                            </li>
                            <li className="flex items-center">
                                <span className="mx-2">/</span>
                                <Link to="/articles" className="hover:text-blue-600">Artikel</Link>
                            </li>
                            {article.category && article.category.length > 0 && (
                                <>
                                    <li className="flex items-center">
                                        <span className="mx-2">/</span>
                                        <Link
                                            to={`/category/${encodeURIComponent(article.category[0].toLowerCase())}`}
                                            className="hover:text-blue-600 capitalize"
                                        >
                                            {article.category[0]}
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li className="flex items-center">
                                <span className="mx-2">/</span>
                                <span className="text-gray-800 font-medium" aria-current="page">
                                    {article.title.length > 30 ? article.title.substring(0, 30) + '...' : article.title}
                                </span>
                            </li>
                        </ol>
                    </nav>

                    <h1 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up" itemProp="headline">
                        {article.title}
                    </h1>

                    <div className="text-gray-600 mb-4 gap-2" data-aos="fade-up" data-aos-delay="100">
                        <div className="flex items-center gap-2">
                            <time dateTime={article.date} itemProp="datePublished">
                                {formatDate(article.date)}
                            </time>
                        </div>
                    </div>

                    {optimizedImageUrl && (
                        <div className="mb-8 rounded-xl overflow-hidden" data-aos="fade-up" data-aos-delay="200">
                            <img
                                src={optimizedImageUrl}
                                alt={imageAltText}
                                className="w-full h-64 md:h-96 object-cover"
                                loading="lazy"
                                itemProp="image"
                            />
                        </div>
                    )}

                    <div className="prose max-w-none" data-aos="fade-up" data-aos-delay="300" itemProp="articleBody">
                        {article.descriptions && (
                            <p className="text-gray-700 leading-relaxed mb-6 text-lg font-medium" itemProp="description">
                                {article.descriptions}
                            </p>
                        )}

                        {article.contents && article.contents.map((section, index) => (
                            <div key={index}>
                                {section.subtitle && (
                                    <h2 className="text-xl font-semibold mt-6 mb-3">{section.subtitle}</h2>
                                )}
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2" data-aos="fade-up" data-aos-delay="100">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                            Made with AI
                        </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2" data-aos="fade-up" data-aos-delay="100">
                        {article.category && article.category.map((cat, i) => (
                            <Link
                                to={`/category/${encodeURIComponent(cat.toLowerCase())}`}
                                key={i}
                                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors"
                                itemProp="keywords"
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>

                    <ShareButtons
                        title={article.title}
                        url={window.location.href}
                    />

                    {article.references && article.references.length > 0 && (
                        <div className="mt-8 border-t pt-6">
                            <h2 className="text-lg font-semibold mb-3">Sumber Referensi</h2>
                            <div className="flex flex-col gap-2">
                                {article.references.map((ref, idx) => (
                                    <a
                                        key={idx}
                                        href={ref.url}
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                        className="flex items-center gap-2 text-blue-600 hover:underline"
                                    >
                                        <i className={`${getIconClass(ref.url)} text-lg`}></i>
                                        <span>{ref.title}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {relatedArticles.length > 0 && (
                        <div className="mt-12 border-t pt-6">
                            <h2 className="text-xl font-semibold mb-4">Artikel Terkait</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {relatedArticles.map(related => (
                                    <Link
                                        key={related.id}
                                        to={`/article/${related.id}`}
                                        className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <h3 className="font-medium mb-2 line-clamp-2">{related.title}</h3>
                                        <p className="text-sm text-gray-600 line-clamp-2">{related.descriptions}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
};

export default ArticleDetail;