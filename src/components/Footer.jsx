const Footer = () => {
    return (
        <footer className="bg-blue-600 text-white py-4">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-sm text-gray-300">
                    © {new Date().getFullYear()} ArtikelKu. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;