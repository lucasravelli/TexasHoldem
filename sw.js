const V='holdem-v1',CORE=['./','index.html','manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x.startsWith('holdem-')).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
if(u.origin===location.origin){e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>{const n=fetch(r).then(res=>{if(res.ok)caches.open(V).then(c=>c.put(r,res.clone()));return res}).catch(()=>h||caches.match('index.html'));return h||n}))}
else if(/(^|\.)(googleapis|gstatic)\.com$/.test(u.hostname)){e.respondWith(caches.open(V).then(c=>c.match(r).then(h=>{const n=fetch(r).then(res=>{c.put(r,res.clone());return res}).catch(()=>h);return h||n})))}});
