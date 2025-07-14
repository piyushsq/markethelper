const CACHE_NAME = 'market-helper-v1';
const BASE_URL = '/markethelper/';

const URLS_TO_CACHE = [
  `${BASE_URL}`,
  `${BASE_URL}index.html`,
  `${BASE_URL}manifest.json`,
  `${BASE_URL}service-worker.js`,
  `${BASE_URL}icon-192.png`,
  `${BASE_URL}icon-512.png`
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
    // Serve index.html from cache on navigation (like refresh)
    event.respondWith(
      caches.match(`${BASE_URL}index.html`).then(response =>
        response || fetch(event.request)
      )
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response =>
        response || fetch(event.request)
      )
    );
  }
});
