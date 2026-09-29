import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "NFL tickets on the road to Super Bowl LXI",
  description:
    "Buy Super Bowl LXI early-access tickets at SoFi Stadium, plus the 20 highest-demand games of the 2026 NFL season.",
  icons: { icon: "/assets/brand/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        {children}
        <Script src="/data.js" strategy="afterInteractive" />
        <Script src="/stadiums.js" strategy="afterInteractive" />
        <Script src="/app.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
