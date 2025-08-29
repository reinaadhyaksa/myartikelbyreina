import { useState, useEffect, useRef } from 'react';
import ArticleCard from './ArticleCard';
import SEO from './SEO';

const ArticleList = ({ articles, title, showFilters = false, showLatest = false, showRecommended = false }) => {
    const [filteredArticles, setFilteredArticles] = useState(articles);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const categories = [...new Set(articles
        .map(article => {
            const articleCategories = Array.isArray(article.category)
                ? article.category
                : [article.category];
            return articleCategories.filter(category => category);
        })
        .flat()
    )].slice(0, 5); 

    useEffect(() => {
        let processedArticles = [...articles];

        if (showRecommended) {
            processedArticles = processedArticles.filter(article => article.recomendations);
        }

        if (selectedCategory) {
            processedArticles = processedArticles.filter(article => {
                const articleCategories = Array.isArray(article.category)
                    ? article.category
                    : [article.category];
                return articleCategories.includes(selectedCategory);
            });
        }

        if (searchTerm) {
            processedArticles = processedArticles.filter(article =>
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.descriptions.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (article.category && article.category.join(' ').toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (showLatest) {
            processedArticles = processedArticles
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 3);
        }

        setFilteredArticles(processedArticles);
    }, [articles, searchTerm, selectedCategory, showLatest, showRecommended]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
    };

    return (
        <section className="py-12">
            <SEO
                title={title}
                description={`Jelajahi koleksi ${title.toLowerCase()} kami yang informatif dan menarik.`}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-center mb-8" data-aos="fade-up">
                    {title}
                </h1>

                {showFilters && (
                    <div className="mb-8 relative z-20" data-aos="fade-up" data-aos-delay="100">
                        <div className="max-w-2xl mx-auto space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari artikel berdasarkan judul, deskripsi, atau kategori..."
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    aria-label="Cari artikel"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-sm font-medium text-gray-700">Filter by:</span>

                                    <div className="relative" ref={dropdownRef}>
                                        <button
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            aria-haspopup="true"
                                            aria-expanded={isDropdownOpen}
                                        >
                                            <span>{selectedCategory || "Semua Kategori"}</span>
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {isDropdownOpen && (
                                            <div className="absolute z-50 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                                                <div
                                                    className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition-colors duration-150"
                                                    onClick={() => handleCategorySelect('')}
                                                    role="option"
                                                    aria-selected={!selectedCategory}
                                                >
                                                    Semua Kategori
                                                </div>
                                                {categories.map(category => (
                                                    <div
                                                        key={category}
                                                        className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition-colors duration-150 capitalize"
                                                        onClick={() => handleCategorySelect(category)}
                                                        role="option"
                                                        aria-selected={selectedCategory === category}
                                                    >
                                                        {category}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {(searchTerm || selectedCategory) && (
                                        <button
                                            onClick={clearFilters}
                                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-150"
                                            aria-label="Hapus semua filter"
                                        >
                                            <span>Hapus filter</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                <div className="text-sm text-gray-500">
                                    {filteredArticles.length} artikel ditemukan
                                </div>
                            </div>

                            {(searchTerm || selectedCategory) && (
                                <div className="flex flex-wrap gap-2">
                                    {searchTerm && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            Search: "{searchTerm}"
                                            <button
                                                onClick={() => setSearchTerm('')}
                                                className="ml-1 rounded-full hover:bg-blue-200 transition-colors duration-150"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18-6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </span>
                                    )}
                                    {selectedCategory && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Category: {selectedCategory}
                                            <button
                                                onClick={() => setSelectedCategory('')}
                                                className="ml-1 rounded-full hover:bg-green-200 transition-colors duration-150"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="relative z-10">
                    {filteredArticles.length === 0 ? (
                        <div className="text-center py-12" data-aos="fade-up">
                            <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-gray-500 text-lg">Tidak ada artikel yang ditemukan.</p>
                            {(searchTerm || selectedCategory) && (
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredArticles.map((article, index) => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ArticleList;