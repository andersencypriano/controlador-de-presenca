import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { cn } from "@/lib/utils";

const instrumentSansHeading = Instrument_Sans({subsets:['latin'],variable:'--font-heading'});

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
    <html lang="en" className={cn(instrumentSansHeading.variable)}>
      <body
        className={` antialiased bg-gray-300 ${geistSans.variable} ${geistMono.variable} px-5`}
      >
        {children}
        <Toaster richColors={true} closeButton={true} />
      </body>
    </html>
  );
}
