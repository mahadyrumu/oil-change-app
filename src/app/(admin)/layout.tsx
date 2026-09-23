import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Globe, 
  Search, 
  Bell, 
  Building2, 
  Coffee, 
  ListOrdered, 
  MonitorPlay,
  CarFront,
  Wrench
} from "lucide-react"
import { Logo } from "@/components/logo"
import { logoutAction } from "@/lib/actions/auth"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { AdminMobileNav } from "./admin-mobile-nav"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/admin")
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const userInitials = session.user.name?.split(" ").map((n) => n[0]).join("") || "AD";

  return (
    <div className="flex min-h-screen bg-[#FDFDFD] dark:bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-muted/10 border-r flex flex-col hidden md:flex shrink-0">
        <div className="h-16 flex items-center px-6 border-b shrink-0">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo />
            {/* Admin badge removed per user request */}
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 scrollbar-none">
          <div className="space-y-1">
            <h4 className="px-3 text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-2">Main</h4>
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium bg-muted/60 text-foreground transition-colors">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
          </div>

          <div className="space-y-1">
            <h4 className="px-3 text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-2">Operations</h4>
            <Link href="/admin/appointments" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
              <ListOrdered className="w-4 h-4" /> Appointments List
            </Link>
          </div>

          <div className="space-y-1">
            <h4 className="px-3 text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-2">Customers</h4>
            <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
              <Users className="w-4 h-4" /> Customers
            </Link>
          </div>

        </div>


      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        {/* Top Header */}
        <header className="h-16 border-b flex items-center justify-between px-4 md:px-6 shrink-0 gap-4">
          <div className="flex items-center md:hidden gap-3">
            <AdminMobileNav />
            <Link href="/admin" className="flex items-center gap-2">
              <Logo />
            </Link>
          </div>

          <div className="flex-1"></div>

          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <Link href="/" className="hidden md:flex items-center justify-center text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 w-9 h-9 rounded-full transition-colors" title="View Website">
              <Globe className="h-4 w-4" />
            </Link>
            <div className="scale-90 opacity-80 hover:opacity-100 transition-opacity">
              <ThemeToggle />
            </div>
            

            <div className="hidden md:flex items-center pl-2 border-l ml-1">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted/50 transition-colors focus:outline-none">
                  <Avatar className="w-8 h-8 border bg-foreground">
                    <AvatarFallback className="text-[10px] font-bold text-background bg-foreground">{userInitials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-bold text-foreground">{session.user.name?.split(" ")[0] || "Admin"}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="px-2 py-1.5 text-xs text-muted-foreground break-all">
                      {session.user.email}
                    </div>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-0 text-destructive cursor-pointer hover:bg-destructive/10">
                    <form action={logoutAction} className="w-full">
                      <button type="submit" className="flex w-full items-center px-2 py-2 text-destructive rounded-sm outline-none">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#FDFDFD] dark:bg-background/95">
          <div className="mx-auto max-w-[1400px]">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
