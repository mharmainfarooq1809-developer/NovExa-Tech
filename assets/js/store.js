/* ============================================================
   NovExa Tech — Digital Store
   Products · Lazy loading · Bento visuals · Spotlight ·
   Filters · Product modal · WhatsApp checkout · FAQ
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     SINGLE SOURCE OF TRUTH — products
     `image` is optional. If empty or missing, a category-specific
     SVG mockup is used instead. Add real product images here:

       image: 'assets/images/store/nova-landing.webp'

     The path is loaded lazily via IntersectionObserver.
     ============================================================ */
  var PRODUCTS = [
    {
      id: 'nova-landing',
      name: 'Nova Landing Page',
      category: 'landing-pages',
      categoryLabel: 'Landing Pages',
      tagline: 'Premium SaaS landing page',
      price: 'PKR 2,500',
      image: '',
      badge: 'Featured',
      featured: true,
      description: 'A high-conversion single-page landing template built for SaaS, apps, and digital products. Clean layout, strong hierarchy, and mobile-first responsive across every breakpoint.',
      includes: ['HTML files', 'CSS (modular)', 'JavaScript (vanilla)', 'SVG assets', 'README documentation'],
      features: ['Hero with animated background', 'Feature grid', 'Pricing table', 'FAQ accordion', 'Contact section', 'Mobile navigation'],
      tech: ['HTML5', 'CSS3', 'Vanilla JS'],
      license: 'Personal & Commercial — single end product.'
    },
    {
      id: 'corporate-website',
      name: 'Corporate Website Template',
      category: 'website-templates',
      categoryLabel: 'Website Templates',
      tagline: 'Multi-page business website',
      price: 'PKR 4,500',
      image: '',
      description: 'A complete multi-page website template designed for agencies, consultancies, and professional service businesses. Includes all core pages with a consistent design system.',
      includes: ['7 HTML pages', 'CSS design system', 'JavaScript interactions', 'Icons', 'Documentation'],
      features: ['Home, About, Services', 'Work / Portfolio', 'Blog structure', 'Contact page', 'Dark mode ready'],
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      license: 'Personal & Commercial — single end product.'
    },
    {
      id: 'glass-ui-kit',
      name: 'Glass UI Kit',
      category: 'ui-kits',
      categoryLabel: 'UI Kits',
      tagline: 'Modern glassmorphism component library',
      price: 'PKR 3,000',
      image: '',
      description: 'A premium UI kit built around glass morphism, soft borders, and subtle gradients. Every component is production-ready and designed to work on dark interfaces.',
      includes: ['40+ UI components', 'Figma source', 'HTML / CSS reference', 'Icon set', 'Documentation'],
      features: ['Buttons, inputs, cards', 'Modals and toasts', 'Navigation patterns', 'Form layouts', 'Data tables'],
      tech: ['Figma', 'HTML', 'CSS'],
      license: 'Personal & Commercial — single end product.'
    },
    {
      id: 'js-interaction-pack',
      name: 'JS Interaction Pack',
      category: 'code-components',
      categoryLabel: 'Code Components',
      tagline: 'Drop-in JavaScript components',
      price: 'PKR 2,000',
      image: '',
      description: 'A collection of small, focused JavaScript components — carousels, accordions, tabs, counters, scroll effects, and form helpers. No framework required.',
      includes: ['12 vanilla JS components', 'CSS for each', 'Demo HTML page', 'Documentation'],
      features: ['Zero dependencies', 'Accessible markup', 'Works with any CSS setup', 'Well-commented'],
      tech: ['Vanilla JS', 'HTML', 'CSS'],
      license: 'Personal & Commercial — unlimited projects.'
    },
    {
      id: 'social-post-pack',
      name: 'Social Post Design Pack',
      category: 'social-kits',
      categoryLabel: 'Social Media Kits',
      tagline: '30 social media post templates',
      price: 'PKR 1,800',
      image: '',
      description: 'A ready-to-customise pack of 30 social media post templates covering promotions, testimonials, quotes, and product highlights. Designed in both square and story formats.',
      includes: ['30 post designs', 'Square + story sizes', 'Editable source files', 'Fonts and colour guide'],
      features: ['Promotional layouts', 'Testimonial templates', 'Quote posts', 'Product highlight cards'],
      tech: ['Figma', 'PNG export'],
      license: 'Personal & Commercial — single brand.'
    },
    {
      id: 'business-starter-kit',
      name: 'Business Starter Kit',
      category: 'business-templates',
      categoryLabel: 'Business Templates',
      tagline: 'Documents every new business needs',
      price: 'PKR 2,200',
      image: '',
      description: 'A bundle of business templates — proposal, invoice, quotation, and scope of work. All designed to be brandable and easy to edit.',
      includes: ['Proposal template', 'Invoice template', 'Quotation template', 'Scope of work', 'Brand guide'],
      features: ['Editable text and colours', 'Print-ready PDF', 'Editable source files', 'Placeholder instructions'],
      tech: ['Figma', 'PDF'],
      license: 'Personal & Commercial — single business.'
    }
  ];

  /* ---------- WhatsApp number ---------- */
  var cfgContact = (window.siteConfig && window.siteConfig.contact) || {};
  var WA_NUMBER = String(cfgContact.whatsapp || '923143927745').replace(/\D/g, '');

  /* ============================================================
     SVG MOCKUP GENERATORS
     Each category gets a distinct premium-looking SVG preview.
     Used when a product has no `image` path.
     ============================================================ */
  var uid = 0;
  function nextId() { return 'nx' + (++uid); }

  function svgWrap(inner) {
    return '<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  }

  var MOCKUPS = {
    'landing-pages': function () {
      var g = nextId();
      return svgWrap(
        '<defs>' +
          '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0" stop-color="#0a1e42"/>' +
            '<stop offset="1" stop-color="#050505"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect width="800" height="600" fill="url(#' + g + ')"/>' +
        '<g opacity="0.08">' +
          '<path d="M0 100 H800 M0 200 H800 M0 300 H800 M0 400 H800 M0 500 H800" stroke="#fff" stroke-width="1"/>' +
          '<path d="M100 0 V600 M200 0 V600 M300 0 V600 M400 0 V600 M500 0 V600 M600 0 V600 M700 0 V600" stroke="#fff" stroke-width="1"/>' +
        '</g>' +
        '<rect x="90" y="80" width="620" height="440" rx="12" fill="#0c0c0c" stroke="rgba(0,168,255,0.3)" stroke-width="1.5"/>' +
        '<rect x="90" y="80" width="620" height="34" rx="12" fill="#181818"/>' +
        '<rect x="90" y="102" width="620" height="12" fill="#181818"/>' +
        '<circle cx="118" cy="97" r="5" fill="#00A8FF"/>' +
        '<circle cx="136" cy="97" r="5" fill="#0066FF"/>' +
        '<circle cx="154" cy="97" r="5" fill="#2a2a2a"/>' +
        '<rect x="130" y="150" width="300" height="22" rx="4" fill="#EDF3FF" opacity="0.95"/>' +
        '<rect x="130" y="182" width="220" height="22" rx="4" fill="#EDF3FF" opacity="0.55"/>' +
        '<rect x="130" y="218" width="180" height="10" rx="3" fill="#00A8FF" opacity="0.75"/>' +
        '<rect x="130" y="248" width="120" height="34" rx="17" fill="#0066FF"/>' +
        '<rect x="270" y="248" width="110" height="34" rx="17" fill="none" stroke="rgba(255,255,255,0.25)"/>' +
        '<rect x="470" y="150" width="200" height="132" rx="10" fill="rgba(0,168,255,0.12)" stroke="rgba(0,168,255,0.3)"/>' +
        '<rect x="490" y="172" width="160" height="12" rx="3" fill="rgba(0,168,255,0.5)"/>' +
        '<rect x="490" y="194" width="120" height="8" rx="3" fill="rgba(255,255,255,0.18)"/>' +
        '<rect x="490" y="210" width="140" height="8" rx="3" fill="rgba(255,255,255,0.18)"/>' +
        '<rect x="490" y="226" width="100" height="8" rx="3" fill="rgba(255,255,255,0.18)"/>' +
        '<rect x="490" y="248" width="70" height="20" rx="10" fill="#00A8FF" opacity="0.7"/>' +
        '<rect x="130" y="320" width="172" height="90" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>' +
        '<rect x="314" y="320" width="172" height="90" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>' +
        '<rect x="498" y="320" width="172" height="90" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>' +
        '<circle cx="152" cy="342" r="6" fill="#00A8FF" opacity="0.8"/>' +
        '<rect x="168" y="338" width="70" height="8" rx="3" fill="rgba(255,255,255,0.4)"/>' +
        '<rect x="150" y="362" width="140" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>' +
        '<rect x="150" y="376" width="120" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>' +
        '<circle cx="336" cy="342" r="6" fill="#00A8FF" opacity="0.8"/>' +
        '<rect x="352" y="338" width="70" height="8" rx="3" fill="rgba(255,255,255,0.4)"/>' +
        '<rect x="334" y="362" width="140" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>' +
        '<rect x="334" y="376" width="120" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>' +
        '<circle cx="520" cy="342" r="6" fill="#00A8FF" opacity="0.8"/>' +
        '<rect x="536" y="338" width="70" height="8" rx="3" fill="rgba(255,255,255,0.4)"/>' +
        '<rect x="518" y="362" width="140" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>' +
        '<rect x="518" y="376" width="120" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>' +
        '<rect x="130" y="440" width="540" height="60" rx="10" fill="rgba(0,168,255,0.05)" stroke="rgba(0,168,255,0.2)"/>'
      );
    },

    'website-templates': function () {
      var g = nextId();
      return svgWrap(
        '<defs>' +
          '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0" stop-color="#0a1e42"/>' +
            '<stop offset="1" stop-color="#050505"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect width="800" height="600" fill="url(#' + g + ')"/>' +
        '<g transform="translate(60 140) rotate(-6 200 200)">' +
          '<rect width="260" height="360" rx="12" fill="#0c0c0c" stroke="rgba(0,168,255,0.35)"/>' +
          '<rect x="0" y="0" width="260" height="26" rx="12" fill="#181818"/>' +
          '<rect x="20" y="48" width="140" height="14" rx="3" fill="rgba(255,255,255,0.7)"/>' +
          '<rect x="20" y="74" width="100" height="8" rx="3" fill="rgba(255,255,255,0.3)"/>' +
          '<rect x="20" y="94" width="220" height="90" rx="6" fill="rgba(0,168,255,0.15)"/>' +
          '<rect x="20" y="200" width="90" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>' +
          '<rect x="20" y="216" width="180" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>' +
          '<rect x="20" y="232" width="150" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>' +
          '<rect x="20" y="260" width="220" height="80" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>' +
        '</g>' +
        '<g transform="translate(270 120)">' +
          '<rect width="260" height="360" rx="12" fill="#0c0c0c" stroke="rgba(0,168,255,0.55)" stroke-width="1.5"/>' +
          '<rect x="0" y="0" width="260" height="26" rx="12" fill="#181818"/>' +
          '<circle cx="18" cy="13" r="4" fill="#00A8FF"/>' +
          '<circle cx="32" cy="13" r="4" fill="#0066FF"/>' +
          '<rect x="20" y="48" width="180" height="18" rx="3" fill="#EDF3FF"/>' +
          '<rect x="20" y="78" width="220" height="10" rx="3" fill="rgba(0,168,255,0.6)"/>' +
          '<rect x="20" y="98" width="180" height="90" rx="6" fill="rgba(0,168,255,0.22)" stroke="rgba(0,168,255,0.35)"/>' +
          '<rect x="20" y="210" width="220" height="80" rx="6" fill="rgba(255,255,255,0.04)"/>' +
          '<rect x="40" y="228" width="70" height="6" rx="3" fill="rgba(255,255,255,0.3)"/>' +
          '<rect x="40" y="242" width="120" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>' +
          '<rect x="20" y="310" width="100" height="28" rx="14" fill="#0066FF"/>' +
          '<rect x="130" y="310" width="90" height="28" rx="14" fill="none" stroke="rgba(255,255,255,0.2)"/>' +
        '</g>' +
        '<g transform="translate(480 140) rotate(6 200 200)">' +
          '<rect width="260" height="360" rx="12" fill="#0c0c0c" stroke="rgba(0,168,255,0.35)"/>' +
          '<rect x="0" y="0" width="260" height="26" rx="12" fill="#181818"/>' +
          '<rect x="20" y="48" width="150" height="14" rx="3" fill="rgba(255,255,255,0.7)"/>' +
          '<rect x="20" y="74" width="220" height="8" rx="3" fill="rgba(255,255,255,0.3)"/>' +
          '<rect x="20" y="92" width="100" height="80" rx="6" fill="rgba(0,168,255,0.15)"/>' +
          '<rect x="140" y="92" width="100" height="80" rx="6" fill="rgba(255,255,255,0.04)"/>' +
          '<rect x="20" y="190" width="220" height="60" rx="6" fill="rgba(255,255,255,0.03)"/>' +
          '<rect x="20" y="270" width="220" height="60" rx="6" fill="rgba(0,168,255,0.08)"/>' +
        '</g>'
      );
    },

    'ui-kits': function () {
      var g = nextId();
      var comps = '';
      var items = [
        [90, 120, 200, 60, 'button'],
        [310, 120, 200, 60, 'input'],
        [530, 120, 180, 60, 'toggle'],
        [90, 200, 300, 120, 'card'],
        [410, 200, 300, 120, 'card-alt'],
        [90, 340, 200, 140, 'chart'],
        [310, 340, 200, 140, 'avatar-grid'],
        [530, 340, 180, 140, 'menu']
      ];
      items.forEach(function (it) {
        var x = it[0], y = it[1], w = it[2], h = it[3], kind = it[4];
        comps += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.09)"/>';
        if (kind === 'button') {
          comps += '<rect x="' + (x + 14) + '" y="' + (y + 14) + '" width="80" height="32" rx="16" fill="#0066FF"/>' +
                   '<rect x="' + (x + 104) + '" y="' + (y + 14) + '" width="80" height="32" rx="16" fill="none" stroke="rgba(255,255,255,0.25)"/>';
        } else if (kind === 'input') {
          comps += '<rect x="' + (x + 14) + '" y="' + (y + 16) + '" width="172" height="28" rx="6" fill="rgba(0,0,0,0.4)" stroke="rgba(0,168,255,0.35)"/>' +
                   '<rect x="' + (x + 24) + '" y="' + (y + 26) + '" width="60" height="8" rx="3" fill="rgba(0,168,255,0.5)"/>';
        } else if (kind === 'toggle') {
          comps += '<rect x="' + (x + 14) + '" y="' + (y + 20) + '" width="52" height="22" rx="11" fill="#00A8FF"/>' +
                   '<circle cx="' + (x + 55) + '" cy="' + (y + 31) + '" r="8" fill="#fff"/>';
        } else if (kind === 'card') {
          comps += '<rect x="' + (x + 16) + '" y="' + (y + 16) + '" width="60" height="60" rx="8" fill="rgba(0,168,255,0.22)"/>' +
                   '<rect x="' + (x + 88) + '" y="' + (y + 22) + '" width="140" height="12" rx="4" fill="rgba(255,255,255,0.55)"/>' +
                   '<rect x="' + (x + 88) + '" y="' + (y + 44) + '" width="180" height="8" rx="3" fill="rgba(255,255,255,0.2)"/>' +
                   '<rect x="' + (x + 88) + '" y="' + (y + 58) + '" width="140" height="8" rx="3" fill="rgba(255,255,255,0.2)"/>' +
                   '<rect x="' + (x + 88) + '" y="' + (y + 80) + '" width="90" height="24" rx="12" fill="#00A8FF"/>';
        } else if (kind === 'card-alt') {
          comps += '<rect x="' + (x + 16) + '" y="' + (y + 16) + '" width="268" height="40" rx="8" fill="rgba(255,255,255,0.03)"/>' +
                   '<circle cx="' + (x + 40) + '" cy="' + (y + 36) + '" r="12" fill="#0066FF"/>' +
                   '<rect x="' + (x + 62) + '" y="' + (y + 30) + '" width="120" height="10" rx="4" fill="rgba(255,255,255,0.4)"/>' +
                   '<rect x="' + (x + 16) + '" y="' + (y + 66) + '" width="268" height="40" rx="8" fill="rgba(0,168,255,0.08)" stroke="rgba(0,168,255,0.3)"/>';
        } else if (kind === 'chart') {
          comps += '<rect x="' + (x + 16) + '" y="' + (y + 16) + '" width="168" height="12" rx="4" fill="rgba(255,255,255,0.4)"/>';
          var bars = [18, 34, 26, 44, 30, 52, 38];
          bars.forEach(function (h, i) {
            comps += '<rect x="' + (x + 20 + i * 24) + '" y="' + (y + 110 - h) + '" width="14" height="' + h + '" rx="3" fill="' + (i === 5 ? '#00A8FF' : 'rgba(0,168,255,0.4)') + '"/>';
          });
        } else if (kind === 'avatar-grid') {
          for (var r = 0; r < 2; r++) {
            for (var c = 0; c < 3; c++) {
              comps += '<circle cx="' + (x + 40 + c * 44) + '" cy="' + (y + 40 + r * 48) + '" r="16" fill="rgba(0,168,255,' + (0.15 + (r * 3 + c) * 0.08) + ')"/>';
            }
          }
        } else if (kind === 'menu') {
          for (var i = 0; i < 4; i++) {
            comps += '<rect x="' + (x + 16) + '" y="' + (y + 16 + i * 30) + '" width="148" height="22" rx="6" fill="rgba(255,255,255,0.03)"/>' +
                     '<circle cx="' + (x + 30) + '" cy="' + (y + 27 + i * 30) + '" r="5" fill="' + (i === 0 ? '#00A8FF' : 'rgba(255,255,255,0.2)') + '"/>' +
                     '<rect x="' + (x + 44) + '" y="' + (y + 23 + i * 30) + '" width="90" height="8" rx="3" fill="rgba(255,255,255,0.2)"/>';
          }
        }
      });

      return svgWrap(
        '<defs>' +
          '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0" stop-color="#0a1e42"/>' +
            '<stop offset="1" stop-color="#050505"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect width="800" height="600" fill="url(#' + g + ')"/>' +
        '<text x="90" y="80" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="600" letter-spacing="4" fill="#00A8FF" opacity="0.85">UI KIT · 40+ COMPONENTS</text>' +
        comps
      );
    },

    'code-components': function () {
      var g = nextId();
      var lines = [
        ['// Interactive accordion', 0],
        ['const accordion = document.querySelectorAll(\'.acc\');', 1],
        ['accordion.forEach(el => {', 1],
        ['  el.addEventListener(\'click\', () => {', 2],
        ['    el.classList.toggle(\'open\');', 3],
        ['  });', 2],
        ['});', 1],
        ['', 0],
        ['// Zero dependencies', 0],
        ['// ~2.1 KB gzipped', 0]
      ];
      var code = '';
      lines.forEach(function (l, i) {
        var indent = l[1] * 24;
        var text = l[0]
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        var color = l[0].trim().startsWith('//') ? '#5a7a99' : '#d7ecff';
        code += '<text x="' + (110 + indent) + '" y="' + (170 + i * 26) + '" font-family="\'JetBrains Mono\', monospace" font-size="15" fill="' + color + '">' + text + '</text>';
      });

      return svgWrap(
        '<defs>' +
          '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0" stop-color="#0a1e42"/>' +
            '<stop offset="1" stop-color="#050505"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect width="800" height="600" fill="url(#' + g + ')"/>' +
        '<rect x="60" y="80" width="680" height="440" rx="12" fill="#0a0a0a" stroke="rgba(0,168,255,0.3)"/>' +
        '<rect x="60" y="80" width="680" height="32" rx="12" fill="#141414"/>' +
        '<rect x="60" y="100" width="680" height="12" fill="#141414"/>' +
        '<circle cx="86" cy="96" r="5" fill="#00A8FF"/>' +
        '<circle cx="104" cy="96" r="5" fill="#0066FF"/>' +
        '<circle cx="122" cy="96" r="5" fill="#2a2a2a"/>' +
        '<text x="380" y="100" font-family="monospace" font-size="11" fill="rgba(255,255,255,0.35)" text-anchor="middle">component.js</text>' +
        lines.map(function (_, i) {
          return '<text x="86" y="' + (170 + i * 26) + '" font-family="monospace" font-size="13" fill="rgba(255,255,255,0.2)">' + (i + 1) + '</text>';
        }).join('') +
        code
      );
    },

    'social-kits': function () {
      var g = nextId();
      var tiles = '';
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
          var x = 100 + c * 210;
          var y = 100 + r * 145;
          var variants = [
            '<rect x="' + (x + 12) + '" y="' + (y + 30) + '" width="60" height="8" rx="3" fill="#00A8FF"/>' +
            '<rect x="' + (x + 12) + '" y="' + (y + 48) + '" width="140" height="14" rx="3" fill="rgba(255,255,255,0.85)"/>' +
            '<rect x="' + (x + 12) + '" y="' + (y + 72) + '" width="100" height="8" rx="3" fill="rgba(255,255,255,0.25)"/>' +
            '<rect x="' + (x + 12) + '" y="' + (y + 100) + '" width="70" height="22" rx="11" fill="#0066FF"/>',

            '<circle cx="' + (x + 40) + '" cy="' + (y + 60) + '" r="22" fill="rgba(0,168,255,0.35)"/>' +
            '<circle cx="' + (x + 40) + '" cy="' + (y + 60) + '" r="14" fill="#00A8FF"/>' +
            '<rect x="' + (x + 80) + '" y="' + (y + 44) + '" width="80" height="10" rx="3" fill="rgba(255,255,255,0.7)"/>' +
            '<rect x="' + (x + 80) + '" y="' + (y + 64) + '" width="60" height="8" rx="3" fill="rgba(255,255,255,0.25)"/>',

            '<text x="' + (x + 12) + '" y="' + (y + 60) + '" font-family="Georgia, serif" font-size="42" fill="rgba(0,168,255,0.6)">"</text>' +
            '<rect x="' + (x + 30) + '" y="' + (y + 60) + '" width="140" height="10" rx="3" fill="rgba(255,255,255,0.7)"/>' +
            '<rect x="' + (x + 30) + '" y="' + (y + 78) + '" width="110" height="10" rx="3" fill="rgba(255,255,255,0.7)"/>' +
            '<rect x="' + (x + 30) + '" y="' + (y + 96) + '" width="80" height="8" rx="3" fill="rgba(255,255,255,0.25)"/>',

            '<rect x="' + (x + 12) + '" y="' + (y + 20) + '" width="160" height="80" rx="8" fill="rgba(0,168,255,0.15)"/>' +
            '<rect x="' + (x + 12) + '" y="' + (y + 110) + '" width="120" height="10" rx="3" fill="rgba(255,255,255,0.7)"/>',

            '<rect x="' + (x + 12) + '" y="' + (y + 20) + '" width="80" height="80" rx="8" fill="rgba(0,168,255,0.2)"/>' +
            '<rect x="' + (x + 100) + '" y="' + (y + 20) + '" width="72" height="36" rx="8" fill="rgba(255,255,255,0.05)"/>' +
            '<rect x="' + (x + 100) + '" y="' + (y + 64) + '" width="72" height="36" rx="8" fill="rgba(0,168,255,0.15)"/>',

            '<circle cx="' + (x + 90) + '" cy="' + (y + 60) + '" r="34" fill="none" stroke="rgba(0,168,255,0.6)" stroke-width="3"/>' +
            '<circle cx="' + (x + 90) + '" cy="' + (y + 60) + '" r="20" fill="rgba(0,168,255,0.25)"/>' +
            '<rect x="' + (x + 30) + '" y="' + (y + 108) + '" width="120" height="8" rx="3" fill="rgba(255,255,255,0.3)"/>',

            '<rect x="' + (x + 12) + '" y="' + (y + 20) + '" width="160" height="60" rx="8" fill="rgba(0,168,255,0.12)"/>' +
            '<rect x="' + (x + 12) + '" y="' + (y + 92) + '" width="90" height="24" rx="12" fill="#00A8FF"/>',

            '<rect x="' + (x + 12) + '" y="' + (y + 20) + '" width="160" height="100" rx="8" fill="rgba(0,0,0,0.4)" stroke="rgba(0,168,255,0.3)"/>' +
            '<rect x="' + (x + 24) + '" y="' + (y + 34) + '" width="60" height="6" rx="3" fill="rgba(0,168,255,0.7)"/>' +
            '<rect x="' + (x + 24) + '" y="' + (y + 50) + '" width="130" height="10" rx="3" fill="rgba(255,255,255,0.7)"/>' +
            '<rect x="' + (x + 24) + '" y="' + (y + 66) + '" width="110" height="8" rx="3" fill="rgba(255,255,255,0.25)"/>' +
            '<rect x="' + (x + 24) + '" y="' + (y + 96) + '" width="70" height="16" rx="8" fill="#0066FF"/>',

            '<rect x="' + (x + 12) + '" y="' + (y + 20) + '" width="76" height="100" rx="8" fill="rgba(255,255,255,0.04)"/>' +
            '<rect x="' + (x + 96) + '" y="' + (y + 20) + '" width="76" height="100" rx="8" fill="rgba(0,168,255,0.2)"/>'
          ];
          tiles += '<rect x="' + x + '" y="' + y + '" width="180" height="125" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>' + variants[(r * 3 + c) % variants.length];
        }
      }

      return svgWrap(
        '<defs>' +
          '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0" stop-color="#0a1e42"/>' +
            '<stop offset="1" stop-color="#050505"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect width="800" height="600" fill="url(#' + g + ')"/>' +
        tiles
      );
    },

    'business-templates': function () {
      var g = nextId();
      function doc(x, y, rot, active) {
        return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ')">' +
          '<rect width="240" height="320" rx="8" fill="#0e0e0e" stroke="' + (active ? 'rgba(0,168,255,0.6)' : 'rgba(255,255,255,0.12)') + '" stroke-width="' + (active ? '1.5' : '1') + '"/>' +
          '<rect x="24" y="30" width="60" height="10" rx="3" fill="#00A8FF"/>' +
          '<rect x="24" y="56" width="192" height="22" rx="4" fill="rgba(255,255,255,0.85)"/>' +
          '<rect x="24" y="86" width="140" height="10" rx="3" fill="rgba(255,255,255,0.3)"/>' +
          '<rect x="24" y="120" width="192" height="1" fill="rgba(255,255,255,0.08)"/>' +
          '<rect x="24" y="138" width="80" height="8" rx="3" fill="rgba(255,255,255,0.5)"/>' +
          '<rect x="24" y="154" width="100" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>' +
          '<rect x="24" y="170" width="90" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>' +
          '<rect x="130" y="138" width="86" height="40" rx="4" fill="rgba(0,168,255,0.12)"/>' +
          '<rect x="24" y="200" width="192" height="1" fill="rgba(255,255,255,0.08)"/>' +
          '<rect x="24" y="218" width="80" height="8" rx="3" fill="rgba(255,255,255,0.5)"/>' +
          '<rect x="24" y="234" width="120" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>' +
          '<rect x="24" y="250" width="100" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>' +
          '<rect x="24" y="282" width="90" height="22" rx="11" fill="' + (active ? '#0066FF' : 'rgba(255,255,255,0.06)') + '"/>' +
        '</g>';
      }

      return svgWrap(
        '<defs>' +
          '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0" stop-color="#0a1e42"/>' +
            '<stop offset="1" stop-color="#050505"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect width="800" height="600" fill="url(#' + g + ')"/>' +
        doc(120, 140, -8, false) +
        doc(280, 110, 0, true) +
        doc(440, 140, 8, false)
      );
    }
  };

  function getMockup(category) {
    var fn = MOCKUPS[category] || MOCKUPS['landing-pages'];
    return fn();
  }

  /* ============================================================
     LAZY IMAGE LOADER
     Watches [data-lazy] and loads their src when near the viewport.
     Falls back to immediate load if IntersectionObserver is missing.
     ============================================================ */
  function lazyLoad(scope) {
    var root = scope || document;
    var nodes = root.querySelectorAll('[data-lazy]');
    if (!nodes.length) return;

    function load(el) {
      var src = el.getAttribute('data-lazy');
      if (!src || el.dataset.loaded) return;
      el.dataset.loaded = '1';
      el.addEventListener('load', function () {
        el.classList.add('is-loaded');
      });
      el.addEventListener('error', function () {
        el.classList.add('is-error');
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
     DOM refs
     ============================================================ */
  var grid    = document.querySelector('[data-store-grid]');
  var filters = document.querySelectorAll('.st-filter');
  var modal   = document.getElementById('stProductModal');
  if (!grid) return;

  var elCat       = modal.querySelector('[data-st-cat]');
  var elTitle     = modal.querySelector('[data-st-title]');
  var elPreview   = modal.querySelector('[data-st-preview]');
  var elDesc      = modal.querySelector('[data-st-desc]');
  var elIncludes  = modal.querySelector('[data-st-includes]');
  var elFeatures  = modal.querySelector('[data-st-features]');
  var elTech      = modal.querySelector('[data-st-tech]');
  var elLicense   = modal.querySelector('[data-st-license]');
  var elPrice     = modal.querySelector('[data-st-price]');
  var form        = modal.querySelector('#stCheckoutForm');
  var submitBtn   = modal.querySelector('[data-st-submit]');
  var statusEl    = modal.querySelector('[data-st-status]');
  var includesSec = modal.querySelector('[data-st-includes-section]');
  var featuresSec = modal.querySelector('[data-st-features-section]');

  var activeProduct = null;
  var lastTrigger   = null;

  /* ============================================================
     Helpers
     ============================================================ */
  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ============================================================
     Product card
     ============================================================ */
  function renderCard(p) {
    var techChips = (p.tech || []).slice(0, 3).map(function (t) {
      return '<span>' + escapeHtml(t) + '</span>';
    }).join('');

    var badgeHtml = p.badge
      ? '<span class="st-card__badge' + (p.badge === 'Featured' ? ' st-card__badge--featured' : '') + '">' + escapeHtml(p.badge) + '</span>'
      : '';

    var imgHtml = p.image
      ? '<img class="st-card__img" alt="' + escapeHtml(p.name) + ' preview" loading="lazy" decoding="async" data-lazy="' + escapeHtml(p.image) + '" />'
      : '';

    return '' +
      '<button class="st-card" type="button" data-product-id="' + escapeHtml(p.id) + '" data-category="' + escapeHtml(p.category) + '" aria-label="View ' + escapeHtml(p.name) + '">' +
        '<div class="st-card__preview" aria-hidden="true">' +
          badgeHtml +
          imgHtml +
          '<div class="st-card__placeholder">' + getMockup(p.category) + '</div>' +
        '</div>' +
        '<div class="st-card__body">' +
          '<p class="st-card__cat">' + escapeHtml(p.categoryLabel) + '</p>' +
          '<h3 class="st-card__name">' + escapeHtml(p.name) + '</h3>' +
          '<p class="st-card__tagline">' + escapeHtml(p.tagline) + '</p>' +
          '<div class="st-card__tech">' + techChips + '</div>' +
          '<div class="st-card__foot">' +
            '<span class="st-card__price">' + escapeHtml(p.price) + '</span>' +
            '<span class="st-card__cta">View Product</span>' +
          '</div>' +
        '</div>' +
      '</button>';
  }

  function renderGrid() {
    grid.innerHTML = PRODUCTS.map(renderCard).join('');
    lazyLoad(grid);
  }

  /* ============================================================
     Bento visuals + hero tiles
     ============================================================ */
  function renderBentoVisuals() {
    document.querySelectorAll('[data-bento-visual]').forEach(function (el) {
      var cat = el.getAttribute('data-bento-visual');
      el.innerHTML = getMockup(cat);
    });

    document.querySelectorAll('.st-hero__tile').forEach(function (tile) {
      var type = tile.getAttribute('data-tile');
      var cat = type === 'landing' ? 'landing-pages'
              : type === 'ui' ? 'ui-kits'
              : 'code-components';
      tile.innerHTML = getMockup(cat);
    });

    var bundleViz = document.querySelector('[data-bundle-visual]');
    if (bundleViz) bundleViz.innerHTML = getMockup('ui-kits');
  }

  /* ============================================================
     Featured spotlight
     ============================================================ */
  function renderSpotlight() {
    var host = document.querySelector('[data-st-spotlight]');
    if (!host) return;
    var featured = PRODUCTS.filter(function (p) { return p.featured; })[0] || PRODUCTS[0];
    if (!featured) return;

    var featuresHtml = (featured.features || []).slice(0, 4).map(function (f) {
      return '<li>' + escapeHtml(f) + '</li>';
    }).join('');

    host.innerHTML =
      '<div class="st-spotlight__visual">' +
        '<span class="st-spotlight__badge">Featured</span>' +
        getMockup(featured.category) +
      '</div>' +
      '<div class="st-spotlight__body">' +
        '<p class="st-spotlight__cat">' + escapeHtml(featured.categoryLabel) + '</p>' +
        '<h3 class="st-spotlight__title">' + escapeHtml(featured.name) + '</h3>' +
        '<p class="st-spotlight__desc">' + escapeHtml(featured.description) + '</p>' +
        '<ul class="st-spotlight__features">' + featuresHtml + '</ul>' +
        '<div class="st-spotlight__foot">' +
          '<div class="st-spotlight__price">' +
            '<span class="st-spotlight__price-label">Price</span>' +
            '<span class="st-spotlight__price-value">' + escapeHtml(featured.price) + '</span>' +
          '</div>' +
          '<button class="st-btn st-btn--solid" type="button" data-spotlight-buy="' + escapeHtml(featured.id) + '">Buy on WhatsApp</button>' +
        '</div>' +
      '</div>';
  }

  /* ============================================================
     Filters
     ============================================================ */
  function applyFilter(value) {
    var cards = grid.querySelectorAll('.st-card');
    var visible = 0;
    cards.forEach(function (card) {
      var match = value === 'all' || card.getAttribute('data-category') === value;
      if (match) { card.removeAttribute('hidden'); visible++; }
      else { card.setAttribute('hidden', ''); }
    });
    if (visible === 0) grid.setAttribute('data-empty', '');
    else grid.removeAttribute('data-empty');
    filters.forEach(function (btn) {
      var on = btn.getAttribute('data-filter') === value;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter(btn.getAttribute('data-filter') || 'all');
    });
  });

  /* Bento tile → filter + scroll to products */
  document.querySelectorAll('[data-bento-filter]').forEach(function (tile) {
    tile.addEventListener('click', function (e) {
      e.preventDefault();
      var value = tile.getAttribute('data-bento-filter');
      applyFilter(value);
      var target = document.getElementById('products');
      if (target) {
        if (window.__noexaLenis && typeof window.__noexaLenis.scrollTo === 'function') {
          window.__noexaLenis.scrollTo(target, { offset: -60 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ============================================================
     Modal
     ============================================================ */
  function clearErrors() {
    form.querySelectorAll('.st-field').forEach(function (f) {
      f.classList.remove('has-error');
      var err = f.querySelector('.st-field__error');
      if (err) err.textContent = '';
    });
  }

  function setError(id, message) {
    var input = form.querySelector('#' + id);
    if (!input) return;
    var wrap = input.closest('.st-field');
    if (!wrap) return;
    wrap.classList.add('has-error');
    var err = wrap.querySelector('.st-field__error');
    if (err) err.textContent = message;
  }

  function openModal(productId, trigger) {
    var p = PRODUCTS.filter(function (x) { return x.id === productId; })[0];
    if (!p || !modal) return;

    activeProduct = p;
    lastTrigger = trigger || null;

    elCat.textContent     = p.categoryLabel;
    elTitle.textContent   = p.name;
    elDesc.textContent    = p.description;
    elLicense.textContent = p.license;
    elPrice.textContent   = p.price;

    elPreview.innerHTML = p.image
      ? '<img src="' + escapeHtml(p.image) + '" alt="' + escapeHtml(p.name) + '" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />'
      : getMockup(p.category);

    elIncludes.innerHTML = '';
    (p.includes || []).forEach(function (i) {
      var li = document.createElement('li');
      li.textContent = i;
      elIncludes.appendChild(li);
    });
    if (includesSec) includesSec.hidden = !(p.includes && p.includes.length);

    elFeatures.innerHTML = '';
    (p.features || []).forEach(function (f) {
      var li = document.createElement('li');
      li.textContent = f;
      elFeatures.appendChild(li);
    });
    if (featuresSec) featuresSec.hidden = !(p.features && p.features.length);

    elTech.innerHTML = '';
    (p.tech || []).forEach(function (t) {
      var span = document.createElement('span');
      span.textContent = t;
      elTech.appendChild(span);
    });

    clearErrors();
    form.reset();
    statusEl.textContent = '';
    statusEl.classList.remove('is-visible');

    modal.removeAttribute('hidden');
    void modal.offsetWidth;
    modal.classList.add('is-open');
    document.body.classList.add('st-modal-open');

    setTimeout(function () {
      var first = modal.querySelector('#stName');
      if (first) first.focus();
    }, 60);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('st-modal-open');
    setTimeout(function () { modal.setAttribute('hidden', ''); }, 320);
    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      try { lastTrigger.focus(); } catch (_) {}
    }
  }

  grid.addEventListener('click', function (e) {
    var card = e.target.closest('.st-card');
    if (!card) return;
    openModal(card.getAttribute('data-product-id'), card);
  });

  document.addEventListener('click', function (e) {
    var spot = e.target.closest('[data-spotlight-buy]');
    if (spot) {
      openModal(spot.getAttribute('data-spotlight-buy'), spot);
      return;
    }
    var bundle = e.target.closest('[data-st-bundle-cta]');
    if (bundle) {
      var divider = '━━━━━━━━━━━━━━━━━━';
      var msg = [
        'Hello NovExa Tech,', '',
        'I am interested in the Complete Collection bundle.', '',
        divider,
        'BUNDLE REQUEST',
        divider, '',
        'Please share the bundle price and what it includes.',
        '', 'Thank you.'
      ].join('\n');
      if (!WA_NUMBER) return;
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    }
  });

  modal.querySelectorAll('[data-st-close]').forEach(function (el) {
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
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    var first = focusables[0];
    var last  = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ============================================================
     Checkout via WhatsApp
     ============================================================ */
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function buildOrderMessage(product, buyer) {
    var divider = '━━━━━━━━━━━━━━━━━━';
    var lines = [];
    lines.push('Hello NovExa Tech,', '');
    lines.push("I'd like to purchase a digital product from your store.", '');
    lines.push(divider); lines.push('PRODUCT'); lines.push(divider, '');
    lines.push('Name: ' + product.name);
    lines.push('Category: ' + product.categoryLabel);
    lines.push('Price: ' + product.price);
    lines.push('License: ' + product.license);
    lines.push('');
    lines.push(divider); lines.push('BUYER'); lines.push(divider, '');
    lines.push('Name: ' + buyer.name);
    lines.push('Email: ' + buyer.email);
    lines.push('');
    lines.push('Please send me the payment and delivery details.');
    lines.push('', 'Thank you,', buyer.name);
    return lines.join('\n');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!activeProduct) return;

    clearErrors();

    var nameEl  = form.querySelector('#stName');
    var emailEl = form.querySelector('#stEmail');
    var name    = String(nameEl.value || '').trim();
    var email   = String(emailEl.value || '').trim();
    var firstInvalid = null;

    if (!name) { setError('stName', 'Please enter your name.'); firstInvalid = firstInvalid || nameEl; }
    else if (name.length < 2) { setError('stName', 'Name must be at least 2 characters.'); firstInvalid = firstInvalid || nameEl; }

    if (!email) { setError('stEmail', 'Please enter your email.'); firstInvalid = firstInvalid || emailEl; }
    else if (!emailRe.test(email)) { setError('stEmail', 'Please enter a valid email address.'); firstInvalid = firstInvalid || emailEl; }

    if (firstInvalid) { firstInvalid.focus(); return; }

    if (!WA_NUMBER) {
      statusEl.textContent = 'WhatsApp is not configured. Please email us instead.';
      statusEl.classList.add('is-visible');
      return;
    }

    var message = buildOrderMessage(activeProduct, { name: name, email: email });
    var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);

    statusEl.textContent = 'Your order details are ready in WhatsApp.';
    statusEl.classList.add('is-visible');

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
  });

  /* ============================================================
     FAQ accordion
     ============================================================ */
  document.querySelectorAll('.st-faq__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var faq = btn.closest('.st-faq');
      var open = faq.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ============================================================
     Reveal animations
     ============================================================ */
  function initReveal() {
    var els = document.querySelectorAll('[data-st-reveal]');
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
    var video = document.querySelector('.st-hero__video');
    if (!video) return;

    /* Reveal only when the video can actually play */
    function markReady() {
      video.classList.add('is-ready');
      video.classList.remove('is-missing');
    }

    /* Hide only on a real failure */
    function markMissing(reason) {
      if (reason) console.info('[NovExa Tech Store] Hero video unavailable:', reason);
      video.classList.add('is-missing');
      video.classList.remove('is-ready');
    }

    video.addEventListener('loadeddata', markReady, { once: true });
    video.addEventListener('canplay',    markReady, { once: true });

    video.addEventListener('error', function () {
      markMissing('file not found or unsupported codec at ' + (video.currentSrc || video.src));
    }, { once: true });

    /* Some browsers silently block autoplay — try once, catch gracefully. */
    var p = video.play && video.play();
    if (p && typeof p.catch === 'function') {
      p.catch(function () {
        markMissing('autoplay blocked by browser');
      });
    }

    /* If after 6 s the video still hasn't loaded, treat it as missing. */
    setTimeout(function () {
      if (video.readyState < 2 && !video.classList.contains('is-ready')) {
        markMissing('timed out waiting for video data');
      }
    }, 6000);
  }

  /* ============================================================
     Init
     ============================================================ */
  renderBentoVisuals();
  renderSpotlight();
  renderGrid();
  initReveal();
  initHeroVideo();
})();