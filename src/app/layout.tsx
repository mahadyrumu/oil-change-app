import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Logo } from "@/components/logo";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Premium Oil Change Services",
  description: "Book your next oil change online with our interactive mobile-first platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 flex flex-col">
            {children}
          </main>

          <footer className="border-t bg-muted/40 py-8 mt-auto">
            <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <Link href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
                  <Logo />
                </Link>
                <p className="text-sm text-muted-foreground">
                  Premium oil change and vehicle maintenance services. Fast, reliable, and professional.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
                  <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Contact</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>123 Auto Drive, Garage City</li>
                  <li>(555) 123-4567</li>
                  <li>info@autocare.reevake.com</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground pb-8">
              © {new Date().getFullYear()} Manhattan Oil Change. All rights reserved.
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
