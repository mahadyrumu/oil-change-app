"use client";

import { useState, useActionState, useEffect, useTransition } from "react";
import { updateAppointment } from "@/lib/actions/booking";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export function EditAppointmentModal({
  isOpen,
  onClose,
  appointment,
}: {
  isOpen: boolean;
  onClose: () => void;
  appointment: any | null;
}) {
  const router = useRouter();
  
  // Parse existing date/time
  const getInitialDate = () => {
    if (appointment) {
      const d = new Date(appointment.date);
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const initialDate = getInitialDate();
  
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [time, setTime] = useState<string>(
    appointment ? format(new Date(appointment.date), "hh:mm a") : format(new Date(), "hh:mm a")
  );
  const [isPendingClient, startTransition] = useTransition();

  const [state, formAction, isPendingServer] = useActionState(updateAppointment, { 
    success: false, message: "", errors: {} 
  });

  const isPending = isPendingServer || isPendingClient;

  const timeSlots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  // Reset local state when modal opens with a new appointment
  useEffect(() => {
    if (isOpen && appointment) {
      const d = new Date(appointment.date);
      setDate(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
      setTime(format(d, "hh:mm a"));
    }
  }, [isOpen, appointment]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      startTransition(() => {
        router.refresh();
        onClose();
      });
    } else if (state.message && state.success === false) {
      // Small timeout to prevent state.message flashing on initial render if not cleared
      if (state.message !== "") {
        toast.error(state.message);
      }
    }
  }, [state, router, onClose]);

  if (!appointment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogDescription>
            Choose a new date and time for your {appointment.service.name}.
          </DialogDescription>
        </DialogHeader>
        
        <form action={formAction} className="space-y-6 pt-4">
          <input type="hidden" name="id" value={appointment.id} />
          <input type="hidden" name="date" value={date ? format(date, "yyyy-MM-dd") : ""} />
          <input type="hidden" name="time" value={time} />

          <div className="flex justify-center border rounded-md p-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(d) => d < new Date(new Date().setHours(0,0,0,0)) || d.getDay() === 0}
            />
          </div>
          {state.errors?.date && <p className="text-sm text-destructive font-medium">{state.errors.date[0]}</p>}

          <div>
            <h4 className="mb-2 text-sm font-medium">Available Times</h4>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map(t => (
                <Button
                  key={t}
                  type="button"
                  variant={time === t ? "default" : "outline"}
                  className="w-full text-xs"
                  onClick={() => setTime(t)}
                >
                  {t}
                </Button>
              ))}
            </div>
            {state.errors?.time && <p className="text-sm text-destructive font-medium mt-1">{state.errors.time[0]}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !date || !time}>
              {isPending ? "Saving..." : "Confirm Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
