var cacheName = 'likha';
var filesToCache = [
  '/',
  '/index.html',
  'assets/spaceShips_001.png',
  'assets/enemyBlack5.png',
  'assets/star_full.png',
  'assets/triangle.png',
  'assets/wind.png',
  'assets/water.png',
  'assets/lightning.png',
  'assets/stone.png',
  'assets/bar.png',
  'assets/bg.png',
  '/js/game.js',
  'js/phaser.min.js',
];
 
self.addEventListener('install', function(event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function(err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});

self.addEventListener('activate', function(event) {
    console.log('sw activate');
    event.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('sw removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
});