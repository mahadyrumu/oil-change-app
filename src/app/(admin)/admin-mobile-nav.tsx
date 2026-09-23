"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Menu, 
  X, 
  Building2, 
  Coffee, 
  ListOrdered, 
  MonitorPlay,
  CarFront,
  Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

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
      <Button variant="ghost" size="icon" className="md:hidden -ml-2 text-foreground" onClick={() => setIsOpen(true)}>
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
          <div className="relative z-50 w-64 h-full bg-background border-r p-4 shadow-lg animate-in slide-in-from-left-full duration-300 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between mb-8 px-2">
              <Logo />
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="-mr-2 text-foreground">
                <X className="h-5 w-5" />
                <span className="sr-only">Close Menu</span>
              </Button>
            </div>
            
            <nav className="flex flex-col gap-6">
              <div className="space-y-1">
                <h4 className="px-3 text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-2">Main</h4>
                <Link 
                  href="/admin" 
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${pathname === '/admin' ? 'bg-muted/60 text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
              </div>

              <div className="space-y-1">
                <h4 className="px-3 text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-2">Operations</h4>
                <Link 
                  href="/admin/appointments" 
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${pathname === '/admin/appointments' ? 'bg-muted/60 text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                >
                  <ListOrdered className="w-4 h-4" /> Appointments List
                </Link>
              </div>

              <div className="space-y-1">
                <h4 className="px-3 text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-2">Customers</h4>
                <Link 
                  href="/admin/customers" 
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${pathname === '/admin/customers' ? 'bg-muted/60 text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                >
                  <Users className="w-4 h-4" /> Customers
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
