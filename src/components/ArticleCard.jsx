// src/components/ArticleCard.jsx
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <div className="card h-full" data-aos="fade-up">
            <div className="h-48 overflow-hidden">
                <img
                    src={article.images || 'https://res.cloudinary.com/dc9q58yts/image/upload/v1756034722/nivoh2ezoxclotgpnp5n.jpg'}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 line-clamp-2 h-14 overflow-hidden">
                    {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 h-18 overflow-hidden">
                    {article.descriptions}
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{formatDate(article.date)}</span>
                    <Link
                        to={`/article/${article.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Baca Selengkapnya →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;