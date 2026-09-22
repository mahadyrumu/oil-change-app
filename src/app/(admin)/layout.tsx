import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Calendar, Users, Settings, LogOut } from "lucide-react"
import { Logo } from "@/components/logo"
import { logoutAction } from "@/lib/actions/auth"

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
            <span className="font-bold text-lg hidden lg:block tracking-tight text-foreground">AutoCare <span className="text-xs text-primary font-mono uppercase border border-primary/30 px-1.5 py-0.5 rounded ml-1 bg-primary/10">Admin</span></span>
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
        <div className="p-4 border-t">
          <form action={logoutAction}>
            <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile Header (simplified) */}
        <div className="md:hidden h-16 border-b bg-background flex items-center justify-between px-4">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo />
            <span className="font-bold">Admin</span>
          </Link>
          <form action={logoutAction}>
            <button className="p-2 text-muted-foreground">
              <LogOut className="w-5 h-5" />
            </button>
          </form>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
