/**
 * Tek /api/content isteği — site-loader, content.js, cms-ext paylaşır.
 * Terminalde 3× aynı GET spam'ini önler.
 */
(function () {
  'use strict';
  if (window.__firinciContentPromise) return;
  window.__firinciContentPromise = fetch('/api/content', {
    headers: { Accept: 'application/json' },
  })
    .then(function (r) {
      return r.ok ? r.json() : null;
    })
    .catch(function () {
      return null;
    });
})();
