import { getIconClass } from '../functionality/apiFunctions';
import { formatDate } from '../functionality/apiFunctions';

const ArticleContent = ({ article, optimizedImageUrl, imageAltText }) => {
    return (
        <div id="article-content" className="pdf-content">
            <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl md:text-4xl font-bold" data-aos="fade-up" itemProp="headline">
                    {article.title}
                </h1>
            </div>

            <div className="text-gray-600 mb-4 gap-2" data-aos="fade-up" data-aos-delay="100">
                <div className="flex items-center gap-2">
                    <time dateTime={article.date} itemProp="datePublished">
                        {formatDate(article.date)}
                    </time>
                </div>
            </div>

            {optimizedImageUrl && (
                <div className="mb-8 rounded-xl overflow-hidden" data-aos="fade-up" data-aos-delay="200">
                    <img
                        src={optimizedImageUrl}
                        alt={imageAltText}
                        className="w-full h-64 md:h-96 object-cover"
                        loading="lazy"
                        itemProp="image"
                    />
                </div>
            )}

            <div className="prose max-w-none" data-aos="fade-up" data-aos-delay="300" itemProp="articleBody">
                {article.descriptions && (
                    <p className="text-gray-700 leading-relaxed mb-6 text-lg font-medium pdf-description" itemProp="description">
                        {article.descriptions}
                    </p>
                )}

                {article.contents && article.contents.map((section, index) => (
                    <div key={index} className="pdf-section">
                        {section.subtitle && (
                            <h2 className="text-xl font-semibold mt-6 mb-3 pdf-subtitle">{section.subtitle}</h2>
                        )}
                        <p className="text-gray-700 leading-relaxed mb-4 pdf-text">
                            {section.content}
                        </p>
                    </div>
                ))}
            </div>

            {article.references && article.references.length > 0 && (
                <div className="mt-8 border-t pt-6 pdf-references">
                    <h2 className="text-lg font-semibold mb-3 pdf-subtitle">Sumber Referensi</h2>
                    <div className="flex flex-col gap-2">
                        {article.references.map((ref, idx) => (
                            <a
                                key={idx}
                                href={ref.url}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="flex items-center gap-2 text-blue-600 hover:underline pdf-reference"
                            >
                                <i className={`${getIconClass(ref.url)} text-lg`}></i>
                                <span>{ref.title}</span>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            <PDFStyles />
        </div>
    );
};

const PDFStyles = () => (
    <style>
        {`
            @media screen {
                .pdf-content {
                    /* Tidak ada perubahan styling untuk tampilan web */
                }
            }
            
            /* Style untuk mencetak/PDF */
            @media print {
                body * {
                    visibility: hidden;
                }
                .pdf-content, .pdf-content * {
                    visibility: visible;
                }
                .pdf-content {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    padding: 15mm;
                    font-family: 'Arial', 'Helvetica', sans-serif;
                    line-height: 1.6;
                    color: #333;
                }
                
                .pdf-description {
                    font-size: 14pt;
                    margin-bottom: 12pt;
                    text-align: justify;
                }
                
                .pdf-subtitle {
                    font-size: 16pt;
                    margin-top: 16pt;
                    margin-bottom: 8pt;
                    color: #2c5282;
                    font-weight: bold;
                }
                
                .pdf-text {
                    font-size: 12pt;
                    margin-bottom: 10pt;
                    text-align: justify;
                }
                
                .pdf-references {
                    margin-top: 20pt;
                    border-top: 1pt solid #ddd;
                    padding-top: 12pt;
                }
                
                .pdf-reference {
                    font-size: 11pt;
                    margin-bottom: 4pt;
                    color: #2b6cb0;
                    text-decoration: none;
                }
                
                /* Menambahkan margin pada elemen gambar */
                .pdf-content img {
                    margin: 10pt auto;
                    display: block;
                    max-width: 100%;
                    height: auto;
                    border-radius: 4pt;
                }
            }
        `}
    </style>
);

export default ArticleContent;