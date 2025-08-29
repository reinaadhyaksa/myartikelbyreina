import { Helmet } from 'react-helmet';

const SEO = ({
    title,
    description,
    keywords,
    article = false,
    publishedTime,
    modifiedTime,
    author,
    image,
    url
}) => {
    const siteTitle = "Chronica - Platform Artikel Modern";
    const defaultDescription = "Temukan artikel menarik dan informatif seputar teknologi, lifestyle, edukasi, dan banyak lagi.";
    const siteUrl = "http://localhost:5173";
    const siteImage = "http://localhost:5173/images/og-image.jpg";
    const twitterHandle = "@artikelku";

    const seo = {
        title: title ? `${title} | ${siteTitle}` : siteTitle,
        description: description || defaultDescription,
        keywords: keywords || "artikel, blog, informasi, teknologi, lifestyle, edukasi",
        image: image || siteImage,
        url: url || typeof window !== 'undefined' ? window.location.href : siteUrl,
    };

    const schemaOrgWebPage = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: seo.title,
        description: seo.description,
        url: seo.url,
    };

    const schemaOrgArticle = article ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: seo.description,
        image: seo.image,
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        author: {
            '@type': 'Person',
            name: author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'ArtikelKu',
            logo: {
                '@type': 'ImageObject',
                url: 'http://localhost:5173//logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': seo.url,
        },
    } : null;

    return (
        <Helmet>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="keywords" content={seo.keywords} />
            <meta name="image" content={seo.image} />

            <link rel="canonical" href={seo.url} />

            <meta property="og:url" content={seo.url} />
            <meta property="og:type" content={article ? "article" : "website"} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
            <meta property="og:site_name" content="ArtikelKu" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={twitterHandle} />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />

            <script type="application/ld+json">
                {JSON.stringify(schemaOrgWebPage)}
            </script>

            {article && schemaOrgArticle && (
                <script type="application/ld+json">
                    {JSON.stringify(schemaOrgArticle)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;