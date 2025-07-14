const CACHE_NAME = 'market-helper-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  '/icon-192.png',
  '/icon-512.png'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // Always serve index.html for navigation (like refresh)
    event.respondWith(
      caches.match('/index.html').then(response => response || fetch('/index.html'))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
});
