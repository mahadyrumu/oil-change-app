"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function getUserAppointments() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const appointments = await prisma.appointment.findMany({
    where: { userId: session.user.id },
    include: { service: true },
    orderBy: { date: 'desc' }
  });

  return appointments;
}
