/* ============================================================
   NovExa Tech — Work Page
   Hero project tiles · Placeholder SVG mockups · Lazy loading ·
   Filters · Case study modal · Reveal animations · Hero video
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     SINGLE SOURCE OF TRUTH — projects
     To use a real preview image set `image` to the file path:
       image: 'assets/images/projects/union-enterprises.webp'
     Leave it as '' to use the category SVG mockup.
     ============================================================ */
  var PROJECTS = {
    p01: {
      title: 'Aniwear',
      category: 'Web Application',
      categoryLabel: 'Web App',
      image: 'assets/images/projects/aw.PNG',
      challenge: 'Keeping a wardrobe organised is difficult when clothing, outfit ideas, and care reminders live in different places.',
      approach: 'We shaped the experience around the everyday journey: add an item, group it into a wardrobe, then use the catalogue to plan what to wear.',
      solution: 'Aniwear is a calm personal wardrobe hub that turns a clothing collection into an easy-to-browse, useful digital inventory.',
      features: ['Clothing catalogue', 'Wardrobe categories', 'Outfit inspiration', 'Wear and care tracking'],
      technologies: ['Responsive web UI', 'Product design', 'Content modelling']
    },
    p02: {
      title: 'Union Enterprises',
      category: 'Business Management System',
      categoryLabel: 'System',
      image: 'assets/images/projects/ue.PNG',
      challenge: 'Trade and clearing teams need a reliable view of shipments, documents, and next actions without switching between disconnected tools.',
      approach: 'We organised the product around the operational flow, prioritising clear status information and quick access to the records teams use most.',
      solution: 'A digital trade and clearing workspace that centralises shipment visibility, documentation, and logistics coordination.',
      features: ['Shipment tracking', 'Document management', 'Clearance workflows', 'Operations dashboard'],
      technologies: ['Responsive web UI', 'Workflow design', 'Data dashboard']
    },
    p03: {
      title: 'Popcorn Hub',
      category: 'Booking Platform',
      categoryLabel: 'Booking',
      image: 'assets/images/projects/movie.PNG',
      challenge: 'Moviegoers need a quick, engaging route from discovering a film to finding a showtime and completing a booking.',
      approach: 'We used familiar cinema cues and a clear navigation structure to make showtimes, theatres, bookings, and account tools easy to reach.',
      solution: 'Popcorn Hub is a movie discovery and booking platform with a cinematic presentation and a practical customer journey.',
      features: ['Now-showing discovery', 'Showtime browsing', 'Theatre directory', 'Booking dashboard'],
      technologies: ['Responsive web UI', 'UX design', 'Booking flow design']
    },
    p04: {
      title: 'Performance Automotive Experience',
      category: 'Web Application',
      categoryLabel: 'Web App',
      image: 'assets/images/projects/taha1.jpeg',
      challenge: 'A premium automotive concept needs an experience that conveys atmosphere and aspiration while keeping key information easy to explore.',
      approach: 'We led with immersive imagery and built a focused visual hierarchy that preserves clarity across desktop and mobile screens.',
      solution: 'A high-impact automotive digital experience built to present vehicles, campaigns, and brand stories with confidence.',
      features: ['Immersive hero content', 'Responsive layouts', 'Campaign storytelling', 'Focused calls to action'],
      technologies: ['Responsive web UI', 'Visual direction', 'Interaction design']
    },
    p05: {
      title: 'Digital Product Interface',
      category: 'UI/UX Design',
      categoryLabel: 'UI/UX',
      image: 'assets/images/projects/taha2.jpeg',
      challenge: 'Complex digital products can feel difficult before a user has even found the first useful action.',
      approach: 'We established a consistent interface language, then used hierarchy, spacing, and reusable patterns to make the product easier to scan and use.',
      solution: 'A flexible UI/UX direction that gives a digital product a stronger visual system and a clearer path through its core tasks.',
      features: ['Interface system', 'Responsive screens', 'Component patterns', 'User-flow refinement'],
      technologies: ['UI design', 'UX design', 'Design system']
    },
    p06: {
      title: 'Custom Operations Platform',
      category: 'Custom Software',
      categoryLabel: 'Software',
      image: 'assets/images/projects/taha5.jpeg',
      challenge: 'Growing operations need software that reflects the way teams actually work rather than forcing them into generic processes.',
      approach: 'We mapped the key operational touchpoints and translated them into a practical interface with room to evolve as requirements change.',
      solution: 'A tailored software concept that brings key operational tasks together in one purposeful, scalable workspace.',
      features: ['Tailored workflows', 'Centralised workspace', 'Role-aware views', 'Scalable information structure'],
      technologies: ['Product strategy', 'UX design', 'Custom software architecture']
    }
  };

  /* ============================================================
     SVG MOCKUPS — used when a project has no real image yet
     ============================================================ */
  var uid = 0;
  function nextId() { return 'wk' + (++uid); }

  function wrap(inner) {
    return '<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  }

  function browserMock(accent) {
    var g = nextId();
    return wrap(
      '<defs>' +
        '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="#0a1a3a"/>' +
          '<stop offset="1" stop-color="#050505"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="500" fill="url(#' + g + ')"/>' +
      '<rect x="80" y="60" width="640" height="380" rx="12" fill="#0c0c0c" stroke="' + accent + '" stroke-opacity="0.35" stroke-width="1.5"/>' +
      '<rect x="80" y="60" width="640" height="30" rx="12" fill="#181818"/>' +
      '<circle cx="104" cy="75" r="4" fill="#00A8FF"/>' +
      '<circle cx="120" cy="75" r="4" fill="#0066FF"/>' +
      '<circle cx="136" cy="75" r="4" fill="#2a2a2a"/>' +
      '<rect x="120" y="120" width="260" height="20" rx="4" fill="#EDF3FF" opacity="0.9"/>' +
      '<rect x="120" y="150" width="180" height="12" rx="3" fill="' + accent + '" opacity="0.7"/>' +
      '<rect x="120" y="180" width="560" height="180" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>' +
      '<rect x="140" y="200" width="80" height="80" rx="6" fill="rgba(0,168,255,0.2)"/>' +
      '<rect x="240" y="210" width="200" height="10" rx="3" fill="rgba(255,255,255,0.4)"/>' +
      '<rect x="240" y="230" width="160" height="8" rx="3" fill="rgba(255,255,255,0.15)"/>' +
      '<rect x="240" y="248" width="180" height="8" rx="3" fill="rgba(255,255,255,0.15)"/>'
    );
  }

  function dashboardMock(accent) {
    var g = nextId();
    /* chart bars */
    var bars = '';
    var heights = [40, 70, 55, 90, 65, 105, 80];
    heights.forEach(function (h, i) {
      bars += '<rect x="' + (200 + i * 40) + '" y="' + (360 - h) + '" width="24" height="' + h + '" rx="4" fill="' + (i === 5 ? accent : 'rgba(0,168,255,0.35)') + '"/>';
    });

    return wrap(
      '<defs>' +
        '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="#0a1a3a"/>' +
          '<stop offset="1" stop-color="#050505"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="500" fill="url(#' + g + ')"/>' +
      /* sidebar */
      '<rect x="60" y="60" width="120" height="380" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>' +
      '<circle cx="80" cy="90" r="6" fill="' + accent + '"/>' +
      '<rect x="94" y="86" width="60" height="8" rx="3" fill="rgba(255,255,255,0.5)"/>' +
      '<rect x="80" y="130" width="80" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>' +
      '<rect x="80" y="150" width="60" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>' +
      '<rect x="80" y="170" width="70" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>' +
      '<rect x="80" y="190" width="55" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>' +
      /* top bar */
      '<rect x="200" y="60" width="540" height="50" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>' +
      '<rect x="220" y="80" width="120" height="10" rx="4" fill="rgba(255,255,255,0.5)"/>' +
      '<rect x="680" y="76" width="40" height="20" rx="10" fill="' + accent + '" opacity="0.7"/>' +
      /* chart area */
      '<rect x="200" y="130" width="540" height="250" rx="12" fill="rgba(0,168,255,0.03)" stroke="rgba(0,168,255,0.15)"/>' +
      bars +
      /* stat tiles */
      '<rect x="200" y="395" width="170" height="45" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>' +
      '<rect x="385" y="395" width="170" height="45" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>' +
      '<rect x="570" y="395" width="170" height="45" rx="8" fill="rgba(0,168,255,0.08)" stroke="rgba(0,168,255,0.3)"/>'
    );
  }

  function gridMock(accent) {
    var g = nextId();
    var cards = '';
    for (var r = 0; r < 2; r++) {
      for (var c = 0; c < 3; c++) {
        var x = 100 + c * 210;
        var y = 100 + r * 190;
        cards +=
          '<rect x="' + x + '" y="' + y + '" width="180" height="160" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>' +
          '<rect x="' + (x + 14) + '" y="' + (y + 14) + '" width="152" height="80" rx="6" fill="rgba(0,168,255,0.15)"/>' +
          '<rect x="' + (x + 14) + '" y="' + (y + 106) + '" width="110" height="10" rx="3" fill="rgba(255,255,255,0.5)"/>' +
          '<rect x="' + (x + 14) + '" y="' + (y + 124) + '" width="80" height="10" rx="3" fill="' + accent + '"/>';
      }
    }
    return wrap(
      '<defs>' +
        '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="#0a1a3a"/>' +
          '<stop offset="1" stop-color="#050505"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="500" fill="url(#' + g + ')"/>' +
      cards
    );
  }

  function wireframeMock(accent) {
    var g = nextId();
    return wrap(
      '<defs>' +
        '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="#0a1a3a"/>' +
          '<stop offset="1" stop-color="#050505"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="500" fill="url(#' + g + ')"/>' +
      /* mobile frame */
      '<rect x="100" y="60" width="180" height="380" rx="20" fill="rgba(255,255,255,0.03)" stroke="' + accent + '" stroke-opacity="0.4" stroke-width="1.5"/>' +
      '<rect x="140" y="80" width="100" height="8" rx="4" fill="rgba(255,255,255,0.3)"/>' +
      '<rect x="120" y="110" width="140" height="120" rx="8" fill="rgba(0,168,255,0.15)"/>' +
      '<rect x="120" y="250" width="140" height="10" rx="3" fill="rgba(255,255,255,0.4)"/>' +
      '<rect x="120" y="270" width="100" height="10" rx="3" fill="rgba(255,255,255,0.15)"/>' +
      '<rect x="120" y="290" width="120" height="10" rx="3" fill="rgba(255,255,255,0.15)"/>' +
      '<rect x="120" y="330" width="80" height="30" rx="15" fill="' + accent + '"/>' +
      /* desktop frame */
      '<rect x="320" y="100" width="380" height="300" rx="12" fill="rgba(255,255,255,0.03)" stroke="' + accent + '" stroke-opacity="0.4" stroke-width="1.5"/>' +
      '<rect x="320" y="100" width="380" height="24" rx="12" fill="#181818"/>' +
      '<rect x="340" y="145" width="180" height="14" rx="4" fill="rgba(255,255,255,0.5)"/>' +
      '<rect x="340" y="170" width="120" height="10" rx="3" fill="rgba(0,168,255,0.5)"/>' +
      '<rect x="340" y="200" width="340" height="120" rx="8" fill="rgba(0,168,255,0.12)"/>' +
      '<rect x="340" y="340" width="80" height="28" rx="14" fill="' + accent + '"/>'
    );
  }

  /* map project to a mock based on category */
  function mockFor(category) {
    var c = (category || '').toLowerCase();
    if (c.indexOf('system') > -1 || c.indexOf('management') > -1 || c.indexOf('software') > -1) return dashboardMock('#00A8FF');
    if (c.indexOf('commerce') > -1) return gridMock('#00D9FF');
    if (c.indexOf('ui') > -1 || c.indexOf('ux') > -1 || c.indexOf('design') > -1) return wireframeMock('#0066FF');
    if (c.indexOf('app') > -1) return dashboardMock('#00D9FF');
    return browserMock('#00A8FF');
  }

  /* ============================================================
     Lazy loader
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
     Hero tiles — insert SVG behind image
     ============================================================ */
  function initHeroTiles() {
    document.querySelectorAll('.wk-hero__tile').forEach(function (tile) {
      var name = tile.getAttribute('data-tile');
      var img = tile.querySelector('img');
      var svg = name === 'system' ? dashboardMock('#00A8FF')
              : name === 'ecommerce' ? gridMock('#00D9FF')
              : browserMock('#00A8FF');
      var holder = document.createElement('div');
      holder.className = 'wk-hero__tile-fallback';
      holder.innerHTML = svg;
      tile.insertBefore(holder, img);
    });
  }

  /* ============================================================
     Card placeholder SVGs
     ============================================================ */
  function initCardPlaceholders() {
    document.querySelectorAll('.wk-card').forEach(function (card) {
      var id = card.getAttribute('data-project');
      var proj = PROJECTS[id];
      var holder = card.querySelector('.wk-card__placeholder');
      if (!holder || !proj) return;
      holder.innerHTML = mockFor(proj.category);

      var image = card.querySelector('[data-lazy]');
      var title = card.querySelector('.wk-card__title');
      var category = card.querySelector('.wk-card__cat');
      var description = card.querySelector('.wk-card__desc');
      var tech = card.querySelector('.wk-card__tech');
      if (image && proj.image) {
        image.setAttribute('data-lazy', proj.image);
        image.alt = proj.title + ' preview';
      }
      if (title) title.textContent = proj.title;
      if (category) category.textContent = proj.category;
      if (description) description.textContent = proj.solution;
      if (tech) {
        tech.innerHTML = '';
        proj.technologies.forEach(function (item) {
          var tag = document.createElement('span');
          tag.textContent = item;
          tech.appendChild(tag);
        });
      }
    });
  }

  /* ============================================================
     Filters
     ============================================================ */
  var grid    = document.querySelector('[data-project-grid]');
  var filters = document.querySelectorAll('.wk-filter');

  function applyFilter(value) {
    if (!grid) return;
    var cards = grid.querySelectorAll('.wk-card');
    var visible = 0;
    cards.forEach(function (card) {
      var match = value === 'all' || card.getAttribute('data-category') === value;
      if (match) { card.removeAttribute('hidden'); visible++; }
      else { card.setAttribute('hidden', ''); }
    });
    if (visible === 0) grid.setAttribute('data-empty', '');
    else grid.removeAttribute('data-empty');
    filters.forEach(function (btn) {
      var active = btn.getAttribute('data-filter') === value;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter(btn.getAttribute('data-filter') || 'all');
    });
  });

  /* ============================================================
     Case study modal
     ============================================================ */
  var modal = document.getElementById('wkCaseStudy');
  if (modal) {
    var elTitle    = modal.querySelector('[data-wk-title]');
    var elCat      = modal.querySelector('[data-wk-cat]');
    var elChallenge= modal.querySelector('[data-wk-challenge]');
    var elApproach = modal.querySelector('[data-wk-approach]');
    var elSolution = modal.querySelector('[data-wk-solution]');
    var elFeatures = modal.querySelector('[data-wk-features]');
    var elTech     = modal.querySelector('[data-wk-tech]');

    var lastTrigger = null;

    function openModal(id, trigger) {
      var data = PROJECTS[id];
      if (!data) return;

      elTitle.textContent     = data.title || 'Project Title';
      elCat.textContent       = data.category || 'Project';
      elChallenge.textContent = data.challenge || '—';
      elApproach.textContent  = data.approach || '—';
      elSolution.textContent  = data.solution || '—';

      elFeatures.innerHTML = '';
      (data.features || []).forEach(function (f) {
        var li = document.createElement('li');
        li.textContent = f;
        elFeatures.appendChild(li);
      });

      elTech.innerHTML = '';
      (data.technologies || []).forEach(function (t) {
        var span = document.createElement('span');
        span.textContent = t;
        elTech.appendChild(span);
      });

      lastTrigger = trigger || null;

      modal.removeAttribute('hidden');
      void modal.offsetWidth;
      modal.classList.add('is-open');
      document.body.classList.add('wk-modal-open');

      setTimeout(function () {
        var close = modal.querySelector('.wk-modal__close');
        if (close) close.focus();
      }, 60);
    }

    function closeModal() {
      modal.classList.remove('is-open');
      document.body.classList.remove('wk-modal-open');
      setTimeout(function () { modal.setAttribute('hidden', ''); }, 320);
      if (lastTrigger && typeof lastTrigger.focus === 'function') {
        try { lastTrigger.focus(); } catch (_) {}
      }
    }

    document.querySelectorAll('[data-case-study]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        openModal(btn.getAttribute('data-case-study'), btn);
      });
    });

    modal.querySelectorAll('[data-wk-close]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        closeModal();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !modal.classList.contains('is-open')) return;
      var focusables = modal.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      var first = focusables[0];
      var last  = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ============================================================
     Reveal animations
     ============================================================ */
  function initReveal() {
    var els = document.querySelectorAll('[data-wk-reveal]');
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
     Hero video
     ============================================================ */
  function initHeroVideo() {
    var video = document.querySelector('.wk-hero__video');
    if (!video) return;

    function markReady() {
      video.classList.add('is-ready');
      video.classList.remove('is-missing');
    }
    function markMissing(reason) {
      if (reason) console.info('[NovExa Tech Work] Hero video unavailable:', reason);
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
  initCardPlaceholders();
  lazyLoad(document);
  initReveal();
  initHeroVideo();
})();
