// Eclipse v3 — popup.js

// ─── Font Themes (font-only, no color/bg changes) ─────────────────────────────
const FONT_THEMES = [
  {
    id: 'playfair',
    name: 'Playfair',
    family: "'Playfair Display', Georgia, serif",
    url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap',
    desc: 'Classic editorial serif',
    spacing: '0.01em',
    lineHeight: '1.75',
    weight: '400',
  },
  {
    id: 'jetbrains',
    name: 'JetBrains',
    family: "'JetBrains Mono', monospace",
    url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap',
    desc: 'Developer monospace',
    spacing: '-0.01em',
    lineHeight: '1.7',
    weight: '400',
  },
  {
    id: 'cormorant',
    name: 'Cormorant',
    family: "'Cormorant Garamond', Georgia, serif",
    url: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&display=swap',
    desc: 'Refined luxury serif',
    spacing: '0.02em',
    lineHeight: '1.85',
    weight: '300',
  },
  {
    id: 'syne',
    name: 'Syne',
    family: "'Syne', sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap',
    desc: 'Geometric editorial sans',
    spacing: '0.015em',
    lineHeight: '1.6',
    weight: '400',
  },
  {
    id: 'lora',
    name: 'Lora',
    family: "'Lora', Georgia, serif",
    url: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap',
    desc: 'Warm contemporary serif',
    spacing: '0.01em',
    lineHeight: '1.8',
    weight: '400',
  },
  {
    id: 'outfit',
    name: 'Outfit',
    family: "'Outfit', sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap',
    desc: 'Modern geometric sans',
    spacing: '-0.01em',
    lineHeight: '1.6',
    weight: '400',
  },
  {
    id: 'fraunces',
    name: 'Fraunces',
    family: "'Fraunces', Georgia, serif",
    url: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,400&display=swap',
    desc: 'Expressive display serif',
    spacing: '0.005em',
    lineHeight: '1.78',
    weight: '300',
  },
  {
    id: 'ibmplexmono',
    name: 'IBM Plex Mono',
    family: "'IBM Plex Mono', monospace",
    url: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;1,400&display=swap',
    desc: 'Technical IBM mono',
    spacing: '0em',
    lineHeight: '1.7',
    weight: '400',
  },
  {
    id: 'zodiak',
    name: 'Bitter',
    family: "'Bitter', Georgia, serif",
    url: 'https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,300;0,400;0,600;1,400&display=swap',
    desc: 'Strong news serif',
    spacing: '0.01em',
    lineHeight: '1.72',
    weight: '400',
  },
  {
    id: 'dmserif',
    name: 'DM Serif',
    family: "'DM Serif Display', Georgia, serif",
    url: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap',
    desc: 'High-contrast display serif',
    spacing: '0.005em',
    lineHeight: '1.65',
    weight: '400',
  },
];

// ─── Dark Mode CSS ─────────────────────────────────────────────────────────────
const DARK_MODES = {
  smart:    (i) => ({ page: `invert(${i}) hue-rotate(180deg) brightness(${1 - i * 0.12})`,                           media: `invert(1) hue-rotate(180deg)` }),
  dim:      (i) => ({ page: `brightness(${0.5 + (1 - i) * 0.35})`,                                                   media: null }),
  midnight: (i) => ({ page: `invert(${i * 0.95}) hue-rotate(180deg) brightness(${1 - i * 0.18}) contrast(1.06)`,     media: `invert(1) hue-rotate(180deg)` }),
  reading:  (i) => ({ page: `invert(${i * 0.85}) sepia(0.4) hue-rotate(180deg) brightness(${1 - i * 0.1})`,          media: `invert(1) hue-rotate(180deg) sepia(0.15)` }),
  contrast: (i) => ({ page: `invert(${i}) hue-rotate(180deg) contrast(${1.1 + i * 0.22}) brightness(${1 - i * 0.08})`, media: `invert(1) hue-rotate(180deg)` }),
  mono:     (i) => ({ page: `invert(${i}) hue-rotate(180deg) grayscale(1) brightness(${1 - i * 0.1})`,               media: `invert(1) hue-rotate(180deg) grayscale(0.6)` }),
};

function buildDarkCSS(s) {
  const i = s.intensity / 100;
  const m = DARK_MODES[s.mode] || DARK_MODES.smart;
  const { page, media } = m(i);
  let css = `html[data-eclipse-dark]{filter:${page} !important;transition:filter 0.3s ease;}`;
  if (media) css += `
    html[data-eclipse-dark] img,
    html[data-eclipse-dark] video,
    html[data-eclipse-dark] canvas,
    html[data-eclipse-dark] picture,
    html[data-eclipse-dark] svg image {
      filter: ${media} !important;
    }`;
  return css;
}

