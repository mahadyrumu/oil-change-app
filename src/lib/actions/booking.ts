"use server"

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { parse, isValid } from "date-fns";

const bookingSchema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time slot"),
});

export async function createAppointment(prevState: unknown, formData: FormData) {
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

  // Parse date (yyyy-MM-dd) + time (hh:mm aa) reliably using date-fns
  const dateObj = parse(`${date} ${time}`, "yyyy-MM-dd hh:mm aa", new Date());

  if (!isValid(dateObj)) {
    return { success: false, message: "Invalid date or time format.", errors: {} };
  }

  try {
    // Prevent the same user from booking the same slot twice
    const duplicate = await prisma.appointment.findFirst({
      where: {
        userId: session.user.id,
        date: dateObj,
        status: { not: "CANCELLED" }
      }
    });

    if (duplicate) {
      return { success: false, message: "You already have a booking for this time slot.", errors: {} };
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

export async function cancelAppointment(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "Unauthorized." };
  }

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment || appointment.userId !== session.user.id) {
      return { success: false, message: "Appointment not found or unauthorized." };
    }

    if (appointment.status === 'COMPLETED' || appointment.status === 'CANCELLED') {
      return { success: false, message: "Cannot cancel an already completed or cancelled appointment." };
    }

    await prisma.appointment.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    return { success: true, message: "Appointment cancelled successfully." };
  } catch (error) {
    console.error("Cancellation Error:", error);
    return { success: false, message: "Failed to cancel appointment." };
  }
}

const updateBookingSchema = z.object({
  id: z.string(),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time slot"),
});

export async function updateAppointment(prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "Unauthorized.", errors: {} };
  }

  const data = Object.fromEntries(formData);
  const parsed = updateBookingSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please select a valid date and time.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { id, date, time } = parsed.data;
  const dateObj = parse(`${date} ${time}`, "yyyy-MM-dd hh:mm aa", new Date());

  if (!isValid(dateObj)) {
    return { success: false, message: "Invalid date or time format.", errors: {} };
  }

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment || appointment.userId !== session.user.id) {
      return { success: false, message: "Appointment not found or unauthorized.", errors: {} };
    }

    if (appointment.status === 'COMPLETED' || appointment.status === 'CANCELLED') {
      return { success: false, message: "Cannot reschedule an already completed or cancelled appointment.", errors: {} };
    }

    // Check collision for the new time (excluding the current appointment itself)
    const existing = await prisma.appointment.findFirst({
      where: { 
        date: dateObj,
        id: { not: id } 
      }
    });

    if (existing) {
      return { success: false, message: "This time slot is already booked. Please select another.", errors: {} };
    }

    await prisma.appointment.update({
      where: { id },
      data: { date: dateObj },
    });

    return { success: true, message: "Appointment rescheduled successfully!", errors: {} };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, message: "Failed to reschedule appointment. Please try again.", errors: {} };
  }
}
