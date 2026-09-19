/* ============================================================
   NoExaTech — Services Page
   Floating hero tiles · Reveal animations · Hero video
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     SVG TILE MOCKUPS
     Three package preview tiles: web / e-commerce / design
     ============================================================ */
  var uid = 0;
  function nextId() { return 'sv' + (++uid); }

  function wrap(inner) {
    return '<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  }

  var TILES = {
    /* Website development — browser window with hero */
    web: function () {
      var g = nextId();
      return wrap(
        '<defs>' +
          '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0" stop-color="#0a1e42"/>' +
            '<stop offset="1" stop-color="#050505"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect width="800" height="600" fill="url(#' + g + ')"/>' +
        '<g opacity="0.06" stroke="#fff" stroke-width="1">' +
          '<path d="M0 150 H800 M0 300 H800 M0 450 H800"/>' +
          '<path d="M200 0 V600 M400 0 V600 M600 0 V600"/>' +
        '</g>' +
        /* browser chrome */
        '<rect x="100" y="80" width="600" height="440" rx="12" fill="#0c0c0c" stroke="rgba(0,168,255,0.35)" stroke-width="1.5"/>' +
        '<rect x="100" y="80" width="600" height="34" rx="12" fill="#181818"/>' +
        '<rect x="100" y="104" width="600" height="10" fill="#181818"/>' +
        '<circle cx="128" cy="97" r="5" fill="#00A8FF"/>' +
        '<circle cx="146" cy="97" r="5" fill="#0066FF"/>' +
        '<circle cx="164" cy="97" r="5" fill="#2a2a2a"/>' +
        /* hero */
        '<rect x="140" y="150" width="300" height="24" rx="4" fill="#EDF3FF" opacity="0.95"/>' +
        '<rect x="140" y="184" width="220" height="18" rx="4" fill="#EDF3FF" opacity="0.55"/>' +
        '<rect x="140" y="220" width="180" height="10" rx="3" fill="#00A8FF" opacity="0.75"/>' +
        '<rect x="140" y="250" width="120" height="34" rx="17" fill="#0066FF"/>' +
        '<rect x="280" y="250" width="110" height="34" rx="17" fill="none" stroke="rgba(255,255,255,0.25)"/>' +
        /* right panel */
        '<rect x="480" y="150" width="190" height="132" rx="10" fill="rgba(0,168,255,0.12)" stroke="rgba(0,168,255,0.3)"/>' +
        '<rect x="500" y="174" width="150" height="12" rx="3" fill="rgba(0,168,255,0.5)"/>' +
        '<rect x="500" y="196" width="120" height="8" rx="3" fill="rgba(255,255,255,0.18)"/>' +
        '<rect x="500" y="212" width="140" height="8" rx="3" fill="rgba(255,255,255,0.18)"/>' +
        '<rect x="500" y="228" width="100" height="8" rx="3" fill="rgba(255,255,255,0.18)"/>' +
        '<rect x="500" y="250" width="70" height="20" rx="10" fill="#00A8FF" opacity="0.7"/>' +
        /* features row */
        '<rect x="140" y="320" width="172" height="90" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>' +
        '<rect x="324" y="320" width="172" height="90" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>' +
        '<rect x="508" y="320" width="172" height="90" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>' +
        '<circle cx="162" cy="342" r="6" fill="#00A8FF" opacity="0.8"/>' +
        '<rect x="178" y="338" width="70" height="8" rx="3" fill="rgba(255,255,255,0.4)"/>' +
        '<circle cx="346" cy="342" r="6" fill="#00A8FF" opacity="0.8"/>' +
        '<rect x="362" y="338" width="70" height="8" rx="3" fill="rgba(255,255,255,0.4)"/>' +
        '<circle cx="530" cy="342" r="6" fill="#00A8FF" opacity="0.8"/>' +
        '<rect x="546" y="338" width="70" height="8" rx="3" fill="rgba(255,255,255,0.4)"/>' +
        /* footer strip */
        '<rect x="140" y="440" width="540" height="50" rx="10" fill="rgba(0,168,255,0.05)" stroke="rgba(0,168,255,0.2)"/>'
      );
    },

    /* E-commerce — product grid with cart */
    ecom: function () {
      var g = nextId();
      var cards = '';
      for (var r = 0; r < 2; r++) {
        for (var c = 0; c < 3; c++) {
          var x = 120 + c * 190;
          var y = 150 + r * 190;
          cards +=
            '<rect x="' + x + '" y="' + y + '" width="170" height="170" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>' +
            '<rect x="' + (x + 14) + '" y="' + (y + 14) + '" width="142" height="90" rx="6" fill="rgba(0,168,255,0.15)"/>' +
            '<rect x="' + (x + 14) + '" y="' + (y + 116) + '" width="100" height="10" rx="3" fill="rgba(255,255,255,0.5)"/>' +
            '<rect x="' + (x + 14) + '" y="' + (y + 134) + '" width="80" height="10" rx="3" fill="#00A8FF"/>' +
            '<circle cx="' + (x + 148) + '" cy="' + (y + 130) + '" r="14" fill="#0066FF"/>' +
            '<path d="M' + (x + 143) + ' ' + (y + 130) + ' h10 m-5 -5 v10" stroke="#FFFFFF" stroke-width="1.5" fill="none"/>';
        }
      }

      return wrap(
        '<defs>' +
          '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0" stop-color="#0a1e42"/>' +
            '<stop offset="1" stop-color="#050505"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect width="800" height="600" fill="url(#' + g + ')"/>' +
        /* top bar */
        '<rect x="60" y="60" width="680" height="60" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>' +
        '<text x="90" y="98" font-family="Space Grotesk, sans-serif" font-size="14" font-weight="700" letter-spacing="3" fill="#00A8FF">STORE</text>' +
        '<rect x="500" y="80" width="60" height="20" rx="10" fill="none" stroke="rgba(255,255,255,0.15)"/>' +
        '<rect x="580" y="80" width="60" height="20" rx="10" fill="none" stroke="rgba(255,255,255,0.15)"/>' +
        '<rect x="660" y="78" width="60" height="24" rx="12" fill="#0066FF"/>' +
        /* product grid */
        cards
      );
    },

    /* Design — color swatches + typography panel */
    design: function () {
      var g = nextId();
      return wrap(
        '<defs>' +
          '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0" stop-color="#0a1e42"/>' +
            '<stop offset="1" stop-color="#050505"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect width="800" height="600" fill="url(#' + g + ')"/>' +
        /* palette panel */
        '<rect x="80" y="80" width="320" height="440" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>' +
        '<text x="110" y="120" font-family="Space Grotesk, sans-serif" font-size="12" letter-spacing="3" fill="rgba(255,255,255,0.5)">PALETTE</text>' +
        /* color swatches */
        '<rect x="110" y="150" width="80" height="80" rx="10" fill="#0066FF"/>' +
        '<rect x="210" y="150" width="80" height="80" rx="10" fill="#00A8FF"/>' +
        '<rect x="310" y="150" width="80" height="80" rx="10" fill="#00D9FF"/>' +
        '<rect x="110" y="250" width="80" height="80" rx="10" fill="#EDF3FF"/>' +
        '<rect x="210" y="250" width="80" height="80" rx="10" fill="#0A0A0A" stroke="rgba(255,255,255,0.15)"/>' +
        '<rect x="310" y="250" width="80" height="80" rx="10" fill="rgba(255,255,255,0.15)"/>' +
        /* typography sample */
        '<text x="110" y="380" font-family="Georgia, serif" font-size="42" font-style="italic" fill="#FFFFFF">Aa</text>' +
        '<text x="200" y="380" font-family="Space Grotesk, sans-serif" font-size="42" font-weight="700" fill="#FFFFFF">Aa</text>' +
        '<rect x="110" y="410" width="280" height="10" rx="3" fill="rgba(255,255,255,0.2)"/>' +
        '<rect x="110" y="430" width="240" height="10" rx="3" fill="rgba(255,255,255,0.15)"/>' +
        '<rect x="110" y="450" width="200" height="10" rx="3" fill="rgba(255,255,255,0.15)"/>' +
        '<rect x="110" y="480" width="120" height="30" rx="15" fill="#0066FF"/>' +
        /* second panel */
        '<rect x="420" y="80" width="300" height="440" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>' +
        '<text x="450" y="120" font-family="Space Grotesk, sans-serif" font-size="12" letter-spacing="3" fill="rgba(255,255,255,0.5)">SOCIAL</text>' +
        /* social post mockups */
        '<rect x="450" y="150" width="240" height="140" rx="10" fill="rgba(0,168,255,0.12)" stroke="rgba(0,168,255,0.3)"/>' +
        '<rect x="466" y="172" width="60" height="8" rx="3" fill="#00A8FF"/>' +
        '<rect x="466" y="192" width="180" height="14" rx="3" fill="rgba(255,255,255,0.8)"/>' +
        '<rect x="466" y="216" width="140" height="10" rx="3" fill="rgba(255,255,255,0.3)"/>' +
        '<rect x="466" y="252" width="80" height="22" rx="11" fill="#0066FF"/>' +
        '<rect x="450" y="308" width="115" height="140" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>' +
        '<rect x="575" y="308" width="115" height="140" rx="10" fill="rgba(0,217,255,0.15)" stroke="rgba(0,217,255,0.35)"/>' +
        '<circle cx="508" cy="360" r="18" fill="rgba(0,168,255,0.4)"/>' +
        '<circle cx="633" cy="360" r="18" fill="rgba(0,217,255,0.5)"/>' +
        '<rect x="470" y="400" width="80" height="8" rx="3" fill="rgba(255,255,255,0.3)"/>' +
        '<rect x="595" y="400" width="80" height="8" rx="3" fill="rgba(255,255,255,0.5)"/>' +
        '<rect x="470" y="418" width="60" height="8" rx="3" fill="rgba(255,255,255,0.2)"/>' +
        '<rect x="595" y="418" width="60" height="8" rx="3" fill="rgba(255,255,255,0.3)"/>'
      );
    }
  };

  function getTile(name) {
    var fn = TILES[name] || TILES.web;
    return fn();
  }

  /* ============================================================
     Render hero tiles
     ============================================================ */
  function initHeroTiles() {
    document.querySelectorAll('.sv-hero__tile').forEach(function (tile) {
      var name = tile.getAttribute('data-tile') || 'web';
      tile.innerHTML = getTile(name);
    });
  }

  /* ============================================================
     Reveal animations
     ============================================================ */
  function initReveal() {
    var els = document.querySelectorAll('[data-sv-reveal]');
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
    var video = document.querySelector('.sv-hero__video');
    if (!video) return;

    function markReady() {
      video.classList.add('is-ready');
      video.classList.remove('is-missing');
    }
    function markMissing(reason) {
      if (reason) console.info('[NoExaTech Services] Hero video unavailable:', reason);
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