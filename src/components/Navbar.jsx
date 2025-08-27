// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://api-artikel-delta.vercel.app/article');
                const articles = await response.json();

                // Extract and count categories
                const categoryCount = {};
                articles.forEach(article => {
                    if (article.category && Array.isArray(article.category)) {
                        article.category.forEach(cat => {
                            categoryCount[cat] = (categoryCount[cat] || 0) + 1;
                        });
                    }
                });

                // Convert to array
                const categoryArray = Object.keys(categoryCount).map(name => ({
                    name,
                    count: categoryCount[name]
                }));

                setCategories(categoryArray);
            } catch (error) {
                console.error('Error fetching categories:', error);
                // Fallback categories
                setCategories([
                    { name: 'tech', count: 3 },
                    { name: 'sains', count: 2 }
                ]);
            }
        };

        fetchCategories();
    }, []);

    return (
        <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 font-bold text-xl text-blue-600">
                            ArtikelKu
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/articles"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/articles' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                        >
                            List Artikel
                        </Link>

                        {/* Dropdown Kategori */}
                        <div className="relative group">
                            <button className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/categories' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'} flex items-center`}>
                                Kategori
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="py-1">
                                    {categories.map(category => (
                                        <Link
                                            key={category.name}
                                            to={`/category/${category.name}`}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        >
                                            <div className="flex justify-between">
                                                <span className="capitalize">{category.name}</span>
                                                <span className="text-gray-500">{category.count}</span>
                                            </div>
                                        </Link>
                                    ))}
                                    <div className="border-t my-1"></div>
                                    <Link
                                        to="/categories"
                                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 font-medium"
                                    >
                                        Lihat Semua Kategori →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                            <Link
                                to="/"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/articles"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/articles' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
                            >
                                List Artikel
                            </Link>

                            <div className="pt-2 pb-1">
                                <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kategori</p>
                                {categories.slice(0, 5).map(category => (
                                    <Link
                                        key={category.name}
                                        to={`/category/${category.name}`}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                    >
                                        <div className="flex justify-between">
                                            <span className="capitalize">{category.name}</span>
                                            <span className="text-gray-500 text-sm">{category.count}</span>
                                        </div>
                                    </Link>
                                ))}
                                <Link
                                    to="/categories"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
                                >
                                    Lihat Semua Kategori →
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;