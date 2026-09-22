"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Wrench } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm py-4" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="bg-primary p-2 rounded-xl group-hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            <Wrench className="h-5 w-5 text-white" />
          </div>
          <span className={cn("text-xl font-extrabold tracking-tight", isScrolled ? "text-[#1F2937]" : "text-[#1F2937]")}>
            OilChange<span className="text-primary">Experts</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/services" className={cn("text-sm font-bold transition-colors hover:text-primary", isScrolled ? "text-[#1F2937]/70" : "text-[#1F2937]")}>Services</Link>
          <Link href="/about" className={cn("text-sm font-bold transition-colors hover:text-primary", isScrolled ? "text-[#1F2937]/70" : "text-[#1F2937]")}>About Us</Link>
          <Link href="/contact" className={cn("text-sm font-bold transition-colors hover:text-primary", isScrolled ? "text-[#1F2937]/70" : "text-[#1F2937]")}>Contact</Link>
          
          <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-primary/20">
            <Link href="/login" className={cn("text-sm font-bold transition-colors hover:text-primary", isScrolled ? "text-[#1F2937]/70" : "text-[#1F2937]")}>Log in</Link>
            <Link 
              href="/book" 
              className={cn(
                buttonVariants({ size: "default" }), 
                "rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all font-bold"
              )}
            >
              Book Now
            </Link>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
