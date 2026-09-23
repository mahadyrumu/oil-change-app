import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { AppointmentsTable } from "./appointments-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export const metadata = {
  title: "My Dashboard | Oil Change Experts",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const appointments = await prisma.appointment.findMany({
    where: { userId: session.user.id },
    include: { service: true },
    orderBy: { date: 'desc' }
  });

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 pt-32 pb-12 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {session.user.name || 'User'}</h1>
          <p className="text-muted-foreground">Manage your appointments and vehicle service history.</p>
        </div>
        <Link href="/services#booking">
          <Button className="rounded-full shadow-lg hover:shadow-xl transition-all">
            <PlusCircle className="w-4 h-4 mr-2" />
            Book New Appointment
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Your Appointments</h2>
        
        {appointments.length === 0 ? (
          <div className="rounded-xl border bg-card border-dashed">
            <div className="py-12 text-center text-muted-foreground">
              You don't have any appointments yet.
            </div>
          </div>
        ) : (
          <AppointmentsTable appointments={appointments} />
        )}
      </div>
    </div>
  );
}
