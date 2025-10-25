document.addEventListener('DOMContentLoaded', async () => {
  const elements = {
    type: document.getElementById('proxyType') as HTMLSelectElement,
    host: document.getElementById('proxyHost') as HTMLInputElement,
    port: document.getElementById('proxyPort') as HTMLInputElement,
    user: document.getElementById('proxyUser') as HTMLInputElement,
    pass: document.getElementById('proxyPass') as HTMLInputElement,
    power: document.getElementById('powerBtn') as HTMLButtonElement,
    status: document.getElementById('statusText') as HTMLDivElement
  };

  // Load saved
  const data = await getStorage<{ proxySetting?: string }>(['proxySetting']);
  let setting: any = {};
  try { setting = JSON.parse(data.proxySetting || '{}'); } catch {}
  if (setting.http_host) {
    elements.type.value = setting.type || 'http';
    elements.host.value = setting.http_host;
    elements.port.value = setting.http_port;
    elements.user.value = setting.auth?.user || '';
    elements.pass.value = setting.auth?.pass || '';
  }

  // Initial status
  const config = await new Promise<chrome.proxy.ProxyConfig>(r => chrome.proxy.settings.get({ incognito: false }, r));
  updateUI(config.value?.mode === 'pac_script');

  // Toggle
  elements.power.addEventListener('click', async () => {
    const isOn = elements.power.classList.contains('on');
    if (isOn) {
      offProxy();
      updateUI(false);
      showNotification(false);
    } else {
      const host = elements.host.value.trim();
      const port = elements.port.value.trim();
      if (!host || !port) return alert('Host and port required');

      const newSetting = {
        type: elements.type.value,
        http_host: host,
        http_port: port,
        auth: {
          enable: !!elements.user.value && !!elements.pass.value,
          user: elements.user.value,
          pass: elements.pass.value
        }
      };

      await chrome.storage.local.set({ proxySetting: JSON.stringify(newSetting) });
      try {
        await onProxy();
        updateUI(true);
        showNotification(true);
      } catch (e) {
        alert('Connection failed');
        updateUI(false);
      }
    }
  });

  function updateUI(enabled: boolean) {
    elements.power.classList.toggle('on', enabled);
    elements.power.classList.toggle('off', !enabled);
    elements.status.classList.toggle('on', enabled);
    elements.status.classList.toggle('off', !enabled);
    elements.status.innerHTML = `<span class="status-dot"></span> ${enabled ? 'Connected' : 'Disconnected'}`;
  }
});
