/* Estilo de las plantillas: 1 Cobalto, 2 Neón. Lo elige el hash (#estilo-2), la memoria del navegador o las teclas 1 y 2.
   Se carga en <head> para fijar data-estilo antes de pintar. La elección es la misma que en la página de marca. */
(() => {
  const N = { 1: 'Cobalto', 2: 'Neón' }, root = document.documentElement;
  let n = (location.hash.match(/estilo-(\d)/) || [])[1];
  if (!N[n]) { try { n = localStorage.getItem('starlight-estilo'); } catch (e) {} }
  if (!N[n]) n = 1;
  const aplica = x => {
    root.dataset.estilo = x;
    try { localStorage.setItem('starlight-estilo', x); } catch (e) {}
    history.replaceState(null, '', location.pathname + location.search + '#estilo-' + x);
    document.querySelectorAll('.tema-sel button').forEach(b => b.setAttribute('aria-pressed', b.dataset.n == x));
    document.dispatchEvent(new CustomEvent('estilo', { detail: x }));
  };
  root.dataset.estilo = n;
  document.addEventListener('DOMContentLoaded', () => {
    const s = document.createElement('div'); s.className = 'tema-sel'; s.setAttribute('role', 'group'); s.setAttribute('aria-label', 'Estilo de la página');
    s.innerHTML = Object.entries(N).map(([k, v]) => `<button data-n="${k}" aria-pressed="${k == n}">${k} ${v}</button>`).join('');
    s.querySelectorAll('button').forEach(b => b.addEventListener('click', () => aplica(b.dataset.n)));
    document.body.append(s);
    document.addEventListener('keydown', e => { if (!e.ctrlKey && !e.metaKey && !e.altKey && N[e.key] && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) aplica(e.key); });
    aplica(root.dataset.estilo);
  });
})();
