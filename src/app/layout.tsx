import type { Metadata } from 'next';
import { Barlow } from 'next/font/google';
import './globals.css';
import {
  metadata as seoMetadata,
  personJsonLd,
  websiteJsonLd,
  professionalServiceJsonLd,
  creativeWorkJsonLd,
  jobSeekingJsonLd,
  breadcrumbJsonLd,
} from '@/lib/seo';
import GoogleAnalytics from '@/app/components/GoogleAnalytics';

const barlow = Barlow({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-barlow',
});

// Re-export metadata from SEO config
export const metadata: Metadata = seoMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={barlow.variable}>
      <head>
        {/* JSON-LD Structured Data for Search Engines & AI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(creativeWorkJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jobSeekingJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />

        {/* Additional SEO meta tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon variants */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={barlow.className}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}