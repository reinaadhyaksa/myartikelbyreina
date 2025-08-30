import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-blue-600">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mt-4">Halaman Tidak Ditemukan</h2>
                <p className="text-gray-600 mt-2">
                    Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
                </p>
                <Link
                    to="/"
                    className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
};

export const NotFoundArticles = () => {
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
};