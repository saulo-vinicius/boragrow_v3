import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/layout/MainNav";
import { UserNav } from "@/components/layout/UserNav";
import { AuthProvider } from "@/contexts/AuthContext";
import { I18nProvider } from "@/components/i18n-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bora Grow - Plant Tracking SaaS",
  description:
    "A plant tracking application for cultivators to monitor and manage their plants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://api.tempo.new/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between py-4">
                  <MainNav />
                  <div className="hidden md:flex items-center space-x-4">
                    <UserNav />
                  </div>
                </div>
              </header>
              <main className="flex-1">{children}</main>
            </div>
            <TempoInit />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