// ─── Font CSS — ONLY changes font family, weight, spacing, line-height ─────────
function buildFontCSS(theme) {
  return `
@import url('${theme.url}');

html[data-eclipse-font],
html[data-eclipse-font] body,
html[data-eclipse-font] p,
html[data-eclipse-font] h1,
html[data-eclipse-font] h2,
html[data-eclipse-font] h3,
html[data-eclipse-font] h4,
html[data-eclipse-font] h5,
html[data-eclipse-font] h6,
html[data-eclipse-font] a,
html[data-eclipse-font] span,
html[data-eclipse-font] li,
html[data-eclipse-font] td,
html[data-eclipse-font] th,
html[data-eclipse-font] label,
html[data-eclipse-font] input,
html[data-eclipse-font] textarea,
html[data-eclipse-font] select,
html[data-eclipse-font] button,
html[data-eclipse-font] blockquote,
html[data-eclipse-font] figcaption,
html[data-eclipse-font] caption,
html[data-eclipse-font] div,
html[data-eclipse-font] article,
html[data-eclipse-font] section,
html[data-eclipse-font] nav,
html[data-eclipse-font] aside,
html[data-eclipse-font] header,
html[data-eclipse-font] footer {
  font-family: ${theme.family} !important;
  letter-spacing: ${theme.spacing} !important;
}

html[data-eclipse-font] p,
html[data-eclipse-font] li,
html[data-eclipse-font] blockquote,
html[data-eclipse-font] td,
html[data-eclipse-font] th {
  line-height: ${theme.lineHeight} !important;
}`;
}

// ─── State ─────────────────────────────────────────────────────────────────────
let darkState = { enabled: false, mode: 'smart', intensity: 85 };
let fontState = { enabled: false, fontId: 'playfair' };
let tab       = null;
let hostname  = '';
let detectedDark = false;

// ─── DOM refs ──────────────────────────────────────────────────────────────────
const darkToggle    = document.getElementById('darkToggle');
const darkStatus    = document.getElementById('darkStatus');
const darkSlider    = document.getElementById('darkSlider');
const darkSliderVal = document.getElementById('darkSliderVal');
const darkModeGrid  = document.getElementById('darkModeGrid');
const fontToggle    = document.getElementById('fontToggle');
const fontStatus    = document.getElementById('fontStatus');
const fontGrid      = document.getElementById('fontGrid');
const statusPill    = document.getElementById('statusPill');
const pillText      = document.getElementById('pillText');
const detectDot     = document.getElementById('detectDot');
const siteHost      = document.getElementById('siteHost');

// ─── Tab switching ─────────────────────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.panel).classList.add('active');
  });
});

// ─── Build font cards ──────────────────────────────────────────────────────────
FONT_THEMES.forEach(theme => {
  const card = document.createElement('div');
  card.className = 'font-card';
  card.dataset.fontId = theme.id;

  card.innerHTML = `
    <div class="fc-check">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 5L4.2 7.2L8 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="fc-preview" style="font-family:${theme.family.split(',')[0].replace(/['"]/g,'')},serif;font-weight:${theme.weight};letter-spacing:${theme.spacing}">Aa</div>
    <div class="fc-name">${theme.name}</div>
    <div class="fc-desc">${theme.desc}</div>`;

  card.addEventListener('click', () => {
    fontState.fontId = theme.id;
    renderFontUI();
    persistFont();
    if (fontState.enabled) injectFont();
  });

  fontGrid.appendChild(card);
});

// ─── Render UI ─────────────────────────────────────────────────────────────────
function renderDarkUI() {
  const on   = darkState.enabled;
  const auto = !on && detectedDark;

  // Always clear both first, then set correct one — prevents stale class combos
  darkToggle.classList.remove('on', 'auto-on');
  if (on)   darkToggle.classList.add('on');
  else if (auto) darkToggle.classList.add('auto-on');

  darkStatus.textContent = on ? 'Dark' : (detectedDark ? 'Auto-detected' : 'Light');
  document.getElementById('darkTitle').textContent = on ? 'Light Mode' : 'Dark Mode';

  darkSlider.value = darkState.intensity;
  darkSliderVal.textContent = darkState.intensity + '%';

  document.querySelectorAll('#darkModeGrid .mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === darkState.mode);
  });

  detectDot.className = 'detect-dot' + (on ? ' is-on' : detectedDark ? ' is-detected' : '');
  updatePill();
}

