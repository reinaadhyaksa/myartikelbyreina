import { useState } from 'react';

export const usePDFDownload = () => {
    const [downloading, setDownloading] = useState(false);

    const downloadPDF = async (article) => {
        setDownloading(true);
        try {
            const html2pdf = (await import('html2pdf.js')).default;
            const element = document.getElementById('article-content');

            const opt = {
                margin: [20, 15, 20, 15],
                filename: `${article.title.replace(/\s+/g, '_')}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    letterRendering: true,
                    logging: false
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait',
                    compress: true
                },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
                header: {
                    height: 15,
                    contents: {
                        default: '<div style="text-align: center; color: #333; font-size: 12px; font-weight: bold; padding: 5px;">' + article.title + '</div>'
                    }
                },
                footer: null
            };

            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Gagal mengunduh PDF. Silakan coba lagi.');
        } finally {
            setDownloading(false);
        }
    };

    return { downloadPDF, downloading };
};