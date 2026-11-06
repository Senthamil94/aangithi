/* Diwali weekend flyer. Set enabled to false to hide it site-wide. */
(function () {
  var FLYER = {
    enabled: true,
    id: 'diwali10',
    image: 'images/diwali-weekend-special.jpg',
    alt: 'Diwali Weekend Special. Get 10% off on online and pickup orders. Use code DIWALI10.',
    code: 'DIWALI10',
    order: 'https://order.boons.io/site/angithi-indian-restaurant/409'
  };

  if (!FLYER.enabled) return;

  var seenKey = 'aangithi-flyer';
  var root = document.createElement('div');
  root.className = 'flyer';
  root.setAttribute('aria-hidden', 'true');
  root.innerHTML =
    '<div class="flyer-scrim" data-flyer-close></div>' +
    '<div class="flyer-dialog" role="dialog" aria-modal="true" aria-labelledby="flyerTitle">' +
      '<button class="flyer-close" type="button" data-flyer-close aria-label="Close Diwali offer">✕</button>' +
      '<h2 id="flyerTitle" class="sr">Diwali Weekend Special, 10% off</h2>' +
      '<a class="flyer-art" href="' + FLYER.order + '" target="_blank" rel="noopener">' +
        '<img src="' + FLYER.image + '" alt="' + FLYER.alt + '">' +
      '</a>' +
      '<div class="flyer-actions">' +
        '<button class="btn btn-gold" type="button" data-flyer-copy>Copy ' + FLYER.code + '</button>' +
        '<a class="btn btn-primary" href="' + FLYER.order + '" target="_blank" rel="noopener">Order online</a>' +
      '</div>' +
    '</div>';

  var launch = document.createElement('button');
  launch.type = 'button';
  launch.className = 'flyer-launch';
  launch.setAttribute('aria-haspopup', 'dialog');
  launch.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c.4 2.2 1.2 3.6 3 4.6-1.8 1-2.6 2.4-3 4.6-.4-2.2-1.2-3.6-3-4.6 1.8-1 2.6-2.4 3-4.6z"/><path d="M8 14.5c2.2.6 3.4 1.8 4 4 .6-2.2 1.8-3.4 4-4-2.2-.6-3.4-1.8-4-4-.6 2.2-1.8 3.4-4 4z"/></svg>' +
    'Diwali 10% off';

  document.body.appendChild(launch);
  document.body.appendChild(root);

  var dialog = root.querySelector('.flyer-dialog');
  var lastFocus = null;
  var locked = false;

  function focusables() {
    return [...dialog.querySelectorAll('button, a')];
  }

  function open(fromUser) {
    lastFocus = fromUser ? document.activeElement : null;
    root.classList.add('open');
    root.removeAttribute('aria-hidden');
    document.documentElement.style.overflow = 'hidden';
    locked = true;
    var img = root.querySelector('.flyer-art img');
    if (img && !img.naturalWidth) img.src = img.getAttribute('src');
    root.querySelector('.flyer-close').focus();
  }

  function close() {
    root.classList.remove('open');
    root.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    locked = false;
    try { sessionStorage.setItem(seenKey, FLYER.id); } catch (e) {}
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    else launch.focus();
  }

  function copyCode() {
    var done = function () {
      if (typeof showToast === 'function') showToast('Code ' + FLYER.code + ' copied');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(FLYER.code).then(done).catch(done);
    } else {
      done();
    }
  }

  launch.addEventListener('click', function () { open(true); });
  root.addEventListener('click', function (e) {
    if (e.target.closest('[data-flyer-close]')) close();
    if (e.target.closest('[data-flyer-copy]')) copyCode();
  });
  document.addEventListener('keydown', function (e) {
    if (!locked) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    var nodes = focusables();
    if (!nodes.length) return;
    var first = nodes[0];
    var last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  var seen = false;
  try { seen = sessionStorage.getItem(seenKey) === FLYER.id; } catch (e) {}
  var force = /(?:\?|&)flyer=open(?:&|$)/.test(location.search);
  if (force || !seen) {
    setTimeout(function () { open(false); }, 700);
  }
})();
