const CACHE_NAME = "corpus-christi-alerts-v3";

const ASSETS_TO_CACHE = [
    "/",
    // Pages
    "/index.html",
    "/pages/about.html",
    "/pages/alerts.html",
    "/pages/contact.html",
    "/pages/forecasts.html",
    "/pages/lake-levels.html",
    "/pages/about", // For netlify pretty urls
    "/pages/alerts", // For netlify pretty urls
    "/pages/contact", // For netlify pretty urls
    "/pages/forecasts", // For netlify pretty urls
    "/pages/lake-levels", // For netlify pretty urls
    // CSS
    "/css/materialize.min.css",
    "/css/style.css",
    // Icon
    "/icon/icon-16x16.png",
    "/icon/icon-32x32.png",
    "/icon/icon-192x192.png",
    "/icon/icon-512x512.png",
    // JS
    "/js/alert.js",
    "/js/forecast.js",
    "/js/graphicast.js",
    "/js/lake-level.js",
    "/js/materialize.min.js",
    "/js/menus.js",
    "/js/ui.js"
];

self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Service Worker: Caching Files');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log("Service Worker: Deleting Old Caches");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    console.log('Service Worker: Fetching...', event.request.url);
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone()); //Update cache with new response
                    return networkResponse;
                })
            })
        })
    );
});