import { Link } from 'react-router-dom';

const CategoryList = () => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-8" data-aos="fade-up">
                    Kategori Artikel
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <Link
                            key={category.id}
                            to={`/articles?category=${category.id}`}
                            className="card p-6 hover:shadow-lg transition-shadow duration-300 flex items-center justify-between"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="flex items-center">
                                <span className={`${category.color} rounded-lg px-3 py-1 font-medium mr-4`}>
                                    {category.name}
                                </span>
                            </div>
                            <span className="text-gray-500 bg-gray-100 rounded-full px-3 py-1 text-sm">
                                {category.count} artikel
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryList;