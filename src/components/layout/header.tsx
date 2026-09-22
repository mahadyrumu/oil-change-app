"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import type { Session } from "next-auth";
import { logoutAction } from "@/lib/actions/auth";

export function Header({ session }: { session: Session | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Location", href: "/location" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* 
        V5 Header - Floating Glassmorphism Pill 
        When at the top, it rests cleanly. When scrolled, it shrinks into a floating pill with heavy blur.
      */}
      <header 
        className={cn(
          "fixed inset-x-0 z-50 transition-all duration-500 flex justify-center",
          isScrolled 
            ? "top-4 px-4" 
            : "top-0 px-0"
        )}
      >
        <div 
          className={cn(
            "w-full max-w-[1400px] transition-all duration-500 mx-auto",
            isScrolled 
              ? "bg-background/70 dark:bg-black/60 backdrop-blur-2xl border border-border/50 shadow-2xl rounded-full py-3 px-6 md:px-8"
              : "bg-background/95 backdrop-blur-xl border-b border-border/40 py-5 px-4 md:px-8 rounded-none"
          )}
        >
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="group relative z-50 transition-transform hover:scale-105">
              <Logo />
            </Link>
            
            {/* Desktop Nav - Modern Active State */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.name}
                    href={link.href} 
                    className={cn(
                      "relative px-4 py-2 text-[14px] font-semibold transition-colors rounded-full",
                      isActive ? "text-secondary dark:text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50 dark:hover:bg-muted/30"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="active-nav-indicator"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-secondary dark:bg-primary shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {session?.user ? (
                <div className="flex items-center space-x-4 border-r border-border pr-4 mr-2">
                  <span className="text-[14px] font-semibold text-foreground">
                    Hello, <span className="text-secondary dark:text-primary">{session.user.name?.split(" ")[0] || "User"}</span>
                  </span>
                  <form action={logoutAction}>
                    <Button variant="ghost" size="sm" type="submit" className="text-muted-foreground hover:text-foreground h-8 px-2 transition-colors">
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </Button>
                  </form>
                </div>
              ) : (
                <Link href="/login" className="text-[14px] font-semibold text-muted-foreground hover:text-foreground px-4 transition-colors">
                  Log in
                </Link>
              )}
              <Link 
                href="/book" 
                className={cn(
                  buttonVariants({ size: "sm" }), 
                  "rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all font-bold px-6 h-10"
                )}
              >
                Book Appointment
              </Link>
              <ThemeToggle />
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center space-x-3 relative z-50">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-full bg-muted/50 border border-border"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl flex flex-col items-center justify-center space-y-8"
          >
            <nav className="flex flex-col items-center space-y-6 text-2xl font-bold tracking-tight">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className={pathname === "/" ? "text-secondary dark:text-primary" : "text-foreground"}>Home</Link>
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={pathname === link.href ? "text-secondary dark:text-primary" : "text-foreground"}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col items-center space-y-4 pt-8 w-full max-w-xs border-t border-border">
              {session?.user ? (
                <div className="flex flex-col items-center space-y-3 pb-2 w-full">
                  <span className="text-lg font-semibold text-foreground">
                    Hello, <span className="text-secondary dark:text-primary">{session.user.name?.split(" ")[0] || "User"}</span>
                  </span>
                  <form action={logoutAction} className="w-full">
                    <Button variant="outline" size="lg" type="submit" className="w-full rounded-2xl font-semibold hover:bg-muted transition-colors">
                      <LogOut className="w-5 h-5 mr-2" /> Sign Out
                    </Button>
                  </form>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full rounded-2xl font-semibold")}
                >
                  Log in
                </Link>
              )}
              <Link 
                href="/book" 
                onClick={() => setMobileMenuOpen(false)}
                className={cn(buttonVariants({ size: "lg" }), "w-full rounded-2xl shadow-xl shadow-primary/20 font-semibold")}
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
