/* ============================================================
   Super HVAC — interactions
   ============================================================ */
(function () {
  'use strict';

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- theme toggle ---------- */
  (function theme() {
    const btn = document.querySelector('[data-theme-toggle]');
    const root = document.documentElement;
    const sun = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 1.5v2M12 20.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1.5 12h2M20.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>';
    const moon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>';
    let mode = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const paint = () => {
      root.setAttribute('data-theme', mode);
      if (!btn) return;
      btn.innerHTML = mode === 'dark' ? sun : moon;
      btn.setAttribute('aria-label', 'Switch to ' + (mode === 'dark' ? 'light' : 'dark') + ' mode');
    };
    paint();
    btn && btn.addEventListener('click', () => { mode = mode === 'dark' ? 'light' : 'dark'; paint(); });
  })();

  /* ---------- sticky header + mobile nav ---------- */
  (function header() {
    const el = document.getElementById('header');
    const btn = document.getElementById('menuBtn');
    const nav = document.getElementById('mobilenav');
    const onScroll = () => el.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    btn && btn.addEventListener('click', () => {
      const open = el.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
      nav.hidden = !open;
    });
    nav && nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        el.classList.remove('is-open'); nav.hidden = true; btn.setAttribute('aria-expanded', 'false');
      }
    });
  })();

  /* ---------- parallax ---------- */
  (function parallax() {
    const layers = [...document.querySelectorAll('[data-parallax]')];
    if (!layers.length || reduceMotion) return;
    let queued = false;
    const run = () => {
      queued = false;
      const vh = innerHeight;
      layers.forEach((layer) => {
        const host = layer.parentElement;
        const r = host.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const speed = parseFloat(layer.dataset.speed || '0.25');
        // progress: -1 (below viewport) → 1 (above viewport)
        const progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
        layer.style.transform = 'translate3d(0,' + (progress * speed * r.height * 0.5).toFixed(2) + 'px,0)';
      });
    };
    const req = () => { if (!queued) { queued = true; requestAnimationFrame(run); } };
    addEventListener('scroll', req, { passive: true });
    addEventListener('resize', req);
    run();
  })();

  /* ---------- scroll reveal ---------- */
  (function reveal() {
    const targets = document.querySelectorAll('.section__head, .card, .tier, .steps li, .stat, .split__img, .calc > *, .triage > *, .review, .faq details, .areas');
    targets.forEach((t) => t.classList.add('reveal'));
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          const delay = Math.min(i * 60, 240);
          setTimeout(() => e.target.classList.add('is-in'), delay);
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach((t) => io.observe(t));
  })();

  /* ---------- animated stat counters ---------- */
  (function counters() {
    const nums = [...document.querySelectorAll('[data-count]')];
    if (!nums.length) return;
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      if (reduceMotion) { el.textContent = target + suffix; return; }
      const dur = 1100;
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) { nums.forEach(animate); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    nums.forEach((n) => io.observe(n));
  })();

  /* ---------- triage widget ---------- */
  (function triage() {
    const DATA = {
      warm: {
        urgency: 'Urgent — same-day visit', level: 'high',
        title: 'Low refrigerant or a failing compressor',
        body: "Warm air with the fan still running means the outdoor unit isn't rejecting heat. In Las Vegas the usual causes are a refrigerant leak, a burnt run capacitor, or a compressor that no longer starts under load.",
        steps: ['Set the thermostat to OFF so the blower stops freezing the coil', 'Check whether the outdoor fan is spinning — if not, say so when you call', 'Look for ice on the copper line at the indoor unit', "Don't add refrigerant yourself; a leak will just take it again"],
        price: '$189 – $460'
      },
      dead: {
        urgency: 'Urgent — same-day visit', level: 'high',
        title: 'Tripped breaker, blown fuse, or failed contactor',
        body: 'A completely unresponsive system is usually electrical, and often the cheapest repair on this page. We do want to see it quickly, because a breaker that keeps tripping is telling you something is drawing too much current.',
        steps: ['Check the breaker panel and the outdoor disconnect box', 'Reset the breaker once — never repeatedly', 'Confirm the thermostat screen has power (fresh batteries)', 'Note any burning smell near the air handler'],
        price: '$89 – $320'
      },
      noise: {
        urgency: 'Soon — book within 48 hours', level: 'med',
        title: 'Bearing wear, loose blower wheel, or debris in the fan',
        body: 'Sound tells us a lot. A screech is usually a motor bearing, a rattle is often a loose panel or blower wheel, and a hard buzz at startup points at the capacitor or contactor. Catching it now avoids a motor replacement later.',
        steps: ['Shut the system down if you hear metal-on-metal grinding', 'Record 10 seconds of the noise on your phone for the tech', 'Note whether it happens at startup or the whole cycle', 'Keep the area around the outdoor unit clear'],
        price: '$149 – $680'
      },
      water: {
        urgency: 'Soon — book within 48 hours', level: 'med',
        title: 'Clogged condensate drain or a frozen evaporator coil',
        body: 'Water where it should not be is almost always a blocked drain line or a coil that iced over from low airflow. It is an inexpensive fix, but left alone it turns into drywall and mold damage.',
        steps: ['Turn the system off and let any ice melt fully', 'Put a towel or pan under the drip and check the overflow pan', 'Replace the air filter if it is grey and loaded', 'Send us a photo of the wet area when you book'],
        price: '$129 – $340'
      },
      bill: {
        urgency: 'Worth checking — schedule this week', level: 'low',
        title: 'Efficiency loss from dirty coils, low charge, or duct leaks',
        body: 'A system that runs nonstop is working harder than it should. Dirty condenser coils, a slightly low charge, or leaking ducts in a hot attic each add 10–25% to a summer bill without ever breaking down.',
        steps: ['Note your average runtime and thermostat setting', 'Compare this bill with the same month last year', 'Change the filter and clear plants back 2 feet from the unit', 'Ask us for a static pressure and duct leakage test'],
        price: '$149 tune-up · $0 for members'
      },
      smell: {
        urgency: 'Urgent — do not keep running it', level: 'high',
        title: 'Overheating motor, wiring fault, or dust burn-off',
        body: "A brief dusty smell on the first heating cycle of the season is normal. Anything acrid, plastic, or electrical is not — shut the system down at the breaker and call. This is the one symptom we treat as a safety issue, not a comfort issue.",
        steps: ['Turn the system off at the thermostat and the breaker', 'If you smell gas or rotten eggs, leave and call 911 first', 'Open windows and clear the area around the air handler', 'Tell dispatch it is a burning odor — you move to the front of the queue'],
        price: 'Safety inspection $89 · waived with repair'
      }
    };

    const buttons = [...document.querySelectorAll('.symptom')];
    const panel = document.getElementById('triagePanel');
    if (!panel) return;
    const elU = document.getElementById('tUrgency');
    const elT = document.getElementById('tTitle');
    const elB = document.getElementById('tBody');
    const elS = document.getElementById('tSteps');
    const elP = document.getElementById('tPrice');
    const dot = panel.querySelector('.dot');

    function show(key) {
      const d = DATA[key];
      if (!d) return;
      elU.textContent = d.urgency;
      dot.dataset.level = d.level;
      elT.textContent = d.title;
      elB.textContent = d.body;
      elP.textContent = d.price;
      elS.innerHTML = d.steps.map((s) => '<li>' + s + '</li>').join('');
      panel.classList.remove('fade-swap');
      void panel.offsetWidth;
      panel.classList.add('fade-swap');
    }

    buttons.forEach((b) => {
      b.addEventListener('click', () => {
        buttons.forEach((x) => x.setAttribute('aria-selected', String(x === b)));
        show(b.dataset.key);
        if (window.superHvacShowFix) window.superHvacShowFix(SYMPTOM_TO_FIX[b.dataset.key]);
      });
    });
    show('warm');
  })();

  /* symptom -> matching before/after example */
  const SYMPTOM_TO_FIX = { warm: 'coil', dead: 'power', noise: 'blower', water: 'water', bill: 'coil', smell: 'blower' };

  /* ---------- before / after comparison ---------- */
  (function beforeAfter() {
    const range = document.getElementById('baRange');
    if (!range) return;
    const fig = range.closest('.ba');
    const before = document.getElementById('baBefore');
    const after = document.getElementById('baAfter');
    const title = document.getElementById('baTitle');
    const text = document.getElementById('baText');
    const tabs = [...document.querySelectorAll('.fixtab')];

    const FIXES = {
      water: {
        title: 'Clogged condensate drain, Summerlin',
        text: 'A rusted-through pan and a fouled drain line were dumping water onto the garage slab. New trap, new line, new pan \u2014 finished in one visit.',
        beforeAlt: 'Corroded condensate line and a rusty overflow pan holding standing water',
        afterAlt: 'New white PVC condensate line and a clean dry drain pan under the air handler'
      },
      power: {
        title: 'Burnt contactor, Henderson',
        text: 'The system was completely dead at 8pm in July. Scorched contactor and melted whip wiring replaced from the truck stock, cooling back on in 40 minutes.',
        beforeAlt: 'Burnt and corroded contactor with melted wiring inside an outdoor disconnect box',
        afterAlt: 'New contactor with clean copper wiring and a fresh fuse block inside the disconnect box'
      },
      coil: {
        title: 'Condenser coil deep clean, North Las Vegas',
        text: 'Fins packed with dust and cottonwood fluff were choking heat rejection. After a full chemical wash and fin comb, discharge temperature dropped 11 degrees.',
        beforeAlt: 'Air conditioner condenser fins packed with dust, fluff and dead leaves',
        afterAlt: 'Clean straight condenser fins after a professional coil wash'
      },
      blower: {
        title: 'Blower wheel service, Spring Valley',
        text: 'Caked lint on the blower wheel caused the rattle and cut airflow to half. Wheel pulled, cleaned, balanced, and the loose bracket re-anchored.',
        beforeAlt: 'Squirrel-cage blower wheel caked with thick grey dust and lint inside an air handler',
        afterAlt: 'Clean bare-metal blower wheel and tidy motor housing after service'
      }
    };

    function setPos(v) {
      fig.style.setProperty('--pos', v + '%');
    }
    range.addEventListener('input', () => setPos(range.value));
    setPos(range.value);

    let current = 'water';
    function showFix(key) {
      const d = FIXES[key];
      if (!d || key === current) return;
      current = key;
      before.src = 'assets/ba-' + key + '-before.jpg';
      after.src = 'assets/ba-' + key + '-after.jpg';
      before.alt = d.beforeAlt;
      after.alt = d.afterAlt;
      title.textContent = d.title;
      text.textContent = d.text;
      tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.fix === key)));
      range.value = 50;
      setPos(50);
    }
    window.superHvacShowFix = showFix;
    tabs.forEach((t) => t.addEventListener('click', () => showFix(t.dataset.fix)));
  })();

  /* ---------- savings calculator ---------- */
  (function calculator() {
    const sqft = document.getElementById('sqft');
    const age = document.getElementById('age');
    const temp = document.getElementById('temp');
    if (!sqft) return;
    const outSqft = document.getElementById('outSqft');
    const outAge = document.getElementById('outAge');
    const outTemp = document.getElementById('outTemp');
    const money = document.getElementById('calcMoney');
    const fill = document.getElementById('calcFill');
    const verdict = document.getElementById('calcVerdict');
    const loss = document.getElementById('calcLoss');
    const step = document.getElementById('calcStep');
    const thermo = document.querySelector('.thermo');
    const thermoFill = document.getElementById('thermoFill');

    // mercury ramp: cool blue -> green -> amber -> hot orange
    const RAMP = [[0, [47, 143, 255]], [0.38, [53, 208, 127]], [0.72, [255, 196, 77]], [1, [255, 122, 69]]];
    function thermoColor(p) {
      for (let i = 1; i < RAMP.length; i++) {
        if (p <= RAMP[i][0] || i === RAMP.length - 1) {
          const [p0, c0] = RAMP[i - 1], [p1, c1] = RAMP[i];
          const t = Math.min(1, Math.max(0, (p - p0) / (p1 - p0)));
          return 'rgb(' + c0.map((v, k) => Math.round(v + (c1[k] - v) * t)).join(',') + ')';
        }
      }
    }

    function update() {
      const s = +sqft.value, a = +age.value, t = +temp.value;
      // efficiency loss grows with age, thermostat setpoint below 76 adds load
      const lossPct = Math.min(45, Math.round(a * 1.6 + Math.max(0, 76 - t) * 1.1));
      // ~5 months of desert cooling, rough $/sq ft baseline
      const baseline = s * 0.115 * 5;
      const waste = Math.round((baseline * lossPct) / 100);

      outSqft.textContent = s.toLocaleString() + ' sq ft';
      outAge.textContent = a + (a === 1 ? ' year' : ' years');
      outTemp.textContent = t + '°F';
      if (thermo) {
        const p = (t - +temp.min) / (+temp.max - +temp.min);
        thermoFill.style.height = (8 + p * 92) + '%';
        thermo.style.setProperty('--thermo-color', thermoColor(p));
      }
      money.textContent = '$' + waste.toLocaleString();
      loss.textContent = lossPct + '%';
      fill.style.width = Math.min(100, Math.round((lossPct / 45) * 100)) + '%';

      if (lossPct < 16) {
        verdict.textContent = 'Your system is in good shape. A seasonal tune-up keeps it there.';
        step.textContent = '21-point tune-up';
      } else if (lossPct < 28) {
        verdict.textContent = 'A coil clean, charge check, and filtration fix typically recovers most of this.';
        step.textContent = 'Tune-up + coil service';
      } else if (lossPct < 38) {
        verdict.textContent = 'Worth a duct leakage and static pressure test before you spend more on repairs.';
        step.textContent = 'Airflow + duct assessment';
      } else {
        verdict.textContent = 'At this age and loss, a high-SEER2 replacement usually pays back inside four summers.';
        step.textContent = 'Replacement quote';
      }
    }
    [sqft, age, temp].forEach((el) => el.addEventListener('input', update));
    update();
  })();

  /* ---------- pricing toggle ---------- */
  (function pricing() {
    const std = document.getElementById('payStd');
    const mem = document.getElementById('payMem');
    if (!std) return;
    const prices = [...document.querySelectorAll('.tier__price span')];
    function set(memberMode) {
      std.classList.toggle('is-active', !memberMode);
      mem.classList.toggle('is-active', memberMode);
      std.setAttribute('aria-pressed', String(!memberMode));
      mem.setAttribute('aria-pressed', String(memberMode));
      prices.forEach((p) => {
        const v = memberMode ? p.dataset.mem : p.dataset.std;
        p.textContent = (memberMode && p.dataset.zero && +v === 0) ? p.dataset.zero : '$' + v;
        p.classList.remove('price-flash');
        void p.offsetWidth;
        p.classList.add('price-flash');
      });
    }
    std.addEventListener('click', () => set(false));
    mem.addEventListener('click', () => set(true));
  })();

  /* ---------- reviews carousel ---------- */
  (function reviews() {
    const track = document.getElementById('revTrack');
    if (!track) return;
    const slides = [...track.children];
    const dots = document.getElementById('revDots');
    let i = 0, timer;

    slides.forEach((_, n) => {
      const b = document.createElement('button');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Review ' + (n + 1));
      b.addEventListener('click', () => { go(n); rest(); });
      dots.appendChild(b);
    });

    function go(n) {
      i = (n + slides.length) % slides.length;
      track.style.transform = 'translateX(calc(' + (-100 * i) + '% - ' + (i * 1.25) + 'rem))';
      [...dots.children].forEach((d, k) => d.setAttribute('aria-selected', String(k === i)));
    }
    function rest() { clearInterval(timer); timer = setInterval(() => go(i + 1), 7000); }

    document.getElementById('revPrev').addEventListener('click', () => { go(i - 1); rest(); });
    document.getElementById('revNext').addEventListener('click', () => { go(i + 1); rest(); });

    const host = document.getElementById('reviews-carousel');
    host.addEventListener('mouseenter', () => clearInterval(timer));
    host.addEventListener('mouseleave', rest);

    // swipe
    let x0 = null;
    host.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    host.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) { go(dx < 0 ? i + 1 : i - 1); rest(); }
      x0 = null;
    });

    go(0);
    if (!reduceMotion) rest();
  })();

  /* ---------- FAQ: one open at a time ---------- */
  (function faq() {
    const items = [...document.querySelectorAll('.faq details')];
    items.forEach((d) => d.addEventListener('toggle', () => {
      if (d.open) items.forEach((o) => { if (o !== d) o.open = false; });
    }));
  })();
})();
