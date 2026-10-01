import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { siteConfig } from '@/site-config'
import { brandColorCss } from '@/lib/site-html'
import './globals.css'

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  generator: 'v0.app',
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.ogDescription,
    images: [siteConfig.seo.ogImage],
  },
  metadataBase: new URL(siteConfig.siteUrl),
  icons: {
    icon: siteConfig.favicon,
    apple: siteConfig.favicon,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style id="site-colors" dangerouslySetInnerHTML={{ __html: brandColorCss() }} />
      </head>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
