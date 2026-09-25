/* ============================================================
   NovExa Tech — Process Page
   Hero process tiles · Reveal animations · Hero video
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     SVG TILES — flow, steps, checklist
     ============================================================ */
  var uid = 0;
  function nextId() { return 'pr' + (++uid); }

  function wrap(inner) {
    return '<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  }

  /* Flow — node graph with arrows */
  function tileFlow() {
    var g = nextId();
    var nodes = [
      [80, 220, 'IDEA'],
      [280, 220, 'RESEARCH'],
      [480, 220, 'BUILD'],
      [680, 220, 'SHIP']
    ];
    var inner = '';
    nodes.forEach(function (n, i) {
      var active = i === 1;
      inner +=
        '<rect x="' + n[0] + '" y="' + n[1] + '" width="120" height="70" rx="10" ' +
          'fill="' + (active ? 'rgba(0,168,255,0.18)' : 'rgba(255,255,255,0.03)') + '" ' +
          'stroke="' + (active ? 'rgba(0,217,255,0.6)' : 'rgba(255,255,255,0.1)') + '" stroke-width="' + (active ? 1.6 : 1) + '"/>' +
        '<text x="' + (n[0] + 60) + '" y="' + (n[1] + 42) + '" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="12" letter-spacing="2" fill="' + (active ? '#00D9FF' : 'rgba(255,255,255,0.55)') + '">' + n[2] + '</text>';
      if (i < nodes.length - 1) {
        var x1 = n[0] + 120;
        var x2 = nodes[i + 1][0];
        inner += '<path d="M' + x1 + ' 255 H' + x2 + '" stroke="rgba(0,168,255,0.45)" stroke-width="1.5" fill="none" marker-end="url(#' + g + 'arw)"/>';
      }
    });

    return wrap(
      '<defs>' +
        '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="#0a1e42"/>' +
          '<stop offset="1" stop-color="#050505"/>' +
        '</linearGradient>' +
        '<marker id="' + g + 'arw" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">' +
          '<path d="M0 0 L6 3 L0 6 Z" fill="rgba(0,168,255,0.6)"/>' +
        '</marker>' +
      '</defs>' +
      '<rect width="800" height="600" fill="url(#' + g + ')"/>' +
      '<g opacity="0.05" stroke="#fff" stroke-width="1">' +
        '<path d="M0 150 H800 M0 300 H800 M0 450 H800"/>' +
        '<path d="M200 0 V600 M400 0 V600 M600 0 V600"/>' +
      '</g>' +
      inner +
      /* progress line below */
      '<rect x="80" y="400" width="720" height="4" rx="2" fill="rgba(255,255,255,0.06)"/>' +
      '<rect x="80" y="400" width="380" height="4" rx="2" fill="url(#' + g + ')"/>' +
      '<circle cx="460" cy="402" r="6" fill="#00D9FF" stroke="#0A0A0A" stroke-width="2"/>' +
      '<text x="80" y="440" font-family="Space Grotesk, sans-serif" font-size="11" letter-spacing="3" fill="rgba(255,255,255,0.4)">PROGRESS</text>'
    );
  }

  /* Steps — vertical numbered list */
  function tileSteps() {
    var g = nextId();
    var steps = ['DISCOVER', 'STRATEGIZE', 'DESIGN', 'DEVELOP', 'TEST', 'LAUNCH', 'SUPPORT'];
    var items = '';
    steps.forEach(function (s, i) {
      var y = 90 + i * 60;
      var active = i === 2;
      items +=
        '<circle cx="140" cy="' + (y + 22) + '" r="18" ' +
          'fill="' + (active ? 'rgba(0,168,255,0.25)' : 'rgba(255,255,255,0.03)') + '" ' +
          'stroke="' + (active ? '#00D9FF' : 'rgba(255,255,255,0.15)') + '" stroke-width="1.2"/>' +
        '<text x="140" y="' + (y + 27) + '" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="12" font-weight="700" fill="' + (active ? '#00D9FF' : 'rgba(255,255,255,0.5)') + '">' + String(i + 1).padStart(2, '0') + '</text>' +
        '<text x="180" y="' + (y + 27) + '" font-family="Space Grotesk, sans-serif" font-size="14" letter-spacing="3" fill="' + (active ? '#FFFFFF' : 'rgba(255,255,255,0.55)') + '">' + s + '</text>';
      if (i < steps.length - 1) {
        items += '<line x1="140" y1="' + (y + 40) + '" x2="140" y2="' + (y + 60) + '" stroke="rgba(0,168,255,0.3)" stroke-width="1"/>';
      }
    });
    return wrap(
      '<defs>' +
        '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="#0a1e42"/>' +
          '<stop offset="1" stop-color="#050505"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="600" fill="url(#' + g + ')"/>' +
      '<rect x="70" y="50" width="660" height="500" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)"/>' +
      '<text x="100" y="80" font-family="Space Grotesk, sans-serif" font-size="11" letter-spacing="4" fill="rgba(255,255,255,0.4)">THE PROCESS</text>' +
      items
    );
  }

  /* Checklist — completion items */
  function tileChecklist() {
    var g = nextId();
    var items = ['Research complete', 'Scope approved', 'Wireframes ready', 'Design system built', 'Development started', 'Testing underway'];
    var inner = '';
    items.forEach(function (item, i) {
      var y = 130 + i * 60;
      var done = i < 4;
      inner +=
        '<rect x="100" y="' + y + '" width="600" height="48" rx="8" ' +
          'fill="' + (done ? 'rgba(0,168,255,0.06)' : 'rgba(255,255,255,0.02)') + '" ' +
          'stroke="' + (done ? 'rgba(0,168,255,0.3)' : 'rgba(255,255,255,0.08)') + '" stroke-width="1"/>' +
        '<rect x="116" y="' + (y + 14) + '" width="20" height="20" rx="4" ' +
          'fill="' + (done ? '#00A8FF' : 'rgba(255,255,255,0.05)') + '" ' +
          'stroke="' + (done ? 'transparent' : 'rgba(255,255,255,0.15)') + '"/>' +
        (done ? '<path d="M121 ' + (y + 24) + ' l4 4 l8 -8" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' : '') +
        '<text x="152" y="' + (y + 30) + '" font-family="Inter, sans-serif" font-size="14" fill="' + (done ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)') + '">' + item + '</text>' +
        (done ? '<text x="680" y="' + (y + 30) + '" text-anchor="end" font-family="Space Grotesk, sans-serif" font-size="10" letter-spacing="3" fill="#00D9FF">DONE</text>' : '');
    });
    return wrap(
      '<defs>' +
        '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="#0a1e42"/>' +
          '<stop offset="1" stop-color="#050505"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="600" fill="url(#' + g + ')"/>' +
      '<text x="100" y="90" font-family="Space Grotesk, sans-serif" font-size="11" letter-spacing="4" fill="rgba(255,255,255,0.4)">PROJECT STATUS</text>' +
      inner +
      '<rect x="100" y="520" width="600" height="4" rx="2" fill="rgba(255,255,255,0.06)"/>' +
      '<rect x="100" y="520" width="400" height="4" rx="2" fill="#00A8FF"/>'
    );
  }

  var TILES = {
    flow: tileFlow,
    steps: tileSteps,
    checklist: tileChecklist
  };

  function getTile(name) {
    var fn = TILES[name] || TILES.flow;
    return fn();
  }

  /* ============================================================
     Render hero tiles
     ============================================================ */
  function initHeroTiles() {
    document.querySelectorAll('.pr-hero__tile').forEach(function (tile) {
      var name = tile.getAttribute('data-tile') || 'flow';
      tile.innerHTML = getTile(name);
    });
  }

  /* ============================================================
     Reveal animations
     ============================================================ */
  function initReveal() {
    var els = document.querySelectorAll('[data-pr-reveal]');
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
    var video = document.querySelector('.pr-hero__video');
    if (!video) return;

    function markReady() {
      video.classList.add('is-ready');
      video.classList.remove('is-missing');
    }
    function markMissing(reason) {
      if (reason) console.info('[NovExa Tech Process] Hero video unavailable:', reason);
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
  initReveal();
  initHeroVideo();
})();