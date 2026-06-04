function initWeddingInvite() {
  var lockStyle = document.getElementById('splash-scroll-lock');
  if (!lockStyle) {
    lockStyle = document.createElement('style');
    lockStyle.id = 'splash-scroll-lock';
    lockStyle.textContent =
      'html.splash-active, html.splash-active body {' +
      '  overflow: hidden !important; height: 100% !important;' +
      '  overscroll-behavior: none; touch-action: none; position: relative; width: 100%;' +
      '}' +
      '#splash { overflow: hidden !important; overscroll-behavior: none; touch-action: manipulation; }';
    document.head.appendChild(lockStyle);
  }
  document.documentElement.classList.add('splash-active');

  function unlockScroll() {
    document.documentElement.classList.remove('splash-active');
  }

  const cfg = WEDDING_CONFIG;
  const g = cfg.groom.name;
  const b = cfg.bride.name;
  const t = cfg.texts;

  document.title = g + ' & ' + b + ' — Arooska';

  var meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'description';
    document.head.appendChild(meta);
  }
  meta.content = t.heroSub + ' — ' + g + ' & ' + b + ' — ' + cfg.date;

  const set = function(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set('splashInitials', g[0] + ' & ' + b[0]);
  set('splashSub', t.splashSub);
  set('splashGroom', g);
  set('splashBride', b);
  set('splashHint', t.splashHint);
  set('heroSub', t.heroSub);
  set('scrollHint', t.scrollHint);
  set('coupleSub', t.coupleSub);
  set('coupleTitle', t.coupleTitle);
  set('heroGroom', g);
  set('heroBride', b);
  set('heroDate', cfg.date);
  set('gallerySub', t.gallerySub);
  set('galleryTitle', t.galleryTitle);
  set('loveSub', t.loveSub);
  set('loveTitle', t.loveTitle);
  set('loveQuote', t.loveQuote);
  set('loveSign', '— ' + t.loveSign);
  set('countdownSub', t.countdownSub);
  set('countdownTitle', t.countdownTitle);
  set('venueSub', t.venueSub);
  set('venueTitle', t.venueTitle);
  set('venueName', cfg.venue && cfg.venue.name);
  set('venueAddress', cfg.venue && cfg.venue.address);
  set('venueTime', cfg.venue && cfg.venue.time);
  set('heroTime', cfg.venue && cfg.venue.time);
  set('labelDays', t.countdownDays);
  set('labelHours', t.countdownHours);
  set('labelMins', t.countdownMins);
  set('labelSecs', t.countdownSecs);
  set('rsvpSub', t.rsvpSub);
  set('rsvpTitle', t.rsvpTitle);
  set('rsvpMessage', t.rsvpMessage);
  set('footerNames', g + ' & ' + b);
  set('footerTag', cfg.date + ' — ' + t.footerTag);

  const heroBg = document.getElementById('heroBg');
  if (heroBg && heroBg.style) heroBg.style.backgroundImage = "url('" + cfg.heroImage + "')";

  var venueBtn = document.getElementById('venueBtn');
  if (venueBtn && cfg.venue && cfg.venue.mapUrl) {
    venueBtn.textContent = t.venueBtn || 'Fur Khariidadda';
    venueBtn.href = cfg.venue.mapUrl;
    venueBtn.target = '_blank';
    venueBtn.rel = 'noopener';
  }

  const rsvpBtn = document.getElementById('rsvpBtn');
  if (rsvpBtn) {
    rsvpBtn.textContent = t.rsvpBtn;
    rsvpBtn.href = 'https://wa.me/' + cfg.whatsapp + '?text=' +
      encodeURIComponent(t.waMessage + ' ' + g + ' & ' + b + '!');
  }

  const coupleGrid = document.getElementById('coupleGrid');
  if (coupleGrid && !coupleGrid.dataset.custom) {
    coupleGrid.innerHTML =
      '<div class="couple-card"><img class="couple-photo" src="' + cfg.groom.photo + '" alt="' + g + '" />' +
      '<h3 class="couple-name">' + g + '</h3><p class="couple-role">' + t.groomRole + '</p>' +
      '<p class="couple-desc">"' + cfg.groom.quote + '"</p></div>' +
      '<div class="couple-card"><img class="couple-photo" src="' + cfg.bride.photo + '" alt="' + b + '" />' +
      '<h3 class="couple-name">' + b + '</h3><p class="couple-role">' + t.brideRole + '</p>' +
      '<p class="couple-desc">"' + cfg.bride.quote + '"</p></div>';
  }

  const gallery = document.getElementById('gallery');
  if (gallery && !gallery.dataset.custom) {
    gallery.innerHTML = cfg.gallery.map(function(url) {
      return '<div class="gallery-item"><img src="' + url + '" alt="Sawir" /></div>';
    }).join('');
  }

  /* ===== MUUSIG — automatic marka la galo ===== */
  const weddingMusic = document.getElementById('weddingMusic');
  const musicControl = document.getElementById('musicControl');
  const DEFAULT_MUSIC = 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_8cb749bf48.mp3?filename=romantic-wedding-background-music-124464.mp3';
  const TARGET_VOLUME = 0.45;
  let musicPlaying = false;
  let usedFallback = false;
  let fadeTimer = null;

  function showMusicBtn(playing) {
    if (!musicControl) return;
    musicControl.classList.add('show');
    if (playing) musicControl.classList.add('playing');
    else musicControl.classList.remove('playing');
  }

  function fadeInMusic() {
    if (!weddingMusic) return;
    clearInterval(fadeTimer);
    weddingMusic.volume = 0;
    fadeTimer = setInterval(function() {
      if (weddingMusic.volume < TARGET_VOLUME) {
        weddingMusic.volume = Math.min(TARGET_VOLUME, weddingMusic.volume + 0.03);
      } else {
        clearInterval(fadeTimer);
      }
    }, 60);
  }

  function tryPlayMusic() {
    if (!weddingMusic) return Promise.resolve(false);

    weddingMusic.loop = true;

    return weddingMusic.play().then(function() {
      musicPlaying = true;
      showMusicBtn(true);
      fadeInMusic();
      return true;
    }).catch(function() {
      showMusicBtn(false);
      return false;
    });
  }

  function useFallbackMusic() {
    if (!weddingMusic || usedFallback) return;
    usedFallback = true;
    weddingMusic.src = DEFAULT_MUSIC;
    weddingMusic.load();
  }

  if (weddingMusic) {
    weddingMusic.preload = 'auto';
    weddingMusic.playsInline = true;
    weddingMusic.setAttribute('playsinline', '');
    weddingMusic.setAttribute('webkit-playsinline', '');
    weddingMusic.volume = 0;
    weddingMusic.src = cfg.music;
    weddingMusic.load();

    weddingMusic.addEventListener('error', useFallbackMusic);

    weddingMusic.addEventListener('canplaythrough', function() {
      weddingMusic.dataset.ready = '1';
    });
  }

  function startMusic() {
    if (!weddingMusic) return;

    function attempt() {
      tryPlayMusic().then(function(ok) {
        if (!ok && usedFallback) {
          setTimeout(attempt, 300);
        } else if (!ok && !usedFallback) {
          useFallbackMusic();
          weddingMusic.addEventListener('canplay', function handler() {
            weddingMusic.removeEventListener('canplay', handler);
            tryPlayMusic();
          });
        }
      });
    }

    if (weddingMusic.readyState >= 2) {
      attempt();
    } else {
      weddingMusic.addEventListener('canplay', function handler() {
        weddingMusic.removeEventListener('canplay', handler);
        attempt();
      });
      setTimeout(function() {
        if (!musicPlaying) attempt();
      }, 500);
    }
  }

  if (musicControl) {
    musicControl.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      if (!weddingMusic) return;
      if (weddingMusic.paused) {
        weddingMusic.volume = TARGET_VOLUME;
        weddingMusic.play().then(function() {
          musicPlaying = true;
          showMusicBtn(true);
        });
      } else {
        weddingMusic.pause();
        musicPlaying = false;
        showMusicBtn(false);
      }
    });
  }

  var opened = false;
  function openInvite(e) {
    if (e) e.preventDefault();
    if (opened) return;
    opened = true;

    startMusic();

    var splash = document.getElementById('splash');
    if (splash) splash.classList.add('opening');
    setTimeout(function() {
      if (splash) splash.classList.add('hidden');
      unlockScroll();
    }, 1300);
  }

  var splashCard = document.getElementById('splashCard');
  var splash = document.getElementById('splash');

  if (splash) {
    splash.addEventListener('touchmove', function(e) {
      e.preventDefault();
    }, { passive: false });
    splash.addEventListener('wheel', function(e) {
      e.preventDefault();
    }, { passive: false });
  }

  function bindEnter(el) {
    if (!el) return;
    el.addEventListener('click', openInvite);
    el.addEventListener('touchend', function(e) {
      e.preventDefault();
      openInvite(e);
    }, { passive: false });
  }

  bindEnter(splashCard);
  bindEnter(splash);

  if (splash) {
    splash.addEventListener('touchstart', function once() {
      if (!musicPlaying) startMusic();
      splash.removeEventListener('touchstart', once);
    }, { passive: true });
  }

  var sparkles = document.getElementById('sparkles');
  if (sparkles) {
    for (var i = 0; i < 35; i++) {
      var s = document.createElement('div');
      s.className = 'sparkle';
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      s.style.animationDelay = Math.random() * 3 + 's';
      sparkles.appendChild(s);
    }
  }

  var splashPetals = document.getElementById('splashPetals');
  if (splashPetals) {
    for (var j = 0; j < 14; j++) {
      var p = document.createElement('div');
      p.className = 'splash-petal';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (6 + Math.random() * 8) + 's';
      p.style.animationDelay = Math.random() * 5 + 's';
      splashPetals.appendChild(p);
    }
  }

  var petals = document.getElementById('petals');
  if (petals) {
    for (var k = 0; k < 16; k++) {
      var petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.animationDuration = (8 + Math.random() * 12) + 's';
      petal.style.animationDelay = Math.random() * 10 + 's';
      petal.style.width = petal.style.height = (8 + Math.random() * 8) + 'px';
      petals.appendChild(petal);
    }
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .couple-card, .gallery-item, .love-quote-box, .venue-box').forEach(function(el) {
    observer.observe(el);
  });

  var weddingDate = new Date(cfg.dateISO);
  function updateCountdown() {
    var diff = weddingDate - new Date();
    if (diff <= 0) return;
    var d = document.getElementById('days');
    if (!d) return;
    d.textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
    document.getElementById('hours').textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    document.getElementById('mins').textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    document.getElementById('secs').textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function startWeddingApp() {
  if (window.__weddingReady && window.__weddingReady.then) {
    window.__weddingReady.then(initWeddingInvite);
  } else {
    initWeddingInvite();
  }
}
document.addEventListener('DOMContentLoaded', startWeddingApp);
