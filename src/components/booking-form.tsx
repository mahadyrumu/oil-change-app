"use client"

import { useState, useActionState, useEffect, useTransition } from "react";
import { createAppointment } from "@/lib/actions/booking";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type Service = { id: string; name: string; price: number; duration: number; description: string; };

export function BookingForm({ services, userId }: { services: Service[], userId: string }) {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("");
  const [isPendingClient, startTransition] = useTransition();
  
  const [state, formAction, isPendingServer] = useActionState(createAppointment, { 
    success: false, message: "", errors: {} 
  });

  const isPending = isPendingServer || isPendingClient;

  const timeSlots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      startTransition(() => {
        router.push("/dashboard");
      });
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-8">
      {/* Hidden inputs to pass state to formData */}
      <input type="hidden" name="serviceId" value={selectedService} />
      <input type="hidden" name="date" value={date ? format(date, "yyyy-MM-dd") : ""} />
      <input type="hidden" name="time" value={time} />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">1. Select Service</h2>
          <div className="grid gap-4">
            {services.map(s => (
              <Card 
                key={s.id} 
                className={cn("cursor-pointer transition-colors hover:border-primary", selectedService === s.id ? "border-primary bg-primary/5 shadow-md" : "")}
                onClick={() => setSelectedService(s.id)}
              >
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{s.name}</h3>
                    <p className="text-sm text-muted-foreground">{s.duration} mins</p>
                  </div>
                  <div className="text-lg font-bold">${s.price.toFixed(2)}</div>
                </CardContent>
              </Card>
            ))}
            {state.errors?.serviceId && (
              <p className="text-sm text-destructive font-medium">{state.errors.serviceId[0]}</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">2. Select Date & Time</h2>
          <Card>
            <CardContent className="p-4 flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date(new Date().setHours(0,0,0,0)) || d.getDay() === 0}
                className="rounded-md"
              />
            </CardContent>
          </Card>
          {state.errors?.date && <p className="text-sm text-destructive font-medium">{state.errors.date[0]}</p>}

          <div className="grid grid-cols-4 gap-2 pt-2">
            {timeSlots.map(t => (
              <Button
                key={t}
                type="button"
                variant={time === t ? "default" : "outline"}
                className="w-full text-xs sm:text-sm"
                onClick={() => setTime(t)}
              >
                {t}
              </Button>
            ))}
          </div>
          {state.errors?.time && <p className="text-sm text-destructive font-medium">{state.errors.time[0]}</p>}
        </div>
      </div>

      <div className="pt-6 border-t flex justify-end">
        <Button size="lg" type="submit" disabled={isPending || !selectedService || !date || !time} className="w-full md:w-auto px-12 h-14 text-lg">
          {isPending ? "Confirming Booking..." : "Confirm Booking"}
        </Button>
      </div>
    </form>
  );
}
