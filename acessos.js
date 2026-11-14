(() => {
  const endpoint = document.currentScript.dataset.endpoint;
  if (!/^https:\/\/[a-z0-9-]+\.[a-z0-9-]+\.workers\.dev\/v2\/pageview$/.test(endpoint)) return;

  let sent = false;
  function countPageview() {
    if (sent || document.visibilityState !== 'visible') return;
    sent = true;
    document.removeEventListener('visibilitychange', countPageview);
    fetch(endpoint, {
      method: 'POST',
      credentials: 'omit',
      redirect: 'error',
      referrerPolicy: 'no-referrer',
      keepalive: true,
    }).catch(() => {});
  }

  document.addEventListener('visibilitychange', countPageview);
  countPageview();
})();