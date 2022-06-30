// ==UserScript==
// @id              Easy-Google-Streetview-Button
// @name            IITC Plugin: Easy Google Streetview Button
// @category        Info
// @version         0.1.2
// @namespace       https://github.com/Ayaro1/IITC-Easy-Google-Streetview-Button/
// @downloadURL     https://github.com/Ayaro1/IITC-Easy-Google-Streetview-Button/raw/main/EasyGoogleStreetviewButton.user.js
// @updateURL       https://github.com/Ayaro1/IITC-Easy-Google-Streetview-Button/raw/main/EasyGoogleStreetviewButton.user.js
// @description     Places a Google Streetview button on the portal details window for easy access
// @author          Ayaro
// @include         *://*.ingress.com/*
// @match           *://*.ingress.com/*
// @grant none

// ==/UserScript==

// Wrapper function that will be stringified and injected
// into the document. Because of this, normal closure rules
// do not apply here.
function wrapper(plugin_info) {
  // Make sure that window.plugin exists. IITC defines it as a no-op function,
  // and other plugins assume the same.
  if (typeof window.plugin !== 'function') window.plugin = function () { };

  // Use own namespace for plugin
  window.plugin.easyGoogleStreetview = function () { };

  // Name of the IITC build for first-party plugins
  plugin_info.buildName = 'easyGoogleStreetview';

  // Datetime-derived version of the plugin
  plugin_info.dateTimeVersion = '20220630183700';

  // ID/name of the plugin
  plugin_info.pluginId = 'easyGoogleStreetview';

  // The entry point for this plugin.
  function setup() {
    window.addHook('portalDetailsUpdated', window.plugin.easyGoogleStreetview.addGoogleStreetviewLink);
  }

  window.plugin.easyGoogleStreetview.icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAM8SURBVDhPjVRNaFRXFP7unTdvfpqfyQxVUUhSoqRGEUnqyiBSFFoXwXbTQqtLwWUXsasKCrrQIKKgdBcXVVxIwaK0OynVXQWTNDMZSgk1nSTkd8xkZpx59z2/c9+bhO48w71zf8757ne+c+9TAQ3va+XnwOwlYHMKcLqAHV8BvRftlgX6Y34ajo5xKpjK/lt0djKqoA3D1XGkZxnkdtIlzg0P8MpAPAscXYYa/vn74K+1f1Hx6mh6bwECZhNtdBQIhbrvY3e8ib/3PuYag5RFZ/PDM5srQM8P0Av1dSQdF88/u4Lg/BM0vnmItngSXYl2C5h2uzC6Y4lBwkQi2UQNO6Y5XF/8CbpGFmODZ7FYW4f6cQRDTy+gaUx4aMQqq+uchSmHFoGIKW1Z6aZv8EmuD2P5xzjTdxx/nrqG0tf3sFRn/jRH+XhZEzYNzlpALePcNBB8cBA6GXNw759neHRsFIXyHO4Wf8OL+UnEFcWnHgnlYWylm2OXcc1tgFZrbCLovSxALu7M/Iob+V/wYPg77Enl8OWz6+hwU/CY2sLmCl6NXIE5MMk4puivEbRKkAqrtoa33RQ6+ynUvvvnAp8BVWpVN03EKKKILeeVqquYOH0TH2d7UPN8TBTm4K6OI+vOwqgMSsHnGDh0Etl2FlvkFFFTZJZJpNHupsHCorS5DVKhPBPFEtrrM8jUOuDP7URsoQ25chGOv05vahlmyp5MpKp+YMhkDZNfhCBlylLOX8fQ69sIplnNlGjHSsk9qizC6e8HOk+QEaMlNZ8Xz3DTpiMgXT3YIBPz6lt0b1yAs3MVaoCymE74sSSMTsPwnqmM8G+lxp9hQi1N9hOk1qxheuY1Mo0n9OogQhzOrjdw+5bh18mK8akhgsckJ7oIG8Mm6ViQbK8Fyefz1gE6wS4UAA1NZhtwP1pF8nCJKXLZDy+nNlaTFUwSZCACKRQKdlPZZxCBiIDSPGWZqZixrFqm/2N1pk7f+h+I6Ka1CEoPCW4ByYMVExbRctRB/37qKgZy2+kIiDAJ35n48dgtkKhtgctQng63/YYXvKlWUCwW7YJlEllDfYgjG4PQqDIm+l5tgfB7FM9BD89TKuAdXrSn/S86foAAAAAASUVORK5CYII=';

  window.plugin.easyGoogleStreetview.addGoogleStreetviewLink = function () {
    easyGoogleStreetviewURL = 'http://maps.google.com/maps?q=&layer=c&cbll=' + window.portals[window.selectedPortal]._latlng.lat + ',' + window.portals[window.selectedPortal]._latlng.lng;
    $('.linkdetails').append('<aside><a href="' + easyGoogleStreetviewURL + '" id="Easy-Google-Streetview-Button"><img src="' + window.plugin.easyGoogleStreetview.icon + '""></a></aside>');
  }

  // Add an info property for IITC's plugin system
  setup.info = plugin_info;

  // Make sure window.bootPlugins exists and is an array
  if (!window.bootPlugins) window.bootPlugins = [];
  // Add our startup hook
  window.bootPlugins.push(setup);
  // If IITC has already booted, immediately run the 'setup' function
  if (window.iitcLoaded && typeof setup === 'function') setup();
}

// Create a script element to hold our content script
var script = document.createElement('script');
var info = {};

// GM_info is defined by the assorted monkey-themed browser extensions
// and holds information parsed from the script header.
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) {
  info.script = {
    version: GM_info.script.version,
    name: GM_info.script.name,
    description: GM_info.script.description
  };
}

// Create a text node and our IIFE inside of it
var textContent = document.createTextNode('(' + wrapper + ')(' + JSON.stringify(info) + ')');
// Add some content to the script element
script.appendChild(textContent);
// Finally, inject it... wherever.
(document.body || document.head || document.documentElement).appendChild(script);