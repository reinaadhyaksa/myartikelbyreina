import { useState, useEffect } from 'react';
import ArticleList from '../components/ArticleList';
import DynamicCategoryList from '../components/DynamicCategoryList';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { fetchArticles } from '../functionality/apiFunctions';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [featuredArticles, setFeaturedArticles] = useState([]);

    useEffect(() => {
        const loadArticles = async () => {
            const data = await fetchArticles();
            setArticles(data);
            setFeaturedArticles(data.slice(0, 3));
        };

        loadArticles();
    }, []);

    return (
        <div className="pt-16">
            <SEO
                title="Temukan Artikel Menarik dan Informatif"
                description="Platform modern untuk membaca artikel dengan beragam topik menarik. Dapatkan informasi terbaru seputar teknologi, lifestyle, edukasi, dan banyak lagi."
                keywords="artikel, blog, informasi, teknologi, lifestyle, edukasi, bacaan, psikologi, sejarah"
            />

            <section className="bg-blue-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">
                        Temukan Artikel Menarik dan Informatif
                    </h1>
                    <p className="text-xl mb-8 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        Platform modern untuk membaca artikel dengan beragam topik menarik.
                        Dapatkan informasi terbaru seputar teknologi, lifestyle, edukasi, dan banyak lagi.
                    </p>
                    <Link
                        to={"/articles"}
                        className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        data-aos="fade-up"
                        data-aos-delay="200"
                        aria-label="Jelajahi semua artikel di ArtikelKu"
                    >
                        Jelajahi Artikel
                    </Link>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6" data-aos="fade-up">
                            Tentang Website Kami
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                            Website ini hadir sebagai platform membaca artikel modern dengan desain minimalis
                            dan responsif. Kami menyediakan beragam konten informatif, inspiratif, dan menarik
                            untuk semua kalangan. Dari teknologi terkini hingga tips kehidupan sehari-hari,
                            temukan artikel yang sesuai dengan minat Anda.
                        </p>
                    </div>
                </div>
            </section>

            <DynamicCategoryList />

            {featuredArticles.length > 0 && (
                <ArticleList
                    articles={articles}
                    title="Artikel Terbaru"
                    showLatest={true}
                />
            )}

            {articles.length > 0 && (
                <ArticleList
                    articles={articles}
                    title="Artikel Rekomendasi"
                    showRecommended={true}
                />
            )}
        </div>
    );
};

export default Home;