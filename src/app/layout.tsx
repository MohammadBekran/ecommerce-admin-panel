import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import ClerkProvider from "@/components/partials/providers/clerk-provider";
import ModalProvider from "@/components/partials/providers/modal-provider";
import ThemeProvider from "@/components/partials/providers/theme-provider";
import ToastProvider from "@/components/partials/providers/toast-provider";

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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
