// options.ts - TypeScript for options page

interface StorageData {
  proxyMode?: string;
  domainList?: string;
}

document.addEventListener('DOMContentLoaded', async () => {
  const elements = {
    modeAll: document.getElementById('modeAll') as HTMLInputElement,
    modeOnly: document.getElementById('modeOnly') as HTMLInputElement,
    modeExcept: document.getElementById('modeExcept') as HTMLInputElement,
    domainList: document.getElementById('domainList') as HTMLTextAreaElement,
    saveBtn: document.getElementById('saveBtn') as HTMLButtonElement,
    status: document.getElementById('status') as HTMLDivElement
  };

  // Load saved settings
  const data = await getStorage<

StorageData>(['proxyMode', 'domainList']);
  const mode = data.proxyMode || 'proxyAll';
  const list = data.domainList || '';

  // Set UI
  (elements as any)[`mode${mode.charAt(0).toUpperCase() + mode.slice(1)}`].checked = true;
  elements.domainList.value = list;

  // Save button
  elements.saveBtn.addEventListener('click', async () => {
    const selectedMode = (
      elements.modeAll.checked ? 'proxyAll' :
      elements.modeOnly.checked ? 'proxyOnly' :
      elements.modeExcept.checked ? 'proxyExcept' : 'proxyAll'
    );

    const domains = elements.domainList.value
      .split('\n')
      .map(d => d.trim())
      .filter(Boolean)
      .join('\n');

    await chrome.storage.local.set({
      proxyMode: selectedMode,
      domainList: domains
    });

    showStatus('Settings saved!', 'success');
    setTimeout(() => showStatus('', ''), 2000);
  });

  function showStatus(message: string, type: 'success' | 'error' | '' = '') {
    elements.status.textContent = message;
    elements.status.className = type;
  }
});

// Helper: Promise-based storage
function getStorage<T>(keys: string[]): Promise<T> {
  return new Promise(resolve => chrome.storage.local.get(keys, resolve));
}
