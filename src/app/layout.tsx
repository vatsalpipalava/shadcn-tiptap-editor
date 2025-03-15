import type { Metadata } from "next";
import { Geist, Inter, Open_Sans, Poppins, Roboto } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const open_sans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tiptap editor demo",
  description:
    "Rich Text editor built with nextjs, tiptap editor and shadcn/ui. Accessible. Customizable. Open Source.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistSans.className} ${inter.variable} ${roboto.variable} ${poppins.variable} ${open_sans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
