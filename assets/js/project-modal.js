/* ============================================================
   NoExaTech — Project Consultation Modal
   Package-aware. Static, no backend, Vercel-compatible.
   ============================================================ */
(function () {
  'use strict';

  var existingModal = document.getElementById('nxProjectModal');
  if (!existingModal) {
    document.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-nx-modal]');
      if (!trigger) return;
      event.preventDefault();
      window.__nxPendingModalTrigger = trigger;
    });

    fetch('services.html')
      .then(function (response) {
        if (!response.ok) throw new Error('Unable to load the project modal.');
        return response.text();
      })
      .then(function (html) {
        var parsed = new DOMParser().parseFromString(html, 'text/html');
        var modalTemplate = parsed.getElementById('nxProjectModal');
        if (!modalTemplate) throw new Error('Project modal markup is missing.');

        parsed.querySelectorAll('style').forEach(function (style) {
          if (!document.querySelector('[data-nx-modal-styles]')) {
            var sharedStyles = document.createElement('style');
            sharedStyles.setAttribute('data-nx-modal-styles', '');
            sharedStyles.textContent = style.textContent;
            document.head.appendChild(sharedStyles);
          }
        });

        document.body.appendChild(document.importNode(modalTemplate, true));
        var bootScript = document.createElement('script');
        bootScript.src = 'assets/js/project-modal.js';
        document.body.appendChild(bootScript);
      })
      .catch(function (error) {
        console.error('[NoExaTech] Project modal failed to load:', error);
      });
    return;
  }

  /* ============================================================
     SINGLE SOURCE OF TRUTH — package catalogue
     Keys must match data-package on the Services page buttons.
     ============================================================ */
  var PACKAGES = {
    'Landing Page': {
      type: 'Website Development',
      price: 'PKR 15,000',
      purpose: 'Single-page, conversion focused',
      features: [
        '1 high-conversion page',
        'Responsive design',
        'Clear call-to-action',
        'WhatsApp / contact integration',
        'Basic SEO and speed setup',
        '2 revision rounds'
      ]
    },
    'Starter Business Website': {
      type: 'Website Development',
      price: 'PKR 25,000',
      purpose: 'A clean presence for growing businesses',
      features: [
        'Up to 5 pages',
        'Responsive UI / UX',
        'WhatsApp / contact form / Google Maps',
        'Basic SEO and performance optimization',
        'Revision rounds',
        'Post-launch technical support'
      ]
    },
    'Business Website': {
      type: 'Website Development',
      price: 'PKR 40,000',
      purpose: 'Full business site with room to grow',
      features: [
        'Up to 8 pages',
        'Custom UI / UX',
        'Portfolio / gallery, testimonials',
        'Blog / news section',
        'Advanced inquiry forms',
        'Social integrations',
        'SEO, analytics, and speed optimization'
      ]
    },
    'Professional Business Website': {
      type: 'Advanced Web & E-Commerce',
      price: 'PKR 60,000+',
      purpose: 'Custom website with admin control',
      features: [
        'Custom UI / UX with full brand application',
        'CMS / admin panel for content management',
        'Advanced forms, integrations, and analytics',
        'SEO, performance, and security configuration'
      ]
    },
    'E-Commerce Starter': {
      type: 'E-Commerce',
      price: 'PKR 50,000+',
      purpose: 'Launch your first online store',
      features: [
        'Product catalogue and storefront',
        'Cart, checkout, and basic order flow',
        'Product management dashboard',
        'Payment / delivery integration as required'
      ]
    },
    'E-Commerce Business': {
      type: 'E-Commerce',
      price: 'PKR 80,000+',
      purpose: 'A store built to scale',
      features: [
        'Advanced catalogue, categories, and variants',
        'Order management, statuses, and reporting',
        'User roles and access control',
        'Marketing integrations and analytics'
      ]
    },
    'Custom Web System': {
      type: 'Custom Technology Solution',
      price: 'From PKR 100,000',
      purpose: 'Software built around your operations',
      features: [
        'Business management or internal systems',
        'Custom workflows, roles, and reporting',
        'Integrations with existing tools / APIs',
        'Scalable architecture with long-term maintenance in mind'
      ]
    },
    'Design Starter': {
      type: 'Graphic Design',
      price: 'PKR 15,000 / month',
      purpose: 'Consistent design, every month',
      features: ['10 social media designs']
    },
    'Design Business': {
      type: 'Graphic Design',
      price: 'PKR 25,000 / month',
      purpose: 'More volume, more formats',
      features: ['20 designs', 'Stories and posts', 'Basic photo editing']
    },
    'Design Professional': {
      type: 'Graphic Design',
      price: 'PKR 40,000 / month',
      purpose: 'Priority design, higher output',
      features: ['30+ designs', 'Posts, stories, and banners', 'Advanced Photoshop editing', 'Priority delivery']
    },
    'Meta Starter': {
      type: 'Meta Marketing',
      price: 'PKR 10,000 / month',
      purpose: 'Get visible on Meta',
      features: ['6 posts + 2 reels', '1 Meta Ads campaign', 'Basic monitoring', 'Monthly update'],
      extra: 'Recommended ad spend: PKR 10,000 – 15,000'
    },
    'Meta Premium': {
      type: 'Meta Marketing',
      price: 'PKR 15,000 / month',
      purpose: 'Active audience and campaign management',
      features: ['10 posts + 4 reels', 'Meta Ads management', 'Audience targeting', 'Optimization', 'Monthly report', 'Content strategy'],
      extra: 'Recommended ad spend: PKR 15,000 – 25,000'
    },
    'Meta Business': {
      type: 'Meta Marketing',
      price: 'PKR 20,000 / month',
      purpose: 'Full-funnel content and lead generation',
      features: ['12 posts + 6 reels', 'Content strategy', 'Audience / competitor research', 'Lead-generation strategy', 'Priority support'],
      extra: 'Recommended ad spend: PKR 20,000 – 40,000'
    },
    'Local Business Launch': {
      type: 'Website Development',
      price: 'PKR 30,000',
      purpose: 'A complete starter kit for local businesses',
      features: ['Website', '3 creatives', 'WhatsApp / Google Maps setup', 'Basic SEO']
    },
    'Digital Starter': {
      type: 'Website Development',
      price: 'PKR 35,000',
      purpose: 'Site, social presence, and lead channel',
      features: ['Starter website', '5 designs', 'Social CTA setup', 'WhatsApp lead channel', 'Basic SEO'],
      extra: 'Optional: Meta Starter at PKR 10,000 / month + ad spend.'
    },
    'Business Growth': {
      type: 'Website Development',
      price: 'PKR 50,000 / first month',
      purpose: 'Business site + Meta Starter',
      features: ['Business website', 'Meta Starter', '6 posts + 2 reels', '1 Meta Ads campaign'],
      extra: 'Ad spend separate.'
    },
    'Growth Partner': {
      type: 'Website Development',
      price: 'PKR 60,000 / first month',
      purpose: 'Full site + Meta Business + strategy',
      features: ['Business website', 'Meta Business', '12 posts + 6 reels', 'Lead-generation strategy', 'Audience / competitor research'],
      extra: 'Ongoing months: PKR 20,000 / month + ad spend.'
    },
    'Product Seller Starter': {
      type: 'E-Commerce',
      price: 'PKR 60,000 / first month',
      purpose: 'Store + Meta Starter + ordering workflow',
      features: ['E-Commerce Starter', 'Meta Starter', '6 posts + 2 reels', 'WhatsApp ordering workflow']
    },
    'E-Commerce Growth': {
      type: 'E-Commerce',
      price: 'PKR 95,000 / first month',
      purpose: 'Store + Meta Premium + targeting',
      features: ['E-Commerce Business', 'Meta Premium', '10 posts + 4 reels', 'Targeting and optimization', 'Content strategy']
    },
    'Brand Content + Ads': {
      type: 'Meta Marketing',
      price: 'PKR 35,000 / month',
      purpose: 'Consistent monthly brand content',
      features: ['20 designs', 'Meta Starter', '6 posts + 2 reels', '1 Meta Ads campaign']
    }
  };

  var WA_FALLBACK = '923143927745';
  var waRaw = (window.siteConfig && window.siteConfig.contact && window.siteConfig.contact.whatsapp) || WA_FALLBACK;
  var WA_NUMBER = String(waRaw).replace(/\D/g, '');

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var URL_RE = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;
  var DIVIDER = '━━━━━━━━━━━━━━━━━━';

  var modal = document.getElementById('nxProjectModal');
  if (!modal) return;

  var form = modal.querySelector('#nxProjectForm');
  var summaryName = modal.querySelector('[data-summary-name]');
  var summaryPrice = modal.querySelector('[data-summary-price]');
  var summaryExtras = modal.querySelector('[data-summary-extras]');
  var statusEl = modal.querySelector('[data-modal-status]');
  var typeEl = modal.querySelector('#nxProjectType');
  var timelineEl = modal.querySelector('#nxTimeline');
  var typeWrap = modal.querySelector('[data-field="projectType"]');
  var budgetWrap = modal.querySelector('[data-field="budget"]');
  var submitBtn = modal.querySelector('[data-modal-submit]');

  var lastTrigger = null;
  var mode = 'custom';
  var currentPkgId = '';

  function cleanLine(s) {
    return String(s || '').replace(/[\u0000-\u001F\u007F]/g, '').trim();
  }
  function cleanBlock(s) {
    return String(s || '').replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  }
  function fieldOf(el) { return el ? el.closest('.nx-project-modal__field') : null; }

  function setError(el, message) {
    var wrap = fieldOf(el);
    if (!wrap) return;
    wrap.classList.add('has-error');
    var err = wrap.querySelector('.nx-project-modal__error');
    if (err) err.textContent = message;
    el.setAttribute('aria-invalid', 'true');
  }
  function clearError(el) {
    var wrap = fieldOf(el);
    if (!wrap) return;
    wrap.classList.remove('has-error');
    var err = wrap.querySelector('.nx-project-modal__error');
    if (err) err.textContent = '';
    el.removeAttribute('aria-invalid');
  }
  function clearAllErrors() {
    modal.querySelectorAll('.nx-project-modal__field').forEach(function (f) {
      f.classList.remove('has-error');
      var err = f.querySelector('.nx-project-modal__error');
      if (err) err.textContent = '';
    });
    modal.querySelectorAll('[aria-invalid]').forEach(function (el) {
      el.removeAttribute('aria-invalid');
    });
  }

  function ensureTypeOption(value) {
    if (!value) return;
    var exists = Array.prototype.some.call(typeEl.options, function (o) {
      return o.value === value;
    });
    if (!exists) {
      var opt = document.createElement('option');
      opt.value = value;
      opt.textContent = value;
      typeEl.appendChild(opt);
    }
  }

  function ensureBudgetOption(value) {
    var budgetEl = modal.querySelector('#nxBudget');
    if (!budgetEl || !value) return;
    var exists = Array.prototype.some.call(budgetEl.options, function (o) {
      return o.value === value;
    });
    if (!exists) {
      var opt = document.createElement('option');
      opt.value = value;
      opt.textContent = value;
      budgetEl.appendChild(opt);
    }
  }

  function applyMode(pkgId) {
    var pkg = pkgId && PACKAGES[pkgId] ? PACKAGES[pkgId] : null;

    if (pkg) {
      mode = 'package';
      currentPkgId = pkgId;

      summaryName.textContent = pkgId;
      summaryPrice.textContent = pkg.price;

      if (summaryExtras) {
        summaryExtras.innerHTML = '';
        if (pkg.purpose) {
          var p = document.createElement('p');
          p.className = 'nx-project-modal__summary-purpose';
          p.textContent = pkg.purpose;
          summaryExtras.appendChild(p);
        }
        if (pkg.features && pkg.features.length) {
          var ul = document.createElement('ul');
          ul.className = 'nx-project-modal__summary-features';
          pkg.features.forEach(function (f) {
            var li = document.createElement('li');
            li.textContent = f;
            ul.appendChild(li);
          });
          summaryExtras.appendChild(ul);
        }
        if (pkg.extra) {
          var e = document.createElement('p');
          e.className = 'nx-project-modal__summary-extra';
          e.textContent = pkg.extra;
          summaryExtras.appendChild(e);
        }
      }

      ensureTypeOption(pkg.type);
      ensureBudgetOption(pkg.price);

      typeEl.value = pkg.type;
      typeEl.disabled = true;
      typeEl.setAttribute('aria-disabled', 'true');

      if (budgetWrap) {
        budgetWrap.hidden = false;
        var budgetEl = budgetWrap.querySelector('#nxBudget');
        if (budgetEl) {
          budgetEl.disabled = true;
          budgetEl.value = pkg.price;
        }
      }

      if (timelineEl) {
        timelineEl.value = 'Flexible';
        timelineEl.disabled = true;
        timelineEl.setAttribute('aria-disabled', 'true');
      }

      if (typeWrap) typeWrap.hidden = false;
    } else {
      mode = 'custom';
      currentPkgId = '';

      summaryName.textContent = 'Custom Project';
      summaryPrice.textContent = 'No package selected';
      if (summaryExtras) summaryExtras.innerHTML = '';

      typeEl.value = '';
      typeEl.disabled = false;
      typeEl.removeAttribute('aria-disabled');

      if (budgetWrap) {
        budgetWrap.hidden = false;
        var budgetEl = budgetWrap.querySelector('#nxBudget');
        if (budgetEl) {
          budgetEl.disabled = false;
          budgetEl.value = '';
        }
      }

      if (timelineEl) {
        timelineEl.value = '';
        timelineEl.disabled = false;
        timelineEl.removeAttribute('aria-disabled');
      }

      if (typeWrap) typeWrap.hidden = false;
    }
  }

  function openModal(pkgId, trigger) {
    applyMode(pkgId || '');
    clearAllErrors();
    if (statusEl) {
      statusEl.textContent = '';
      statusEl.classList.remove('is-visible');
    }
    lastTrigger = trigger || null;

    modal.removeAttribute('hidden');
    void modal.offsetWidth;
    modal.classList.add('is-open');
    document.body.classList.add('nx-modal-open');

    setTimeout(function () {
      var first = modal.querySelector('#nxName');
      if (first) first.focus();
    }, 60);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.classList.remove('nx-modal-open');
    setTimeout(function () {
      modal.setAttribute('hidden', '');
    }, 320);
    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      try { lastTrigger.focus(); } catch (_) {}
    }
  }

  document.querySelectorAll('[data-nx-modal]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(btn.getAttribute('data-package') || '', btn);
    });
  });

  if (window.__nxPendingModalTrigger) {
    var pendingTrigger = window.__nxPendingModalTrigger;
    window.__nxPendingModalTrigger = null;
    openModal(pendingTrigger.getAttribute('data-package') || '', pendingTrigger);
  }

  modal.querySelectorAll('[data-modal-close]').forEach(function (el) {
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
      'a[href], button:not([disabled]), input:not([disabled]):not([hidden]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    focusables = Array.prototype.filter.call(focusables, function (el) {
      return !el.closest('[hidden]');
    });
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  function validate() {
    var nameEl = form.querySelector('#nxName');
    var emailEl = form.querySelector('#nxEmail');
    var waEl = form.querySelector('#nxWhatsApp');
    var descEl = form.querySelector('#nxDescription');
    var websiteEl = form.querySelector('#nxWebsite');
    var budgetEl = form.querySelector('#nxBudget');

    [nameEl, emailEl, waEl, typeEl, descEl, websiteEl, budgetEl].forEach(clearError);

    var firstInvalid = null;
    function check(el, msg) {
      if (msg) {
        setError(el, msg);
        firstInvalid = firstInvalid || el;
      }
    }

    var name = cleanLine(nameEl.value);
    if (!name) check(nameEl, 'Please enter your full name.');
    else if (name.length < 2) check(nameEl, 'Name must be at least 2 characters.');

    var email = cleanLine(emailEl.value);
    if (!email) check(emailEl, 'Please enter your email.');
    else if (!EMAIL_RE.test(email)) check(emailEl, 'Please enter a valid email address.');

    var wa = cleanLine(waEl.value);
    if (!wa) check(waEl, 'Please enter your WhatsApp number.');
    else {
      var d = wa.replace(/\D/g, '');
      if (d.length < 10) check(waEl, 'Number looks too short. Include your country code.');
      else if (d.length > 15) check(waEl, 'Number looks too long.');
    }

    if (mode === 'custom' && !typeEl.value) {
      check(typeEl, 'Please select a project type.');
    }

    var desc = cleanBlock(descEl.value);
    if (!desc) check(descEl, 'Please tell us about the project.');
    else if (desc.length < 10) check(descEl, 'Please provide a few more details (10+ characters).');

    var web = cleanLine(websiteEl.value);
    if (web && !URL_RE.test(web)) check(websiteEl, 'Please enter a valid URL.');

    return firstInvalid;
  }

  function packageMessage(pkg, pkgId, data) {
    var lines = [];
    lines.push('Hello NoExaTech,', '');
    lines.push('I would like to request a consultation for the following package:', '');

    lines.push(DIVIDER);
    lines.push('PROJECT PACKAGE');
    lines.push(DIVIDER, '');

    lines.push('Package:');
    lines.push(pkgId, '');

    lines.push('Price:');
    lines.push(pkg.price, '');

    if (pkg.purpose) {
      lines.push('Purpose:');
      lines.push(pkg.purpose, '');
    }

    if (pkg.features && pkg.features.length) {
      lines.push('INCLUDED:');
      pkg.features.forEach(function (f) {
        lines.push('• ' + f);
      });
      lines.push('');
    }

    if (pkg.extra) {
      lines.push(pkg.extra, '');
    }

    lines.push(DIVIDER);
    lines.push('CLIENT DETAILS');
    lines.push(DIVIDER, '');

    lines.push('Name: ' + data.name);
    lines.push('Email: ' + data.email);
    lines.push('WhatsApp: ' + data.whatsapp);
    if (data.business) lines.push('Business: ' + data.business);
    lines.push('');

    if (data.description) {
      lines.push('PROJECT REQUIREMENTS:');
      lines.push(data.description, '');
    }

    if (data.timeline) {
      lines.push('TIMELINE:');
      lines.push(data.timeline, '');
    }

    if (data.notes) {
      lines.push('ADDITIONAL NOTES:');
      lines.push(data.notes, '');
    }

    lines.push('Thank you,');
    lines.push(data.name);

    return lines.join('\n');
  }

  function customMessage(data) {
    var lines = [];
    lines.push('Hello NoExaTech,', '');
    lines.push('I would like to request a project consultation.', '');

    lines.push(DIVIDER);
    lines.push('PROJECT');
    lines.push(DIVIDER, '');

    lines.push('Project Type:');
    lines.push('Custom Project', '');

    if (data.projectType) {
      lines.push('Category:');
      lines.push(data.projectType, '');
    }

    if (data.budget) {
      lines.push('ESTIMATED BUDGET:');
      lines.push(data.budget, '');
    }

    lines.push(DIVIDER);
    lines.push('CLIENT DETAILS');
    lines.push(DIVIDER, '');

    lines.push('Name: ' + data.name);
    lines.push('Email: ' + data.email);
    lines.push('WhatsApp: ' + data.whatsapp);
    if (data.business) lines.push('Business: ' + data.business);
    lines.push('');

    if (data.description) {
      lines.push('PROJECT DETAILS:');
      lines.push(data.description, '');
    }

    if (data.timeline) {
      lines.push('TIMELINE:');
      lines.push(data.timeline, '');
    }

    if (data.website) {
      lines.push('CURRENT WEBSITE:');
      lines.push(data.website, '');
    }

    if (data.notes) {
      lines.push('ADDITIONAL NOTES:');
      lines.push(data.notes, '');
    }

    lines.push("I'd like to discuss the project and next steps.", '');
    lines.push('Thank you,');
    lines.push(data.name);

    return lines.join('\n');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var firstInvalid = validate();
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    if (!WA_NUMBER) {
      if (statusEl) {
        statusEl.textContent = 'WhatsApp is not configured. Please email us instead.';
        statusEl.classList.add('is-visible');
      }
      return;
    }

    var data = {
      name: cleanLine(form.querySelector('#nxName').value),
      email: cleanLine(form.querySelector('#nxEmail').value),
      whatsapp: cleanLine(form.querySelector('#nxWhatsApp').value),
      business: cleanLine(form.querySelector('#nxBusiness').value),
      projectType: typeEl.value,
      description: cleanBlock(form.querySelector('#nxDescription').value),
      timeline: form.querySelector('#nxTimeline').value,
      budget: form.querySelector('#nxBudget').value,
      website: cleanLine(form.querySelector('#nxWebsite').value),
      notes: cleanBlock(form.querySelector('#nxNotes').value)
    };

    var message = (mode === 'package' && PACKAGES[currentPkgId])
      ? packageMessage(PACKAGES[currentPkgId], currentPkgId, data)
      : customMessage(data);

    var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);

    if (statusEl) {
      statusEl.textContent = 'Your consultation details are ready in WhatsApp.';
      statusEl.classList.add('is-visible');
    }

    if (submitBtn) {
      var original = submitBtn.textContent;
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Opening WhatsApp…';

      setTimeout(function () {
        window.open(url, '_blank', 'noopener');
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
        submitBtn.textContent = original;
      }, 400);
    } else {
      window.open(url, '_blank', 'noopener');
    }
  });
})();