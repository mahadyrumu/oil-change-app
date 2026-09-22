import { prisma } from "@/lib/db"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusForm } from "./status-form"

export const metadata = {
  title: "Manage Appointments | Admin",
}

export default async function AdminAppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { date: 'desc' },
    include: {
      user: true,
      service: true
    }
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        <p className="text-muted-foreground mt-1">Manage all customer bookings and update their statuses.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Service</th>
                  <th className="px-6 py-4 font-semibold">Date & Time</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                      No appointments found.
                    </td>
                  </tr>
                ) : (
                  appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-muted/30">
                      <td className="px-6 py-4">
                        <div className="font-medium text-foreground">{apt.user?.name || 'Unknown'}</div>
                        <div className="text-muted-foreground">{apt.user?.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{apt.service.name}</div>
                        <div className="text-muted-foreground">${apt.service.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div>{format(apt.date, "MMM d, yyyy")}</div>
                        <div className="text-muted-foreground">{format(apt.date, "h:mm a")}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase ${
                          apt.status === 'PENDING' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                          apt.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                          apt.status === 'COMPLETED' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <StatusForm appointmentId={apt.id} currentStatus={apt.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
