/* ============================================================
   NoExaTech — Homepage Animation System
   GSAP + ScrollTrigger + Lenis
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Environment checks ---------- */
  var prefersReduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var hasGSAP  = typeof window.gsap !== 'undefined';
  var hasST    = typeof window.ScrollTrigger !== 'undefined';
  var hasLenis = typeof window.Lenis !== 'undefined';

  if (!hasGSAP || !hasST || prefersReduced) {
    document.querySelectorAll('[data-anim], [data-reveal]').forEach(function (el) {
      el.style.opacity = '';
      el.style.transform = '';
      el.classList.add('is-visible');
    });
    var fallbackLoader = document.getElementById('loader');
    if (fallbackLoader) fallbackLoader.classList.add('is-hidden');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ============================================================
     LENIS — smooth scroll, synced with GSAP ticker
     ============================================================ */
  var lenis = hasLenis ? new Lenis({
    /* duration + easing is the recommended v1.1 model.
       Avoid `lerp` — it makes scroll feel stuck on start/stop. */
    duration: 1.05,
    easing: function (t) {
      /* easeOutExpo — smooth, settles quickly, never feels heavy */
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    },
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    smoothTouch: false,     /* mobile keeps native scroll (better UX) */
    infinite: false,
    autoRaf: false          /* we drive RAF via gsap.ticker */
  }) : null;

  if (lenis) {
    /* Required classes so the Lenis CSS rules in main.css take effect */
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    /* Expose Lenis so main.js can drive header / progress / back-to-top */
    window.__noexaLenis = lenis;

    /* Sync with ScrollTrigger */
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    /* Stop Lenis while any modal / mobile menu is open */
    var syncLockState = function () {
      var locked = document.body.classList.contains('nx-modal-open') ||
                   document.body.classList.contains('wk-modal-open') ||
                   document.body.classList.contains('menu-open');
      if (locked) {
        lenis.stop();
        document.documentElement.classList.add('lenis-stopped');
      } else {
        lenis.start();
        document.documentElement.classList.remove('lenis-stopped');
      }
    };
    new MutationObserver(syncLockState).observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    syncLockState();
  }

  /* ---------- Anchor / in-page link smooth-scrolling ---------- */
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (!target || !lenis) return;
      e.preventDefault();
      lenis.scrollTo(target, {
        offset: -80,
        duration: 1.1,
        easing: function (t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
      });
    });
  });

  /* ============================================================
     1. LOADER — system boot (★★★★)
     ============================================================ */
  function bootLoader() {
    return new Promise(function (resolve) {
      var loader = document.getElementById('loader');
      if (!loader) { resolve(); return; }

      gsap.set(loader, { autoAlpha: 1 });

      var tl = gsap.timeline({
        onComplete: function () {
          loader.classList.add('is-hidden');
          resolve();
        }
      });

      tl.from('.loader__logo', { autoAlpha: 0, y: 12, duration: 0.6, ease: 'power3.out' })
        .from('.loader__bar', { scaleX: 0.2, transformOrigin: 'left center', duration: 0.5, ease: 'power2.out' }, '-=0.35')
        .from('.loader__meta', { autoAlpha: 0, duration: 0.4 }, '-=0.25')
        .to({}, { duration: 0.35 })
        .to(loader, { autoAlpha: 0, duration: 0.5, ease: 'power2.inOut' });
    });
  }

  /* ============================================================
     2. HERO — cinematic entrance (★★★★★)
     ============================================================ */
  function animHero() {
    var heroEl = document.querySelector('.ix-hero');
    if (!heroEl) return;

    var title   = heroEl.querySelector('.ix-hero__title');
    var eyebrow = heroEl.querySelector('.ix-eyebrow');
    var text    = heroEl.querySelector('.ix-hero__text');
    var actions = heroEl.querySelector('.ix-hero__actions');
    var meta    = heroEl.querySelector('.ix-hero__meta');

    if (title) {
      var raw = title.innerHTML.split('<br>');
      if (raw.length === 2) {
        title.innerHTML =
          '<span class="anim-mask"><span class="anim-line">' + raw[0].trim() + '</span></span>' +
          '<span class="anim-mask"><span class="anim-line">' + raw[1].trim() + '</span></span>';
      }
    }

    var tl = gsap.timeline({ delay: 0.15 });

    if (eyebrow) tl.from(eyebrow, { autoAlpha: 0, y: 10, duration: 0.5, ease: 'power2.out' });

    tl.from('.ix-hero__title .anim-line', {
      yPercent: 110,
      duration: 1.0,
      stagger: 0.12,
      ease: 'power4.out'
    }, '-=0.25');

    if (text)    tl.from(text,    { autoAlpha: 0, y: 14, duration: 0.6 }, '-=0.55');
    if (actions) tl.from(actions, { autoAlpha: 0, y: 14, duration: 0.6 }, '-=0.4');
    if (meta)    tl.from(meta.children, {
      autoAlpha: 0,
      y: 10,
      duration: 0.45,
      stagger: 0.08
    }, '-=0.4');

    var grid = heroEl.querySelector('.ix-hero__grid');
    var glow = heroEl.querySelector('.ix-hero__glow');
    if (grid) gsap.to(grid, { yPercent: -4, ease: 'none',
      scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: true } });
    if (glow) gsap.to(glow, { yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: true } });
  }

  function heroMouse() {
    var heroEl = document.querySelector('.ix-hero');
    if (!heroEl || window.matchMedia('(hover: none)').matches) return;

    var grid = heroEl.querySelector('.ix-hero__grid');
    var glow = heroEl.querySelector('.ix-hero__glow');
    if (!grid) return;

    var gx = gsap.quickTo(grid, 'x', { duration: 1.1, ease: 'power2.out' });
    var gy = gsap.quickTo(grid, 'y', { duration: 1.1, ease: 'power2.out' });
    var hx = glow ? gsap.quickTo(glow, 'x', { duration: 1.4, ease: 'power2.out' }) : null;
    var hy = glow ? gsap.quickTo(glow, 'y', { duration: 1.4, ease: 'power2.out' }) : null;

    heroEl.addEventListener('mousemove', function (e) {
      var r = heroEl.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width  - 0.5;
      var y = (e.clientY - r.top)  / r.height - 0.5;

      gx(x * 10);
      gy(y * 10);
      if (hx) hx(x * 40);
      if (hy) hy(y * 40);
    });
  }

  /* ============================================================
     3. MARQUEE — pause on hover, slow on scroll (★★★)
     ============================================================ */
  function animMarquee() {
    var marquee = document.querySelector('.ix-marquee__track');
    if (!marquee) return;

    marquee.style.animation = 'none';

    var tl = gsap.to(marquee, {
      xPercent: -50,
      duration: 26,
      ease: 'none',
      repeat: -1
    });

    var parent = marquee.closest('.ix-marquee');
    if (parent) {
      parent.addEventListener('mouseenter', function () { gsap.to(tl, { timeScale: 0.15, duration: 0.4 }); });
      parent.addEventListener('mouseleave', function () { gsap.to(tl, { timeScale: 1,    duration: 0.6 }); });
    }

    var lastScroll = window.scrollY;
    var pending = null;
    window.addEventListener('scroll', function () {
      if (pending) return;
      pending = requestAnimationFrame(function () {
        var v = window.scrollY - lastScroll;
        lastScroll = window.scrollY;
        var speed = 1 + Math.min(Math.abs(v) * 0.06, 2);
        gsap.to(tl, { timeScale: speed, duration: 0.4, overwrite: 'auto' });
        pending = null;
      });
    }, { passive: true });
  }

  /* ============================================================
     4. STATEMENT — word-by-word reveal (★★★★)
     ============================================================ */
  function animStatement() {
    var quote = document.querySelector('.ix-statement__quote');
    if (!quote) return;

    quote.innerHTML = quote.innerHTML
      .split('<br>')
      .map(function (line) {
        return line.replace(/(<em>.*?<\/em>|[^\s]+)/g, function (w) {
          if (/<em>/.test(w)) return w;
          return '<span class="anim-word">' + w + '</span>';
        });
      })
      .join('<br>');

    var words = quote.querySelectorAll('.anim-word, em');

    gsap.from(words, {
      autoAlpha: 0,
      y: 22,
      duration: 0.7,
      stagger: 0.05,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: quote,
        start: 'top 78%',
        toggleActions: 'play none none none'
      }
    });
  }

  /* ============================================================
     5. ABOUT — light parallax (★★★)
     ============================================================ */
  function animAbout() {
    var section = document.querySelector('.ix-about');
    if (!section) return;

    var heading = section.querySelector('.ix-h2');
    var body    = section.querySelector('.ix-about__body');

    if (heading) {
      gsap.from(heading, {
        y: 30, autoAlpha: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%' }
      });
    }
    if (body) {
      gsap.from(body, {
        y: 20, autoAlpha: 0, duration: 0.9, delay: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%' }
      });
    }
  }

  /* ============================================================
     6. SERVICES — hover preview following cursor (★★★★)
     ============================================================ */
  function animServices() {
    var section = document.querySelector('.ix-services');
    if (!section) return;
    var list = section.querySelector('.ix-services__list');
    if (!list) return;

    gsap.from(list.children, {
      autoAlpha: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: list, start: 'top 80%' }
    });

    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(max-width: 960px)').matches) return;

    var preview = document.createElement('div');
    preview.className = 'ix-service-preview';
    preview.innerHTML = '<span>Preview</span>';
    section.appendChild(preview);

    var pv  = gsap.quickTo(preview, 'x', { duration: 0.55, ease: 'power3.out' });
    var pvY = gsap.quickTo(preview, 'y', { duration: 0.55, ease: 'power3.out' });

    section.addEventListener('mousemove', function (e) {
      var r = section.getBoundingClientRect();
      pv(e.clientX - r.left + 20);
      pvY(e.clientY - r.top - 60);
    });

    section.querySelectorAll('.ix-service').forEach(function (row) {
      row.addEventListener('mouseenter', function () {
        gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'power3.out' });
        gsap.fromTo(row.querySelector('.ix-service__arrow'),
          { x: -6, autoAlpha: 0.6 },
          { x: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out' });
      });
      row.addEventListener('mouseleave', function () {
        gsap.to(preview, { autoAlpha: 0, scale: 0.94, duration: 0.28 });
      });
    });
  }

  /* ============================================================
     7. FEATURED WORK — varied scroll reveals (★★★★★)
     ============================================================ */
  function animWork() {
    var grid = document.querySelector('.ix-work__grid');
    if (!grid) return;

    var cards = grid.querySelectorAll('.ix-work-card');
    if (!cards.length) return;

    cards.forEach(function (card, i) {
      var visual = card.querySelector('.ix-work-card__visual');
      var body   = card.querySelector('.ix-work-card__body');

      var tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: 'top 82%' }
      });

      if (i % 3 === 0) {
        if (visual) tl.from(visual, { scale: 0.92, autoAlpha: 0, duration: 0.9, ease: 'power3.out' });
        if (body)   tl.from(body,   { y: 24, autoAlpha: 0, duration: 0.7 }, '-=0.55');
      } else if (i % 3 === 1) {
        if (visual) {
          tl.fromTo(visual,
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power3.inOut' });
        }
        if (body) tl.from(body, { y: 24, autoAlpha: 0, duration: 0.7 }, '-=0.7');
      } else {
        if (visual) {
          tl.from(visual, { y: 26, autoAlpha: 0, duration: 0.9, ease: 'power3.out' });
        }
        if (body) tl.from(body, { y: 24, autoAlpha: 0, duration: 0.7 }, '-=0.65');
      }
    });

    cards.forEach(function (card) {
      var visual = card.querySelector('.ix-work-card__visual');
      if (!visual) return;
      card.addEventListener('mouseenter', function () {
        gsap.to(visual, { scale: 1.02, duration: 0.6, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', function () {
        gsap.to(visual, { scale: 1, duration: 0.6, ease: 'power2.out' });
      });
    });
  }

  /* ============================================================
     8. STATS — counter up (★★★)
     ============================================================ */
  function animStats() {
    var grid = document.querySelector('.ix-stats__grid');
    if (!grid) return;

    requestAnimationFrame(function () {
      var values = grid.querySelectorAll('.ix-stat__value');
      if (!values.length) return;

      values.forEach(function (el) {
        var raw = el.textContent.trim();
        var match = raw.match(/^(\D*)(\d+)(\D*)$/);
        if (!match) return;

        var prefix = match[1] || '';
        var target = parseInt(match[2], 10);
        var suffix = match[3] || '';

        var obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: function () {
            el.textContent = prefix + Math.round(obj.v) + suffix;
          }
        });

        var bar = document.createElement('span');
        bar.className = 'ix-stat__bar';
        el.parentNode.appendChild(bar);
        gsap.from(bar, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });
    });
  }

  /* ============================================================
     9. PROCESS — horizontal cinematic scroll (★★★★★)
     ============================================================ */
  function animProcess() {
    var wrap = document.querySelector('.ix-process__grid-wrap');
    if (!wrap) return;

    var isDesktop = window.matchMedia('(min-width: 961px)').matches;
    if (!isDesktop) return;

    var track = wrap.querySelector('.ix-process__grid');
    if (!track) return;

    track.style.display = 'flex';
    track.style.flexWrap = 'nowrap';
    track.style.gap = '40px';
    track.style.width = 'max-content';
    track.style.gridTemplateColumns = 'none';

    var steps = track.querySelectorAll('.ix-process__step');
    steps.forEach(function (s) {
      s.style.width = 'clamp(220px, 22vw, 320px)';
      s.style.flex = '0 0 auto';
      s.style.textAlign = 'left';
    });

    function distance() {
      return Math.max(0, track.scrollWidth - wrap.clientWidth);
    }

    gsap.to(track, {
      x: function () { return -distance(); },
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        start: 'top 20%',
        end: function () { return '+=' + (distance() + window.innerHeight * 0.6); },
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          var idx = Math.round(self.progress * (steps.length - 1));
          steps.forEach(function (s, i) {
            s.classList.toggle('is-active', i === idx);
          });
        }
      }
    });

    ScrollTrigger.addEventListener('refreshInit', function () {
      gsap.set(track, { x: 0 });
    });
  }

  /* ============================================================
     10. WHY NOEXATECH — magnetic hover (★★★)
     ============================================================ */
  function animWhy() {
    var items = document.querySelectorAll('.ix-why__item');
    if (!items.length) return;

    gsap.from(items, {
      autoAlpha: 0,
      y: 26,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.ix-why__grid', start: 'top 82%' }
    });

    if (window.matchMedia('(hover: none)').matches) return;

    items.forEach(function (item) {
      var title = item.querySelector('.ix-why__title');
      if (!title) return;

      var tx = gsap.quickTo(title, 'x', { duration: 0.4, ease: 'power2.out' });
      var ty = gsap.quickTo(title, 'y', { duration: 0.4, ease: 'power2.out' });

      item.addEventListener('mousemove', function (e) {
        var r = item.getBoundingClientRect();
        var dx = (e.clientX - r.left) / r.width  - 0.5;
        var dy = (e.clientY - r.top)  / r.height - 0.5;
        tx(dx * 8);
        ty(dy * 4);
      });
      item.addEventListener('mouseleave', function () {
        tx(0); ty(0);
      });
    });
  }

  /* ============================================================
     11. TECHNOLOGY — sequential grid reveal + proximity (★★★)
     ============================================================ */
  function animTech() {
    var grid = document.querySelector('.ix-tech__grid');
    if (!grid) return;

    gsap.from(grid.children, {
      autoAlpha: 0,
      y: 18,
      duration: 0.5,
      stagger: { each: 0.05, from: 'start' },
      ease: 'power2.out',
      scrollTrigger: { trigger: grid, start: 'top 85%' }
    });

    if (window.matchMedia('(hover: none)').matches) return;

    var cells = grid.querySelectorAll('.ix-tech__item');
    grid.addEventListener('mousemove', function (e) {
      var r = grid.getBoundingClientRect();
      var mx = e.clientX - r.left;
      var my = e.clientY - r.top;
      cells.forEach(function (cell) {
        var c = cell.getBoundingClientRect();
        var cx = c.left - r.left + c.width / 2;
        var cy = c.top  - r.top  + c.height / 2;
        var d = Math.hypot(mx - cx, my - cy);
        var near = Math.max(0, 1 - d / 260);
        cell.style.setProperty('--proximity', near.toFixed(3));
      });
    });
    grid.addEventListener('mouseleave', function () {
      cells.forEach(function (cell) { cell.style.setProperty('--proximity', '0'); });
    });
  }

  /* ============================================================
     12. FINAL CTA — cinematic reveal (★★★★)
     ============================================================ */
  function animCTA() {
    var section = document.querySelector('.ix-cta');
    if (!section) return;

    var title   = section.querySelector('.ix-cta__title');
    var text    = section.querySelector('.ix-cta__text');
    var actions = section.querySelector('.ix-cta__actions');

    if (title) {
      var parts = title.innerHTML.split('<br>');
      if (parts.length === 2) {
        title.innerHTML =
          '<span class="anim-mask"><span class="anim-line">' + parts[0].trim() + '</span></span>' +
          '<span class="anim-mask"><span class="anim-line">' + parts[1].trim() + '</span></span>';
      }
    }

    var tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 75%' }
    });

    if (title) {
      tl.from('.ix-cta__title .anim-line', {
        yPercent: 108,
        duration: 0.95,
        stagger: 0.12,
        ease: 'power4.out'
      });
    }
    if (text)    tl.from(text,    { autoAlpha: 0, y: 14, duration: 0.55 }, '-=0.5');
    if (actions) tl.from(actions, { autoAlpha: 0, y: 14, duration: 0.55 }, '-=0.35');

    var sweep = document.createElement('span');
    sweep.className = 'ix-cta__sweep';
    section.querySelector('.container').insertBefore(sweep, actions || text || title);
    gsap.fromTo(sweep,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 78%' } });
  }

  /* ============================================================
     Custom CURSOR (desktop only)
     ============================================================ */
  function initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    var dot  = document.createElement('div');
    var ring = document.createElement('div');
    dot.className  = 'nx-cursor nx-cursor--dot';
    ring.className = 'nx-cursor nx-cursor--ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.body.classList.add('has-nx-cursor');

    var dx = gsap.quickTo(dot,  'x', { duration: 0.12, ease: 'power2.out' });
    var dy = gsap.quickTo(dot,  'y', { duration: 0.12, ease: 'power2.out' });
    var rx = gsap.quickTo(ring, 'x', { duration: 0.4,  ease: 'power2.out' });
    var ry = gsap.quickTo(ring, 'y', { duration: 0.4,  ease: 'power2.out' });

    document.addEventListener('mousemove', function (e) {
      dx(e.clientX); dy(e.clientY);
      rx(e.clientX); ry(e.clientY);
    });

    var interactive = 'a, button, .ix-service, .ix-work-card, .ix-btn, [data-nx-modal], input, textarea, select';
    document.querySelectorAll(interactive).forEach(function (el) {
      el.addEventListener('mouseenter', function () { document.body.classList.add('nx-cursor-hover'); });
      el.addEventListener('mouseleave', function () { document.body.classList.remove('nx-cursor-hover'); });
    });

    window.addEventListener('blur',  function () { gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 }); });
    window.addEventListener('focus', function () { gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 }); });
  }

  /* ============================================================
     Generic reveal fallback for [data-reveal]
     ============================================================ */
  function genericReveal() {
    var handledSelectors = [
      '.ix-hero', '.ix-statement', '.ix-about', '.ix-services',
      '.ix-work', '.ix-stats', '.ix-process', '.ix-why', '.ix-tech', '.ix-cta'
    ].join(',');

    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      if (el.closest(handledSelectors)) return;
      gsap.from(el, {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });
  }

  function revealStuckContent() {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      if (window.gsap) gsap.killTweensOf(el);
      el.classList.add('is-visible');
      el.style.opacity = '1';
      el.style.visibility = 'visible';
      el.style.transform = 'none';
    });
  }

  /* ============================================================
     Boot sequence
     ============================================================ */
  function boot() {
    var loaderDone = document.readyState === 'loading'
      ? new Promise(function (r) { document.addEventListener('DOMContentLoaded', r); })
      : Promise.resolve();

    loaderDone.then(function () {
      return bootLoader();
    }).then(function () {
      animHero();
      heroMouse();
      animMarquee();
      animStatement();
      animAbout();
      animServices();
      animWork();
      animStats();
      animWhy();
      animTech();
      animCTA();
      genericReveal();
      initCursor();

      revealStuckContent();
      window.setTimeout(revealStuckContent, 1200);
      window.setTimeout(revealStuckContent, 2400);

      setTimeout(function () { ScrollTrigger.refresh(); }, 400);
      window.addEventListener('load', function () { ScrollTrigger.refresh(); });
    });
  }

  boot();
})();