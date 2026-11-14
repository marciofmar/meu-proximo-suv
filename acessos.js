(() => {
  const endpoint = document.currentScript.dataset.endpoint;
  if (!/^https:\/\/[a-z0-9-]+\.[a-z0-9-]+\.workers\.dev\/v1\/pageview$/.test(endpoint)) return;

  const privacy = document.getElementById('access-privacy');
  const allow = document.getElementById('allow-access-count');
  const deny = document.getElementById('deny-access-count');
  const status = document.getElementById('access-count-status');
  const key = 'meu-proximo-suv-medicao-v1';
  const preferenceDuration = 180 * 24 * 60 * 60 * 1000;
  let choice;
  let sent = false;

  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved && Number.isFinite(saved.expires) && saved.expires > Date.now()) {
      choice = saved.choice;
    }
  } catch {
    // A escolha continua funcionando durante esta abertura da página.
  }

  function showChoice() {
    allow.disabled = choice === 'allow';
    deny.disabled = choice === 'deny';
    status.textContent = choice === 'allow' ? 'Medição autorizada.'
      : choice === 'deny' ? 'Medição recusada.' : 'Medição desativada até você autorizar.';
  }

  function sendPageview() {
    if (choice !== 'allow' || sent || document.visibilityState !== 'visible') return;
    sent = true;
    fetch(endpoint, {
      method: 'POST',
      credentials: 'omit',
      redirect: 'error',
      referrerPolicy: 'no-referrer',
      keepalive: true,
    }).catch(() => {});
  }

  function saveChoice(newChoice) {
    choice = newChoice;
    try {
      localStorage.setItem(key, JSON.stringify({ choice, expires: Date.now() + preferenceDuration }));
    } catch {
      // A escolha permanece disponível durante esta abertura da página.
    }
    showChoice();
    sendPageview();
  }

  if (choice === 'allow' || choice === 'deny') privacy.open = false;
  allow.addEventListener('click', () => saveChoice('allow'));
  deny.addEventListener('click', () => saveChoice('deny'));
  document.addEventListener('visibilitychange', sendPageview);
  showChoice();
  sendPageview();
})();
