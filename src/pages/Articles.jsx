import { useState, useEffect } from 'react';
import ArticleList from '../components/ArticleList';
import SEO from '../components/SEO';
import { fetchArticles } from '../functionality/apiFunctions';

const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const loadArticles = async () => {
            const data = await fetchArticles();
            setArticles(data);
        };

        loadArticles();
    }, []);

    return (
        <div className="pt-20 min-h-screen">
            <SEO
                title="Semua Artikel - Koleksi Lengkap Artikel Menarik"
                description="Jelajahi koleksi lengkap artikel kami yang mencakup berbagai topik menarik seperti teknologi, lifestyle, edukasi, kesehatan, dan banyak lagi."
                keywords="artikel, blog, konten, bacaan, informasi, pengetahuan, teknologi, lifestyle, edukasi"
            />

            <ArticleList
                articles={articles}
                title="Semua Artikel"
                showFilters={true}
            />
        </div>
    );
};

export default Articles;