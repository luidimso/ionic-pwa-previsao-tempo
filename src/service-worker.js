/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

const CACHE_APP_SHELL = "cache-app-shell";
const CACHE_APP_DATA = "cache-app-data";

self.toolbox.options.debug = true;

self.toolbox.options.cache = {
  name: CACHE_APP_SHELL
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './assets/imgs/1.jpg',
    './assets/imgs/2.jpg',
    './assets/imgs/3.jpg',
    './assets/imgs/4.jpg',
    './assets/imgs/5.jpg',
    './assets/imgs/6.jpg',
    './build/main.js',
    './build/vendor.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

self.toolbox.router.any('/*', self.toolbox.networkFirst, {
  origin: 'http://api.openweathermap.org',
  cache: {
    name: CACHE_APP_DATA
  }
});

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.cacheFirst);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));

self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
