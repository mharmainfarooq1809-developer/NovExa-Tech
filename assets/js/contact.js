/* ============================================================
   NoExaTech — Contact Page
   Hero contact tiles · Reveal animations · Hero video
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     SVG TILES — email / chat / network
     ============================================================ */
  var uid = 0;
  function nextId() { return 'ct' + (++uid); }

  function wrap(inner) {
    return '<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  }

  /* Email — envelope + message lines */
  function tileEmail() {
    var g = nextId();
    return wrap(
      '<defs>' +
        '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="#0a1a3a"/>' +
          '<stop offset="1" stop-color="#050505"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="600" fill="url(#' + g + ')"/>' +
      '<g opacity="0.06" stroke="#fff" stroke-width="1">' +
        '<path d="M0 150 H800 M0 300 H800 M0 450 H800"/>' +
        '<path d="M200 0 V600 M400 0 V600 M600 0 V600"/>' +
      '</g>' +
      /* envelope body */
      '<rect x="180" y="180" width="440" height="280" rx="16" fill="rgba(0,168,255,0.08)" stroke="rgba(0,168,255,0.4)" stroke-width="1.5"/>' +
      /* envelope flap */
      '<path d="M180 200 L400 340 L620 200" fill="none" stroke="#00A8FF" stroke-opacity="0.7" stroke-width="2"/>' +
      /* message lines on envelope */
      '<rect x="220" y="400" width="180" height="8" rx="3" fill="rgba(255,255,255,0.35)"/>' +
      '<rect x="220" y="422" width="140" height="8" rx="3" fill="rgba(255,255,255,0.15)"/>' +
      /* notification dot */
      '<circle cx="600" cy="200" r="24" fill="#00D9FF"/>' +
      '<text x="600" y="207" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="20" font-weight="700" fill="#050505">1</text>' +
      /* side accents */
      '<circle cx="120" cy="320" r="6" fill="rgba(0,168,255,0.6)"/>' +
      '<circle cx="680" cy="320" r="6" fill="rgba(0,217,255,0.6)"/>' +
      '<line x1="120" y1="320" x2="180" y2="320" stroke="rgba(0,168,255,0.4)" stroke-width="1"/>' +
      '<line x1="620" y1="320" x2="680" y2="320" stroke="rgba(0,217,255,0.4)" stroke-width="1"/>'
    );
  }

  /* Chat — message bubbles */
  function tileChat() {
    var g = nextId();
    return wrap(
      '<defs>' +
        '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="#0a1a3a"/>' +
          '<stop offset="1" stop-color="#050505"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="600" fill="url(#' + g + ')"/>' +
      '<g opacity="0.06" stroke="#fff" stroke-width="1">' +
        '<path d="M0 200 H800 M0 400 H800"/>' +
        '<path d="M400 0 V600"/>' +
      '</g>' +
      /* incoming bubble */
      '<rect x="120" y="120" width="300" height="70" rx="18" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)"/>' +
      '<rect x="146" y="146" width="180" height="10" rx="4" fill="rgba(255,255,255,0.4)"/>' +
      '<rect x="146" y="164" width="140" height="10" rx="4" fill="rgba(255,255,255,0.2)"/>' +
      /* outgoing bubble */
      '<rect x="380" y="220" width="300" height="70" rx="18" fill="rgba(0,168,255,0.15)" stroke="rgba(0,168,255,0.4)"/>' +
      '<rect x="406" y="246" width="200" height="10" rx="4" fill="#00A8FF"/>' +
      '<rect x="406" y="264" width="160" height="10" rx="4" fill="rgba(255,255,255,0.55)"/>' +
      /* incoming bubble 2 */
      '<rect x="120" y="320" width="360" height="70" rx="18" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)"/>' +
      '<rect x="146" y="346" width="240" height="10" rx="4" fill="rgba(255,255,255,0.4)"/>' +
      '<rect x="146" y="364" width="180" height="10" rx="4" fill="rgba(255,255,255,0.2)"/>' +
      /* outgoing small bubble */
      '<rect x="500" y="420" width="180" height="60" rx="18" fill="rgba(0,217,255,0.15)" stroke="rgba(0,217,255,0.4)"/>' +
      '<rect x="524" y="444" width="120" height="10" rx="4" fill="#00D9FF"/>' +
      /* typing dots */
      '<circle cx="140" cy="450" r="6" fill="rgba(0,168,255,0.4)"/>' +
      '<circle cx="164" cy="450" r="6" fill="rgba(0,168,255,0.7)"/>' +
      '<circle cx="188" cy="450" r="6" fill="#00A8FF"/>'
    );
  }

  /* Network — connected nodes */
  function tileNetwork() {
    var g = nextId();
    var nodes = [
      [400, 300, 'YOU', true],
      [180, 180, '', false],
      [620, 180, '', false],
      [180, 420, '', false],
      [620, 420, '', false],
      [400, 100, '', false],
      [400, 500, '', false]
    ];
    var edges = '';
    var dots = '';
    nodes.forEach(function (n, i) {
      if (i > 0) {
        edges += '<line x1="400" y1="300" x2="' + n[0] + '" y2="' + n[1] + '" stroke="rgba(0,168,255,0.35)" stroke-width="1"/>';
      }
    });
    nodes.forEach(function (n, i) {
      var isCenter = i === 0;
      var r = isCenter ? 42 : 22;
      dots +=
        '<circle cx="' + n[0] + '" cy="' + n[1] + '" r="' + r + '" ' +
          'fill="' + (isCenter ? 'rgba(0,168,255,0.25)' : 'rgba(0,168,255,0.15)') + '" ' +
          'stroke="' + (isCenter ? '#00D9FF' : 'rgba(0,168,255,0.5)') + '" stroke-width="' + (isCenter ? 1.8 : 1.2) + '"/>';
      if (isCenter) {
        dots += '<text x="' + n[0] + '" y="' + (n[1] + 6) + '" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="14" font-weight="700" letter-spacing="2" fill="#00D9FF">YOU</text>';
      }
    });
    /* pulse rings around center */
    var rings = '';
    for (var i = 1; i <= 3; i++) {
      rings += '<circle cx="400" cy="300" r="' + (42 + i * 22) + '" fill="none" stroke="rgba(0,217,255,' + (0.25 - i * 0.06) + ')" stroke-width="1"/>';
    }
    return wrap(
      '<defs>' +
        '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="#0a1a3a"/>' +
          '<stop offset="1" stop-color="#050505"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="600" fill="url(#' + g + ')"/>' +
      rings +
      edges +
      dots +
      /* small labels */
      '<text x="180" y="220" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="10" letter-spacing="2" fill="rgba(255,255,255,0.4)">EMAIL</text>' +
      '<text x="620" y="220" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="10" letter-spacing="2" fill="rgba(255,255,255,0.4)">CHAT</text>' +
      '<text x="180" y="460" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="10" letter-spacing="2" fill="rgba(255,255,255,0.4)">SOCIAL</text>' +
      '<text x="620" y="460" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="10" letter-spacing="2" fill="rgba(255,255,255,0.4)">CALL</text>'
    );
  }

  var TILES = {
    email: tileEmail,
    chat: tileChat,
    network: tileNetwork
  };

  function getTile(name) {
    var fn = TILES[name] || TILES.network;
    return fn();
  }

  /* ============================================================
     Render hero tiles
     ============================================================ */
  function initHeroTiles() {
    document.querySelectorAll('.ctc-hero__tile').forEach(function (tile) {
      var name = tile.getAttribute('data-tile') || 'network';
      tile.innerHTML = getTile(name);
    });
  }

  /* ============================================================
     Reveal animations
     ============================================================ */
  function initReveal() {
    var els = document.querySelectorAll('[data-ctc-reveal]');
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
    var video = document.querySelector('.ctc-hero__video');
    if (!video) return;

    function markReady() {
      video.classList.add('is-ready');
      video.classList.remove('is-missing');
    }
    function markMissing(reason) {
      if (reason) console.info('[NoExaTech Contact] Hero video unavailable:', reason);
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