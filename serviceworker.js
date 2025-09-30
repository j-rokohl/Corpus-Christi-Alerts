const CACHE_NAME = "task-manager-v3";

const ASSETS_TO_CACHE = [
    "/",
    "/index.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/pages/lake-levels.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/ui.js",
    "/img/task.png",
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