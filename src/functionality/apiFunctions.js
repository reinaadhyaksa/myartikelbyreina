import { BASE_API } from '../api';
import { sampleData, errcategory } from '../data';

export const fetchArticles = async () => {
    try {
        const response = await fetch(`${BASE_API}/article`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        return sampleData;
    }
};

export const fetchArticleById = async (id) => {
    try {
        const response = await fetch(`${BASE_API}/article/${id}`);
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error('Error fetching article:', error);
        return null;
    }
};

export const fetchCategoriesFromArticles = async () => {
    try {
        const articles = await fetchArticles();
        const categoryCount = {};

        articles.forEach(article => {
            if (article.category && Array.isArray(article.category)) {
                article.category.forEach(cat => {
                    if (cat) {
                        const normalizedCat = cat.toLowerCase().trim();
                        categoryCount[normalizedCat] = (categoryCount[normalizedCat] || 0) + 1;
                    }
                });
            }
        });

        return Object.keys(categoryCount).map(name => ({
            name,
            count: categoryCount[name],
            slug: encodeURIComponent(name.toLowerCase())
        })).sort((a, b) => b.count - a.count);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [errcategory];
    }
};

export const getRelatedArticles = async (currentArticle, allArticles) => {
    if (!currentArticle.category || currentArticle.category.length === 0) {
        return [];
    }

    return allArticles
        .filter(a =>
            a.id !== currentArticle.id &&
            a.category &&
            a.category.some(cat => currentArticle.category.includes(cat))
        )
        .slice(0, 3);
};

export const optimizeCloudinaryImage = (url) => {
    if (!url || !url.includes('res.cloudinary.com')) {
        return url;
    }

    if (url.includes('/upload/')) {
        const parts = url.split('/upload/');
        if (parts[1].includes('/v')) {
            return `${parts[0]}/upload/f_auto,q_auto,w_1200/${parts[1]}`;
        } else {
            return `${parts[0]}/upload/f_auto,q_auto,w_1200/${parts[1]}`;
        }
    }

    return url;
};

export const generateImageAltText = (title, category) => {
    if (category && category.length > 0) {
        return `Gambar ilustrasi untuk artikel "${title}" tentang ${category.join(', ')}`;
    }
    return `Gambar ilustrasi untuk artikel "${title}"`;
};

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

export const getIconClass = (url) => {
    if (!url) return "fa-solid fa-globe text-gray-500";
    if (url.includes("youtube")) return "fa-brands fa-youtube text-red-600";
    if (url.includes("tiktok")) return "fa-brands fa-tiktok text-black";
    if (url.includes("instagram")) return "fa-brands fa-instagram text-pink-500";
    return "fa-solid fa-globe text-gray-500";
};

export const generateMetaDescription = (article) => {
    if (article.descriptions) {
        return article.descriptions.length > 160
            ? article.descriptions.substring(0, 160) + '...'
            : article.descriptions;
    }

    if (article.contents && article.contents.length > 0) {
        const firstContent = article.contents[0].content;
        return firstContent.length > 160
            ? firstContent.substring(0, 160) + '...'
            : firstContent;
    }

    return `Baca artikel tentang ${article.title} di ArtikelKu.`;
};