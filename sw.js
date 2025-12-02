// Service Worker for Express 64
const CACHE_NAME = 'express64-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/images/express64-store-exterior.jpg',
  '/images/express64-beer-wine-coolers.jpg',
  '/images/express64-beverage-selection.jpg',
  '/images/express64-store-interior.jpg',
  '/images/express64-convenience-section.jpg',
  '/images/express64-checkout-area.jpg',
  '/images/express64-snack-wine-aisles.jpg',
  '/images/express64-frozen-beverages.jpg',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Express 64: Cache opened');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Express 64: Cache install failed:', error);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // Clone the request because it's a stream
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response because it's a stream
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(() => {
          // If network fails, try to return offline page or fallback
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
          
          // For images, return a fallback image
          if (event.request.destination === 'image') {
            return new Response(
              '<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="150" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#666">Express 64</text></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          }
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Express 64: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for form submissions when back online
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(
      // Handle offline form submissions when back online
      handleOfflineFormSubmissions()
    );
  }
});

// Function to handle offline form submissions
async function handleOfflineFormSubmissions() {
  try {
    // Get stored form data from IndexedDB or localStorage
    // and attempt to submit when back online
    console.log('Express 64: Syncing offline form submissions');
    // Implementation would depend on your backend
  } catch (error) {
    console.log('Express 64: Sync failed:', error);
  }
}

// Show notification when app is updated
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Cache size management
const MAX_CACHE_SIZE = 50; // Maximum number of items in cache

async function limitCacheSize(cacheName, size) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > size) {
    await cache.delete(keys[0]);
    limitCacheSize(cacheName, size);
  }
}

// Periodic cache cleanup
self.addEventListener('fetch', (event) => {
  if (event.request.method === 'GET') {
    event.waitUntil(
      limitCacheSize(CACHE_NAME, MAX_CACHE_SIZE)
    );
  }
});