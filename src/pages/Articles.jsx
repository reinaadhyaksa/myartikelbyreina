import { useState, useEffect } from 'react';
import ArticleList from '../components/ArticleList';

const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('https://api-artikel-delta.vercel.app/article');
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error('Error fetching articles:', error);
                const sampleData = [
                    {
                        id: "aB3cD7eF9gH",
                        title: "Cara Membuat Website dengan HTML dan CSS",
                        images: "https://res.cloudinary.com/dc9q58yts/image/upload/v1756034722/nivoh2ezoxclotgpnp5n.jpg",
                        descriptions: "Panduan lengkap untuk pemula yang ingin belajar membuat website dari dasar menggunakan HTML dan CSS.",
                        date: "2025-08-24T11:37:23.645Z"
                    },
                    {
                        id: "q1mkFTlZt9",
                        title: "Tips Produktivitas Kerja dari Rumah",
                        images: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                        descriptions: "Bagaimana tetap produktif saat bekerja dari rumah dengan mengatur waktu dan ruang kerja yang nyaman.",
                        date: "2025-08-23T09:15:10.123Z"
                    },
                    {
                        id: "r2opGHjK12",
                        title: "Mengenal Framework JavaScript Populer di 2025",
                        images: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                        descriptions: "Perbandingan framework JavaScript terbaru dan mana yang paling sesuai untuk proyek Anda.",
                        date: "2025-08-22T14:20:45.789Z"
                    }
                ];
                setArticles(sampleData);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div className="pt-20 min-h-screen">
            <ArticleList
                articles={articles}
                title="Semua Artikel"
                showFilters={true}
            />
        </div>
    );
};

export default Articles;