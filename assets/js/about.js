/* ============================================================
   NoExaTech — About Page
   Abstract SVG tiles · Lazy images · Reveal · Hero video
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     SVG ABSTRACT TILES
     Three hero tiles, each representing a different idea:
     structure / flow / grid
     ============================================================ */
  var uid = 0;
  function nextId() { return 'ab' + (++uid); }

  function wrap(inner) {
    return '<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  }

  var TILES = {
    /* Structure — layered blocks, like an architecture diagram */
    structure: function () {
      var g = nextId();
      return wrap(
        '<defs>' +
          '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0" stop-color="#0a1a3a"/>' +
            '<stop offset="1" stop-color="#050505"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect width="800" height="600" fill="url(#' + g + ')"/>' +
        /* grid */
        '<g opacity="0.06" stroke="#fff" stroke-width="1">' +
          '<path d="M0 100 H800 M0 200 H800 M0 300 H800 M0 400 H800 M0 500 H800"/>' +
          '<path d="M100 0 V600 M200 0 V600 M300 0 V600 M400 0 V600 M500 0 V600 M600 0 V600 M700 0 V600"/>' +
        '</g>' +
        /* stacked architecture blocks */
        '<rect x="120" y="100" width="560" height="70" rx="8" fill="rgba(0,168,255,0.10)" stroke="rgba(0,168,255,0.35)" stroke-width="1.5"/>' +
        '<text x="140" y="142" font-family="Space Grotesk, sans-serif" font-size="14" letter-spacing="3" fill="#00A8FF">DIRECTION</text>' +
        '<rect x="120" y="190" width="270" height="70" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.10)"/>' +
        '<rect x="410" y="190" width="270" height="70" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.10)"/>' +
        '<text x="140" y="232" font-family="Space Grotesk, sans-serif" font-size="12" letter-spacing="2" fill="rgba(255,255,255,0.5)">DESIGN</text>' +
        '<text x="430" y="232" font-family="Space Grotesk, sans-serif" font-size="12" letter-spacing="2" fill="rgba(255,255,255,0.5)">ENGINEERING</text>' +
        /* connectors */
        '<g stroke="#00A8FF" stroke-opacity="0.5" stroke-width="1" fill="none">' +
          '<path d="M255 170 V190"/>' +
          '<path d="M545 170 V190"/>' +
        '</g>' +
        '<rect x="120" y="280" width="560" height="70" rx="8" fill="rgba(0,217,255,0.08)" stroke="rgba(0,217,255,0.35)" stroke-width="1.5"/>' +
        '<text x="140" y="322" font-family="Space Grotesk, sans-serif" font-size="12" letter-spacing="2" fill="#00D9FF">PRODUCT</text>' +
        /* connectors */
        '<g stroke="#00A8FF" stroke-opacity="0.5" stroke-width="1" fill="none">' +
          '<path d="M255 260 V280"/>' +
          '<path d="M545 260 V280"/>' +
        '</g>' +
        /* base blocks */
        '<rect x="120" y="370" width="170" height="120" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)"/>' +
        '<rect x="310" y="370" width="170" height="120" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)"/>' +
        '<rect x="500" y="370" width="180" height="120" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)"/>' +
        /* accent circles inside bases */
        '<circle cx="205" cy="430" r="16" fill="rgba(0,168,255,0.4)"/>' +
        '<circle cx="395" cy="430" r="16" fill="rgba(0,217,255,0.35)"/>' +
        '<circle cx="590" cy="430" r="16" fill="rgba(0,102,255,0.4)"/>'
      );
    },

    /* Flow — nodes and connectors, like a process diagram */
    flow: function () {
      var g = nextId();
      var nodes = [
        [100, 200, 'DISCOVER'],
        [260, 200, 'STRATEGIZE'],
        [420, 200, 'DESIGN'],
        [580, 200, 'DEVELOP'],
        [260, 380, 'TEST'],
        [420, 380, 'LAUNCH'],
        [580, 380, 'SUPPORT']
      ];
      var nodeHtml = '';
      nodes.forEach(function (n, i) {
        var active = i === 2;
        nodeHtml +=
          '<rect x="' + n[0] + '" y="' + n[1] + '" width="120" height="60" rx="8" ' +
            'fill="' + (active ? 'rgba(0,168,255,0.18)' : 'rgba(255,255,255,0.03)') + '" ' +
            'stroke="' + (active ? 'rgba(0,217,255,0.6)' : 'rgba(255,255,255,0.10)') + '" stroke-width="' + (active ? 1.5 : 1) + '"/>' +
          '<text x="' + (n[0] + 60) + '" y="' + (n[1] + 36) + '" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="11" letter-spacing="2" fill="' + (active ? '#00D9FF' : 'rgba(255,255,255,0.55)') + '">' + n[2] + '</text>';
      });

      /* connectors */
      var connectors =
        '<g stroke="rgba(0,168,255,0.4)" stroke-width="1" fill="none">' +
          '<path d="M220 230 H260"/>' +
          '<path d="M380 230 H420"/>' +
          '<path d="M540 230 H580"/>' +
          '<path d="M320 260 V380"/>' +
          '<path d="M480 260 V380"/>' +
          '<path d="M640 260 V380"/>' +
          '<path d="M380 410 H420"/>' +
          '<path d="M540 410 H580"/>' +
        '</g>';

      return wrap(
        '<defs>' +
          '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0" stop-color="#0a1a3a"/>' +
            '<stop offset="1" stop-color="#050505"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect width="800" height="600" fill="url(#' + g + ')"/>' +
        /* grid */
        '<g opacity="0.05" stroke="#fff" stroke-width="1">' +
          '<path d="M0 150 H800 M0 300 H800 M0 450 H800"/>' +
          '<path d="M200 0 V600 M400 0 V600 M600 0 V600"/>' +
        '</g>' +
        connectors +
        nodeHtml +
        /* start / end markers */
        '<circle cx="100" cy="150" r="6" fill="#00A8FF"/>' +
        '<circle cx="700" cy="470" r="6" fill="#00D9FF"/>' +
        '<text x="100" y="130" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="10" letter-spacing="2" fill="rgba(255,255,255,0.4)">START</text>' +
        '<text x="700" y="500" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="10" letter-spacing="2" fill="rgba(255,255,255,0.4)">SHIP</text>'
      );
    },

    /* Grid — capability matrix */
    grid: function () {
      var g = nextId();
      var cells = '';
      var labels = ['WEB', 'APP', 'SYS', 'UX', 'ADS', 'AUTO', 'API', 'CRM', 'CMS'];
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
          var x = 150 + c * 160;
          var y = 130 + r * 130;
          var active = (r === 1 && c === 1);
          cells +=
            '<rect x="' + x + '" y="' + y + '" width="140" height="110" rx="8" ' +
              'fill="' + (active ? 'rgba(0,168,255,0.15)' : 'rgba(255,255,255,0.025)') + '" ' +
              'stroke="' + (active ? 'rgba(0,217,255,0.55)' : 'rgba(255,255,255,0.08)') + '" stroke-width="' + (active ? 1.5 : 1) + '"/>' +
            '<text x="' + (x + 70) + '" y="' + (y + 62) + '" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="14" font-weight="600" letter-spacing="2" fill="' + (active ? '#00D9FF' : 'rgba(255,255,255,0.5)') + '">' + labels[r * 3 + c] + '</text>' +
            '<circle cx="' + (x + 70) + '" cy="' + (y + 25) + '" r="4" fill="' + (active ? '#00D9FF' : 'rgba(0,168,255,0.5)') + '"/>';
        }
      }

      return wrap(
        '<defs>' +
          '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0" stop-color="#0a1a3a"/>' +
            '<stop offset="1" stop-color="#050505"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect width="800" height="600" fill="url(#' + g + ')"/>' +
        '<text x="400" y="80" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="12" letter-spacing="4" fill="rgba(255,255,255,0.35)">CAPABILITY MATRIX</text>' +
        cells
      );
    }
  };

  function getTile(name) {
    var fn = TILES[name] || TILES.structure;
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
      el.addEventListener('error', function () {
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
    }, { rootMargin: '240px 0px', threshold: 0.01 });

    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ============================================================
     Render hero tiles
     ============================================================ */
  function initHeroTiles() {
    document.querySelectorAll('.ab-hero__tile').forEach(function (tile) {
      var name = tile.getAttribute('data-tile') || 'structure';
      tile.innerHTML = getTile(name);
    });
  }

  /* ============================================================
     Reveal animations
     ============================================================ */
  function initReveal() {
    var els = document.querySelectorAll('[data-ab-reveal]');
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
    var video = document.querySelector('.ab-hero__video');
    if (!video) return;

    function markReady() {
      video.classList.add('is-ready');
      video.classList.remove('is-missing');
    }
    function markMissing(reason) {
      if (reason) console.info('[NoExaTech About] Hero video unavailable:', reason);
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
  lazyLoad(document);
  initReveal();
  initHeroVideo();
})();