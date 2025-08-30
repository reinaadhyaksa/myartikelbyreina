import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ShareButtons from '../components/ShareButtons';
import SEO from '../components/SEO';
import ArticleContent from '../components/ArticleContent';
import ArticleActions from '../components/ArticleActions';
import RelatedArticles from '../components/RelatedArticles';
import { LoadingScreen } from '../components/LoadingScreen';
import { NotFoundArticles } from './NotFound';
import {
    fetchArticleById,
    fetchArticles,
    getRelatedArticles,
    optimizeCloudinaryImage,
    generateImageAltText,
    formatDate,
    generateMetaDescription
} from '../functionality/apiFunctions';
import { generateBreadcrumbSchema } from '../functionality/schemaGenerators';
import { usePDFDownload } from '../functionality/usePDFDownload';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const { downloadPDF, downloading } = usePDFDownload();

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

    const handleDownloadPDF = () => {
        if (article) {
            downloadPDF(article);
        }
    };

    if (loading) {
        return <LoadingScreen />;
    }

    if (!article) {
        return <NotFoundArticles />;
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
                    <Breadcrumb article={article} />

                    <ArticleContent
                        article={article}
                        optimizedImageUrl={optimizedImageUrl}
                        imageAltText={imageAltText}
                    />

                    <ArticleMetadata article={article} />

                    <ShareButtons
                        title={article.title}
                        url={window.location.href}
                    />

                    <ArticleActions
                        onDownloadPDF={handleDownloadPDF}
                        downloading={downloading}
                    />

                    <RelatedArticles articles={relatedArticles} />
                </div>
            </article>
        </div>
    );
};

const Breadcrumb = ({ article }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!isMobile) {
        return (
            <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center space-x-1 text-sm">
                    <li className="flex items-center">
                        <Link
                            to="/"
                            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <Link to="/articles" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                            Artikel
                        </Link>
                    </li>
                    {article.category && article.category.length > 0 && (
                        <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <Link
                                to={`/category/${encodeURIComponent(article.category[0].toLowerCase())}`}
                                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 capitalize"
                            >
                                {article.category[0]}
                            </Link>
                        </li>
                    )}
                    <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-600 font-medium truncate max-w-xs" aria-current="page">
                            {article.title}
                        </span>
                    </li>
                </ol>
            </nav>
        );
    }

    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-1 text-sm">
                <li className="flex items-center">
                    <Link
                        to="/"
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </Link>
                </li>
                <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <Link to="/articles" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                        <span className="sr-only">Artikel</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                    </Link>
                </li>
                {article.category && article.category.length > 0 && (
                    <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <Link
                            to={`/category/${encodeURIComponent(article.category[0].toLowerCase())}`}
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                            <span className="sr-only">{article.category[0]}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                        </Link>
                    </li>
                )}
                <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-gray-600 font-medium truncate max-w-[120px]" aria-current="page">
                        {article.title}
                    </span>
                </li>
            </ol>
        </nav>
    );
};

const ArticleMetadata = ({ article }) => (
    <>
        <div className="mt-8 flex flex-wrap gap-2" data-aos="fade-up" data-aos-delay="100">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-lg text-sm font-medium shadow-sm">
                Made with AI
            </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" data-aos="fade-up" data-aos-delay="100">
            {article.category && article.category.map((cat, i) => (
                <Link
                    to={`/category/${encodeURIComponent(cat.toLowerCase())}`}
                    key={i}
                    className="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:from-blue-100 hover:to-blue-200 transition-all duration-200 shadow-sm"
                    itemProp="keywords"
                >
                    {cat}
                </Link>
            ))}
        </div>
    </>
);

export default ArticleDetail;