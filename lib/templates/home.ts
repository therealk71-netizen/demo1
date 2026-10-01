import { siteConfig as c } from '@/site-config'
import { businessJsonLd, clientConfigScript, esc as e, formatCount } from '@/lib/site-html'

export function renderHomePage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${e(c.seo.title)}</title>
<meta name="description" content="${e(c.seo.description)}" />
<meta property="og:title" content="${e(c.seo.title)}" />
<meta property="og:description" content="${e(c.seo.ogDescription)}" />
<meta property="og:image" content="${e(c.seo.ogImage)}" />
<meta name="theme-color" content="#0b1b2b" />
<link rel="preconnect" href="https://api.fontshare.com" />
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
<link rel="preload" as="image" href="assets/hero-tools.jpg" />
<link rel="stylesheet" href="style.css" />
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E%3Crect width=%2732%27 height=%2732%27 rx=%277%27 fill=%27%230d6efd%27/%3E%3C/svg%3E" />
<script type="application/ld+json">
${businessJsonLd()}
</script>
</head>
<body>

<a class="skip" href="#main">Skip to content</a>

<div class="alertbar" role="status">
  <span class="pulse" aria-hidden="true"></span>
  <p><strong>Dispatch is live right now.</strong> <span class="alertbar__sub">6 technicians on the road in the valley · average arrival 47 min</span></p>
  <a href="tel:${e(c.emergencyPhone.raw)}">${e(c.emergencyPhone.display)}</a>
</div>

<header class="header" id="header">
  <div class="header__inner">
    <a class="logo" href="#top" aria-label="Home">
        <span class="logo__slot" aria-hidden="true"></span>
      </a>

    <nav class="nav" aria-label="Main">
      <a href="#triage">Diagnose</a>
      <a href="/services#services">Services</a>
      <a href="/services#pricing">Pricing</a>
      <a href="#reviews">Reviews</a>
      <a href="#faq">FAQ</a>
    </nav>

    <div class="header__actions">
      <button class="iconbtn" data-theme-toggle aria-label="Switch to dark mode"></button>
      <a class="btn btn--primary btn--sm" href="tel:${e(c.emergencyPhone.raw)}">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>
        ${e(c.primaryCTA)}
      </a>
      <button class="iconbtn iconbtn--menu" id="menuBtn" aria-label="Open menu" aria-expanded="false">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
    </div>
  </div>
  <div class="mobilenav" id="mobilenav" hidden>
    <a href="#triage">Diagnose</a><a href="/services#services">Services</a><a href="/services#pricing">Pricing</a><a href="#reviews">Reviews</a><a href="#faq">FAQ</a>
  </div>
</header>

