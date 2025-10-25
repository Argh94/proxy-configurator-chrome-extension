// background.ts - TypeScript Service Worker

chrome.proxy.onProxyError.addListener((details) => {
  console.error('Proxy error:', details);
  updateIcon(false).catch(() => {});
});

async function updateIcon(enabled: boolean, showBadge = false): Promise<void> {
  const data = await getStorage<{ proxyMode?: string }>(['proxyMode']);
  const mode = data.proxyMode || 'proxyAll';

  if (!enabled) {
    chrome.action.setIcon({ path: 'icons/off.png' });
    chrome.action.setBadgeText({ text: '' });
    return;
  }

  chrome.action.setIcon({ path: 'icons/on.png' });
  const badge = (mode === 'proxyOnly' || mode === 'proxyExcept') && showBadge;
  chrome.action.setBadgeText({ text: badge ? 'ON' : '' });
  if (badge) {
    chrome.action.setBadgeBackgroundColor({ color: '#4ade80' });
    chrome.action.setBadgeTextColor({ color: '#fff' });
  }
}

async function checkSite(tabId: number, url: string): Promise<void> {
  if (!url || !/^https?:\/\//i.test(url)) return;

  const [data, config] = await Promise.all([
    getStorage<{ proxyMode?: string; domainList?: string }>(['proxyMode', 'domainList']),
    new Promise<chrome.proxy.ProxyConfig>(resolve => chrome.proxy.settings.get({ incognito: false }, resolve))
  ]);

  if (config.value?.mode !== 'pac_script') {
    await updateIcon(false);
    return;
  }

  const hostname = new URL(url).hostname.toLowerCase();
  const domains = (data.domainList || '').split('\n').map(d => d.trim().toLowerCase()).filter(Boolean);
  const inList = domains.some(d => hostname === d || hostname.endsWith('.' + d));

  let show = false;
  if (data.proxyMode === 'proxyOnly') show = inList;
  else if (data.proxyMode === 'proxyExcept') show = !inList;
  else show = true;

  await updateIcon(true, show);
}

// Tab events
chrome.tabs.onActivated.addListener(async (info) => {
  try {
    const tab = await chrome.tabs.get(info.tabId);
    if (tab.url) await checkSite(info.tabId, tab.url);
  } catch {}
});

chrome.tabs.onUpdated.addListener(async (tabId, change, tab) => {
  if ((change.url || change.status === 'complete') && tab.url) {
    await checkSite(tabId, tab.url);
  }
});

// Auth handler
chrome.webRequest.onAuthRequired.addListener(
  (details, callback) => {
    getStorage<{ proxySetting?: string }>(['proxySetting']).then(data => {
      let setting: { auth?: { enable: boolean; user?: string; pass?: string } } = {};
      try { setting = JSON.parse(data.proxySetting || '{}'); } catch {}
      const auth = setting.auth?.enable && setting.auth.user && setting.auth.pass;
      if (typeof callback === 'function') {
        callback(auth ? { authCredentials: { username: setting.auth!.user!, password: setting.auth!.pass! } } : {});
      }
    });
  },
  { urls: ['<all_urls>'] },
  ['blocking']
);
