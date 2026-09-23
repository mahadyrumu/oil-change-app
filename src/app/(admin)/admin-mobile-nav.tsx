"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Users, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer when the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <Button variant="ghost" size="icon" className="md:hidden -ml-2" onClick={() => setIsOpen(true)}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in-0" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Drawer */}
          <div className="relative z-50 w-64 h-full bg-background border-r p-6 shadow-lg animate-in slide-in-from-left-full duration-300">
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold tracking-tight text-lg">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="-mr-2">
                <X className="h-5 w-5" />
                <span className="sr-only">Close Menu</span>
              </Button>
            </div>
            
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/admin" 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium ${pathname === '/admin' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link 
                href="/admin/appointments" 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium ${pathname === '/admin/appointments' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
              >
                <Calendar className="w-4 h-4" /> Appointments
              </Link>
              <Link 
                href="/admin/customers" 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium ${pathname === '/admin/customers' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
              >
                <Users className="w-4 h-4" /> Customers
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
