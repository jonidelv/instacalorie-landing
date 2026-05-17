/* Instacalorie landing. Progressive enhancement only.
   One IntersectionObserver for reveals, one rAF loop for scroll work.
   Everything degrades cleanly without JS or with reduced-motion. */
(function () {
  'use strict';

  var doc = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* ---------- hero load choreography ---------- */
  // defer script runs post-parse; double-rAF paints the hidden state once,
  // then releases the staggered transitions.
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { doc.classList.add('is-loaded'); });
  });

  /* ---------- scroll reveals (one-time) ---------- */
  var revs = document.querySelectorAll('.reveal');
  if (!hasIO) {
    for (var i = 0; i < revs.length; i++) revs[i].classList.add('is-in');
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          ro.unobserve(e.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
    revs.forEach(function (el) { ro.observe(el); });
  }

  /* ---------- signature scan (fires once) ---------- */
  var scan = document.querySelector('[data-scan]');
  if (scan) {
    if (!hasIO) {
      scan.classList.add('scan--run');
    } else {
      var so = new IntersectionObserver(function (en) {
        en.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('scan--run');
            so.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      so.observe(scan);
    }
  }

  /* ---------- hero-active scope (will-change + aurora pause) ---------- */
  var hero = document.querySelector('[data-hero]');
  var heroActive = true;
  if (hero && hasIO) {
    document.body.classList.add('hero-active');
    var ho = new IntersectionObserver(function (en) {
      var vis = en[0].isIntersecting;
      heroActive = vis;
      document.body.classList.toggle('hero-active', vis);
      document.body.classList.toggle('hero-idle', !vis);
    }, { threshold: 0 });
    ho.observe(hero);
  }

  /* ---------- shared rAF loop: progress · nav · cue · parallax ---------- */
  var bar = document.querySelector('[data-progress]');
  var nav = document.querySelector('[data-nav]');
  var cue = document.querySelector('[data-cue]');
  // scroll-parallax targets the stage, NOT .hero__phones (which owns the
  // load-entrance transform) so the two never fight over `transform`.
  var stage = document.querySelector('.hero__stage');
  var aurora = document.querySelector('.aurora');
  var parPhones = hero ? hero.querySelectorAll('[data-par="phone"]') : [];

  var navScrolled = false, cueHidden = false, ticking = false;

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }

  function frame() {
    ticking = false;
    var y = window.pageYOffset || doc.scrollTop;

    var docH = doc.scrollHeight - window.innerHeight;
    var p = docH > 0 ? y / docH : 0;
    if (p < 0) p = 0; else if (p > 1) p = 1;
    if (bar) bar.style.transform = 'scaleX(' + p + ')';

    if (nav) {
      if (!navScrolled && y > 24) { navScrolled = true; nav.classList.add('nav--scrolled'); }
      else if (navScrolled && y < 8) { navScrolled = false; nav.classList.remove('nav--scrolled'); }
    }

    if (cue && !cueHidden && y > 40) { cueHidden = true; cue.classList.add('is-hidden'); }

    if (!reduce && heroActive && hero) {
      var hp = y / hero.offsetHeight;
      if (hp > 1) hp = 1; else if (hp < 0) hp = 0;
      if (stage) stage.style.transform = 'translate3d(0,' + (hp * -54).toFixed(2) + 'px,0)';
      if (aurora) aurora.style.transform = 'translate3d(0,' + (hp * 40).toFixed(2) + 'px,0)';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ---------- pointer parallax (desktop, motion-ok) with lerp ---------- */
  var canPointer = !reduce &&
    window.matchMedia('(hover:hover) and (pointer:fine)').matches &&
    window.innerWidth >= 900;

  if (canPointer && hero && parPhones.length) {
    var tx = 0, ty = 0, cx = 0, cy = 0, rafP = false;

    function loopP() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      for (var i = 0; i < parPhones.length; i++) {
        var d = parseFloat(parPhones[i].getAttribute('data-depth')) || 1;
        parPhones[i].style.setProperty('--mx', (cx * 14 * d).toFixed(2) + 'px');
        parPhones[i].style.setProperty('--my', (cy * 14 * d).toFixed(2) + 'px');
      }
      if (Math.abs(tx - cx) > 0.0008 || Math.abs(ty - cy) > 0.0008) {
        requestAnimationFrame(loopP);
      } else { rafP = false; }
    }
    function kick() { if (!rafP) { rafP = true; requestAnimationFrame(loopP); } }

    hero.addEventListener('mousemove', function (e) {
      tx = (e.clientX / window.innerWidth) - 0.5;
      ty = (e.clientY / window.innerHeight) - 0.5;
      kick();
    }, { passive: true });
    hero.addEventListener('mouseleave', function () { tx = 0; ty = 0; kick(); });
  }
})();
