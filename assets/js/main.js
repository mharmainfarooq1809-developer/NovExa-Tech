/* ============================================================
   NovExa Tech — Main Script
   Header, mobile menu, scroll progress, back-to-top, stats,
   socials, WhatsApp forms (Contact + Start a Project).
   Uses Lenis when available (exposed by animations.js).
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const toTopButton = document.getElementById('toTop');
  const loader = document.getElementById('loader');
  const scrollProgressBar = document.getElementById('scrollProgress');
  const yearNode = document.querySelector('[data-year]');

  if (yearNode) yearNode.textContent = new Date().getFullYear();

  /* ---------- Shared scroll value ----------
     Prefer Lenis's internal scroll value while it's driving — this is
     the source of truth and avoids the "one frame late" feel. */
  const getScrollY = () =>
    (window.__noexaLenis && typeof window.__noexaLenis.scroll === 'number')
      ? window.__noexaLenis.scroll
      : window.scrollY;

  /* ---------- Header / progress / mobile menu ---------- */
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', getScrollY() > 20);
  };

  const updateProgress = () => {
    if (!scrollProgressBar) return;
    const scrollTop = getScrollY();
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
    scrollProgressBar.style.width = `${percent}%`;
  };

  const toggleMobileMenu = () => {
    if (!navToggle || !mobileMenu) return;
    const isOpen = mobileMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  };

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', toggleMobileMenu);
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    });
  }

  /* ============================================================
     Stats — supports two markup patterns:
       • Homepage  → .ix-stats__grid  →  .ix-stats__item  / .ix-stat__value
       • Other     → [data-stats]     →  .stat            / .stat__value
     ============================================================ */
  const renderStats = () => {
    const container = document.querySelector('[data-stats]');
    const config = window.siteConfig?.stats;
    if (!container || !config) return;

    /* Detect which markup the current page expects */
    const isHomepage = container.classList.contains('ix-stats__grid');

    if (isHomepage) {
      container.innerHTML = config.map(item => `
        <div class="ix-stats__item">
          <p class="ix-stat__value">${item.value}</p>
          <p class="ix-stat__label">${item.label}</p>
        </div>
      `).join('');
    } else {
      container.innerHTML = config.map(item => `
        <div class="stat">
          <p class="stat__value">${item.value}</p>
          <p class="stat__label">${item.label}</p>
        </div>
      `).join('');
    }
  };

  /* ---------- Footer socials ---------- */
  const renderSocials = () => {
    const socialList = document.querySelector('[data-social]');
    const socials = window.siteConfig?.socials;
    if (!socialList || !socials) return;
    socialList.innerHTML = socials.map(item => `
      <li><a href="${item.href}" target="_blank" rel="noreferrer" aria-label="${item.label}">${item.label}</a></li>
    `).join('');
  };

  /* ---------- Contact page social pills (reads siteConfig.socials) ---------- */
  const renderSocialPills = () => {
    const host = document.querySelector('[data-social-pills]');
    const socials = window.siteConfig?.socials;
    if (!host || !Array.isArray(socials)) return;

    /* Map short labels to full names */
    const NAME_MAP = {
      IG: 'Instagram',
      LI: 'LinkedIn',
      TT: 'TikTok',
      X:  'X',
      WA: 'WhatsApp'
    };

    /* Skip WhatsApp on the contact page (it has its own dedicated block) */
    host.innerHTML = socials
      .filter((s) => s.label !== 'WA')
      .map((s) => {
        const name = NAME_MAP[s.label] || s.label;
        return `<a href="${s.href}" target="_blank" rel="noopener noreferrer">${name}</a>`;
      })
      .join('');
  };

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ============================================================
     Shared helpers for WhatsApp forms
     ============================================================ */
  const cfgContact = window.siteConfig?.contact || {};
  const waNumber  = String(cfgContact.whatsapp || '').replace(/\D/g, '');
  const waDisplay = cfgContact.whatsappDisplay || (waNumber ? `+${waNumber}` : '');

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlRe   = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;

  const cleanLine = (s) => String(s || '').replace(/[\u0000-\u001F\u007F]/g, '').trim();
  const cleanBlock = (s) => String(s || '').replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n').trim();

  const setFieldError = (field, message) => {
    const wrap = field.closest('.field');
    if (!wrap) return;
    wrap.classList.add('has-error');
    const err = wrap.querySelector('.field-error');
    if (err) { err.textContent = message; err.hidden = false; }
    field.setAttribute('aria-invalid', 'true');
  };

  const clearFieldError = (field) => {
    const wrap = field.closest('.field');
    if (!wrap) return;
    wrap.classList.remove('has-error');
    const err = wrap.querySelector('.field-error');
    if (err) { err.textContent = ''; err.hidden = true; }
    field.removeAttribute('aria-invalid');
  };

  /* ---------- Populate any [data-whatsapp-link] ---------- */
  const initWhatsAppLinks = () => {
    if (!waNumber) return;
    document.querySelectorAll('[data-whatsapp-link]').forEach((el) => {
      const customMsg = el.getAttribute('data-whatsapp-message');
      const base = `https://wa.me/${waNumber}`;
      el.href = customMsg ? `${base}?text=${encodeURIComponent(customMsg)}` : base;
      el.target = '_blank';
      el.rel = 'noopener';

      /* Only replace text if this is a plain inline link (not a card / button) */
      const isCard = el.classList.contains('ctc-action') || el.classList.contains('ctc-path');
      if (!isCard && !el.textContent.trim()) {
        el.textContent = waDisplay;
      }
    });
  };

  /* ---------- Button loading state helper ---------- */
  const runWithLoading = (btn, action) => {
    if (!btn) { action(); return; }
    const original = btn.textContent;
    btn.classList.add('is-loading');
    btn.disabled = true;
    btn.textContent = 'Opening WhatsApp…';
    try { action(); } catch (err) { console.error(err); }
    setTimeout(() => {
      btn.classList.remove('is-loading');
      btn.disabled = false;
      btn.textContent = original;
    }, 1200);
  };

  /* ---------- Open WhatsApp with message ---------- */
  const openWhatsApp = (message, btn) => {
    if (!waNumber) {
      console.warn('[NovExa Tech] WhatsApp number is not configured in siteConfig.contact.whatsapp');
      return;
    }
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    runWithLoading(btn, () => window.open(url, '_blank', 'noopener'));
  };

  /* ============================================================
     Form A — Contact page (#consultationForm)
     ============================================================ */
  const PROJECT_TYPES_CONTACT = new Set([
    'Website Development','Web Application','Software Development',
    'Business Management System','Mobile App','UI/UX Design',
    'Digital Marketing','Creative Content & Video','Automation',
    'Custom Technology Solution','Other'
  ]);

  const validateConsultation = (form) => {
    const nameEl  = form.querySelector('#name');
    const emailEl = form.querySelector('#email');
    const typeEl  = form.querySelector('#projectType');
    const msgEl   = form.querySelector('#message');
    [nameEl, emailEl, typeEl, msgEl].forEach(clearFieldError);

    let firstInvalid = null;
    const check = (field, message) => {
      if (message) {
        setFieldError(field, message);
        firstInvalid = firstInvalid || field;
      }
    };

    const name = cleanLine(nameEl.value);
    if (!name) check(nameEl, 'Please enter your name.');
    else if (name.length < 2) check(nameEl, 'Name must be at least 2 characters.');

    const email = cleanLine(emailEl.value);
    if (!email) check(emailEl, 'Please enter your email.');
    else if (!emailRe.test(email)) check(emailEl, 'Please enter a valid email address.');

    const type = typeEl.value.trim();
    if (!type) check(typeEl, 'Please select a project type.');
    else if (!PROJECT_TYPES_CONTACT.has(type)) check(typeEl, 'Please choose a valid project type.');

    const msg = cleanBlock(msgEl.value);
    if (!msg) check(msgEl, 'Please tell us about the project.');
    else if (msg.length < 10) check(msgEl, 'Please provide a few more details (10+ characters).');

    return firstInvalid;
  };

  const buildContactMessage = ({ name, email, projectType, details }) =>
    'Hello NovExa Tech,\n\n' +
    "I'd like to request a consultation for a project.\n\n" +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Project Type: ${projectType}\n\n` +
    `Project Details:\n${details}\n\n` +
    'Looking forward to discussing this with you.\n\n' +
    `Regards,\n${name}`;

  const initConsultationForm = () => {
    const form = document.getElementById('consultationForm');
    if (!form) return;
    form.setAttribute('novalidate', 'novalidate');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstInvalid = validateConsultation(form);
      if (firstInvalid) { firstInvalid.focus(); return; }

      const data = {
        name:        cleanLine(form.querySelector('#name').value),
        email:       cleanLine(form.querySelector('#email').value),
        projectType: form.querySelector('#projectType').value.trim(),
        details:     cleanBlock(form.querySelector('#message').value)
      };

      openWhatsApp(buildContactMessage(data), form.querySelector('[data-submit]'));
    });
  };

  /* ============================================================
     Form B — Start a Project page (#projectBriefForm)
     ============================================================ */
  const PROJECT_TYPES_BRIEF = new Set([
    'Website','Web Application','Software','Business Management System',
    'Mobile App','UI/UX Design','Digital Marketing','Creative Content / Video',
    'Automation','Custom Technology Solution','Other'
  ]);

  const validateProjectBrief = (form) => {
    const fullNameEl   = form.querySelector('#fullName');
    const emailEl      = form.querySelector('#emailAddress');
    const waEl         = form.querySelector('#whatsappNumber');
    const typeEl       = form.querySelector('#projectType');
    const detailsEl    = form.querySelector('#projectDetails');
    const countryEl    = form.querySelector('#country');
    const urlEl        = form.querySelector('#websiteUrl');

    [fullNameEl, emailEl, waEl, typeEl, detailsEl, countryEl, urlEl].forEach(clearFieldError);

    let firstInvalid = null;
    const check = (field, message) => {
      if (message) {
        setFieldError(field, message);
        firstInvalid = firstInvalid || field;
      }
    };

    const fullName = cleanLine(fullNameEl.value);
    if (!fullName) check(fullNameEl, 'Please enter your full name.');
    else if (fullName.length < 2) check(fullNameEl, 'Name must be at least 2 characters.');

    const email = cleanLine(emailEl.value);
    if (!email) check(emailEl, 'Please enter your email.');
    else if (!emailRe.test(email)) check(emailEl, 'Please enter a valid email address.');

    const waRaw = cleanLine(waEl.value);
    if (!waRaw) check(waEl, 'Please enter your WhatsApp number.');
    else {
      const digits = waRaw.replace(/\D/g, '');
      if (digits.length < 10) check(waEl, 'Number looks too short. Include your country code.');
      else if (digits.length > 15) check(waEl, 'Number looks too long.');
    }

    const type = typeEl.value.trim();
    if (!type) check(typeEl, 'Please select what you need.');
    else if (!PROJECT_TYPES_BRIEF.has(type)) check(typeEl, 'Please choose a valid project type.');

    const details = cleanBlock(detailsEl.value);
    if (!details) check(detailsEl, 'Please tell us about your project.');
    else if (details.length < 10) check(detailsEl, 'Please provide a few more details (10+ characters).');

    const country = cleanLine(countryEl.value);
    if (country && country.length < 2) check(countryEl, 'Please enter a valid country.');

    const url = cleanLine(urlEl.value);
    if (url && !urlRe.test(url)) check(urlEl, 'Please enter a valid URL.');

    return firstInvalid;
  };

  const buildBriefMessage = (d) => {
    const lines = [];
    const push = (label, value) => {
      const v = String(value || '').trim();
      if (!v) return;
      lines.push(label + ':', v, '');
    };

    lines.push('Hello NovExa Tech,', '', "I'd like to discuss a project.", '');

    push('NAME', d.fullName);
    push('BUSINESS', d.companyName);
    push('EMAIL', d.emailAddress);
    push('WHATSAPP', d.whatsappNumber);
    push('COUNTRY', d.country);

    push('PROJECT', d.projectType);
    push('PROJECT DETAILS', d.projectDetails);
    push('PROBLEM TO SOLVE', d.projectProblem);
    push('TARGET AUDIENCE', d.targetAudience);

    push('BUDGET', d.estimatedBudget);
    push('TIMELINE', d.desiredTimeline);

    push('EXISTING WEBSITE', d.hasWebsite);
    push('WEBSITE URL', d.websiteUrl);
    push('ADDITIONAL INFORMATION', d.additionalInfo);

    lines.push('Thank you.');
    return lines.join('\n');
  };

  const initProjectBriefForm = () => {
    const form = document.getElementById('projectBriefForm');
    if (!form) return;
    form.setAttribute('novalidate', 'novalidate');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const firstInvalid = validateProjectBrief(form);
      if (firstInvalid) { firstInvalid.focus(); return; }

      const get = (id) => {
        const el = form.querySelector('#' + id);
        return el ? el.value : '';
      };
      const radioEl = form.querySelector('input[name="hasWebsite"]:checked');

      const data = {
        fullName:        cleanLine(get('fullName')),
        companyName:     cleanLine(get('companyName')),
        emailAddress:    cleanLine(get('emailAddress')),
        whatsappNumber:  cleanLine(get('whatsappNumber')),
        country:         cleanLine(get('country')),
        projectType:     get('projectType').trim(),
        projectDetails:  cleanBlock(get('projectDetails')),
        projectProblem:  cleanBlock(get('projectProblem')),
        targetAudience:  cleanBlock(get('targetAudience')),
        estimatedBudget: get('estimatedBudget').trim(),
        desiredTimeline: get('desiredTimeline').trim(),
        hasWebsite:      radioEl ? radioEl.value : '',
        websiteUrl:      cleanLine(get('websiteUrl')),
        additionalInfo:  cleanBlock(get('additionalInfo'))
      };

      openWhatsApp(buildBriefMessage(data), form.querySelector('[data-submit]'));
    });
  };

  /* ---------- Init everything ---------- */
  renderStats();
  renderSocials();
  renderSocialPills();
  initWhatsAppLinks();
  initConsultationForm();
  initProjectBriefForm();
  updateHeader();
  updateProgress();

  /* ---------- Scroll listeners ----------
     Native `scroll` doesn't fire reliably while Lenis is driving —
     subscribe to Lenis's own event when it exists. */
  const onScroll = () => {
    updateHeader();
    updateProgress();
    if (!toTopButton) return;
    toTopButton.classList.toggle('is-visible', getScrollY() > 500);
  };

  if (window.__noexaLenis && typeof window.__noexaLenis.on === 'function') {
    window.__noexaLenis.on('scroll', onScroll);
  } else {
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  onScroll(); /* set initial state */

  /* ---------- Back-to-top ---------- */
  if (toTopButton) {
    toTopButton.addEventListener('click', () => {
      if (window.__noexaLenis && typeof window.__noexaLenis.scrollTo === 'function') {
        window.__noexaLenis.scrollTo(0, {
          duration: 1.1,
          easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  /* ---------- Loader fallback ---------- */
  setTimeout(() => {
    if (loader) loader.classList.add('is-hidden');
  }, 800);
});