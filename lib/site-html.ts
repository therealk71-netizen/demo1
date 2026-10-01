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

export function businessJsonLd(): string {
  const c = siteConfig
  const sameAs = Object.values(c.socialLinks).filter(Boolean)
  return inlineJson({
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: c.businessName,
    legalName: c.legalName,
    telephone: c.phone.raw,
    email: c.email,
    foundingDate: String(c.yearFounded),
    areaServed: c.serviceAreas,
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
