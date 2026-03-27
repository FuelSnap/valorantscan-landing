import type { Metadata } from 'next';
import { Oswald, Barlow_Condensed, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { WebSiteJsonLd, WebAppJsonLd } from '@/components/seo/JsonLd';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-oswald',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-barlow',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ValorantScan — Free Valorant Stats Tracker & Analytics',
    template: '%s | ValorantScan',
  },
  description: 'Track your Valorant stats, agent performance, K/D, win rate, and rank progression. Free leaderboards, match analysis, heatmaps, and 7+ tools to improve your game.',
  keywords: [
    'valorant', 'valorant stats', 'valorant tracker', 'valorant analytics',
    'valorant leaderboard', 'valorant agent stats', 'valorant match history',
    'valorant rank tracker', 'val tracker', 'valo stats',
    'valorant heatmap', 'valorant stratbook', 'riot games',
  ],
  authors: [{ name: 'ValorantScan' }],
  creator: 'ValorantScan',
  metadataBase: new URL('https://valorantscan.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://valorantscan.com',
    siteName: 'ValorantScan',
    title: 'ValorantScan — Free Valorant Stats Tracker & Analytics',
    description: 'Track your Valorant stats, agent performance, K/D, win rate, and rank progression. Free leaderboards, match analysis, heatmaps, and 7+ tools to improve your game.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ValorantScan — Free Valorant Stats Tracker & Analytics',
    description: 'Track your Valorant stats, agent performance, K/D, win rate, and rank progression. Free tools to improve your game.',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/icon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${barlowCondensed.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <WebSiteJsonLd />
        <WebAppJsonLd />
      </head>
      <body className="min-h-screen font-inter antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