<main id="main">
  <span id="top"></span>

  <!-- ================= HERO ================= -->
  <section class="hero">
    <div class="hero__media" data-parallax data-speed="0.28">
      <img src="assets/hero-tools.jpg" alt="HVAC service tools including manifold gauges, a vacuum pump and copper fittings laid out on a steel workbench" width="2000" height="999" fetchpriority="high" />
    </div>
    <div class="hero__scrim" aria-hidden="true"></div>

    <div class="hero__content">
      <p class="eyebrow eyebrow--light">${c.serviceAreas.slice(0, 3).map(e).join(' · ')}</p>
      <h1>No cool air?<br /><em>We're already rolling.</em></h1>
      <p class="hero__lede">${e(c.businessName)} keeps licensed technicians staged across the valley 24 hours a day. Call and a real dispatcher — not a call center — puts a van on your street in about 47 minutes.</p>
      <div class="hero__cta">
        <a class="btn btn--primary btn--lg" href="tel:${e(c.emergencyPhone.raw)}">Call ${e(c.emergencyPhone.display)}</a>
        <a class="btn btn--ghost btn--lg" href="#triage">Diagnose my system</a>
      </div>
      <ul class="trustrow" role="list">
        <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg> ${e(c.state)} license #${e(c.licenseNumber)}</li>
        <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg> EPA 608 certified crews</li>
        <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg> ${c.averageRating} / 5 from ${formatCount(c.reviewCount)} neighbors</li>
        <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg> Zero overtime surcharge</li>
      </ul>
    </div>
  </section>

  <!-- ================= STATS ================= -->
  <section class="stats" aria-label="Company statistics">
    <div class="wrap stats__grid">
      <div class="stat"><span class="stat__num" data-count="47" data-suffix=" min">47 min</span><span class="stat__label">Average arrival time, valley-wide</span></div>
      <div class="stat"><span class="stat__num" data-count="24" data-suffix="/7">24/7</span><span class="stat__label">Live dispatch, holidays included</span></div>
      <div class="stat"><span class="stat__num" data-count="${c.yearsInBusiness}" data-suffix=" yrs">${c.yearsInBusiness} yrs</span><span class="stat__label">Serving Southern Nevada homes</span></div>
      <div class="stat"><span class="stat__num" data-count="94" data-suffix="%">94%</span><span class="stat__label">Repairs finished on the first visit</span></div>
    </div>
  </section>

  <!-- ================= CALCULATOR ================= -->
  <section class="section" id="calculator">
    <div class="wrap">
      <div class="section__head">
        <p class="eyebrow">Interactive estimate</p>
        <h2>What is an aging system costing you?</h2>
        <p class="section__lede">Drag the sliders. The math uses NV Energy's average summer rate and typical efficiency loss for desert-installed equipment.</p>
      </div>

      <div class="calc">
        <div class="calc__controls">
          <div class="calc__fields">
            <label class="field">
              <span class="field__row"><span>Home size</span><output id="outSqft">2,000 sq ft</output></span>
              <input type="range" id="sqft" min="800" max="4500" step="50" value="2000" />
            </label>
            <label class="field">
              <span class="field__row"><span>System age</span><output id="outAge">12 years</output></span>
              <input type="range" id="age" min="1" max="25" step="1" value="12" />
            </label>
            <p class="calc__note">Estimates only — a technician's static pressure and refrigerant readings give the real number.</p>
          </div>

          <div class="thermo">
            <span class="thermo__cap">Thermostat</span>
            <div class="thermo__gauge">
              <div class="thermo__tube"><div class="thermo__fill" id="thermoFill"></div></div>
              <div class="thermo__bulb" id="thermoBulb"></div>
              <ul class="thermo__ticks" aria-hidden="true"><li>82°</li><li>75°</li><li>68°</li></ul>
              <input type="range" class="thermo__range" id="temp" min="68" max="82" step="1" value="74" aria-label="Summer thermostat setting, degrees Fahrenheit" />
            </div>
            <output class="thermo__read" id="outTemp">74°F</output>
          </div>
        </div>
        <div class="calc__result">
          <p class="calc__label">Estimated wasted cooling spend</p>
          <p class="calc__big"><span id="calcMoney">$412</span><small>/ summer</small></p>
          <div class="calc__meter"><div class="calc__meterfill" id="calcFill"></div></div>
          <p class="calc__verdict" id="calcVerdict">A tune-up plus a coil clean typically recovers most of this.</p>
          <dl class="calc__rows">
            <div><dt>Efficiency loss</dt><dd id="calcLoss">18%</dd></div>
            <div><dt>Recommended step</dt><dd id="calcStep">21-point tune-up</dd></div>
          </dl>
          <a class="btn btn--primary btn--full" href="tel:${e(c.phone.raw)}">Book that visit</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= TRIAGE ================= -->
  <section class="section section--offset" id="triage">
    <div class="wrap">
      <div class="section__head">
        <p class="eyebrow">Free 20-second triage</p>
        <h2>Tell us what your system is doing</h2>
        <p class="section__lede">Pick the symptom that sounds closest. We'll tell you the likely cause, how urgent it is, and what a visit usually runs — before you pick up the phone.</p>
      </div>

      <div class="triage">
        <div class="triage__options" role="tablist" aria-label="Symptom">
          <button class="symptom" role="tab" aria-selected="true" data-key="warm">
            <span class="symptom__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M14 14.8V4a2 2 0 1 0-4 0v10.8a4 4 0 1 0 4 0z"/><path d="M12 9h5M12 6h3"/></svg>
            </span>
            <span class="symptom__txt"><strong>Blowing warm air</strong><small>Fan runs, nothing cold</small></span>
          </button>
          <button class="symptom" role="tab" aria-selected="false" data-key="dead">
            <span class="symptom__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M18.4 5.6a9 9 0 1 1-12.8 0"/><path d="M12 2v8"/></svg>
            </span>
            <span class="symptom__txt"><strong>Completely dead</strong><small>No power, no response</small></span>
          </button>
          <button class="symptom" role="tab" aria-selected="false" data-key="noise">
            <span class="symptom__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M16 9a4 4 0 0 1 0 6M19.5 6.5a8 8 0 0 1 0 11"/></svg>
            </span>
            <span class="symptom__txt"><strong>Loud or grinding</strong><small>Rattle, screech, buzz</small></span>
          </button>
          <button class="symptom" role="tab" aria-selected="false" data-key="water">
            <span class="symptom__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 2.7 6.3 9.9a7.2 7.2 0 1 0 11.4 0L12 2.7z"/></svg>
            </span>
            <span class="symptom__txt"><strong>Leaking water</strong><small>Puddle, ice, drip stains</small></span>
          </button>
          <button class="symptom" role="tab" aria-selected="false" data-key="bill">
            <span class="symptom__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 17l6-6 4 4 7-7"/><path d="M14 8h6v6"/></svg>
            </span>
            <span class="symptom__txt"><strong>Sky-high power bill</strong><small>Runs constantly</small></span>
          </button>
          <button class="symptom" role="tab" aria-selected="false" data-key="smell">
            <span class="symptom__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 18c0-3 3-3 3-6S6 9 6 6M12 18c0-3 3-3 3-6s-3-3-3-6M18 18c0-3 2-3 2-6"/></svg>
            </span>
            <span class="symptom__txt"><strong>Burning smell</strong><small>Odor from the vents</small></span>
          </button>
        </div>

        <div class="triage__panel" id="triagePanel" role="tabpanel" aria-live="polite">
          <div class="triage__urgency"><span class="dot" data-level="high"></span><span id="tUrgency">Urgent — same-day visit</span></div>
          <h3 id="tTitle">Low refrigerant or a failed compressor</h3>
          <p id="tBody">Warm air with a running fan almost always means the outdoor unit isn't removing heat. In ${e(c.city)} the usual culprits are a leaking refrigerant line, a burnt run capacitor, or a seized compressor.</p>
          <ul class="triage__list" id="tSteps" role="list"></ul>
          <div class="triage__foot">
            <div><span class="triage__pricelabel">Typical visit</span><span class="triage__price" id="tPrice">$189 – $460</span></div>
            <a class="btn btn--primary" href="tel:${e(c.emergencyPhone.raw)}">Get a tech dispatched</a>
          </div>
        </div>
      </div>

      <!-- before / after gallery -->
      <div class="fixes">
        <div class="fixes__head">
          <h3>See the actual fix</h3>
          <p>Repairs from valley homes this season. Drag the handle across the photo to reveal how it left.</p>
        </div>
        <div class="fixes__tabs" role="tablist" aria-label="Repair examples">
          <button class="fixtab" role="tab" aria-selected="true" data-fix="water">Water leak repaired</button>
          <button class="fixtab" role="tab" aria-selected="false" data-fix="power">No-power fix</button>
          <button class="fixtab" role="tab" aria-selected="false" data-fix="coil">Coil deep clean</button>
          <button class="fixtab" role="tab" aria-selected="false" data-fix="blower">Blower service</button>
        </div>

        <figure class="ba" role="tabpanel">
          <div class="ba__stage" id="baStage">
            <img class="ba__img" id="baAfter" src="assets/ba-water-after.jpg" alt="New white PVC condensate line and a clean dry drain pan under the air handler" width="1200" height="800" loading="lazy" decoding="async" />
            <div class="ba__clip" id="baClip">
              <img class="ba__img" id="baBefore" src="assets/ba-water-before.jpg" alt="Corroded condensate line and a rusty overflow pan holding standing water" width="1200" height="800" loading="lazy" decoding="async" />
            </div>
            <span class="ba__tag ba__tag--b">Before</span>
            <span class="ba__tag ba__tag--a">After</span>
            <input type="range" class="ba__range" id="baRange" min="0" max="100" step="0.1" value="50" aria-label="Reveal the repaired photo" />
            <div class="ba__handle" id="baHandle" aria-hidden="true">
              <span class="ba__grip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 4 12l5 6M15 6l5 6-5 6"/></svg>
              </span>
            </div>
          </div>
          <figcaption class="ba__cap">
            <strong id="baTitle">Clogged condensate drain, Summerlin</strong>
            <span id="baText">Rusted-through pan and a fouled drain line were dumping water onto the garage slab. New trap, new line, new pan — finished in one visit.</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>


  <!-- ================= PARALLAX BAND ================= -->
  <section class="band" aria-label="Our promise">
    <div class="band__media" data-parallax data-speed="0.22">
      <img src="assets/parallax-band.jpg" alt="HVAC parts and hand tools arranged in a neat grid on a concrete surface" width="2000" height="856" loading="lazy" />
    </div>
    <div class="band__scrim" aria-hidden="true"></div>
    <blockquote class="band__quote">
      <p>“We price the repair, not your panic. The number we quote at the door is the number on the invoice — 2 a.m. or 2 p.m.”</p>
      <footer><span>Marisol Reyes</span> · Owner &amp; lead technician</footer>
    </blockquote>
  </section>

  <!-- ================= WHY / SPLIT ================= -->
  <section class="section section--offset" id="why">
    <div class="wrap split">
      <figure class="split__img">
        <img src="assets/technician.jpg" alt="${e(c.businessName)} technician checking refrigerant pressure on a residential condenser unit" width="1400" height="933" loading="lazy" />
        <figcaption>Every tech is badged, background-checked, and drug-tested.</figcaption>
      </figure>
      <div class="split__body">
        <p class="eyebrow">Why neighbors call us first</p>
        <h2>A repair company that behaves like a neighbor</h2>
        <ol class="steps" role="list">
          <li><span>1</span><div><strong>You talk to a dispatcher in ${e(c.city)}.</strong> No phone tree, no offshore answering service. Average pickup: 11 seconds.</div></li>
          <li><span>2</span><div><strong>You get a name, photo, and live ETA.</strong> Text link tracks the van from our yard to your driveway.</div></li>
          <li><span>3</span><div><strong>You approve a flat price first.</strong> Diagnosis, options, and cost on one page before a single tool comes out.</div></li>
          <li><span>4</span><div><strong>You keep the report.</strong> Photos, readings, and part numbers emailed the same day — yours to keep even for a second opinion.</div></li>
        </ol>
        <a class="btn btn--primary" href="tel:${e(c.emergencyPhone.raw)}">Talk to dispatch now</a>
      </div>
    </div>
  </section>


  <!-- ================= REVIEWS ================= -->
  <section class="section section--offset" id="reviews">
    <div class="wrap">
      <div class="section__head">
        <p class="eyebrow">${c.averageRating} average · ${formatCount(c.reviewCount)} reviews</p>
        <h2>What the valley says</h2>
      </div>

      <div class="reviews" id="reviews-carousel">
        <div class="reviews__track" id="revTrack">
          <figure class="review">
            <div class="review__stars" aria-label="5 out of 5">★★★★★</div>
            <blockquote>AC quit at 9:40 on a Friday night with a newborn in the house. A tech named Andre was in the driveway by 10:25, had a blown capacitor swapped by 11, and charged the price he quoted at the door. I have never been so happy to hand someone money.</blockquote>
            <figcaption><strong>Danielle W.</strong><span>Summerlin · Emergency repair</span></figcaption>
          </figure>
          <figure class="review">
            <div class="review__stars" aria-label="5 out of 5">★★★★★</div>
            <blockquote>Two other companies told me I needed a full replacement. ${e(c.businessName)} found a clogged condensate line and a dirty coil, cleaned both, and my upstairs finally cools. They talked me out of a $9,000 purchase. That is who I call forever.</blockquote>
            <figcaption><strong>Ray M.</strong><span>Henderson · Diagnostic</span></figcaption>
          </figure>
          <figure class="review">
            <div class="review__stars" aria-label="5 out of 5">★★★★★</div>
            <blockquote>We run four rental units and the club membership pays for itself. Tune-ups get scheduled without me chasing anyone, and when a tenant calls at midnight I forward the number and it is handled. Invoices are clear enough for my accountant.</blockquote>
            <figcaption><strong>Priya S.</strong><span>North Las Vegas · Super Club</span></figcaption>
          </figure>
          <figure class="review">
            <div class="review__stars" aria-label="5 out of 5">★★★★★</div>
            <blockquote>New 17-SEER2 system installed in one day, permit pulled, old unit hauled away, and they laid drop cloths through the whole hallway. Power bill dropped $140 in July compared to last year. Crew was polite to my mother, which matters to me.</blockquote>
            <figcaption><strong>Curtis A.</strong><span>Enterprise · Full replacement</span></figcaption>
          </figure>
        </div>
        <div class="reviews__nav">
          <button class="iconbtn" id="revPrev" aria-label="Previous review"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg></button>
          <div class="reviews__dots" id="revDots" role="tablist" aria-label="Choose review"></div>
          <button class="iconbtn" id="revNext" aria-label="Next review"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>
        </div>
      </div>

      <div class="areas">
        <p class="areas__label">Trucks staged in</p>
        <ul role="list">
          ${c.serviceAreas.map((area) => `<li>${e(area)}</li>`).join('')}
        </ul>
      </div>
    </div>
  </section>

  <!-- ================= FAQ ================= -->
  <section class="section" id="faq">
    <div class="wrap faqwrap">
      <div class="section__head section__head--left">
        <p class="eyebrow">Questions</p>
        <h2>Answers before you call</h2>
        <p class="section__lede">Still unsure? Dispatch will talk it through with you for free, day or night.</p>
      </div>
      <div class="faq">
        <details>
          <summary>Do you really charge the same price after hours?<span class="chev" aria-hidden="true"></span></summary>
          <p>Yes. Our diagnostic and repair rates are flat and published — no nights, weekend, or holiday surcharge. The only thing that changes after hours is how fast we get there, because there is less traffic.</p>
        </details>
        <details>
          <summary>How fast can someone actually get to me?<span class="chev" aria-hidden="true"></span></summary>
          <p>Valley-wide average is 47 minutes and our 90th percentile is under 2 hours. During a heat emergency — think three straight days over 110 — we triage by risk, so households with infants, seniors, or medical needs move to the front of the queue. Tell the dispatcher.</p>
        </details>
        <details>
          <summary>Should I repair or replace a 12-year-old unit?<span class="chev" aria-hidden="true"></span></summary>
          <p>Our rule of thumb: if the repair costs more than a third of a new system and the unit is past 12 years, replacement usually wins on total cost. Desert installs age faster than the national average. We give you both numbers in writing and never make the call for you.</p>
        </details>
        <details>
          <summary>What brands do you service?<span class="chev" aria-hidden="true"></span></summary>
          <p>All major residential and light commercial brands — Trane, Carrier, Lennox, Goodman, Rheem, York, Bryant, American Standard, Daikin, and Mitsubishi mini-splits. We are factory-trained on Trane and Daikin equipment.</p>
        </details>
        <details>
          <summary>Is there financing for a replacement system?<span class="chev" aria-hidden="true"></span></summary>
          <p>Yes. Approved credit gets 0% for 18 months or terms from $39 a month with no prepayment penalty. We also handle NV Energy rebate paperwork and any federal efficiency credit you qualify for.</p>
        </details>
        <details>
          <summary>What does the 21-point tune-up include?<span class="chev" aria-hidden="true"></span></summary>
          <p>Refrigerant charge verification, coil cleaning, condensate flush, capacitor and contactor testing, amp draw on the compressor and blower, static pressure reading, thermostat calibration, safety and CO check, plus a filter change. You get the readings, not just a checkmark.</p>
        </details>
        <details>
          <summary>Do you warranty your work?<span class="chev" aria-hidden="true"></span></summary>
          <p>Two years on repair parts and labor, ten years on parts for new installs with a lifetime workmanship guarantee on the ductwork we build. If we fix it and it fails again inside the window, the return visit is free.</p>
        </details>
      </div>
    </div>
  </section>

  <!-- ================= FINAL CTA ================= -->
  <section class="finalcta">
    <div class="wrap finalcta__inner">
      <div>
        <h2>It is hot. Let's fix it tonight.</h2>
        <p>One call reaches a ${e(c.city)} dispatcher who can see exactly which van is closest to you.</p>
      </div>
      <div class="finalcta__actions">
        <a class="btn btn--light btn--lg" href="tel:${e(c.emergencyPhone.raw)}">${e(c.emergencyPhone.display)}</a>
        <a class="btn btn--ghost btn--lg" href="mailto:${e(c.email)}">Email dispatch</a>
      </div>
    </div>
  </section>
