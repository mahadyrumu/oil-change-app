import { prisma } from "@/lib/db"
import { Card, CardContent } from "@/components/ui/card"
import { Users, DollarSign, ListOrdered, Wrench } from "lucide-react"
import { DashboardFilter } from "./dashboard-filter"
import { DashboardCharts } from "./dashboard-charts"
import { subDays, subYears } from "date-fns"

export const metadata = {
  title: "Admin Dashboard | Oil Change Experts",
}

export default async function AdminDashboardPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const range = (searchParams.range as string) || '30d';
  
  let startDate = new Date(0); // All time by default
  const now = new Date();
  
  if (range === '7d') startDate = subDays(now, 7);
  else if (range === '30d') startDate = subDays(now, 30);
  else if (range === '90d') startDate = subDays(now, 90);
  else if (range === '1y') startDate = subYears(now, 1);

  // We fetch customers created after the startDate
  const [totalCustomers, totalAppointments, appointmentsInRange, recentAppointments] = await Promise.all([
    prisma.user.count({ 
      where: { role: 'CUSTOMER', createdAt: { gte: startDate } } 
    }),
    prisma.appointment.count({
      where: { date: { gte: startDate } }
    }),
    prisma.appointment.findMany({
      where: { date: { gte: startDate } },
      include: { service: true }
    }),
    prisma.appointment.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true, service: true }
    })
  ])

  // Calculate total revenue from completed appointments in range
  const totalRevenue = appointmentsInRange
    .filter(a => a.status === 'COMPLETED')
    .reduce((sum, apt) => sum + apt.service.price, 0)

  // Calculate pending / queue
  const queueCount = appointmentsInRange.filter(a => a.status === 'PENDING' || a.status === 'CONFIRMED').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1 font-medium">
            Welcome back! Here's an overview of your auto care center.
          </p>
        </div>
        <DashboardFilter />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border-border/60 shadow-sm bg-card hover:shadow-md transition-all">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Total Revenue</span>
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold mb-2">${totalRevenue.toFixed(2)}</div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              <span className="text-xs font-bold text-emerald-500">+12.5%</span>
              <span className="text-xs text-muted-foreground font-medium">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/60 shadow-sm bg-card hover:shadow-md transition-all">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Today's Appointments</span>
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
                <ListOrdered className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold mb-2">{totalAppointments}</div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              <span className="text-xs font-bold text-emerald-500">+8.2%</span>
              <span className="text-xs text-muted-foreground font-medium">vs yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/60 shadow-sm bg-card hover:shadow-md transition-all">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Active Customers</span>
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold mb-2">{totalCustomers}</div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              <span className="text-xs font-bold text-emerald-500">+3.1%</span>
              <span className="text-xs text-muted-foreground font-medium">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/60 shadow-sm bg-card hover:shadow-md transition-all">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Service Queue</span>
              <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600">
                <Wrench className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold mb-2">{queueCount}</div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              <span className="text-xs font-bold text-emerald-500">{queueCount}</span>
              <span className="text-xs text-muted-foreground font-medium">pending appointments</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-1 lg:col-span-5 rounded-2xl border-border/60 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-border/50 bg-card/50">
            <div>
              <h3 className="font-bold text-lg">Recent Appointments</h3>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">Latest customer bookings</p>
            </div>
            <span className="text-xs font-bold text-foreground cursor-pointer hover:underline">View All ↗</span>
          </div>
          <div className="p-0 bg-card">
            {recentAppointments.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground font-medium py-8">No recent bookings</div>
            ) : (
              <div className="divide-y divide-border/40">
                {recentAppointments.map(apt => (
                  <div key={apt.id} className="flex items-center p-5 hover:bg-muted/30 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-muted border border-border/50 flex items-center justify-center text-muted-foreground font-bold text-sm shrink-0">
                      {apt.user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="ml-4 space-y-1 flex-1">
                      <p className="text-sm font-bold leading-none text-foreground">{apt.user?.name || apt.user?.email || 'Unknown User'}</p>
                      <p className="text-xs text-muted-foreground font-medium">
                        {apt.service.name} • {new Date(apt.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        apt.status === 'PENDING' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50' :
                        apt.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50' :
                        apt.status === 'COMPLETED' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-900/50' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-900/50'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <Card className="col-span-1 lg:col-span-2 rounded-2xl border-border/60 shadow-sm bg-card/50">
          <div className="p-6">
            <h3 className="font-bold text-lg">Popular Services</h3>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">Top sellers this week</p>
            
            <div className="mt-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm"></div>
                  <span className="text-sm font-bold text-foreground">High Mileage Oil Change</span>
                </div>
                <span className="text-sm font-bold text-muted-foreground">14</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm"></div>
                  <span className="text-sm font-bold text-foreground">Full Synthetic</span>
                </div>
                <span className="text-sm font-bold text-muted-foreground">9</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm"></div>
                  <span className="text-sm font-bold text-foreground">Standard Oil Change</span>
                </div>
                <span className="text-sm font-bold text-muted-foreground">5</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <DashboardCharts appointments={appointmentsInRange} />
      </div>
    </div>
  )
}
