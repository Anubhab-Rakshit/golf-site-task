import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter, Space_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const spaceMono = Space_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'ParSide | The Golf Charity Subscription Platform',
  description: 'Where every round makes a massive impact. Join the premium golf subscription and charity draw.',
  keywords: ['golf', 'charity', 'subscription', 'monthly draw', 'prizes', 'Stableford', 'golf scores'],
  authors: [{ name: 'ParSide' }],
  openGraph: {
    title: 'ParSide | The Golf Charity Subscription Platform',
    description: 'Where every round makes a massive impact. Join the premium golf subscription and charity draw.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Digital Heroes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Heroes | Premium Golf Charity Platform',
    description: 'Enter monthly prize draws with your Stableford scores.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#08080A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
