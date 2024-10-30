import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import ClerkProvider from "@/components/partials/providers/ClerkProvider";
import ModalProvider from "@/components/partials/providers/ModalProvider";
import ToasterProvider from "@/components/partials/providers/ToasterProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Ecommerce admin panel",
  description: "Developed by Mohammad Bekran",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={GeistSans.className}>
        <body className="antialiased">
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
