/* ============================================================
   NoExaTech — Credentials Page
   Certificate SVG mockups · Real image support · Lazy loading ·
   Featured spotlight · Filter · Reveal · Hero video
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     SINGLE SOURCE OF TRUTH — credentials
     To use a real certificate image, set `image` to the file path:
       image: 'assets/images/credentials/hp-critical-thinking.webp'
     Leave it as '' to use the category SVG mockup.
     ============================================================ */
  var CREDENTIALS = [
    {
      id: 'c01',
      issuer: 'HP LIFE',
      title: 'Critical Thinking in the AI Era',
      recipient: 'Muhammad Harmain',
      date: 'September 15, 2026',
      credentialId: 'e5a60a70-1b2e-4f…',
      category: 'ai',
      categoryLabel: 'AI',
      verifyUrl: 'https://www.life-global.org/',
      description: 'A short professional program covering critical thinking frameworks, AI-era decision making, and reasoning under ambiguity. Completed by the NoExaTech founder as part of ongoing learning.',
      image: ''
    },
    {
      id: 'c02',
      issuer: 'Issuing Organization',
      title: 'Certificate Title Placeholder',
      recipient: 'Team Member',
      date: '—',
      credentialId: '—',
      category: 'business',
      categoryLabel: 'Business',
      verifyUrl: '',
      description: 'This credential will be published once the team member confirms the certificate details and verification link.',
      image: ''
    },
    {
      id: 'c03',
      issuer: 'Issuing Organization',
      title: 'Certificate Title Placeholder',
      recipient: 'Team Member',
      date: '—',
      credentialId: '—',
      category: 'marketing',
      categoryLabel: 'Marketing',
      verifyUrl: '',
      description: 'This credential will be published once the team member confirms the certificate details and verification link.',
      image: ''
    },
    {
      id: 'c04',
      issuer: 'Issuing Organization',
      title: 'Certificate Title Placeholder',
      recipient: 'Team Member',
      date: '—',
      credentialId: '—',
      category: 'technology',
      categoryLabel: 'Technology',
      verifyUrl: '',
      description: 'This credential will be published once the team member confirms the certificate details and verification link.',
      image: ''
    },
    {
      id: 'c05',
      issuer: 'Issuing Organization',
      title: 'Certificate Title Placeholder',
      recipient: 'Team Member',
      date: '—',
      credentialId: '—',
      category: 'design',
      categoryLabel: 'Design',
      verifyUrl: '',
      description: 'This credential will be published once the team member confirms the certificate details and verification link.',
      image: ''
    },
    {
      id: 'c06',
      issuer: 'Issuing Organization',
      title: 'Certificate Title Placeholder',
      recipient: 'Team Member',
      date: '—',
      credentialId: '—',
      category: 'technology',
      categoryLabel: 'Technology',
      verifyUrl: '',
      description: 'This credential will be published once the team member confirms the certificate details and verification link.',
      image: ''
    }
  ];

  /* ============================================================
     SVG CERTIFICATE MOCKUPS
     Each category gets a distinct hand-drawn certificate look.
     ============================================================ */
  var uid = 0;
  function nextId() { return 'cr' + (++uid); }

  function wrap(inner) {
    return '<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  }

  /* Background + frame shared by every certificate mockup */
  function certificateBase(gradId, accentA, accentB) {
    return (
      '<defs>' +
        '<linearGradient id="' + gradId + '" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="#0a1428"/>' +
          '<stop offset="1" stop-color="#050505"/>' +
        '</linearGradient>' +
        '<linearGradient id="' + gradId + '_a" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0" stop-color="' + accentA + '"/>' +
          '<stop offset="1" stop-color="' + accentB + '"/>' +
        '</linearGradient>' +
      '</defs>' +
      /* Background */
      '<rect width="800" height="600" fill="url(#' + gradId + ')"/>' +
      /* Outer double border */
      '<rect x="40" y="40" width="720" height="520" fill="none" stroke="' + accentA + '" stroke-opacity="0.35" stroke-width="1"/>' +
      '<rect x="56" y="56" width="688" height="488" fill="none" stroke="' + accentB + '" stroke-opacity="0.18" stroke-width="1"/>' +
      /* Ornamental corners */
      '<g stroke="' + accentB + '" stroke-opacity="0.65" stroke-width="1.5" fill="none">' +
        '<path d="M56 96 L96 96 L96 56"/>' +
        '<path d="M744 96 L704 96 L704 56"/>' +
        '<path d="M56 504 L96 504 L96 544"/>' +
        '<path d="M744 504 L704 504 L704 544"/>' +
      '</g>'
    );
  }

  /* Reusable text blocks */
  function certificateText(title, subtitle) {
    return (
      '<text x="400" y="140" text-anchor="middle" font-family="Georgia, serif" font-size="14" letter-spacing="8" fill="rgba(255,255,255,0.35)">CERTIFICATE</text>' +
      '<text x="400" y="170" text-anchor="middle" font-family="Georgia, serif" font-size="10" letter-spacing="6" fill="rgba(255,255,255,0.22)">OF COMPLETION</text>' +
      '<line x1="330" y1="192" x2="470" y2="192" stroke="rgba(0,168,255,0.4)" stroke-width="1"/>' +
      '<text x="400" y="260" text-anchor="middle" font-family="Georgia, serif" font-size="34" font-style="italic" fill="rgba(255,255,255,0.85)">' + title + '</text>' +
      '<text x="400" y="300" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" letter-spacing="4" fill="rgba(255,255,255,0.4)">PRESENTED FOR</text>' +
      '<line x1="200" y1="330" x2="600" y2="330" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>' +
      '<text x="400" y="365" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="18" font-weight="600" fill="#EDF3FF">' + subtitle + '</text>' +
      '<line x1="200" y1="386" x2="600" y2="386" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>'
    );
  }

  function signatureAndSeal(accentA, accentB) {
    return (
      /* Signature */
      '<g transform="translate(150 470)">' +
        '<path d="M0 10 Q20 -8 40 6 T80 6 T120 10" stroke="rgba(255,255,255,0.55)" stroke-width="1.5" fill="none"/>' +
        '<line x1="0" y1="26" x2="130" y2="26" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>' +
        '<text x="65" y="46" text-anchor="middle" font-family="Inter, sans-serif" font-size="9" letter-spacing="2" fill="rgba(255,255,255,0.35)">ISSUING OFFICER</text>' +
      '</g>' +
      /* Date */
      '<g transform="translate(335 470)">' +
        '<line x1="0" y1="26" x2="130" y2="26" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>' +
        '<text x="65" y="46" text-anchor="middle" font-family="Inter, sans-serif" font-size="9" letter-spacing="2" fill="rgba(255,255,255,0.35)">DATE ISSUED</text>' +
      '</g>' +
      /* Seal */
      '<g transform="translate(600 462)">' +
        '<circle r="42" fill="none" stroke="' + accentA + '" stroke-opacity="0.5" stroke-width="1"/>' +
        '<circle r="34" fill="none" stroke="' + accentB + '" stroke-opacity="0.35" stroke-width="1" stroke-dasharray="3 4"/>' +
        '<circle r="26" fill="' + accentA + '" fill-opacity="0.12"/>' +
        '<text y="-2" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="11" font-weight="700" letter-spacing="3" fill="' + accentB + '">OFFICIAL</text>' +
        '<text y="12" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="9" letter-spacing="2" fill="rgba(255,255,255,0.5)">SEAL</text>' +
      '</g>'
    );
  }

  var MOCKUPS = {
    'ai': function () {
      var g = nextId();
      return wrap(
        certificateBase(g, '#00A8FF', '#00D9FF') +
        /* neural node decoration */
        '<g opacity="0.35" stroke="#00D9FF" stroke-width="0.6" fill="none">' +
          '<path d="M120 200 L180 160 M180 160 L240 200 M240 200 L200 260 M200 260 L140 240 M140 240 L120 200"/>' +
          '<path d="M660 200 L600 160 M600 160 L540 200 M540 200 L580 260 M580 260 L640 240 M640 240 L660 200"/>' +
        '</g>' +
        '<g opacity="0.6">' +
          '<circle cx="120" cy="200" r="4" fill="#00A8FF"/>' +
          '<circle cx="180" cy="160" r="4" fill="#00D9FF"/>' +
          '<circle cx="240" cy="200" r="4" fill="#00A8FF"/>' +
          '<circle cx="200" cy="260" r="4" fill="#00D9FF"/>' +
          '<circle cx="140" cy="240" r="4" fill="#00A8FF"/>' +
          '<circle cx="660" cy="200" r="4" fill="#00A8FF"/>' +
          '<circle cx="600" cy="160" r="4" fill="#00D9FF"/>' +
          '<circle cx="540" cy="200" r="4" fill="#00A8FF"/>' +
          '<circle cx="580" cy="260" r="4" fill="#00D9FF"/>' +
          '<circle cx="640" cy="240" r="4" fill="#00A8FF"/>' +
        '</g>' +
        certificateText('Scientia', 'NAME SURNAME') +
        signatureAndSeal('#00A8FF', '#00D9FF')
      );
    },
    'technology': function () {
      var g = nextId();
      return wrap(
        certificateBase(g, '#0066FF', '#00A8FF') +
        /* circuit decoration */
        '<g opacity="0.35" stroke="#00A8FF" stroke-width="0.8" fill="none">' +
          '<path d="M100 140 H180 M180 140 V180 M180 180 H240"/>' +
          '<path d="M700 140 H620 M620 140 V180 M620 180 H560"/>' +
          '<circle cx="180" cy="140" r="3" fill="#0066FF"/>' +
          '<circle cx="180" cy="180" r="3" fill="#00A8FF"/>' +
          '<circle cx="620" cy="140" r="3" fill="#0066FF"/>' +
          '<circle cx="620" cy="180" r="3" fill="#00A8FF"/>' +
        '</g>' +
        certificateText('Technologia', 'NAME SURNAME') +
        signatureAndSeal('#0066FF', '#00A8FF')
      );
    },
    'marketing': function () {
      var g = nextId();
      return wrap(
        certificateBase(g, '#00D9FF', '#0066FF') +
        /* growth chart decoration */
        '<g opacity="0.4" stroke="#00D9FF" stroke-width="1.2" fill="none">' +
          '<path d="M100 260 L140 220 L180 240 L220 180 L260 200 L300 150"/>' +
          '<path d="M500 260 L540 220 L580 240 L620 180 L660 200 L700 150"/>' +
        '</g>' +
        '<g opacity="0.6" fill="#00D9FF">' +
          '<circle cx="100" cy="260" r="3"/>' +
          '<circle cx="140" cy="220" r="3"/>' +
          '<circle cx="180" cy="240" r="3"/>' +
          '<circle cx="220" cy="180" r="3"/>' +
          '<circle cx="260" cy="200" r="3"/>' +
          '<circle cx="300" cy="150" r="3"/>' +
          '<circle cx="500" cy="260" r="3"/>' +
          '<circle cx="540" cy="220" r="3"/>' +
          '<circle cx="580" cy="240" r="3"/>' +
          '<circle cx="620" cy="180" r="3"/>' +
          '<circle cx="660" cy="200" r="3"/>' +
          '<circle cx="700" cy="150" r="3"/>' +
        '</g>' +
        certificateText('Mercatura', 'NAME SURNAME') +
        signatureAndSeal('#00D9FF', '#0066FF')
      );
    },
    'design': function () {
      var g = nextId();
      return wrap(
        certificateBase(g, '#00A8FF', '#0066FF') +
        /* geometric swatch decoration */
        '<g opacity="0.5">' +
          '<circle cx="120" cy="220" r="30" fill="none" stroke="#00A8FF" stroke-width="1"/>' +
          '<rect x="640" y="190" width="60" height="60" fill="none" stroke="#0066FF" stroke-width="1" transform="rotate(15 670 220)"/>' +
          '<polygon points="120,240 160,240 140,280" fill="none" stroke="#00D9FF" stroke-width="1" opacity="0.5"/>' +
        '</g>' +
        certificateText('Designatio', 'NAME SURNAME') +
        signatureAndSeal('#00A8FF', '#0066FF')
      );
    },
    'business': function () {
      var g = nextId();
      return wrap(
        certificateBase(g, '#0066FF', '#00A8FF') +
        /* document/ribbon decoration */
        '<g opacity="0.35" stroke="#00A8FF" stroke-width="0.8" fill="none">' +
          '<rect x="100" y="180" width="80" height="100" rx="4"/>' +
          '<line x1="115" y1="205" x2="165" y2="205"/>' +
          '<line x1="115" y1="225" x2="165" y2="225"/>' +
          '<line x1="115" y1="245" x2="150" y2="245"/>' +
          '<rect x="620" y="180" width="80" height="100" rx="4"/>' +
          '<line x1="635" y1="205" x2="685" y2="205"/>' +
          '<line x1="635" y1="225" x2="685" y2="225"/>' +
          '<line x1="635" y1="245" x2="670" y2="245"/>' +
        '</g>' +
        certificateText('Commercium', 'NAME SURNAME') +
        signatureAndSeal('#0066FF', '#00A8FF')
      );
    }
  };

  function getMockup(category) {
    var fn = MOCKUPS[category] || MOCKUPS['technology'];
    return fn();
  }

  /* ============================================================
     Lazy image loader
     ============================================================ */
  function lazyLoad(root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll('[data-lazy]');
    if (!nodes.length) return;

    function load(el) {
      var src = el.getAttribute('data-lazy');
      if (!src || el.dataset.loaded) return;
      el.dataset.loaded = '1';
      el.addEventListener('load', function () { el.classList.add('is-loaded'); });
      el.addEventListener('error', function () { el.classList.add('is-error'); });
      el.src = src;
    }

    if (!('IntersectionObserver' in window)) {
      nodes.forEach(load);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          load(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '240px 0px', threshold: 0.01 });

    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ============================================================
     Helpers
     ============================================================ */
  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ============================================================
     DOM refs
     ============================================================ */
  var wall    = document.querySelector('[data-credential-wall]');
  var filters = document.querySelectorAll('.cr-filter');
  if (!wall) return;

  /* ============================================================
     Render certificate cards
     ============================================================ */
  /* Assign a wide/full span pattern so the wall feels like a gallery */
  function spanClassFor(i) {
    if (i === 0) return 'cr-card--wide';   /* first card: wide (featured-ish) */
    if (i === 3) return 'cr-card--full';   /* fourth card: full width band */
    return '';
  }

  function renderCard(c, i) {
    var verifyBtn = c.verifyUrl
      ? '<a class="cr-btn" href="' + escapeHtml(c.verifyUrl) + '" target="_blank" rel="noopener noreferrer">Verify Credential</a>'
      : '<span class="cr-btn cr-btn--disabled" aria-disabled="true">Not Yet Published</span>';

    var imgHtml = c.image
      ? '<img class="cr-card__img" alt="' + escapeHtml(c.title) + ' certificate" loading="lazy" decoding="async" data-lazy="' + escapeHtml(c.image) + '" />'
      : '';

    var badgeClass = c.verifyUrl ? 'cr-card__badge' : 'cr-card__badge';

    return '' +
      '<article class="cr-card ' + spanClassFor(i) + '" data-credential="' + escapeHtml(c.id) + '" data-category="' + escapeHtml(c.category) + '">' +
        '<div class="cr-card__preview" aria-hidden="true">' +
          '<span class="' + badgeClass + '">' + escapeHtml(c.categoryLabel) + '</span>' +
          imgHtml +
          '<div class="cr-card__placeholder">' + getMockup(c.category) + '</div>' +
        '</div>' +
        '<div class="cr-card__body">' +
          '<p class="cr-card__issuer">' + escapeHtml(c.issuer) + '</p>' +
          '<h3 class="cr-card__title">' + escapeHtml(c.title) + '</h3>' +
          '<ul class="cr-card__meta">' +
            '<li><strong>Recipient</strong><span>' + escapeHtml(c.recipient) + '</span></li>' +
            '<li><strong>Issued</strong><span>' + escapeHtml(c.date) + '</span></li>' +
            '<li><strong>ID</strong><code>' + escapeHtml(c.credentialId) + '</code></li>' +
          '</ul>' +
          verifyBtn +
        '</div>' +
      '</article>';
  }

  function renderWall() {
    wall.innerHTML = CREDENTIALS.map(renderCard).join('');
    lazyLoad(wall);
  }

  /* ============================================================
     Featured spotlight
     ============================================================ */
  function renderSpotlight() {
    var host = document.querySelector('[data-cr-spotlight]');
    if (!host) return;
    var featured = CREDENTIALS[0];
    if (!featured) return;

    var verifyBtn = featured.verifyUrl
      ? '<a class="cr-btn cr-btn--solid" href="' + escapeHtml(featured.verifyUrl) + '" target="_blank" rel="noopener noreferrer">Verify Credential</a>'
      : '<span class="cr-btn cr-btn--disabled" aria-disabled="true">Not Yet Published</span>';

    var previewHtml = featured.image
      ? '<img src="' + escapeHtml(featured.image) + '" alt="' + escapeHtml(featured.title) + '" />'
      : getMockup(featured.category);

    host.innerHTML =
      '<div class="cr-spotlight__visual">' +
        '<span class="cr-spotlight__badge">Featured</span>' +
        '<div class="cr-spotlight__frame">' + previewHtml + '</div>' +
      '</div>' +
      '<div class="cr-spotlight__body">' +
        '<p class="cr-spotlight__issuer">' + escapeHtml(featured.issuer) + '</p>' +
        '<h3 class="cr-spotlight__title">' + escapeHtml(featured.title) + '</h3>' +
        '<p class="cr-spotlight__desc">' + escapeHtml(featured.description) + '</p>' +
        '<ul class="cr-spotlight__meta">' +
          '<li><strong>Recipient</strong><span>' + escapeHtml(featured.recipient) + '</span></li>' +
          '<li><strong>Issued</strong><span>' + escapeHtml(featured.date) + '</span></li>' +
          '<li><strong>Category</strong><span>' + escapeHtml(featured.categoryLabel) + '</span></li>' +
          '<li><strong>ID</strong><code>' + escapeHtml(featured.credentialId) + '</code></li>' +
        '</ul>' +
        '<div class="cr-spotlight__actions">' + verifyBtn + '</div>' +
      '</div>';
  }

  /* ============================================================
     Hero certificate tiles
     ============================================================ */
  function renderHeroTiles() {
    document.querySelectorAll('.cr-hero__tile').forEach(function (tile) {
      var cat = tile.getAttribute('data-tile') || 'technology';
      tile.innerHTML = getMockup(cat);
    });
  }

  /* ============================================================
     Filter
     ============================================================ */
  function applyFilter(value) {
    var cards = wall.querySelectorAll('.cr-card');
    var visible = 0;
    cards.forEach(function (card) {
      var match = value === 'all' || card.getAttribute('data-category') === value;
      if (match) { card.removeAttribute('hidden'); visible++; }
      else { card.setAttribute('hidden', ''); }
    });
    if (visible === 0) wall.setAttribute('data-empty', '');
    else wall.removeAttribute('data-empty');
    filters.forEach(function (b) {
      var on = b.getAttribute('data-filter') === value;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter(btn.getAttribute('data-filter') || 'all');
    });
  });

  /* ============================================================
     Reveal animations
     ============================================================ */
  function initReveal() {
    var els = document.querySelectorAll('[data-cr-reveal]');
    if (!els.length) return;

    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ============================================================
     Hero video — reveal only when the file can actually play
     ============================================================ */
  function initHeroVideo() {
    var video = document.querySelector('.cr-hero__video');
    if (!video) return;

    function markReady() {
      video.classList.add('is-ready');
      video.classList.remove('is-missing');
    }
    function markMissing(reason) {
      if (reason) console.info('[NoExaTech Credentials] Hero video unavailable:', reason);
      video.classList.add('is-missing');
      video.classList.remove('is-ready');
    }

    video.addEventListener('loadeddata', markReady, { once: true });
    video.addEventListener('canplay',    markReady, { once: true });

    video.addEventListener('error', function () {
      markMissing('file not found or unsupported codec at ' + (video.currentSrc || video.src));
    }, { once: true });

    var p = video.play && video.play();
    if (p && typeof p.catch === 'function') {
      p.catch(function () { markMissing('autoplay blocked by browser'); });
    }

    setTimeout(function () {
      if (video.readyState < 2 && !video.classList.contains('is-ready')) {
        markMissing('timed out waiting for video data');
      }
    }, 6000);
  }

  /* ============================================================
     Init
     ============================================================ */
  renderHeroTiles();
  renderSpotlight();
  renderWall();
  initReveal();
  initHeroVideo();
})();