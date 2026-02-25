# Eclipse — Dark Mode & Typography Extension

A professional Chrome extension that applies dark mode and custom font themes to any website. All settings are saved per site.

---

## Installation

1. Download and unzip the extension folder
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** and select the `dark-mode-extension` folder

---

## Features

### Dark Mode
Toggle dark mode on any website with 6 filter modes and adjustable intensity. Eclipse automatically detects if a page is already in dark mode — indicated by a blue dot in the header — so you know before toggling.

| Mode | Description |
|---|---|
| Smart | Inverts page colors while preserving image appearance |
| Dim | Reduces brightness only, no color inversion |
| Midnight | Deep inversion with contrast boost for OLED screens |
| Reading | Warm sepia tint for extended reading sessions |
| Contrast | High-contrast inversion for maximum legibility |
| Mono | Full grayscale dark mode |

### Typography Override
Replace a website's fonts and color scheme with a complete curated theme. Each theme includes a paired font, background color, text color, link color, heading color, and text selection highlight.


Use the **Scale** slider to increase or decrease the base font size independently of the theme.

### Auto Dark Mode Detection
When you open a website that already uses dark mode (via CSS `prefers-color-scheme`, dark class attributes, or a dark background color), Eclipse detects this automatically. The indicator dot in the header turns blue to signal detection without interfering with the existing theme.

---

## File Structure

```
dark-mode-extension/
├── manifest.json       Extension configuration (Manifest V3)
├── popup.html          Extension UI with tabbed panels
├── popup.js            UI logic, dark mode and font injection
├── content.js          Applies styles at page load with no flash
├── icons/              16px, 48px, 128px extension icons
└── README.md
```

---

## Permissions

| Permission | Purpose |
|---|---|
| `activeTab` | Read current tab URL for per-site storage |
| `scripting` | Inject CSS into the page |
| `storage` | Persist dark mode and font preferences per hostname |

Eclipse makes no network requests (other than loading Google Fonts when Typography is active) and collects no user data.

---

## How It Works

**Dark Mode** injects a `<style>` tag targeting `html[data-eclipse-dark]` using CSS `filter` properties. Images and videos are counter-filtered to preserve their original appearance where applicable.

**Typography** injects a comprehensive `<style>` tag targeting `html[data-eclipse-font]` that imports a Google Font and overrides background, text, heading, link, and selection colors across all elements.

**Auto-detection** runs a script at popup open time that checks `prefers-color-scheme` media query state, background luminance of the page body, and common dark mode class/attribute signals on the root element.

The content script runs at `document_start` to apply saved styles before the page renders, preventing any flash of unstyled content.

---
