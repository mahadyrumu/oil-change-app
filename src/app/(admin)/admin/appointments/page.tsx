import { prisma } from "@/lib/db"
import { format } from "date-fns"
import { AppointmentsClient } from "./appointments-client"

export const metadata = {
  title: "Manage Appointments | Admin",
}

export default async function AdminAppointmentsPage() {
  const [appointments, users, services] = await Promise.all([
    prisma.appointment.findMany({
      orderBy: { date: 'desc' },
      include: {
        user: true,
        service: true
      }
    }),
    prisma.user.findMany({
      where: { role: 'CUSTOMER', isActive: true },
      orderBy: { name: 'asc' },
    }),
    prisma.service.findMany({
      orderBy: { name: 'asc' },
    })
  ]);

  return (
    <AppointmentsClient 
      appointments={appointments}
      users={users}
      services={services}
    />
  )
}
