if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let o={};const t=e=>n(e,d),c={module:{uri:d},exports:o,require:t};i[d]=Promise.all(s.map((e=>c[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3ea082d2"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index.432167be.js",revision:null},{url:"assets/index.d7a40437.css",revision:null},{url:"index.html",revision:"a9cd9d1a47c56684516d7c4f28af65a7"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"icon-192x192.png",revision:"ea1fad248d6ba662ecb000d5b08e0415"},{url:"icon-256x256.png",revision:"d638ecff1b40f0a280e5fd748dbb055c"},{url:"icon-384x384.png",revision:"a29a414c747d017a3b31da6d983318af"},{url:"icon-512x512.png",revision:"0c799f3796bf4d559e0d11de435907df"},{url:"manifest.webmanifest",revision:"0cf04eea02a94461e95131d72a55d7ed"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
