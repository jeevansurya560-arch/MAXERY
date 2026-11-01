import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const metadata = {
  title: 'MAXERY Aegis — Secure Emergency Identification & Trusted-Contact Coordination',
  description:
    'Instant zero-PII emergency identification, lethal contraindication alerts, and real-time trusted-contact coordination for first responders and trauma networks.',
  keywords: [
    'emergency identification',
    'medical alert',
    'zero-PII token',
    'trauma triage',
    'DPDPA 2023',
    'first responder',
    'trusted contacts',
    'aegis protocol',
  ],
  authors: [{ name: 'MAXERY Engineering Team' }],
  icons: {
    icon: '/favicon.svg',
    apple: '/branding/maxery-aegis-emblem.svg',
  },
  openGraph: {
    title: 'MAXERY Aegis — Secure Emergency Identification',
    description:
      'Instant zero-PII emergency identification, lethal contraindication alerts, and real-time trusted-contact coordination.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://maxery.org',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#090d16',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="guilloche-bg">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
