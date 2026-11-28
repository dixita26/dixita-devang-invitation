import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : new URL("https://dixita-weds-devang.vercel.app");

const shareImage = "/d-d-social-sharing.jpg";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Devang & Dixita | A celebration of love",
  description: "Join Devang and Dixita as they begin forever.",
  openGraph: {
    type: "website",
    title: "Devang & Dixita | A celebration of love",
    description: "Join Devang and Dixita as they begin forever.",
    url: "/",
    images: [
      {
        url: shareImage,
        width: 495,
        height: 496,
        alt: "Devang and Dixita wedding photo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devang & Dixita | A celebration of love",
    description: "Join Devang and Dixita as they begin forever.",
    images: [shareImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap" /></head><body>{children}</body></html>;
}
