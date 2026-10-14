/* =========================================================================
   Centro di supporto - C&S - Estrattore Casuale di Numeri e Lettere
   Nessuna dipendenza esterna: funziona anche offline (file://).
   ========================================================================= */
(function () {
  'use strict';

  var EMAIL = 'sviluppo@ciesseselezione.it';
  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  /* Scorrimento immediato (senza animazione), usato per le correzioni di posizione */
  function scrollByInstant(dy) {
    var prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollBy(0, dy);
    root.style.scrollBehavior = prev;
  }

  /* ---------------------------------------------------------------------
     Menu di navigazione su schermi piccoli
     --------------------------------------------------------------------- */
  var navToggle = $('.nav-toggle');
  var siteNav = $('#site-nav');

  function setNav(open) {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    siteNav.classList.toggle('is-open', open);
    var label = $('.nav-toggle-text', navToggle);
    if (label) label.textContent = open ? 'Chiudi' : 'Menu';
  }
  function navIsOpen() { return !!(siteNav && siteNav.classList.contains('is-open')); }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () { setNav(!navIsOpen()); });
    siteNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    doc.addEventListener('click', function (e) {
      if (navIsOpen() && !e.target.closest('.site-header')) setNav(false);
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navIsOpen()) {
        setNav(false);
        navToggle.focus();
      }
    });
    if (window.matchMedia) {
      var wide = window.matchMedia('(min-width: 761px)');
      var onWide = function () { if (wide.matches) setNav(false); };
      if (wide.addEventListener) wide.addEventListener('change', onWide);
      else if (wide.addListener) wide.addListener(onWide);
    }
  }

  /* ---------------------------------------------------------------------
     Evidenziazione della sezione corrente nella navigazione
     --------------------------------------------------------------------- */
  function spy(targets, links, rootMargin) {
    if (!('IntersectionObserver' in window) || !targets.length) return;
    var visible = {};
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      var current = null;
      targets.forEach(function (t) { if (!current && visible[t.id]) current = t.id; });
      if (!current) return;
      links.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
      });
    }, { rootMargin: rootMargin, threshold: 0 });
    targets.forEach(function (t) { observer.observe(t); });
  }

  spy(['inizio', 'guide', 'faq', 'contatti'].map(function (id) { return doc.getElementById(id); }).filter(Boolean),
      $all('.site-nav a'), '-40% 0px -55% 0px');
  spy($all('.faq-group'), $all('.faq-nav a'), '-30% 0px -60% 0px');

  /* ---------------------------------------------------------------------
     Finestre modali (guide e opzioni email)
     --------------------------------------------------------------------- */
  var supportsDialog = typeof window.HTMLDialogElement === 'function' &&
    typeof window.HTMLDialogElement.prototype.showModal === 'function';
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), ' +
    'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  var openDialogs = [];

  function focusables(container) {
    return $all(FOCUSABLE, container).filter(function (el) {
      return el.getClientRects().length > 0;
    });
  }

  function currentDialog() { return openDialogs.length ? openDialogs[openDialogs.length - 1] : null; }

  function openModal(id, trigger) {
    var dialog = doc.getElementById(id);
    if (!dialog || dialog._isOpen) return;
    var previous = currentDialog();
    var returnTo = trigger || doc.activeElement;
    if (previous) {
      // Una sola finestra alla volta: il fuoco torna all'elemento che aveva aperto la prima
      returnTo = previous._returnFocus || returnTo;
      previous._skipFocusReturn = true;
      closeModal(previous);
    }
    dialog._returnFocus = returnTo;
    dialog._isOpen = true;
    if (supportsDialog) {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
      dialog.classList.add('is-fallback');
    }
    openDialogs.push(dialog);
    root.classList.add('modal-open');
    setNav(false);

    var body = $('.modal-body', dialog);
    if (body) body.scrollTop = 0;
    var title = $('.modal-title', dialog);
    var target = title || focusables(dialog)[0];
    if (target) target.focus({ preventScroll: true });
  }

  function finishClose(dialog) {
    if (!dialog._isOpen) return;
    dialog._isOpen = false;
    openDialogs = openDialogs.filter(function (d) { return d !== dialog; });
    if (!openDialogs.length) root.classList.remove('modal-open');
    var target = dialog._returnFocus;
    dialog._returnFocus = null;
    if (dialog._skipFocusReturn) {
      dialog._skipFocusReturn = false;
      return;
    }
    if (target && doc.contains(target) && typeof target.focus === 'function') {
      target.focus({ preventScroll: true });
    }
  }

  function closeModal(dialog) {
    if (!dialog || !dialog._isOpen) return;
    if (supportsDialog) {
      if (dialog.open) dialog.close();
    } else {
      dialog.removeAttribute('open');
      dialog.classList.remove('is-fallback');
    }
    finishClose(dialog);
  }

  $all('.modal').forEach(function (dialog) {
    // Chiusura nativa (tasto Esc)
    dialog.addEventListener('close', function () { finishClose(dialog); });

    // Clic sullo sfondo: chiude solo se pressione e rilascio avvengono fuori dal riquadro
    var pressedOnBackdrop = false;
    dialog.addEventListener('mousedown', function (e) { pressedOnBackdrop = e.target === dialog; });
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog && pressedOnBackdrop) closeModal(dialog);
      pressedOnBackdrop = false;
    });

    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal(dialog);
        return;
      }
      if (e.key !== 'Tab') return;
      var list = focusables(dialog);
      if (!list.length) { e.preventDefault(); return; }
      var first = list[0];
      var last = list[list.length - 1];
      var active = doc.activeElement;
      if (e.shiftKey) {
        if (active === first || list.indexOf(active) === -1) { e.preventDefault(); last.focus(); }
      } else if (active === last || list.indexOf(active) === -1 && !dialog.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    });
  });

  /* ---------------------------------------------------------------------
     Notifiche (toast)
     --------------------------------------------------------------------- */
  var ICON_OK = '<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.8 2.8 5.2-5.6"/></svg>';
  var ICON_INFO = '<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><path d="M12 7.6v.1"/></svg>';
  var toastTimer = null;

  function showToast(type, title, text) {
    var dialog = currentDialog();
    var region = (dialog && $('.toast-region', dialog)) || $('.toast-region--page');
    if (!region) return;
    $all('.toast-region').forEach(function (r) { r.textContent = ''; });
    clearTimeout(toastTimer);

    var toast = doc.createElement('div');
    toast.className = 'toast' + (type === 'warning' ? ' toast--warning' : '');
    toast.innerHTML = (type === 'warning' ? ICON_INFO : ICON_OK) +
      '<div><span class="toast-title"></span><span class="toast-text"></span></div>';
    $('.toast-title', toast).textContent = title;
    $('.toast-text', toast).textContent = text || '';
    region.appendChild(toast);

    toastTimer = setTimeout(function () {
      toast.classList.add('is-leaving');
      setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, reduceMotion ? 0 : 220);
    }, type === 'warning' ? 6000 : 3600);
  }

  /* ---------------------------------------------------------------------
     Copia dell'indirizzo email
     --------------------------------------------------------------------- */
  function legacyCopy(text) {
    var host = currentDialog() || doc.body;
    var previous = doc.activeElement;
    var area = doc.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;';
    host.appendChild(area);
    area.focus();
    area.select();
    var ok = false;
    try { ok = doc.execCommand('copy'); } catch (err) { ok = false; }
    host.removeChild(area);
    if (previous && typeof previous.focus === 'function') previous.focus({ preventScroll: true });
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }

  function selectAddress() {
    var el = $('#email-address');
    if (!el || !window.getSelection) return;
    var range = doc.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function onCopyClick(button) {
    copyText(EMAIL).then(function (ok) {
      var titleEl = $('.option-title', button);
      if (ok) {
        showToast('success', 'Indirizzo copiato negli appunti', EMAIL);
        if (titleEl) {
          titleEl.textContent = 'Indirizzo copiato';
          clearTimeout(button._resetTimer);
          button._resetTimer = setTimeout(function () { titleEl.textContent = 'Copia indirizzo'; }, 2600);
        }
      } else {
        selectAddress();
        showToast('warning', 'Copia automatica non disponibile',
          "L'indirizzo è stato selezionato: premere Ctrl+C per copiarlo.");
      }
    });
  }

  /* ---------------------------------------------------------------------
     Domande frequenti: ricerca, apertura singola, collegamenti diretti
     --------------------------------------------------------------------- */
  var searchInput = $('#faq-search-input');
  var statusEl = $('#faq-status');
  var emptyEl = $('#faq-empty');
  var inputClear = $('.search-clear');
  var groups = $all('.faq-group');
  var items = $all('.faq-item');
  var defaultStatus = statusEl ? statusEl.textContent : '';
  var QUOTES = /[«»“”‘’"']/g;

  function norm(s) {
    return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(QUOTES, ' ');
  }

  function buildMap(str) {
    var text = '';
    var map = [];
    for (var i = 0; i < str.length; i++) {
      var n = norm(str.charAt(i));
      for (var k = 0; k < n.length; k++) { text += n.charAt(k); map.push(i); }
    }
    return { text: text, map: map };
  }

  items.forEach(function (item) {
    var q = $('.faq-q', item);
    var a = $('.faq-a', item);
    item._q = q;
    item._qText = q ? q.textContent : '';
    item._qMap = buildMap(item._qText);
    item._text = norm(item._qText + ' ' + (a ? a.textContent : '')).replace(/\s+/g, ' ');
  });
  groups.forEach(function (g) { g._items = $all('.faq-item', g); });

  function highlight(item, terms) {
    var q = item._q;
    if (!q) return;
    var ranges = [];
    terms.forEach(function (t) {
      if (t.length < 2) return;
      var idx = item._qMap.text.indexOf(t);
      while (idx !== -1) {
        ranges.push([item._qMap.map[idx], item._qMap.map[idx + t.length - 1] + 1]);
        idx = item._qMap.text.indexOf(t, idx + t.length);
      }
    });
    if (!ranges.length) {
      if (q.childElementCount) q.textContent = item._qText;
      return;
    }
    ranges.sort(function (x, y) { return x[0] - y[0]; });
    var merged = [ranges[0]];
    for (var i = 1; i < ranges.length; i++) {
      var lastR = merged[merged.length - 1];
      if (ranges[i][0] <= lastR[1]) lastR[1] = Math.max(lastR[1], ranges[i][1]);
      else merged.push(ranges[i]);
    }
    var frag = doc.createDocumentFragment();
    var pos = 0;
    merged.forEach(function (r) {
      if (r[0] > pos) frag.appendChild(doc.createTextNode(item._qText.slice(pos, r[0])));
      var mark = doc.createElement('mark');
      mark.textContent = item._qText.slice(r[0], r[1]);
      frag.appendChild(mark);
      pos = r[1];
    });
    if (pos < item._qText.length) frag.appendChild(doc.createTextNode(item._qText.slice(pos)));
    q.textContent = '';
    q.appendChild(frag);
  }

  function applySearch() {
    if (!searchInput) return;
    var raw = searchInput.value;
    var query = norm(raw).trim();
    var terms = query ? query.split(/\s+/) : [];
    if (inputClear) inputClear.hidden = !raw;

    var total = 0;
    groups.forEach(function (g) {
      var count = 0;
      g._items.forEach(function (item) {
        var match = !terms.length || terms.every(function (t) { return item._text.indexOf(t) !== -1; });
        item.hidden = !match;
        if (match) count++;
        highlight(item, match ? terms : []);
      });
      g.hidden = count === 0;
      total += count;
      var counter = $('[data-count-for="' + g.id + '"]');
      if (counter) {
        counter.textContent = String(count);
        var link = counter.closest('a');
        if (link) link.classList.toggle('is-empty', count === 0);
      }
    });

    if (emptyEl) emptyEl.hidden = total !== 0;
    if (statusEl) {
      var shown = raw.trim();
      if (!terms.length) statusEl.textContent = defaultStatus;
      else if (total === 0) statusEl.textContent = 'Nessuna domanda corrisponde alla ricerca «' + shown + '».';
      else if (total === 1) statusEl.textContent = '1 domanda corrisponde alla ricerca «' + shown + '».';
      else statusEl.textContent = total + ' domande corrispondono alla ricerca «' + shown + '».';
    }
  }

  function clearSearch(focusInput) {
    if (!searchInput) return;
    searchInput.value = '';
    applySearch();
    if (focusInput) searchInput.focus();
  }

  if (searchInput) {
    var searchTimer = null;
    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(applySearch, 90);
    });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && searchInput.value) {
        e.preventDefault();
        e.stopPropagation();
        clearSearch(true);
      }
    });
    if (searchInput.value) applySearch();
  }

  // Una sola risposta aperta alla volta, mantenendo ferma la domanda selezionata
  var pending = null;
  items.forEach(function (item) {
    var summary = $('summary', item);
    if (summary) {
      summary.addEventListener('click', function () {
        pending = { item: item, top: summary.getBoundingClientRect().top };
      });
    }
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      items.forEach(function (other) { if (other !== item && other.open) other.open = false; });
      if (pending && pending.item === item && summary) {
        var delta = summary.getBoundingClientRect().top - pending.top;
        if (Math.abs(delta) > 1) scrollByInstant(delta);
      }
      pending = null;
    });
  });

  function revealFaq(el) {
    if (!el) return;
    var group = el.classList.contains('faq-group') ? el : el.closest('.faq-group');
    if ((el.hidden || (group && group.hidden)) && searchInput && searchInput.value) clearSearch(false);
    if (el.classList.contains('faq-item') && !el.open) {
      pending = null;
      el.open = true;
    }
  }

  function isFaqTarget(el) {
    return !!el && (el.classList.contains('faq-item') || el.classList.contains('faq-group'));
  }

  // Apre la domanda (o la sezione) richiesta e la porta in vista con un solo scorrimento
  function goToFaq(el, smooth) {
    revealFaq(el);
    window.requestAnimationFrame(function () {
      el.scrollIntoView({ block: 'start', behavior: smooth && !reduceMotion ? 'smooth' : 'auto' });
      var summary = el.classList.contains('faq-item') ? $('summary', el) : null;
      if (summary) summary.focus({ preventScroll: true });
    });
  }

  function openFromHash() {
    var id = '';
    try { id = decodeURIComponent(window.location.hash.slice(1)); } catch (err) { id = ''; }
    if (!id) return;
    var el = doc.getElementById(id);
    if (isFaqTarget(el)) goToFaq(el, true);
  }

  window.addEventListener('hashchange', openFromHash);
  if (window.location.hash) openFromHash();

  /* ---------------------------------------------------------------------
     Gestione centralizzata dei clic
     --------------------------------------------------------------------- */
  doc.addEventListener('click', function (e) {
    var t = e.target;
    if (!(t instanceof Element)) return;

    var opener = t.closest('[data-modal-open]');
    if (opener) {
      e.preventDefault();
      openModal(opener.getAttribute('data-modal-open'), opener);
      return;
    }

    var emailLink = t.closest('a.js-email');
    if (emailLink && doc.getElementById('modal-email')) {
      e.preventDefault();
      openModal('modal-email', emailLink);
      return;
    }

    var copyBtn = t.closest('[data-copy-email]');
    if (copyBtn) {
      e.preventDefault();
      onCopyClick(copyBtn);
      return;
    }

    var clearBtn = t.closest('[data-search-clear]');
    if (clearBtn) {
      e.preventDefault();
      clearSearch(true);
      return;
    }

    var closer = t.closest('[data-modal-close]');
    if (closer) {
      var dialog = closer.closest('.modal');
      if (closer.tagName === 'A') {
        // Collegamento interno: chiude la finestra e lascia proseguire la navigazione
        if (dialog) { dialog._skipFocusReturn = true; closeModal(dialog); }
      } else {
        e.preventDefault();
        closeModal(dialog);
        return;
      }
    }

    var anchor = t.closest('a[href^="#"]');
    if (anchor && !e.defaultPrevented) {
      var id = anchor.getAttribute('href').slice(1);
      var target = id ? doc.getElementById(id) : null;
      if (isFaqTarget(target)) {
        e.preventDefault();
        if (window.location.hash !== '#' + id && window.history && history.pushState) {
          try { history.pushState(null, '', '#' + id); } catch (err) { /* ignorato */ }
        }
        goToFaq(target, true);
      }
    }
  });
})();
