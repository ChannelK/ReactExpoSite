"use strict";var precacheConfig=[["/ReactExpoSite/index.html","b3888deb7eb4380eecbb7f4b0627bb9e"],["/ReactExpoSite/static/css/main.c5d5add7.css","922526c95a4e82cb15130531df73e153"],["/ReactExpoSite/static/js/main.76da88c9.js","630062fe26135ce235e30248a549e522"],["/ReactExpoSite/static/media/1280px-Classic_Cappuccino.bb12fd8d.jpg","bb12fd8d97ffafee49ecddf8891c2f15"],["/ReactExpoSite/static/media/Bean.708eb027.png","708eb02764583e73f90ca976cfe34e5c"],["/ReactExpoSite/static/media/PixelGrass.0e43cf75.png","0e43cf755dde8d4724a6933c308add2e"],["/ReactExpoSite/static/media/art_latte.c73b1457.jpeg","c73b1457afaa6b27f985a64768b88106"],["/ReactExpoSite/static/media/cortado.7e1660f6.jpeg","7e1660f632d4887f77227198bd20e8f4"],["/ReactExpoSite/static/media/flat_white.6418512a.jpg","6418512a2d3498a9dfa21827391dea3f"],["/ReactExpoSite/static/media/green_shake.b51a80f4.jpeg","b51a80f4d467824a3fd8e52ab9732ffc"],["/ReactExpoSite/static/media/logo.ee7cd8ed.svg","ee7cd8ed2dcec943251eb2763684fc6f"],["/ReactExpoSite/static/media/menu-icon.ba2a92e4.svg","ba2a92e4bb260fbfe9b24aa0ec479c7b"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),n="index.html";(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),t=urlsToCacheKeys.has(a));var r="/ReactExpoSite/index.html";!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL(r,self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});