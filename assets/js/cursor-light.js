/* ============================================================
   NoExaTech — Cursor Light
   Ambient blue glow that follows the cursor on desktop.
   Purely decorative. Skipped on touch + reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  if (window.matchMedia('(hover: none)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var light = null;
  var targetX = window.innerWidth / 2;
  var targetY = window.innerHeight / 2;
  var currentX = targetX;
  var currentY = targetY;
  var rafId = null;
  var activated = false;
  var EASE = 0.12;

  function ensureLight() {
    if (light) return light;
    light = document.createElement('div');
    light.className = 'nx-cursor-light';
    light.setAttribute('aria-hidden', 'true');
    document.body.appendChild(light);
    return light;
  }

  function applyTransform(x, y) {
    if (!light) return;
    light.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
  }

  function tick() {
    currentX += (targetX - currentX) * EASE;
    currentY += (targetY - currentY) * EASE;
    applyTransform(currentX, currentY);

    var dx = Math.abs(targetX - currentX);
    var dy = Math.abs(targetY - currentY);
    rafId = (dx > 0.5 || dy > 0.5) ? requestAnimationFrame(tick) : null;
  }

  function onMove(e) {
    ensureLight();

    targetX = e.clientX;
    targetY = e.clientY;

    if (!activated) {
      activated = true;
      currentX = targetX;
      currentY = targetY;
      applyTransform(currentX, currentY);
      requestAnimationFrame(function () {
        light.classList.add('is-active');
      });
    }

    if (rafId === null) rafId = requestAnimationFrame(tick);
  }

  function onOut(e) {
    if (!e.relatedTarget && !e.toElement && light) {
      light.classList.remove('is-active');
    }
  }

  function onOver() {
    if (light && activated) light.classList.add('is-active');
  }

  document.addEventListener('mousemove', onMove, { passive: true });
  document.addEventListener('mouseout', onOut, { passive: true });
  document.addEventListener('mouseover', onOver, { passive: true });
})();
