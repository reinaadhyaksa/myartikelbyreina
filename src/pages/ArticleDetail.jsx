// src/pages/ArticleDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ShareButtons from '../components/ShareButtons';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`https://api-artikel-delta.vercel.app/article/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setArticle(data);
                } else {
                    console.error('Article not found');
                    // Fallback to sample data if API is not available
                    setArticle({
                        id: "aB3cD7eF9gH",
                        title: "Cara Membuat Website dengan HTML dan CSS",
                        images: "https://res.cloudinary.com/dc9q58yts/image/upload/v1756034722/nivoh2ezoxclotgpnp5n.jpg",
                        descriptions: "Panduan lengkap untuk pemula yang ingin belajar membuat website dari dasar menggunakan HTML dan CSS.",
                        contents: [
                            {
                                content: "HTML adalah bahasa markup yang digunakan untuk membuat struktur halaman website. Dengan HTML, kita dapat menentukan heading, paragraf, gambar, link, dan elemen-elemen lainnya."
                            },
                            {
                                content: "CSS digunakan untuk memperindah tampilan website. Dengan CSS, kita dapat mengatur warna, font, layout, dan berbagai aspek visual lainnya dari sebuah halaman web."
                            },
                            {
                                content: "Untuk mulai membuat website, Anda hanya perlu editor teks seperti Notepad++ atau Visual Studio Code dan browser web untuk melihat hasilnya."
                            }
                        ],
                        date: "2025-08-24T11:37:23.645Z",
                        author: "Admin Website"
                    });
                }
            } catch (error) {
                console.error('Error fetching article:', error);
                // Fallback to sample data if API is not available
                setArticle({
                    id: "aB3cD7eF9gH",
                    title: "Cara Membuat Website dengan HTML dan CSS",
                    images: "https://res.cloudinary.com/dc9q58yts/image/upload/v1756034722/nivoh2ezoxclotgpnp5n.jpg",
                    descriptions: "Panduan lengkap untuk pemula yang ingin belajar membuat website dari dasar menggunakan HTML dan CSS.",
                    contents: [
                        {
                            content: "HTML adalah bahasa markup yang digunakan untuk membuat struktur halaman website. Dengan HTML, kita dapat menentukan heading, paragraf, gambar, link, dan elemen-elemen lainnya."
                        },
                        {
                            content: "CSS digunakan untuk memperindah tampilan website. Dengan CSS, kita dapat mengatur warna, font, layout, dan berbagai aspek visual lainnya dari sebuah halaman web."
                        },
                        {
                            content: "Untuk mulai membuat website, Anda hanya perlu editor teks seperti Notepad++ atau Visual Studio Code dan browser web untuk melihat hasilnya."
                        }
                    ],
                    date: "2025-08-24T11:37:23.645Z",
                    author: "Admin Website"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    if (loading) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Artikel tidak ditemukan</h1>
                    <Link to="/articles" className="text-blue-600 hover:underline">
                        Kembali ke daftar artikel
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-20 min-h-screen bg-gray-50">
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <Link
                        to="/articles"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Daftar Artikel
                    </Link>

                    <h1 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">
                        {article.title}
                    </h1>

                    <div className="flex items-center text-gray-600 mb-8" data-aos="fade-up" data-aos-delay="100">
                        <span>{formatDate(article.date)}</span>
                        <span className="mx-2">•</span>
                        <span>{article.author || 'Admin Website'}</span>
                    </div>

                    {article.images && (
                        <div className="mb-8 rounded-xl overflow-hidden" data-aos="fade-up" data-aos-delay="200">
                            <img
                                src={article.images}
                                alt={article.title}
                                className="w-full h-64 md:h-96 object-cover"
                            />
                        </div>
                    )}

                    <div className="prose max-w-none" data-aos="fade-up" data-aos-delay="300">
                        {article.descriptions && (
                            <p className="text-gray-700 leading-relaxed mb-6 text-lg font-medium">
                                {article.descriptions}
                            </p>
                        )}

                        {article.contents && article.contents.map((section, index) => (
                            <p key={index} className="text-gray-700 leading-relaxed mb-4">
                                {section.content}
                            </p>
                        ))}
                    </div>

                    <ShareButtons title={article.title} />
                </div>
            </article>
        </div>
    );
};

export default ArticleDetail;