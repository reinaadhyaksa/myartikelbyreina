export const generateBreadcrumbSchema = (article, id) => {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${window.location.origin}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Artikel",
                "item": `${window.location.origin}/articles`
            },
            ...(article.category && article.category.length > 0 ? [{
                "@type": "ListItem",
                "position": 3,
                "name": article.category[0],
                "item": `${window.location.origin}/category/${encodeURIComponent(article.category[0].toLowerCase())}`
            }] : []),
            {
                "@type": "ListItem",
                "position": article.category && article.category.length > 0 ? 4 : 3,
                "name": article.title,
                "item": `${window.location.origin}/article/${id}`
            }
        ]
    };
};

export const generateAllCategoriesSchema = (categories) => {
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Semua Kategori Artikel - Chronica",
        "description": "Telusuri semua kategori artikel yang tersedia di platform kami.",
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": categories.length,
            "itemListElement": categories.map((category, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "CategoryCode",
                    "name": category.name,
                    "description": `Jelajahi ${category.count} artikel dalam kategori ${category.name}`,
                    "url": `${window.location.origin}/category/${category.slug}`
                }
            }))
        }
    };
};

export const generateCategorySchema = (articles, categoryName) => {
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `Kategori ${categoryName} - ${articles.length} Artikel`,
        "description": `Jelajahi ${articles.length} artikel dalam kategori ${categoryName}.`,
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": articles.length,
            "itemListElement": articles.map((article, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Article",
                    "headline": article.title,
                    "description": article.descriptions,
                    "datePublished": article.date,
                    "image": article.images,
                    "url": `${window.location.origin}/article/${article.id}`
                }
            }))
        }
    };
};