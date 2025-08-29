import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const optimizeCloudinaryImage = (url) => {
        if (!url.includes('res.cloudinary.com')) {
            return url;
        }

        if (url.includes('/upload/')) {
            const parts = url.split('/upload/');

            if (parts[1].includes('/v')) {
                return `${parts[0]}/upload/f_auto,q_auto,w_800/${parts[1]}`;
            } else {
                return `${parts[0]}/upload/f_auto,q_auto,w_800/${parts[1]}`;
            }
        }

        return url;
    };

    const imageUrl = optimizeCloudinaryImage(article.images || 'https://res.cloudinary.com/dc9q58yts/image/upload/v1756034722/nivoh2ezoxclotgpnp5n.jpg');

    return (
        <article className="card h-full" data-aos="fade-up" itemScope itemType="https://schema.org/Article">
            <div className="h-48 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    itemProp="image"
                />
            </div>
            <div className="p-6">
                <div className="text-xl font-semibold mb-2 line-clamp-2 h-14 overflow-hidden" itemProp="headline">
                    {article.title}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3 h-18 overflow-hidden" itemProp="description">
                    {article.descriptions}
                </p>
                <div className="flex justify-between items-center">
                    <time className="text-sm text-gray-500" dateTime={new Date(article.date).toISOString()} itemProp="datePublished">
                        {formatDate(article.date)}
                    </time>
                    <Link
                        to={`/article/${article.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                        aria-label={`Baca selengkapnya tentang ${article.title}`}
                        itemProp="url"
                    >
                        Baca Selengkapnya →
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default ArticleCard;