// Eclipse v3 — content.js
// Applies dark mode + font override at document_start to prevent flash

(function () {
  const hostname = location.hostname.replace(/^www\./, '');

  const DARK_MODES = {
    smart:    (i) => ({ page: `invert(${i}) hue-rotate(180deg) brightness(${1 - i * 0.12})`,                             media: `invert(1) hue-rotate(180deg)` }),
    dim:      (i) => ({ page: `brightness(${0.5 + (1 - i) * 0.35})`,                                                     media: null }),
    midnight: (i) => ({ page: `invert(${i * 0.95}) hue-rotate(180deg) brightness(${1 - i * 0.18}) contrast(1.06)`,       media: `invert(1) hue-rotate(180deg)` }),
    reading:  (i) => ({ page: `invert(${i * 0.85}) sepia(0.4) hue-rotate(180deg) brightness(${1 - i * 0.1})`,            media: `invert(1) hue-rotate(180deg) sepia(0.15)` }),
    contrast: (i) => ({ page: `invert(${i}) hue-rotate(180deg) contrast(${1.1 + i * 0.22}) brightness(${1 - i * 0.08})`, media: `invert(1) hue-rotate(180deg)` }),
    mono:     (i) => ({ page: `invert(${i}) hue-rotate(180deg) grayscale(1) brightness(${1 - i * 0.1})`,                 media: `invert(1) hue-rotate(180deg) grayscale(0.6)` }),
  };

  const FONT_DATA = {
    playfair:   { family:"'Playfair Display',Georgia,serif",        url:'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap', spacing:'0.01em',  lh:'1.75' },
    jetbrains:  { family:"'JetBrains Mono',monospace",             url:'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap',                    spacing:'-0.01em', lh:'1.7'  },
    cormorant:  { family:"'Cormorant Garamond',Georgia,serif",     url:'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&display=swap', spacing:'0.02em', lh:'1.85' },
    syne:       { family:"'Syne',sans-serif",                      url:'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap',                      spacing:'0.015em', lh:'1.6'  },
    lora:       { family:"'Lora',Georgia,serif",                   url:'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap',            spacing:'0.01em',  lh:'1.8'  },
    outfit:     { family:"'Outfit',sans-serif",                    url:'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap',                        spacing:'-0.01em', lh:'1.6'  },
    fraunces:   { family:"'Fraunces',Georgia,serif",               url:'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,400&display=swap', spacing:'0.005em', lh:'1.78' },
    ibmplexmono:{ family:"'IBM Plex Mono',monospace",              url:'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;1,400&display=swap',   spacing:'0em',     lh:'1.7'  },
    zodiak:     { family:"'Bitter',Georgia,serif",                 url:'https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,300;0,400;0,600;1,400&display=swap',          spacing:'0.01em',  lh:'1.72' },
    dmserif:    { family:"'DM Serif Display',Georgia,serif",       url:'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap',                         spacing:'0.005em', lh:'1.65' },
  };

  function buildDarkCSS(s) {
    const i = s.intensity / 100;
    const m = DARK_MODES[s.mode] || DARK_MODES.smart;
    const { page, media } = m(i);
    let css = `html[data-eclipse-dark]{filter:${page} !important;transition:filter 0.3s ease;}`;
    if (media) css += `html[data-eclipse-dark] img,html[data-eclipse-dark] video,html[data-eclipse-dark] canvas,html[data-eclipse-dark] picture{filter:${media} !important;}`;
    return css;
  }

  function buildFontCSS(f) {
    const tags = 'html[data-eclipse-font] body,html[data-eclipse-font] p,html[data-eclipse-font] h1,html[data-eclipse-font] h2,html[data-eclipse-font] h3,html[data-eclipse-font] h4,html[data-eclipse-font] h5,html[data-eclipse-font] h6,html[data-eclipse-font] a,html[data-eclipse-font] span,html[data-eclipse-font] li,html[data-eclipse-font] td,html[data-eclipse-font] th,html[data-eclipse-font] label,html[data-eclipse-font] input,html[data-eclipse-font] textarea,html[data-eclipse-font] select,html[data-eclipse-font] button,html[data-eclipse-font] blockquote,html[data-eclipse-font] div,html[data-eclipse-font] article,html[data-eclipse-font] section,html[data-eclipse-font] nav,html[data-eclipse-font] header,html[data-eclipse-font] footer';
    return `@import url('${f.url}');${tags}{font-family:${f.family} !important;letter-spacing:${f.spacing} !important;}html[data-eclipse-font] p,html[data-eclipse-font] li,html[data-eclipse-font] blockquote,html[data-eclipse-font] td{line-height:${f.lh} !important;}`;
  }

  function attach(id, css, attr) {
    if (document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    (document.head || document.documentElement).appendChild(el);
    document.documentElement.setAttribute(attr, '');
  }

  function run() {
    chrome.storage.local.get([hostname + ':dark', hostname + ':font'], (res) => {
      const ds = res[hostname + ':dark'];
      const fs = res[hostname + ':font'];
      if (ds && ds.enabled) attach('eclipse-dark', buildDarkCSS(ds), 'data-eclipse-dark');
      if (fs && fs.enabled) {
        const f = FONT_DATA[fs.fontId];
        if (f) attach('eclipse-font', buildFontCSS(f), 'data-eclipse-font');
      }
    });
  }

  if (document.head) run();
  else document.addEventListener('DOMContentLoaded', run);
})();
