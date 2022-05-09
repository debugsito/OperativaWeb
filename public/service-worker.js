/*
const doCache = false;
const CACHE_NAME = 'pwa-cache';
self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys()
            .then(keyList =>
                Promise.all(keyList.map(key => {
                    if (!cacheWhitelist.includes(key)) {
                        console.log(`Deleting cache: ${key}`)
                        return caches.delete(key);
                    }
                }))
            )
    );
});
self.addEventListener('install', function (event) {
    if (doCache) {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(function (cache) {
                    fetch("manifest.json")
                        .then(response => {
                            response.json()
                        })
                        .then(assets => {
                            const urlsToCache = [
                                "/",
                                assets["bundle.js"]
                            ]
                            cache.addAll(urlsToCache)
                            console.log('cached');
                        })
                })
        );
    }
});
self.addEventListener('fetch', function (event) {
    if (doCache) {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        );
    }
});
*/
let CACHE_NAME = 'operativa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
];
self.addEventListener('install', function (event) {
// Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
