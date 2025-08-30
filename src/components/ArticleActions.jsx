const ArticleActions = ({ onDownloadPDF, downloading }) => {
    return (
        <div className="mt-8 pt-6 border-t border-gray-200" data-aos="fade-up" data-aos-delay="100">
            <button
                onClick={onDownloadPDF}
                disabled={downloading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                title="Download artikel sebagai PDF"
            >
                {downloading ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                        <span>Menyiapkan...</span>
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Download PDF</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default ArticleActions;