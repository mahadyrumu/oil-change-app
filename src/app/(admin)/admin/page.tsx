import { prisma } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, DollarSign, Activity } from "lucide-react"

export const metadata = {
  title: "Admin Dashboard | Oil Change Experts",
}

export default async function AdminDashboardPage() {
  const [totalCustomers, totalAppointments, totalRevenueResult, recentAppointments] = await Promise.all([
    prisma.user.count({ where: { role: 'CUSTOMER' } }),
    prisma.appointment.count(),
    prisma.appointment.findMany({
      where: { status: 'COMPLETED' },
      include: { service: true }
    }),
    prisma.appointment.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true, service: true }
    })
  ])

  // Calculate total revenue from completed appointments
  const totalRevenue = totalRevenueResult.reduce((sum, apt) => sum + apt.service.price, 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back to the admin portal. Here's what's happening with the business today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From completed services</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalAppointments}</div>
            <p className="text-xs text-muted-foreground">Total scheduled all-time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Status</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Healthy</div>
            <p className="text-xs text-muted-foreground">System operating normally</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentAppointments.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground py-4">No recent bookings</div>
              ) : (
                recentAppointments.map(apt => (
                  <div key={apt.id} className="flex items-center">
                    <div className="ml-4 space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">{apt.user?.name || apt.user?.email || 'Unknown User'}</p>
                      <p className="text-sm text-muted-foreground">
                        {apt.service.name}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        apt.status === 'PENDING' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                        apt.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        apt.status === 'COMPLETED' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
