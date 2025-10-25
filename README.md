# proxy-configurator-chrome-extension

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Add%20to%20Chrome-4CAF50?logo=google-chrome&logoColor=white)](https://chrome.google.com/webstore)  
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/Argh94/ProxyProwler-VPN-Manager?label=Latest%20Release)](https://github.com/Argh94/ProxyProwler-VPN-Manager/releases)  
[![GitHub stars](https://img.shields.io/github/stars/Argh94/ProxyProwler-VPN-Manager?style=social)](https://github.com/Argh94/ProxyProwler-VPN-Manager/stargazers)  
[![GitHub license](https://img.shields.io/github/license/Argh94/ProxyProwler-VPN-Manager)](https://github.com/Argh94/ProxyProwler-VPN-Manager/blob/main/LICENSE)  
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  
[![Webpack](https://img.shields.io/badge/Built%20with-Webpack-8DD6F9?logo=webpack&logoColor=black)](https://webpack.js.org/)

> One-click Chrome proxy manager for free ProxyProwler proxies  
> Bypass restrictions, hide your IP, and stay anonymous — with a single power button

---

## Current Version: v3.3.0 — Js + Webpack + Professional UX

### Key Features
- Minimalist UI — single page with a power toggle (no separate Connect button)  
- Full ProxyProwler support — SOCKS5, SOCKS4, HTTPS (public proxies)  
- One-click connect/disconnect using the power button  
- Auto-save settings — host, port, type, optional username/password persist across sessions  
- No auth pop-ups — credentials are sent automatically when provided  
- Smart proxy modes (Options page):
  - All sites
  - Only listed domains
  - All except listed domains
- Live icon & badge — green = connected, red = disconnected  
- Desktop notifications for connect/disconnect events  
- Robust error handling with try/catch (stable)  
- Manifest V3 + TypeScript — Chrome Web Store ready  
- Built with Webpack — optimized production bundle

> Perfect for bypassing censorship, hiding IPs, and using daily free proxies

---

## Screenshots

<div align="center">
  <img src="screenshots/popup.png" alt="Popup UI" width="300" />
  <br><br>
  <em>Clean one-page interface with a power button</em>
</div>

> Tip: Replace `screenshots/popup.png` with your actual screenshot file in the repository.

---

## How to Install (Step-by-Step)

Even if you're new to Chrome extensions — follow these steps:

1. Download the extension ZIP from the Releases page:
   - https://github.com/Argh94/proxy-configurator-chrome-extension/releases
2. Extract the ZIP to a folder (e.g., `proxy-configurator-chrome-extension`).
3. Build (if you downloaded source) or use the provided `dist/` in the release:
   - Note: The `dist/` folder is the production build created by Webpack. Do not load `src/` directly.
4. Open Chrome and go to:
   - chrome://extensions
5. Enable "Developer mode" (toggle in the top-right).
6. Click "Load unpacked" and select the `dist/` folder inside the extracted directory.
7. The extension icon will appear in your toolbar.

---

## How to Use

1. Get a free proxy (example):
   - Visit ProxyProwler (or similar) and copy an entry like `190.2.142.51:1080`.
2. Open the extension from the Chrome toolbar.
3. Enter proxy details:
   - Type: SOCKS5 (or SOCKS4, HTTPS)
   - Host: 190.2.142.51
   - Port: 1080
   - Username/Password: leave blank for public proxies (or fill if required)
4. Click the Power Button to connect. Icon turns green → connected.
5. Click the Power Button again to disconnect. Icon turns red → disconnected.

Advanced: Right-click the extension icon → Options  
- Choose proxy mode:
  - All Sites (default)
  - Only These Sites (add one domain per line)
  - All Except These Sites (add exclusions one per line)  
- Click Save

---

## Build from Source (For Developers)

```bash
git clone https://github.com/Argh94/proxy-configurator-chrome-extension.git
cd proxy-configurator-chrome-extension
npm install
npm run build
# Output: dist/ folder ready for loading in chrome://extensions
```

---

## Roadmap
- Auto-import proxies from ProxyProwler
- Proxy health checks (ping/test)
- Multiple saved profiles
- Dark mode UI
- Publish to Chrome Web Store

---

## Contributing
- Fork the repository
- Create your feature branch: git checkout -b feature/my-feature
- Commit your changes: git commit -m "Add new feature"
- Push to your fork and open a Pull Request

Please follow the project's coding style and include tests where applicable.

---

## License
MIT License — see the LICENSE file for details. Free to use, modify, and distribute.

---

## Credits
- Built by: Argh94  
- Proxies by: ProxyProwler — fresh free proxies daily  
- Icons: Custom SVG & PNG set

<div align="center">
  <strong>Star this repo if you found it useful!</strong><br>
  <a href="https://github.com/Argh94/ProxyProwler-VPN-Ma">
    <img src="https://img.shields.io/github/stars/Argh94/ProxyProwler-VPN-Manager?style=social" alt="GitHub stars">
  </a>
</div>
