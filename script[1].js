/*!
 * Nouf F. Albadrani — Executive Portfolio
 * Vanilla JS only, no dependencies. Organized into clearly labeled
 * sections so each concern (language, nav, mascot, premium FX) can be
 * found and maintained independently.
 */
(function () {
  'use strict';

  var html = document.documentElement;
  var reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function prefersReducedMotion() {
    return html.classList.contains('no-motion');
  }

  /* =======================================================
     1) REDUCED-MOTION DETECTION
     Sets .no-motion on <html> so CSS can disable/shorten
     every animation added throughout this file.
     ======================================================= */
  (function initMotionPreference() {
    var STORAGE_KEY = 'nfa-portfolio-motion';
    var toggle = document.getElementById('motionToggle');

    function apply(reduced) {
      html.classList.toggle('no-motion', reduced);
      if (toggle) {
        toggle.setAttribute('aria-pressed', String(reduced));
        toggle.setAttribute(
          'aria-label',
          reduced ? 'Enable animations' : 'Reduce motion'
        );
      }
    }

    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }

    if (saved === 'reduced') apply(true);
    else if (saved === 'full') apply(false);
    else apply(reducedMotionQuery.matches);

    if (reducedMotionQuery.addEventListener) {
      reducedMotionQuery.addEventListener('change', function (mq) {
        if (!saved) apply(mq.matches); // only auto-follow the OS if the visitor hasn't chosen manually
      });
    }

    if (toggle) {
      toggle.addEventListener('click', function () {
        var next = !html.classList.contains('no-motion');
        apply(next);
        saved = next ? 'reduced' : 'full';
        try { localStorage.setItem(STORAGE_KEY, saved); } catch (e) { /* ignore */ }
      });
    }
  })();

  /* =======================================================
     2) LANGUAGE TOGGLE (EN / AR, instant, persisted)
     ======================================================= */
  (function initLanguage() {
    var STORAGE_KEY = 'nfa-portfolio-lang';
    var langToggle = document.getElementById('langToggle');
    if (!langToggle) return;

    function applyLang(lang) {
      html.setAttribute('data-lang', lang);
      html.setAttribute('lang', lang);
      html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      langToggle.setAttribute(
        'aria-label',
        lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'
      );
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage unavailable, ignore */ }
    }

    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    if (saved === 'en' || saved === 'ar') applyLang(saved);

    langToggle.addEventListener('click', function () {
      applyLang(html.getAttribute('data-lang') === 'en' ? 'ar' : 'en');
    });
  })();

  /* =======================================================
     3) MOBILE NAV (burger toggle with aria-expanded)
     ======================================================= */
  (function initMobileNav() {
    var navBurger = document.getElementById('navBurger');
    var navLinks = document.getElementById('navLinks');
    if (!navBurger || !navLinks) return;

    navBurger.setAttribute('aria-expanded', 'false');
    navBurger.setAttribute('aria-controls', 'navLinks');

    navBurger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navBurger.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        navBurger.setAttribute('aria-expanded', 'false');
      }
    });
  })();

  /* =======================================================
     4) SECTION REVEAL (fade + rise on first scroll-into-view)
     ======================================================= */
  (function initSectionReveal() {
    var targets = document.querySelectorAll('.section-inner, .hero-inner');
    if (!('IntersectionObserver' in window) || !targets.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    targets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .7s ease, transform .7s ease';
      observer.observe(el);
    });
  })();

  /* =======================================================
     5) HERO NAME — premium letter-by-letter reveal
     (Wraps the existing text at runtime; the displayed
     content itself is never changed.)
     ======================================================= */
  var heroName = document.querySelector('.hero-name');
  (function wrapHeroNameLetters() {
    if (!heroName) return;
    var raw = heroName.textContent;
    var frag = document.createDocumentFragment();
    var delay = 0;
    for (var i = 0; i < raw.length; i++) {
      var ch = raw[i];
      var span = document.createElement('span');
      span.className = 'char' + (ch === ' ' ? ' space' : '');
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.animationDelay = delay + 'ms';
      frag.appendChild(span);
      if (ch !== ' ') delay += 45;
    }
    heroName.textContent = '';
    heroName.appendChild(frag);
  })();

  /* =======================================================
     6) MASCOT — pose engine + section choreography
     One persistent SVG; only its data-pose attribute and a
     few CSS classes change as the visitor scrolls.
     ======================================================= */
  var stage = document.getElementById('mascotStage');
  var mascot = (function initMascot() {
    if (!stage) return null;

    var hasWaved = false;
    var pendingPointTimer = null;
    var introActive = true; // the intro sequence (section 7) owns the very first "wave"

    function setPose(pose) {
      if (stage.getAttribute('data-pose') === pose) return;
      stage.setAttribute('data-pose', pose);
      stage.classList.remove('pose-changed');
      void stage.offsetWidth; // force reflow so the one-shot animation can replay
      stage.classList.add('pose-changed');
    }

    function reveal() {
      stage.classList.add('is-visible');
    }

    var poseMap = {
      home: 'wave',
      about: 'folded',
      experience: 'folder',
      education: 'education',
      skills: 'tablet',
      certifications: 'certificate',
      volunteer: 'gesture',
      contact: 'contact'
    };

    function onSectionEnter(id) {
      reveal();
      if (id !== 'home') {
        setPose(poseMap[id]);
        return;
      }
      if (introActive) return; // handled by the cinematic intro instead
      if (hasWaved) {
        setPose('point');
        return;
      }
      hasWaved = true;
      setPose('wave');
      clearTimeout(pendingPointTimer);
      pendingPointTimer = setTimeout(function () {
        setPose('point');
      }, prefersReducedMotion() ? 0 : 2200);
    }

    return {
      setPose: setPose,
      reveal: reveal,
      poseMap: poseMap,
      onSectionEnter: onSectionEnter,
      markIntroDone: function () { introActive = false; },
      markWaved: function () { hasWaved = true; }
    };
  })();

  /* =======================================================
     7) CINEMATIC INTRO
     Loader fades from black → mascot greets from its center
     → steps out to her docked position as the name reveals.
     ======================================================= */
  (function initIntro() {
    if (!mascot) return;
    var overlay = document.getElementById('introOverlay');
    var skipBtn = document.getElementById('introSkip');
    var settleTimer = null;
    var stepOutTimer = null;

    function finish() {
      clearTimeout(settleTimer);
      clearTimeout(stepOutTimer);
      if (overlay) overlay.classList.add('is-hidden', 'is-done');
      stage.classList.remove('in-loader');
      mascot.reveal();
      mascot.setPose('point');
      mascot.markWaved();
      if (heroName) heroName.classList.add('ink-draw');
      mascot.markIntroDone();
    }

    if (skipBtn) skipBtn.addEventListener('click', finish);

    function runIntro() {
      if (prefersReducedMotion()) { finish(); return; }

      stage.classList.add('in-loader');
      mascot.reveal();
      mascot.setPose('wave');
      mascot.markWaved();

      // Kept brief on purpose: a recruiter's attention is scarce —
      // the greeting should read as a flourish, not a wait.
      stepOutTimer = setTimeout(function () {
        if (overlay) overlay.classList.add('is-hidden');
        stage.classList.remove('in-loader');
        if (heroName) heroName.classList.add('ink-draw');

        settleTimer = setTimeout(function () {
          mascot.setPose('point');
          mascot.markIntroDone();
        }, 700);
      }, 1300);

      if (overlay) {
        overlay.addEventListener('transitionend', function handler() {
          overlay.classList.add('is-done');
          overlay.removeEventListener('transitionend', handler);
        });
      }
    }

    if (document.readyState === 'complete') runIntro();
    else window.addEventListener('load', runIntro);
  })();

  /* =======================================================
     8) SHARED SECTION OBSERVER
     A single IntersectionObserver drives both the mascot's
     pose changes and the nav's active-link highlight, so
     each section is only ever watched once.
     ======================================================= */
  (function initSectionObserver() {
    var navAnchors = document.querySelectorAll('.nav-links a');
    var idToAnchors = {};
    navAnchors.forEach(function (a) {
      var id = a.getAttribute('href').replace('#', '');
      (idToAnchors[id] = idToAnchors[id] || []).push(a);
    });

    var idSet = {};
    Object.keys(idToAnchors).forEach(function (id) { idSet[id] = true; });
    if (mascot) Object.keys(mascot.poseMap).forEach(function (id) { idSet[id] = true; });

    var sections = Object.keys(idSet)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    if (!('IntersectionObserver' in window) || !sections.length) {
      if (mascot) { mascot.reveal(); mascot.setPose('gesture'); }
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;

        if (mascot && mascot.poseMap[id]) mascot.onSectionEnter(id);

        if (idToAnchors[id]) {
          navAnchors.forEach(function (a) { a.classList.remove('is-active'); });
          idToAnchors[id].forEach(function (a) { a.classList.add('is-active'); });
        }
      });
    }, { threshold: 0.45 });

    sections.forEach(function (el) { observer.observe(el); });
  })();

  /* =======================================================
     9) SKILLS — subtle tablet-screen pulse on hover
     ======================================================= */
  (function initSkillsHover() {
    if (!stage) return;
    var skillItems = document.querySelectorAll('.skills-grid li');
    skillItems.forEach(function (li) {
      li.addEventListener('mouseenter', function () { stage.classList.add('tablet-pulse'); });
      li.addEventListener('mouseleave', function () { stage.classList.remove('tablet-pulse'); });
    });
  })();

  /* =======================================================
     10) SCROLL-DRIVEN UI (rAF-throttled: one listener drives
     the progress bar, nav shrink, back-to-top button, and
     hero parallax — avoids redundant scroll handlers).
     ======================================================= */
  (function initScrollEffects() {
    var progressBar = document.getElementById('scrollProgressBar');
    var nav = document.querySelector('.site-nav');
    var heroGrain = document.querySelector('.hero-grain');
    var backToTop = document.getElementById('backToTop');
    var ticking = false;

    function onScrollFrame() {
      var scrollTop = window.pageYOffset || html.scrollTop;
      var scrollable = html.scrollHeight - html.clientHeight;
      var pct = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;

      if (progressBar) progressBar.style.width = pct + '%';
      if (nav) nav.classList.toggle('is-scrolled', scrollTop > 40);
      if (backToTop) backToTop.classList.toggle('is-visible', scrollTop > window.innerHeight * 0.6);
      if (heroGrain && !prefersReducedMotion()) {
        heroGrain.style.transform = 'translateY(' + (scrollTop * 0.08) + 'px)';
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(onScrollFrame);
        ticking = true;
      }
    }, { passive: true });
    onScrollFrame();

    if (backToTop) {
      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      });
    }
  })();

  /* =======================================================
     11) POINTER FX — mouse glow + custom cursor
     Combined into a single mousemove listener (desktop,
     fine-pointer only) to avoid duplicate style writes.
     ======================================================= */
  (function initPointerEffects() {
    var isFinePointer = window.matchMedia('(pointer:fine)').matches;
    if (!isFinePointer || window.innerWidth <= 900 || prefersReducedMotion()) return;

    var glow = document.getElementById('mouseGlow');
    var cursor = document.getElementById('customCursor');
    var cursorDot = cursor ? cursor.querySelector('.cc-dot') : null;
    var cursorRing = cursor ? cursor.querySelector('.cc-ring') : null;
    var glowActive = false;

    if (cursor) document.body.classList.add('has-custom-cursor');

    document.addEventListener('mousemove', function (e) {
      var pos = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
      if (glow) {
        glow.style.transform = pos + ' translate(-50%,-50%)';
        if (!glowActive) { glow.classList.add('is-active'); glowActive = true; }
      }
      if (cursorDot) cursorDot.style.transform = pos;
      if (cursorRing) cursorRing.style.transform = pos;
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      if (glow) { glow.classList.remove('is-active'); glowActive = false; }
      if (cursor) cursor.classList.add('is-hidden');
    });
    document.addEventListener('mouseenter', function () {
      if (cursor) cursor.classList.remove('is-hidden');
    });

    if (cursor) {
      var hoverTargets = document.querySelectorAll('a, button, .skills-grid li, .cert-card, .contact-card');
      hoverTargets.forEach(function (el) {
        el.addEventListener('mouseenter', function () { cursor.classList.add('is-hover'); });
        el.addEventListener('mouseleave', function () { cursor.classList.remove('is-hover'); });
      });
    }
  })();

  /* =======================================================
     12) HERO PARTICLES (generated once; CSS drives motion)
     ======================================================= */
  (function initHeroParticles() {
    var host = document.getElementById('heroParticles');
    if (!host || prefersReducedMotion() || window.innerWidth <= 760) return;

    var count = 14;
    for (var i = 0; i < count; i++) {
      var p = document.createElement('span');
      p.className = 'p';
      var size = 2 + Math.random() * 3;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
      p.style.animationDuration = (9 + Math.random() * 9) + 's';
      p.style.animationDelay = (Math.random() * 12) + 's';
      host.appendChild(p);
    }
  })();

  /* =======================================================
     13) CONTACT — copy-to-clipboard email button
     ======================================================= */
  (function initCopyEmail() {
    var copyBtn = document.getElementById('copyEmailBtn');
    if (!copyBtn) return;

    var EMAIL = 'noufalbadrani3@gmail.com';

    function showCopied() {
      copyBtn.classList.add('is-copied');
      setTimeout(function () { copyBtn.classList.remove('is-copied'); }, 1800);
    }

    copyBtn.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).then(showCopied, showCopied);
        return;
      }
      // Fallback for browsers without the Clipboard API
      var temp = document.createElement('textarea');
      temp.value = EMAIL;
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      document.body.appendChild(temp);
      temp.select();
      try { document.execCommand('copy'); } catch (e) { /* clipboard unavailable, ignore */ }
      document.body.removeChild(temp);
      showCopied();
    });
  })();
})();
