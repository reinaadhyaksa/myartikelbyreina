const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-blue-600 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Chronica</h3>
                        <p className="text-sm text-blue-100">
                            Platform modern untuk membaca artikel dengan beragam topik menarik dan informatif.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
                        <ul className="space-y-2 text-sm text-blue-100">
                            <li><a href="/" className="hover:text-white transition-colors">Beranda</a></li>
                            <li><a href="/articles" className="hover:text-white transition-colors">Semua Artikel</a></li>
                            <li><a href="/categories" className="hover:text-white transition-colors">Kategori</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Kontak</h3>
                        <p className="text-sm text-blue-100">
                            Email: reiadhyaksa@gmail.com<br />
                            WhatsApp: 082313931717
                        </p>
                    </div>
                </div>

                <div className="border-t border-blue-500 mt-8 pt-6 text-center">
                    <p className="text-sm text-blue-100">
                        © {currentYear} Chronica. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;