"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Wrench, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 px-4 pt-4 md:pt-6 transition-all"
      >
        <div 
          className={cn(
            "mx-auto max-w-5xl transition-all duration-500 rounded-full",
            isScrolled 
              ? "bg-background/80 backdrop-blur-2xl border border-border/50 shadow-2xl py-3 px-6" 
              : "bg-transparent py-2 px-2"
          )}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group relative z-50">
              <div className="bg-primary p-2.5 rounded-xl group-hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                <Wrench className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-foreground">
                AutoCare<span className="text-primary">.</span>
              </span>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
              <Link href="/services" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-all">Services</Link>
              <Link href="/about" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-all">About</Link>
              <Link href="/contact" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-all">Contact</Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <ThemeToggle />
              <Link href="/login" className="px-4 py-2 rounded-full text-sm font-bold text-foreground hover:text-primary transition-colors">
                Log in
              </Link>
              <Link 
                href="/book" 
                className={cn(
                  buttonVariants({ size: "default" }), 
                  "rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all font-bold px-6 border-t border-white/20"
                )}
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center space-x-3 relative z-50">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-full bg-background/50 backdrop-blur-md border border-border"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl flex flex-col items-center justify-center space-y-8"
          >
            <nav className="flex flex-col items-center space-y-6 text-2xl font-extrabold tracking-tight">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Home</Link>
              <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Services</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">About Us</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Contact</Link>
            </nav>
            <div className="flex flex-col items-center space-y-4 pt-8 w-full max-w-xs border-t border-border/50">
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full rounded-2xl")}
              >
                Log in
              </Link>
              <Link 
                href="/book" 
                onClick={() => setMobileMenuOpen(false)}
                className={cn(buttonVariants({ size: "lg" }), "w-full rounded-2xl shadow-xl shadow-primary/30")}
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
