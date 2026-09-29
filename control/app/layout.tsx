import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import SplashScreen from "@/components/SplashScreen";

const dmSerif = localFont({
  src: "./fonts/dm-serif-display-latin-400-normal.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-dm-serif",
  display: "swap",
});

const dmSans = localFont({
  src: "./fonts/dm-sans-latin-wght-normal.woff2",
  weight: "100 1000",
  style: "normal",
  variable: "--font-dm-sans",
  display: "swap",
});

// iPhone launch images (public/splash). iOS ignores the manifest for splash,
// so each device size needs its own image. [px width, px height, css width, css height, dpr]
const IOS_SPLASH: [number, number, number, number, number][] = [
  [1320, 2868, 440, 956, 3],
  [1206, 2622, 402, 874, 3],
  [1290, 2796, 430, 932, 3],
  [1179, 2556, 393, 852, 3],
  [1284, 2778, 428, 926, 3],
  [1170, 2532, 390, 844, 3],
  [1125, 2436, 375, 812, 3],
  [1242, 2688, 414, 896, 3],
  [828, 1792, 414, 896, 2],
  [1242, 2208, 414, 736, 3],
  [750, 1334, 375, 667, 2],
  [640, 1136, 320, 568, 2],
];

export const metadata: Metadata = {
  applicationName: "Eve-Circle",
  title: "Eve-Circle",
  description: "Your gentle cycle companion",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    title: "Eve-Circle",
    statusBarStyle: "black-translucent",
    startupImage: IOS_SPLASH.map(([w, h, dw, dh, r]) => ({
      url: `/splash/ios-${w}x${h}.png`,
      media: `(device-width: ${dw}px) and (device-height: ${dh}px) and (-webkit-device-pixel-ratio: ${r}) and (orientation: portrait)`,
    })),
  },
  formatDetection: { telephone: false },
  other: { "mobile-web-app-capable": "yes" },
};

export const viewport: Viewport = {
  themeColor: "#0d0d1a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
};

// Runs before first paint: if the splash already played this session, hide it
// immediately so returning visitors never see a flash of it.
const SPLASH_GUARD = `try{if(sessionStorage.getItem("ec-splash")==="1")document.documentElement.dataset.splash="seen"}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SPLASH_GUARD }} />
        <noscript>
          <style>{".ec-splash{display:none!important}"}</style>
        </noscript>
      </head>
      <body className="bg-[#0d0d1a] text-[#f0e6ff] min-h-screen">
        <SplashScreen />
        <ServiceWorkerRegister />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
