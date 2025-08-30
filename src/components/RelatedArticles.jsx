import { Link } from 'react-router-dom';

const RelatedArticles = ({ articles }) => {
    if (articles.length === 0) return null;

    return (
        <div className="mt-12 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Artikel Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {articles.map(related => (
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
    );
};

export default RelatedArticles;