function renderFontUI() {
  const on = fontState.enabled;
  fontToggle.classList.toggle('on', on);
  const active = FONT_THEMES.find(t => t.id === fontState.fontId);
  fontStatus.textContent = on ? (active ? active.name : 'Enabled') : 'Disabled';

  document.querySelectorAll('#fontGrid .font-card').forEach(card => {
    card.classList.toggle('active', card.dataset.fontId === fontState.fontId);
  });
  updatePill();
}

function updatePill() {
  const any = darkState.enabled || fontState.enabled;
  statusPill.classList.toggle('active-state', any);
  if (darkState.enabled && fontState.enabled) pillText.textContent = 'Dark + Font';
  else if (darkState.enabled) pillText.textContent = 'Dark On';
  else if (fontState.enabled) pillText.textContent = 'Font On';
  else pillText.textContent = 'Inactive';
}

// ─── Persist ───────────────────────────────────────────────────────────────────
function persistDark() { chrome.storage.local.set({ [hostname + ':dark']: darkState }); }
function persistFont() { chrome.storage.local.set({ [hostname + ':font']: fontState }); }

// ─── Inject dark ───────────────────────────────────────────────────────────────
function injectDark() {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (enabled, css) => {
      const ID = 'eclipse-dark';
      let el = document.getElementById(ID);
      document.documentElement.removeAttribute('data-eclipse-dark');
      if (el) el.remove();
      if (!enabled) return;
      el = document.createElement('style');
      el.id = ID; el.textContent = css;
      document.head.appendChild(el);
      document.documentElement.setAttribute('data-eclipse-dark', '');
    },
    args: [darkState.enabled, buildDarkCSS(darkState)],
  });
}

// ─── Inject font ───────────────────────────────────────────────────────────────
function injectFont() {
  const theme = FONT_THEMES.find(t => t.id === fontState.fontId) || FONT_THEMES[0];
  const css   = buildFontCSS(theme);
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (enabled, css) => {
      const ID = 'eclipse-font';
      let el = document.getElementById(ID);
      document.documentElement.removeAttribute('data-eclipse-font');
      if (el) el.remove();
      if (!enabled) return;
      el = document.createElement('style');
      el.id = ID; el.textContent = css;
      document.head.appendChild(el);
      document.documentElement.setAttribute('data-eclipse-font', '');
    },
    args: [fontState.enabled, css],
  });
}

// ─── Auto-detect dark mode ─────────────────────────────────────────────────────
function detectDarkMode() {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const el = document.body || document.documentElement;
      const bg = window.getComputedStyle(el).backgroundColor;
      const m  = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      let bgDark = false;
      if (m) {
        const lum = (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255;
        bgDark = lum < 0.35;
      }
      const html = document.documentElement;
      const signals = ['dark','dark-mode','dark-theme','theme-dark','night-mode'];
      const hasSignal = signals.some(s => html.classList.contains(s)) ||
        ['dark','dark-mode'].includes(html.getAttribute('data-theme')) ||
        html.getAttribute('data-color-scheme') === 'dark' ||
        html.getAttribute('color-scheme') === 'dark';
      return prefersDark || bgDark || hasSignal;
    },
  }, (results) => {
    detectedDark = !!(results && results[0] && results[0].result);
    renderDarkUI();
  });
}

// ─── Events ────────────────────────────────────────────────────────────────────
darkToggle.addEventListener('click', () => {
  darkState.enabled = !darkState.enabled;
  renderDarkUI(); persistDark(); injectDark();
});

darkModeGrid.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    darkState.mode = btn.dataset.mode;
    renderDarkUI(); persistDark();
    if (darkState.enabled) injectDark();
  });
});

darkSlider.addEventListener('input', e => {
  darkState.intensity = parseInt(e.target.value);
  darkSliderVal.textContent = darkState.intensity + '%';
  persistDark();
  if (darkState.enabled) injectDark();
});

fontToggle.addEventListener('click', () => {
  fontState.enabled = !fontState.enabled;
  renderFontUI(); persistFont(); injectFont();
});

// ─── Init ──────────────────────────────────────────────────────────────────────
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  tab = tabs[0];
  try { hostname = new URL(tab.url).hostname.replace(/^www\./, ''); } catch { hostname = 'page'; }
  siteHost.textContent = hostname;

  chrome.storage.local.get([hostname + ':dark', hostname + ':font'], (res) => {
    if (res[hostname + ':dark']) darkState = res[hostname + ':dark'];
    if (res[hostname + ':font']) fontState  = res[hostname + ':font'];
    renderDarkUI();
    renderFontUI();
    detectDarkMode();
  });
});