/* Eve-Circle service worker
 * - app shell precached so the app opens offline
 * - pages: network first (fresh when online), cache fallback (offline)
 * - hashed build files, icons, fonts: cache first
 * - API calls and Next.js RSC requests are never touched
 * Bump VERSION to force every client to refresh its caches.
 */
const VERSION = "v3";
const SHELL = "ec-shell-" + VERSION;
const RUNTIME = "ec-runtime-" + VERSION;

const PRECACHE = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  "/bg.webp",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png",
];

const OFFLINE_HTML =
  '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
  "<title>Eve-Circle</title>" +
  '<body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#0d0d1a;color:#f0e6ff;font-family:system-ui,sans-serif;text-align:center;padding:24px">' +
  "<div><h1 style=\"font-weight:600\">You're offline</h1><p style=\"color:#c084fc\">Reconnect once and Eve-Circle will be ready anywhere.</p></div>";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== SHELL && k !== RUNTIME)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

function isCacheableStatic(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/splash/") ||
    /\.(?:png|jpe?g|webp|svg|ico|woff2?)$/i.test(url.pathname)
  );
}

async function networkFirst(request) {
  const cache = await caches.open(SHELL);
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const response = await fetch(request, { signal: controller.signal });
    clearTimeout(timer);
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = (await cache.match(request)) || (await cache.match("/"));
    return (
      cached ||
      new Response(OFFLINE_HTML, {
        status: 503,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      })
    );
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(RUNTIME);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.status === 200) cache.put(request, response.clone());
  return response;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;
  if (url.searchParams.has("_rsc") || request.headers.get("RSC")) return;
  if (url.pathname === "/sw.js") return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }
  if (isCacheableStatic(url)) {
    event.respondWith(cacheFirst(request));
  }
});
