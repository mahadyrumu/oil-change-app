"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function updateAppointmentStatus(appointmentId: string, status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED") {
  const session = await auth()
  
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { success: false, message: "Unauthorized" }
  }

  try {
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status }
    })
    
    revalidatePath("/admin")
    revalidatePath("/admin/appointments")
    return { success: true, message: `Appointment status updated to ${status}` }
  } catch (error) {
    return { success: false, message: "Failed to update status" }
  }
}
