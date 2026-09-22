"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

// Middleware to ensure the user is an admin
async function ensureAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Admin access required.");
  }
}

// --- APPOINTMENT ACTIONS ---

export async function createAppointment(data: {
  userId: string;
  serviceId: string;
  date: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
}) {
  await ensureAdmin();

  await prisma.appointment.create({
    data: {
      userId: data.userId,
      serviceId: data.serviceId,
      date: new Date(data.date),
      status: data.status,
    },
  });

  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateAppointment(id: string, data: {
  userId: string;
  serviceId: string;
  date: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
}) {
  await ensureAdmin();

  await prisma.appointment.update({
    where: { id },
    data: {
      userId: data.userId,
      serviceId: data.serviceId,
      date: new Date(data.date),
      status: data.status,
    },
  });

  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteAppointment(id: string) {
  await ensureAdmin();

  await prisma.appointment.delete({
    where: { id },
  });

  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
  return { success: true };
}

// --- CUSTOMER ACTIONS ---

export async function createCustomer(data: {
  name: string;
  email: string;
  isActive: boolean;
}) {
  await ensureAdmin();

  // Create user as a CUSTOMER with a random password if not using OAuth
  // (In a real system, you might want to send a password reset link)
  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email.toLowerCase(),
      role: "CUSTOMER",
      isActive: data.isActive,
    },
  });

  revalidatePath("/admin/customers");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateCustomer(id: string, data: {
  name: string;
  email: string;
  isActive: boolean;
}) {
  await ensureAdmin();

  await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email.toLowerCase(),
      isActive: data.isActive,
    },
  });

  revalidatePath("/admin/customers");
  revalidatePath("/admin");
  return { success: true };
}

// Note: Soft delete by setting isActive to false
export async function toggleCustomerActiveStatus(id: string, currentStatus: boolean) {
  await ensureAdmin();

  await prisma.user.update({
    where: { id },
    data: {
      isActive: !currentStatus,
    },
  });

  revalidatePath("/admin/customers");
  revalidatePath("/admin");
  return { success: true };
}
