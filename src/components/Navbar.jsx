import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BASE_API } from '../api';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${BASE_API}/article`);
                const articles = await response.json();

                const categoryCount = {};
                articles.forEach(article => {
                    if (article.category && Array.isArray(article.category)) {
                        article.category.forEach(cat => {
                            if (cat) {
                                categoryCount[cat] = (categoryCount[cat] || 0) + 1;
                            }
                        });
                    }
                });

                const categoryArray = Object.keys(categoryCount)
                    .map(name => ({
                        name,
                        count: categoryCount[name]
                    }))
                    .sort((a, b) => b.count - a.count) 
                    .slice(0, 3); 
                setCategories(categoryArray);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategories([
                    { name: 'lifestyle', count: 5 },
                    { name: 'edukasi', count: 4 },
                    { name: 'teknologi', count: 3 }
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
                            <span itemProp="name">Chronica</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                            aria-current={location.pathname === '/' ? 'page' : undefined}
                        >
                            Beranda
                        </Link>
                        <Link
                            to="/articles"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/articles' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                            aria-current={location.pathname === '/articles' ? 'page' : undefined}
                        >
                            Semua Artikel
                        </Link>

                        <div className="relative group">
                            <button
                                className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname.startsWith('/category') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'} flex items-center`}
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Kategori
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="py-1" role="menu" aria-orientation="vertical">
                                    <div className="px-4 py-2 text-xs text-gray-500 border-b">
                                        Kategori Populer
                                    </div>
                                    {categories.map(category => (
                                        <Link
                                            key={category.name}
                                            to={`/category/${encodeURIComponent(category.name.toLowerCase())}`}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            role="menuitem"
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
                                        role="menuitem"
                                    >
                                        Lihat Semua Kategori →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
                            aria-label="Toggle navigation menu"
                            aria-expanded={isOpen}
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

                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                            <Link
                                to="/"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
                                aria-current={location.pathname === '/' ? 'page' : undefined}
                            >
                                Beranda
                            </Link>
                            <Link
                                to="/articles"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/articles' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
                                aria-current={location.pathname === '/articles' ? 'page' : undefined}
                            >
                                Semua Artikel
                            </Link>

                            <div className="pt-2 pb-1">
                                <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kategori Populer</p>
                                {categories.map(category => (
                                    <Link
                                        key={category.name}
                                        to={`/category/${encodeURIComponent(category.name.toLowerCase())}`}
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