import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { BookingForm } from "@/components/booking-form";
import { Clock, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Book Appointment | Oil Change Experts",
  description: "Schedule your premium 30-minute oil change online.",
};

export default async function BookPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    // In NextAuth v5, redirect to sign in if not authenticated
    redirect("/login?callbackUrl=/book");
  }

  const services = await prisma.service.findMany({
    orderBy: { price: 'asc' }
  });

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-5xl min-h-screen">
      <div className="mb-10 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Schedule Your Service</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select a service package and choose a time that works for you. We guarantee you'll be in and out in under 30 minutes.
        </p>
        <div className="flex justify-center gap-6 pt-2">
          <div className="flex items-center text-sm font-medium text-muted-foreground">
            <Clock className="w-4 h-4 mr-2 text-primary" /> Zero Wait Time
          </div>
          <div className="flex items-center text-sm font-medium text-muted-foreground">
            <ShieldCheck className="w-4 h-4 mr-2 text-primary" /> Transparent Pricing
          </div>
        </div>
      </div>
      
      <div className="bg-card border rounded-xl shadow-sm p-6 md:p-10">
        {services.length > 0 ? (
          <BookingForm services={services} userId={session.user.id} />
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            No services are currently available for booking. Please check back later.
          </div>
        )}
      </div>
    </div>
  );
}
