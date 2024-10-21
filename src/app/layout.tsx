import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ClerkProvider from "@/components/partials/providers/ClerkProvider";
import ModalProvider from "@/components/partials/providers/ModalProvider";
import ToasterProvider from "@/components/partials/providers/ToasterProvider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Developed by Mohammad Bekran",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${inter.variable} antialiased`}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
