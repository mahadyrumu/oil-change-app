import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="container mx-auto px-4 pt-32 pb-12 max-w-5xl min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {session.user.name || 'User'}</h1>
          <p className="text-muted-foreground">Manage your appointments and vehicle service history.</p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Your Appointments</h2>
        
        {appointments.length === 0 ? (
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="py-12 text-center text-muted-foreground">
              You don't have any appointments yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {appointments.map((apt) => (
              <Card key={apt.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{apt.service.name}</CardTitle>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full uppercase ${
                      apt.status === 'PENDING' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                      apt.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      apt.status === 'COMPLETED' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                  <CardDescription>${apt.service.price.toFixed(2)} &middot; {apt.service.duration} mins</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      {format(apt.date, "EEEE, MMMM do, yyyy")}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      {format(apt.date, "h:mm a")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
