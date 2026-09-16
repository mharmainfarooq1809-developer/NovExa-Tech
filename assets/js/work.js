/* ============================================================
   NoExaTech — Work page
   Filter + Case Study modal. Static, no backend.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Single source of truth for case studies ----------
     Keys must match data-project on the cards. Replace placeholder
     content with real project details when available. */
  var WORK_PROJECTS = {
    p01: {
      title: 'Project Title',
      category: 'Website Development',
      challenge: 'Placeholder — the business problem this project set out to solve.',
      approach: 'Placeholder — how NoExaTech approached the problem, scoped the work, and chose the technology.',
      solution: 'Placeholder — what was built and how it fits the business.',
      features: ['Feature placeholder', 'Feature placeholder', 'Feature placeholder', 'Feature placeholder'],
      technologies: ['Technology', 'Technology', 'Technology']
    },
    p02: {
      title: 'Project Title',
      category: 'Business Management System',
      challenge: 'Placeholder — the business problem this project set out to solve.',
      approach: 'Placeholder — how NoExaTech approached the problem, scoped the work, and chose the technology.',
      solution: 'Placeholder — what was built and how it fits the business.',
      features: ['Feature placeholder', 'Feature placeholder', 'Feature placeholder', 'Feature placeholder'],
      technologies: ['Technology', 'Technology', 'Technology']
    },
    p03: {
      title: 'Project Title',
      category: 'E-Commerce',
      challenge: 'Placeholder — the business problem this project set out to solve.',
      approach: 'Placeholder — how NoExaTech approached the problem, scoped the work, and chose the technology.',
      solution: 'Placeholder — what was built and how it fits the business.',
      features: ['Feature placeholder', 'Feature placeholder', 'Feature placeholder', 'Feature placeholder'],
      technologies: ['Technology', 'Technology', 'Technology']
    },
    p04: {
      title: 'Project Title',
      category: 'Web Application',
      challenge: 'Placeholder — the business problem this project set out to solve.',
      approach: 'Placeholder — how NoExaTech approached the problem, scoped the work, and chose the technology.',
      solution: 'Placeholder — what was built and how it fits the business.',
      features: ['Feature placeholder', 'Feature placeholder', 'Feature placeholder', 'Feature placeholder'],
      technologies: ['Technology', 'Technology', 'Technology']
    },
    p05: {
      title: 'Project Title',
      category: 'UI/UX Design',
      challenge: 'Placeholder — the business problem this project set out to solve.',
      approach: 'Placeholder — how NoExaTech approached the problem, scoped the work, and chose the technology.',
      solution: 'Placeholder — what was built and how it fits the business.',
      features: ['Feature placeholder', 'Feature placeholder', 'Feature placeholder', 'Feature placeholder'],
      technologies: ['Technology', 'Technology', 'Technology']
    },
    p06: {
      title: 'Project Title',
      category: 'Custom Software',
      challenge: 'Placeholder — the business problem this project set out to solve.',
      approach: 'Placeholder — how NoExaTech approached the problem, scoped the work, and chose the technology.',
      solution: 'Placeholder — what was built and how it fits the business.',
      features: ['Feature placeholder', 'Feature placeholder', 'Feature placeholder', 'Feature placeholder'],
      technologies: ['Technology', 'Technology', 'Technology']
    }
  };

  /* ---------- Elements ---------- */
  var grid       = document.querySelector('[data-project-grid]');
  var filters    = document.querySelectorAll('.wk-filter');
  var cards      = document.querySelectorAll('.wk-card');
  var modal      = document.getElementById('wkCaseStudy');

  /* ============================================================
     FILTER
     ============================================================ */
  function applyFilter(value) {
    if (!grid) return;
    var visible = 0;

    cards.forEach(function (card) {
      var match = value === 'all' || card.getAttribute('data-category') === value;
      if (match) {
        card.removeAttribute('hidden');
        visible++;
      } else {
        card.setAttribute('hidden', '');
      }
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
     CASE STUDY MODAL
     ============================================================ */
  if (!modal) return;

  var elTitle    = modal.querySelector('[data-wk-title]');
  var elCat      = modal.querySelector('[data-wk-cat]');
  var elChallenge= modal.querySelector('[data-wk-challenge]');
  var elApproach = modal.querySelector('[data-wk-approach]');
  var elSolution = modal.querySelector('[data-wk-solution]');
  var elFeatures = modal.querySelector('[data-wk-features]');
  var elTech     = modal.querySelector('[data-wk-tech]');
  var elNote     = modal.querySelector('[data-wk-note]');

  var lastTrigger = null;

  function openModal(id, trigger) {
    var data = WORK_PROJECTS[id];
    if (!data) return;

    elTitle.textContent     = data.title || 'Project Title';
    elCat.textContent       = data.category || 'Project';
    elChallenge.textContent = data.challenge || '—';
    elApproach.textContent  = data.approach || '—';
    elSolution.textContent  = data.solution || '—';

    /* Features */
    elFeatures.innerHTML = '';
    (data.features || []).forEach(function (f) {
      var li = document.createElement('li');
      li.textContent = f;
      elFeatures.appendChild(li);
    });

    /* Technologies */
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

  /* Triggers */
  document.querySelectorAll('[data-case-study]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      openModal(btn.getAttribute('data-case-study'), btn);
    });
  });

  /* Close controls */
  modal.querySelectorAll('[data-wk-close]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      closeModal();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  /* Focus trap */
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
})();