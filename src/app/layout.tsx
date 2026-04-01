import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { cn } from "@/lib/utils";

const instrumentSansHeading = Instrument_Sans({ subsets: ['latin'], variable: '--font-heading' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema de Presença",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${cn(instrumentSansHeading.variable)}`}>
      <body
        className={`h-full font-sans${geistSans.variable} ${geistMono.variable}`}
      >
        <div className="">
          {children}
        </div>
        <Toaster richColors={true} closeButton={true} />
      </body>
    </html>
  );
}
