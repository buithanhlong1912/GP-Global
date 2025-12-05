import { FloatingActions, Footer, Header } from '@/components/layout';
import { SEO_DEFAULTS } from '@/lib/constants';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SEO_DEFAULTS.siteUrl),
  title: {
    default: SEO_DEFAULTS.defaultTitle,
    template: `%s | ${SEO_DEFAULTS.siteName}`,
  },
  description: SEO_DEFAULTS.defaultDescription,
  keywords: SEO_DEFAULTS.defaultKeywords,
  authors: [{ name: SEO_DEFAULTS.siteName }],
  creator: SEO_DEFAULTS.siteName,
  publisher: SEO_DEFAULTS.siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: SEO_DEFAULTS.locale,
    url: SEO_DEFAULTS.siteUrl,
    siteName: SEO_DEFAULTS.siteName,
    title: SEO_DEFAULTS.defaultTitle,
    description: SEO_DEFAULTS.defaultDescription,
    images: [
      {
        url: SEO_DEFAULTS.ogImage,
        width: 1200,
        height: 630,
        alt: SEO_DEFAULTS.siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_DEFAULTS.defaultTitle,
    description: SEO_DEFAULTS.defaultDescription,
    images: [SEO_DEFAULTS.ogImage],
    creator: SEO_DEFAULTS.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: SEO_DEFAULTS.siteUrl,
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VIETBUILD GROUP',
  description: SEO_DEFAULTS.defaultDescription,
  url: SEO_DEFAULTS.siteUrl,
  logo: `${SEO_DEFAULTS.siteUrl}/images/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+84-1900-1234',
    contactType: 'customer service',
    availableLanguage: ['Vietnamese', 'English'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Tầng 15, Tòa nhà Landmark 81, Vinhomes Central Park',
    addressLocality: 'Bình Thạnh',
    addressRegion: 'TP.HCM',
    postalCode: '700000',
    addressCountry: 'VN',
  },
  sameAs: [
    'https://facebook.com/vietbuildgroup',
    'https://linkedin.com/company/vietbuildgroup',
    'https://youtube.com/@vietbuildgroup',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col antialiased"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
