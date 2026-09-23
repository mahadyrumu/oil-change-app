"use client"

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createAppointment } from "@/lib/actions/booking";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function BookProcessPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Guard against React StrictMode's double-invocation of effects
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    async function processBooking() {
      const storedData = sessionStorage.getItem("pendingBooking");
      if (!storedData) {
        toast.error("No pending booking found.");
        router.push("/services");
        return;
      }

      try {
        const data = JSON.parse(storedData);
        
        const formData = new FormData();
        formData.append("serviceId", data.serviceId);
        formData.append("date", data.date);
        formData.append("time", data.time);

        const result = await createAppointment({ success: false, message: "", errors: {} }, formData);

        if (result.success) {
          sessionStorage.removeItem("pendingBooking");
          toast.success("Appointment booked successfully!");
          router.push("/dashboard");
        } else {
          setError(result.message || "Failed to finalize booking.");
          toast.error(result.message || "Failed to finalize booking.");
          sessionStorage.removeItem("pendingBooking");
          setTimeout(() => router.push("/services"), 3000);
        }
      } catch (err) {
        console.error(err);
        setError("An unexpected error occurred while processing your booking.");
        sessionStorage.removeItem("pendingBooking");
        setTimeout(() => router.push("/services"), 3000);
      }
    }

    processBooking();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center space-y-6 max-w-md w-full">
        {error ? (
          <div className="bg-destructive/10 text-destructive p-6 rounded-2xl border border-destructive/20 shadow-lg">
            <h2 className="text-xl font-bold mb-2">Booking Failed</h2>
            <p className="font-medium text-sm">{error}</p>
            <p className="text-sm mt-4 opacity-80">Redirecting to services...</p>
          </div>
        ) : (
          <div className="bg-card p-12 rounded-[2rem] border border-border shadow-2xl flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-secondary dark:text-primary animate-spin mb-6" />
            <h1 className="text-2xl font-extrabold text-foreground mb-2">Finalizing your booking...</h1>
            <p className="text-muted-foreground font-medium text-sm">
              Please do not close this window. We are securing your time slot.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
