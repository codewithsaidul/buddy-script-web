import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Buddy Script - Connect, Share & Explore Your Community",
  description: 
    "Join Buddy Script to connect with friends, share updates, and discover what's happening around you. The ultimate social script for developers.",
  keywords: ["Buddy Script", "Social Media", "Networking", "Next.js Social App", "Saidul Islam Rana"],
  authors: [{ name: "Saidul Islam Rana" }],
  icons: {
    icon: "/assets/images/logo-copy.svg",
  },
  openGraph: {
    title: "Buddy Script - Connect, Share & Explore Your Community",
    description: "The next generation social platform for meaningful connections.",
    url: "https://buddyscript.com",
    siteName: "Buddy Script",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buddy Script - Connect & Share",
    description: "Join the Buddy Script community today!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}