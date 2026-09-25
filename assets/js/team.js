/* ============================================================
   NovExa Tech — Team Page
   Roster · Portrait SVG fallbacks · Lazy images · Filter ·
   Reveal animations · Hero video · Hero tiles
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     SINGLE SOURCE OF TRUTH — team roster
     `image` is optional. Leave it empty to use the SVG silhouette.
     Add real photos by dropping files in `assets/images/team/` and
     setting the path here:

       image: 'assets/images/team/founder.jpg'
     ============================================================ */
  var TEAM = [
    {
      id: 't01',
      name: 'Muhammad Harmain',
      role: 'Founder & Product Direction',
      discipline: 'technology',
      disciplineLabel: 'Technology',
      badge: 'Founder',
      description: 'Shapes studio strategy, client partnerships, and the product direction behind every engagement.',
      image: 'assets/images/team/founder.jpg'
    },
    {
      id: 't02',
      name: 'Asim Malik',
      role: 'Video Editor & Creative Specialist',
      discipline: 'design',
      disciplineLabel: 'Design & Creative',
      description: 'Turns ideas, footage, and campaign goals into clear, engaging visual stories.',
      image: 'assets/images/team/asim.jpg'
    }
  ];

  /* ============================================================
     SVG SILHOUETTE FALLBACK
     Used when a team member has no photo yet.
     ============================================================ */
  function silhouetteSvg() {
    return '' +
      '<svg viewBox="0 0 400 533" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<defs>' +
          '<linearGradient id="tmBg" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0" stop-color="#0a1a3a"/>' +
            '<stop offset="1" stop-color="#050505"/>' +
          '</linearGradient>' +
          '<linearGradient id="tmSil" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0" stop-color="#00A8FF" stop-opacity="0.55"/>' +
            '<stop offset="1" stop-color="#0066FF" stop-opacity="0.35"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect width="400" height="533" fill="url(#tmBg)"/>' +
        /* subtle grid */
        '<g opacity="0.06" stroke="#fff" stroke-width="1">' +
          '<path d="M0 100 H400 M0 200 H400 M0 300 H400 M0 400 H400 M0 500 H400"/>' +
          '<path d="M80 0 V533 M160 0 V533 M240 0 V533 M320 0 V533"/>' +
        '</g>' +
        /* radial glow behind silhouette */
        '<ellipse cx="200" cy="260" rx="150" ry="180" fill="#0066FF" opacity="0.10"/>' +
        /* head */
        '<circle cx="200" cy="180" r="58" fill="url(#tmSil)"/>' +
        /* shoulders / body */
        '<path d="M80 500 C80 400 130 320 200 320 C270 320 320 400 320 500 Z" fill="url(#tmSil)"/>' +
        /* accent ring */
        '<circle cx="200" cy="180" r="74" fill="none" stroke="#00D9FF" stroke-opacity="0.35" stroke-width="1" stroke-dasharray="4 6"/>' +
      '</svg>';
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
      el.addEventListener('error', function () {
        /* Leave the placeholder visible if the file is missing */
        el.style.display = 'none';
      });
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
    }, { rootMargin: '260px 0px', threshold: 0.01 });

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
     DOM
     ============================================================ */
  var roster   = document.querySelector('[data-team-roster]');
  var filters  = document.querySelectorAll('.tm-filter');

  /* ============================================================
     Render roster card
     ============================================================ */
  function renderCard(member) {
    var imgHtml = member.image
      ? '<img data-lazy="' + escapeHtml(member.image) + '" alt="Portrait of ' + escapeHtml(member.name) + '" loading="lazy" decoding="async" />'
      : '';

    var badgeHtml = member.badge
      ? '<span class="tm-roster__badge">' + escapeHtml(member.badge) + '</span>'
      : '';

    return '' +
      '<article class="tm-roster__card" data-member="' + escapeHtml(member.id) + '" data-discipline="' + escapeHtml(member.discipline) + '">' +
        badgeHtml +
        '<div class="tm-roster__photo">' +
          imgHtml +
          '<div class="tm-roster__placeholder">' + silhouetteSvg() + '</div>' +
        '</div>' +
        '<div class="tm-roster__overlay">' +
          '<h3 class="tm-roster__name">' + escapeHtml(member.name) + '</h3>' +
          '<p class="tm-roster__role">' + escapeHtml(member.role) + '</p>' +
          '<p class="tm-roster__desc">' + escapeHtml(member.description) + '</p>' +
        '</div>' +
      '</article>';
  }

  function renderRoster() {
    if (!roster) return;
    roster.innerHTML = TEAM.map(renderCard).join('');
    lazyLoad(roster);
  }

  /* ============================================================
     Filter roster
     ============================================================ */
  function applyFilter(value) {
    if (!roster) return;
    var cards = roster.querySelectorAll('.tm-roster__card');
    var visible = 0;
    cards.forEach(function (card) {
      var match = value === 'all' || card.getAttribute('data-discipline') === value;
      if (match) { card.removeAttribute('hidden'); visible++; }
      else { card.setAttribute('hidden', ''); }
    });
    if (visible === 0) roster.setAttribute('data-empty', '');
    else roster.removeAttribute('data-empty');
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
     Hero tiles — lazy-load images + silhouette
     ============================================================ */
  function initHeroTiles() {
    document.querySelectorAll('.tm-hero__tile').forEach(function (tile) {
      var img = tile.querySelector('img');
      /* Insert silhouette behind the img (before img in DOM) */
      var holder = document.createElement('div');
      holder.className = 'tm-hero__tile-fallback';
      holder.innerHTML = silhouetteSvg();
      tile.insertBefore(holder, img);
    });
    lazyLoad(document);
  }

  /* ============================================================
     Reveal animations
     ============================================================ */
  function initReveal() {
    var els = document.querySelectorAll('[data-tm-reveal]');
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
     Hero video — reveal only when playable
     ============================================================ */
  function initHeroVideo() {
    var video = document.querySelector('.tm-hero__video');
    if (!video) return;

    function markReady() {
      video.classList.add('is-ready');
      video.classList.remove('is-missing');
    }
    function markMissing(reason) {
      if (reason) console.info('[NovExa Tech Team] Hero video unavailable:', reason);
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
  initHeroTiles();
  renderRoster();
  initReveal();
  initHeroVideo();
})();
