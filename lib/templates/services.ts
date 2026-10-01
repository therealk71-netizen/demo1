import { siteConfig as c } from '@/site-config'
import { businessJsonLd, clientConfigScript, esc as e, formatCount } from '@/lib/site-html'

export function renderServicesPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Services &amp; Pricing — ${e(c.businessName)} ${e(c.city)}</title>
<meta name="description" content="${e(c.seo.description)}" />
<meta property="og:title" content="${e(c.seo.title)}" />
<meta property="og:description" content="${e(c.seo.ogDescription)}" />
<meta property="og:image" content="${e(c.seo.ogImage)}" />
<meta name="theme-color" content="#0b1b2b" />
<link rel="preconnect" href="https://api.fontshare.com" />
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />

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
    <a class="logo" href="/" aria-label="Home">
        <span class="logo__slot" aria-hidden="true"></span>
      </a>

    <nav class="nav" aria-label="Main">
      <a href="/#triage">Diagnose</a>
      <a href="#services" aria-current="page">Services</a>
      <a href="#pricing">Pricing</a>
      <a href="/#reviews">Reviews</a>
      <a href="/#faq">FAQ</a>
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
    <a href="/#triage">Diagnose</a><a href="#services" aria-current="page">Services</a><a href="#pricing">Pricing</a><a href="/#reviews">Reviews</a><a href="/#faq">FAQ</a>
  </div>
</header>

<main id="main">
  <span id="top"></span>

  <!-- ================= SERVICES ================= -->
  <section class="section section--page" id="services">
    <div class="wrap">
      <div class="section__head">
        <p class="eyebrow">What we do</p>
        <h2>Every system, every brand, one crew</h2>
        <p class="section__lede">Residential and light commercial. We stock the parts that actually fail in 115-degree heat, so most jobs finish the day we arrive.</p>
      </div>
      <div class="cards">
        <article class="card">
          <svg class="card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M12 3v18M3 12h18M6.5 6.5l11 11M17.5 6.5l-11 11"/><circle cx="12" cy="12" r="2.4"/></svg>
          <h3>${e(c.services[0].name)}</h3>
          <p>${e(c.services[0].description)}</p>
          <span class="card__meta">Arrives in ~47 min</span>
        </article>
        <article class="card">
          <svg class="card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M7 20h10M9 16v4M15 16v4M7 8h10M7 12h6"/></svg>
          <h3>${e(c.services[1].name)}</h3>
          <p>${e(c.services[1].description)}</p>
          <span class="card__meta">10-year parts warranty</span>
        </article>
        <article class="card">
          <svg class="card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M14.7 6.3a4 4 0 1 0 3 3l-9.3 9.3-3.7.7.7-3.7 9.3-9.3z"/></svg>
          <h3>${e(c.services[2].name)}</h3>
          <p>${e(c.services[2].description)}</p>
          <span class="card__meta">Twice a year, $0 for members</span>
        </article>
        <article class="card">
          <svg class="card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h10M4 17h6"/><circle cx="18" cy="16" r="3"/></svg>
          <h3>${e(c.services[3].name)}</h3>
          <p>${e(c.services[3].description)}</p>
          <span class="card__meta">Static pressure report included</span>
        </article>
        <article class="card">
          <svg class="card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M12 2.7 6.3 9.9a7.2 7.2 0 1 0 11.4 0L12 2.7z"/><path d="M9.5 14h5"/></svg>
          <h3>${e(c.services[4].name)}</h3>
          <p>${e(c.services[4].description)}</p>
          <span class="card__meta">Allergy-season favorite</span>
        </article>
        <article class="card">
          <svg class="card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M8 14.8V4a2 2 0 1 1 4 0v10.8a4 4 0 1 1-4 0z"/><path d="M15 7h5M15 11h3"/></svg>
          <h3>${e(c.services[5].name)}</h3>
          <p>${e(c.services[5].description)}</p>
          <span class="card__meta">CO safety check every visit</span>
        </article>
      </div>
    </div>
  </section>

  <!-- ================= PRICING ================= -->
  <section class="section" id="pricing">
    <div class="wrap">
      <div class="section__head">
        <p class="eyebrow">Flat-rate pricing</p>
        <h2>Published prices, no midnight markup</h2>
        <p class="section__lede">Same rate at 2 a.m. on a holiday as a Tuesday morning. Toggle to see what Super Club members pay.</p>
      </div>

      <div class="toggle" role="group" aria-label="Pricing mode">
        <button class="toggle__btn is-active" id="payStd" aria-pressed="true">Standard</button>
        <button class="toggle__btn" id="payMem" aria-pressed="false">Super Club member <em>save ~20%</em></button>
      </div>

      <div class="tiers">
        <article class="tier">
          <h3>Diagnostic visit</h3>
          <p class="tier__price"><span data-std="89" data-mem="0" data-zero="Free">$89</span><small>flat</small></p>
          <p class="tier__desc">Full system inspection with a written findings report. Waived when you approve the repair.</p>
          <ul role="list">
            <li>Electrical, refrigerant &amp; airflow testing</li>
            <li>Photo report emailed same day</li>
            <li>No trip or after-hours fee</li>
          </ul>
          <a class="btn btn--ghost btn--full" href="tel:${e(c.phone.raw)}">Schedule</a>
        </article>

        <article class="tier tier--feature">
          <span class="tier__flag">Most requested</span>
          <h3>Super Club membership</h3>
          <p class="tier__price"><span data-std="19" data-mem="15">$19</span><small>/ month</small></p>
          <p class="tier__desc">Two tune-ups a year, front-of-line dispatch, and 20% off every repair we do.</p>
          <ul role="list">
            <li>Spring + fall 21-point tune-ups</li>
            <li>Priority queue on emergency calls</li>
            <li>Free diagnostic visits, always</li>
            <li>Filters delivered to your door</li>
          </ul>
          <a class="btn btn--primary btn--full" href="tel:${e(c.phone.raw)}">Join the club</a>
        </article>

        <article class="tier">
          <h3>Common repair</h3>
          <p class="tier__price"><span data-std="289" data-mem="231">$289</span><small>avg</small></p>
          <p class="tier__desc">Capacitor, contactor, thermostat, or drain line — quoted flat before work starts.</p>
          <ul role="list">
            <li>2-year warranty on parts &amp; labor</li>
            <li>Truck-stocked common components</li>
            <li>Financing from $39/month</li>
          </ul>
          <a class="btn btn--ghost btn--full" href="tel:${e(c.phone.raw)}">Get a quote</a>
        </article>
      </div>
      <p class="tiers__foot">Replacement systems are quoted after an in-home load calculation, typically $6,400–$14,900 installed with permits.</p>
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
      <a class="logo logo--footer" href="/" aria-label="Home">
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
        <li><a href="#services">${e(c.services[0].name)}</a></li>
        <li><a href="#services">${e(c.services[1].name)}</a></li>
        <li><a href="#pricing">Super Club maintenance</a></li>
        <li><a href="#services">Ductwork &amp; air quality</a></li>
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
