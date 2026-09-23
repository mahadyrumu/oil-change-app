import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Calendar, Users, Settings, LogOut, UserCircle, Globe } from "lucide-react"
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

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo />
            <span className="text-[10px] text-primary font-mono uppercase border border-primary/30 px-1.5 py-0.5 rounded bg-primary/10 mb-1 self-end hidden lg:block">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/admin/appointments" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
            <Calendar className="w-4 h-4" /> Appointments
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
            <Users className="w-4 h-4" /> Customers
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b bg-background flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center md:hidden gap-2">
            <AdminMobileNav />
            <Link href="/admin" className="flex items-center gap-2 ml-1">
              <Logo />
              <span className="text-[10px] text-primary font-mono uppercase border border-primary/30 px-1.5 py-0.5 rounded bg-primary/10">Admin</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center text-sm font-medium text-muted-foreground">
            <span>Welcome back, <span className="text-foreground">{session.user.name?.split(" ")[0] || "Admin"}</span></span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-2 py-1.5 rounded-md transition-colors" title="View Website">
              <Globe className="h-5 w-5 md:w-4 md:h-4" />
              <span className="hidden md:inline">View Website</span>
            </Link>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger className="p-1 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary">
                <UserCircle className="w-6 h-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="px-2 py-2 text-sm text-muted-foreground break-all">
                    {session.user.email}
                  </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-0 text-destructive cursor-pointer hover:bg-destructive/10">
                  <form action={logoutAction} className="w-full">
                    <button type="submit" className="flex w-full items-center px-2 py-2 text-destructive cursor-pointer hover:bg-destructive/10 rounded-sm outline-none">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
