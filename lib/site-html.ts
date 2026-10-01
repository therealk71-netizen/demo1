import { existsSync } from 'node:fs'
import path from 'node:path'
import { siteConfig } from '@/site-config'

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

export function esc(value: string | number): string {
  return String(value).replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch])
}

export function formatCount(value: number): string {
  return value.toLocaleString('en-US')
}

// JSON safe to inline inside a <script> element.
function inlineJson(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.siteUrl).toString()
}

const logoFileExists = existsSync(path.join(process.cwd(), 'public', siteConfig.logo.src))

// The inline onerror covers a logo that exists at build time but fails to load.
export function logoMarkup(): string {
  const { logo, businessName } = siteConfig
  const wordmark = (hidden: boolean) =>
    `<span class="logo__wordmark"${hidden ? ' hidden' : ''}>${esc(businessName)}</span>`
  if (!logoFileExists) return wordmark(false)
  return `<img class="logo__img" src="${esc(logo.src)}" alt="${esc(logo.alt)}" height="${esc(logo.height)}" style="height:${esc(logo.height)}px;width:auto" onerror="this.hidden=true;this.nextElementSibling.hidden=false" />${wordmark(true)}`
}

export function faviconLinks(): string {
  const href = esc(siteConfig.favicon)
  return `<link rel="icon" type="image/png" href="${href}" />\n<link rel="apple-touch-icon" href="${href}" />`
}

// Plain POST to Formspree, which shows its thank-you page after submit.
export function formAttributes(): string {
  return `action="${esc(siteConfig.formEndpoint)}" method="POST"`
}

export function businessJsonLd(): string {
  const c = siteConfig
  const sameAs = Object.values(c.socialLinks).filter(Boolean)
  return inlineJson({
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HVACBusiness'],
    '@id': `${absoluteUrl('/')}#business`,
    name: c.businessName,
    legalName: c.legalName,
    url: absoluteUrl('/'),
    ...(logoFileExists ? { logo: absoluteUrl(c.logo.src) } : {}),
    image: absoluteUrl(c.seo.ogImage),
    telephone: c.phone.raw,
    email: c.email,
    foundingDate: String(c.yearFounded),
    areaServed: c.serviceAreas.map((name) => ({ '@type': 'City', name })),
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.address,
      addressLocality: c.city,
      addressRegion: c.state,
      postalCode: c.zip,
      addressCountry: 'US',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(c.averageRating),
      reviewCount: String(c.reviewCount),
    },
    ...(sameAs.length ? { sameAs } : {}),
  })
}

export function clientConfigScript(): string {
  return `<script>window.siteConfig=${inlineJson(siteConfig)};</script>`
}

export function brandColorCss(): string {
  const declarations = Object.entries(siteConfig.colors)
    .map(([name, value]) => {
      const prop = name.replace(/[A-Z]/g, (ch) => `-${ch.toLowerCase()}`)
      const safeValue = String(value).replace(/[^#a-zA-Z0-9(),.%\s-]/g, '')
      return `--brand-${prop}:${safeValue};`
    })
    .join('')
  return `:root{${declarations}}`
}

export function brandColorStyle(): string {
  return `<style id="site-colors">${brandColorCss()}</style>`
}

export function htmlResponse(html: string): Response {
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
