import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { IconDefs } from "@/components/Icon";
import { ScrollProgress } from "@/components/ScrollProgress";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thesemiogroup.com"),
  title: "The Semio Group — Strategic Advisory for the Modern SaaS Economy",
  description:
    "The Semio Group is a consulting and advisory firm helping SaaS companies accelerate growth through channel partnerships, enterprise relationships, data monetization, and go-to-market strategy.",
  openGraph: {
    title: "The Semio Group — Strategic Advisory for the Modern SaaS Economy",
    description:
      "Strategic advisory for SaaS growth, channel expansion, and data monetization.",
    url: "/",
    siteName: "The Semio Group",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Semio Group",
    description:
      "Strategic advisory for SaaS growth, channel expansion, and data monetization.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>
        <IconDefs />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
