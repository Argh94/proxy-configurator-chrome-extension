interface ProxySetting {
  type: string;
  http_host: string;
  http_port: string;
  auth?: {
    enable: boolean;
    user?: string;
    pass?: string;
  };
}

interface StorageData {
  proxySetting?: string;
  proxyMode?: string;
  domainList?: string;
}

async function onProxy(): Promise<void> {
  const data = await getStorage<StorageData>(['proxySetting', 'proxyMode', 'domainList']);
  const setting: ProxySetting = JSON.parse(data.proxySetting || '{}');
  const proxyMode = data.proxyMode || 'proxyAll';
  const domains = (data.domainList || '').split('\n').map(d => d.trim().toLowerCase()).filter(Boolean);

  const proxy = `PROXY ${setting.http_host}:${setting.http_port}`;
  let pacScript = '';

  if (proxyMode === 'proxyAll') {
    pacScript = `function FindProxyForURL(url, host) { return "${proxy}"; }`;
  } else if (proxyMode === 'proxyOnly') {
    pacScript = `function FindProxyForURL(url, host) {
      host = host.toLowerCase();
      const sites = ${JSON.stringify(domains)};
      return sites.some(s => host === s || host.endsWith('.' + s)) ? "${proxy}" : "DIRECT";
    }`;
  } else if (proxyMode === 'proxyExcept') {
    pacScript = `function FindProxyForURL(url, host) {
      host = host.toLowerCase();
      const sites = ${JSON.stringify(domains)};
      return sites.some(s => host === s || host.endsWith('.' + s)) ? "DIRECT" : "${proxy}";
    }`;
  }

  await chrome.proxy.settings.set({
    value: { mode: 'pac_script', pacScript: { data: pacScript } },
    scope: 'regular'
  });

  showNotification(true, setting);
}

function offProxy(): void {
  chrome.proxy.settings.set({ value: { mode: 'direct' }, scope: 'regular' });
  showNotification(false);
}

function showNotification(enabled: boolean, setting?: ProxySetting): void {
  const title = enabled ? 'Proxy Connected' : 'Proxy Disconnected';
  const message = enabled
    ? `Connected to: ${setting?.http_host || 'Unknown'}:${setting?.http_port || 'Unknown'}`
    : 'Proxy disabled';

  chrome.notifications.create({
    type: 'basic',
    iconUrl: `icons/${enabled ? 'on' : 'off'}.png`,
    title,
    message
  });
}

// Helper
function getStorage<T>(keys: string[]): Promise<T> {
  return new Promise(resolve => chrome.storage.local.get(keys, resolve));
}
