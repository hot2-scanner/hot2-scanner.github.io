/* hit.js -- 11-27 HOT 2 visitor counter. One anonymous row per page view in HOT 2's own Supabase (table page_views).
   No cookies, no IP, no names: only page path, ?ref= tag, the referring SITE (not its full address) and phone-or-not.
   Not counted: localhost, automated browsers, and any browser that once opened hot2scanner.com/?nocount=1 (owner's own). */
(function () {
  try {
    var q = new URLSearchParams(location.search);
    if (q.get('nocount') === '1') { try { localStorage.setItem('hot2_nocount', '1'); } catch (e) {} return; }
    try { if (localStorage.getItem('hot2_nocount') === '1') return; } catch (e) {}
    if (navigator.webdriver || /localhost|127\.0\.0\.1|^file/.test(location.hostname + location.protocol)) return;
    var ref = (q.get('ref') || '').slice(0, 40) || null, src = null;
    try { if (document.referrer) { var h = new URL(document.referrer).hostname; if (h && h !== location.hostname) src = h.slice(0, 100); } } catch (e) {}
    var K = 'sb_publishable_b1GOHTUJgD6xgfVYT0nSeQ_0tySTlos';
    fetch('https://bbfjmqvklilpqkxwlzib.supabase.co/rest/v1/page_views', {
      method: 'POST', keepalive: true,
      headers: { 'apikey': K, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify({ path: location.pathname.slice(0, 200), ref: ref, src: src, mobile: /Mobi|Android/i.test(navigator.userAgent) })
    }).catch(function () {});
  } catch (e) {}
})();
