// src/components/ShareButtons.jsx

const ShareButtons = ({ title, url }) => {
    const shareUrl = encodeURIComponent(url || window.location.href);
    const shareText = encodeURIComponent(title);

    const socialPlatforms = [
        {
            name: 'Facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
            icon: 'https://cdn-icons-png.flaticon.com/512/124/124010.png',
            color: 'hover:bg-blue-600'
        },
        {
            name: 'Twitter',
            url: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
            icon: 'https://cdn-icons-png.flaticon.com/512/124/124021.png',
            color: 'hover:bg-blue-400'
        },
        {
            name: 'WhatsApp',
            url: `https://api.whatsapp.com/send?text=${shareText} ${shareUrl}`,
            icon: 'https://cdn-icons-png.flaticon.com/512/124/124034.png',
            color: 'hover:bg-green-500'
        },
        {
            name: 'LinkedIn',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
            icon: 'https://cdn-icons-png.flaticon.com/512/124/124011.png',
            color: 'hover:bg-blue-700'
        }
    ];

    const handleShare = (shareUrl) => {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    };

    return (
        <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-lg font-medium mb-4">Bagikan artikel ini:</p>
            <div className="flex space-x-4">
                {socialPlatforms.map((platform) => (
                    <button
                        key={platform.name}
                        onClick={() => handleShare(platform.url)}
                        className={`p-2 rounded-full bg-gray-200 ${platform.color} transition-colors duration-200`}
                        aria-label={`Bagikan ke ${platform.name}`}
                    >
                        <img
                            src={platform.icon}
                            alt={platform.name}
                            className="w-5 h-5"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ShareButtons;