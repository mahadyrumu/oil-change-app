"use server"

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const bookingSchema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time slot"),
});

export async function createAppointment(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "Unauthorized. Please log in to book.", errors: {} };
  }

  const data = Object.fromEntries(formData);
  const parsed = bookingSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please select a service, date, and time.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { serviceId, date, time } = parsed.data;

  // Create DateTime object based on user selection
  const dateObj = new Date(`${date} ${time}`);

  if (isNaN(dateObj.getTime())) {
    return { success: false, message: "Invalid date or time format.", errors: {} };
  }

  try {
    // Basic slot collision detection
    const existing = await prisma.appointment.findFirst({
      where: { date: dateObj }
    });

    if (existing) {
      return { success: false, message: "This time slot is already booked. Please select another.", errors: {} };
    }

    await prisma.appointment.create({
      data: {
        userId: session.user.id,
        serviceId,
        date: dateObj,
        status: "PENDING",
      }
    });

    return { success: true, message: "Appointment booked successfully!", errors: {} };
  } catch (error) {
    console.error("Booking Error:", error);
    return { success: false, message: "Failed to book appointment. Please try again.", errors: {} };
  }
}
