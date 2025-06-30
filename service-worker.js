const CACHE_NAME = 'empregaaki-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/main.css',
    '/css/index.css',
    '/js/script.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@700;900&family=Lato:wght@400;700&display=swap',

];

// Instalação do Service Worker e caching dos assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting()) // Força o novo Service Worker a ativar imediatamente
    );
});

// Intercepta requisições de rede para servir do cache primeiro
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - retorna a resposta do cache
                if (response) {
                    return response;
                }
                // Não há nada no cache - tenta buscar na rede
                return fetch(event.request).then(
                    response => {
                        // Verifica se recebemos uma resposta válida
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clona a resposta. Uma resposta é um stream e só pode ser consumida uma vez.
                        // Precisamos cloná-la para que o navegador possa consumi-la e o cache também.
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

// Ativação do Service Worker e limpeza de caches antigos
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // Exclui caches antigos
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Permite que o Service Worker controle as páginas imediatamente
    );
});