</main>

<footer class="footer">
  <div class="wrap footer__grid">
    <div>
      <a class="logo logo--footer" href="#top" aria-label="Home">
        <span class="logo__slot logo__slot--footer" aria-hidden="true"></span>
      </a>
      <p class="footer__blurb">Family-owned heating and cooling service for Southern Nevada since ${c.yearFounded}. Nevada license #${e(c.licenseNumber)} · EPA 608 Universal.</p>
    </div>
    <div>
      <h3>Contact</h3>
      <ul role="list">
        <li><a href="tel:${e(c.phone.raw)}">${e(c.phone.display)}</a></li>
        <li><a href="mailto:${e(c.email)}">${e(c.email)}</a></li>
        <li>${e(c.address)}<br />${e(c.city)}, ${e(c.state)} ${e(c.zip)}</li>
      </ul>
    </div>
    <div>
      <h3>Services</h3>
      <ul role="list">
        <li><a href="/services#services">${e(c.services[0].name)}</a></li>
        <li><a href="/services#services">${e(c.services[1].name)}</a></li>
        <li><a href="/services#pricing">Super Club maintenance</a></li>
        <li><a href="/services#services">Ductwork &amp; air quality</a></li>
      </ul>
    </div>
    <div>
      <h3>Hours</h3>
      <ul role="list">
        <li>Emergency dispatch: ${e(c.hours.emergency)}</li>
        <li>Office: ${e(c.hours.weekday)}</li>
        <li>Installs: ${e(c.hours.weekend)}</li>
      </ul>
    </div>
  </div>
  <div class="wrap footer__bar">
    <p>© 2026 ${e(c.legalName)}. All rights reserved.</p>
    <p>Illustrative demonstration site — phone, address, and pricing are sample content.</p>
  </div>
</footer>

<a class="callfab" href="tel:${e(c.emergencyPhone.raw)}" aria-label="Call ${e(c.businessName)} 24/7">
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>
  <span>Call now</span>
</a>

${clientConfigScript()}
<script src="script.js"></script>
</body>
</html>`
}
