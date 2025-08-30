self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    // bisa pre-cache aset di sini kalau mau
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated.');
});

self.addEventListener('fetch', (event) => {
    // Bisa diubah untuk cache first atau network first
    // Default: hanya log
    console.log('Fetching:', event.request.url);
});
