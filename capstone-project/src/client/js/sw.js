/* eslint-disable no-restricted-globals */
const staticCacheName = 'travel-planner';

/**
 * Install service worker
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => cache.addAll([
      '/',
      '/runtime.js',
      '/index.js',
      'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap',
      'https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN7rgOUuhpKKSTjw.woff2',
    ])),
  );
});

/**
 * Delete all outdated caches
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.filter((cacheName) => cacheName.startsWith('natural')
                 && cacheName !== staticCacheName).map((cacheName) => caches.delete(cacheName)),
    )),
  );
});

/**
 * Respond to request events with items in the cache
 */
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin === window.location.origin) {
    if (requestUrl.pathname === '/') {
      event.respondWith(caches.match('/'));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request)),
  );
});
