"use client"

import { useState, useActionState, useEffect } from "react";
import { createAppointment } from "@/lib/actions/booking";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CheckCircle2, Loader2, CalendarIcon, Clock } from "lucide-react";

type Service = { id: string; name: string; price: number; duration: number; description: string; };

// "08:00 AM" → "08:00" (for <input type="time"> value)
function toTimeInput(t: string): string {
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return "";
  let h = parseInt(m[1]);
  const min = m[2];
  const ap = m[3].toUpperCase();
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return `${h.toString().padStart(2, "0")}:${min}`;
}

// "08:00" (24h) → "08:00 AM"
function fromTimeInput(val: string): string {
  if (!val) return "";
  const [hStr, mStr] = val.split(":");
  const h = parseInt(hStr);
  const min = mStr;
  const ap = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12.toString().padStart(2, "0")}:${min} ${ap}`;
}

export function BookingForm({ services, isAuthenticated, defaultServiceId = "" }: { services: Service[], isAuthenticated: boolean, defaultServiceId?: string }) {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string>(defaultServiceId);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [calOpen, setCalOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDate(new Date());
    setMounted(true);
  }, []);

  const [state, formAction, isPendingServer] = useActionState(createAppointment, {
    success: false, message: "", errors: {}
  });

  const timeSlots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setIsNavigating(true);
      router.push("/dashboard");
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  const handleSaveAndRedirect = () => {
    if (!selectedService || !date || !time) {
      toast.error("Please select a service, date, and time slot.");
      return;
    }
    setIsRedirecting(true);
    sessionStorage.setItem("pendingBooking", JSON.stringify({
      serviceId: selectedService,
      date: format(date, "yyyy-MM-dd"),
      time,
    }));
    router.push("/login?callbackUrl=/book/process");
  };

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <form action={formAction} className="flex flex-col gap-4 p-5 md:p-6">
      {/* Hidden inputs */}
      <input type="hidden" name="serviceId" value={selectedService} />
      <input type="hidden" name="date" value={date ? format(date, "yyyy-MM-dd") : ""} />
      <input type="hidden" name="time" value={time} />

      {/* ── 1. Services — horizontal cards ── */}
      <div>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Select a Service</p>
        <div className="grid grid-cols-3 gap-2">
          {services.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedService(s.id)}
              className={cn(
                "relative flex flex-col gap-0.5 p-3 rounded-xl border-2 text-left transition-all duration-150",
                selectedService === s.id
                  ? "border-secondary dark:border-primary bg-secondary/5 dark:bg-primary/5 shadow-sm"
                  : "border-border hover:border-secondary/50 dark:hover:border-primary/50 bg-background"
              )}
            >
              {selectedService === s.id && (
                <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-secondary dark:bg-primary flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </span>
              )}
              <span className="font-bold text-foreground text-xs leading-tight pr-5">{s.name}</span>
              <span className="text-muted-foreground text-[10px]">{s.duration} min</span>
              <span className="font-extrabold text-foreground text-sm mt-1">${s.price.toFixed(2)}</span>
            </button>
          ))}
        </div>
        {state.errors?.serviceId && <p className="text-[10px] text-destructive mt-1">{state.errors.serviceId[0]}</p>}
      </div>

      {/* ── 2. Time shortcuts — horizontal scroll ── */}
      <div>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Quick Time</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-none snap-x pb-0.5">
          {timeSlots.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTime(t)}
              className={cn(
                "shrink-0 snap-start px-3 h-9 rounded-xl border-2 text-xs font-semibold transition-all duration-150 whitespace-nowrap",
                time === t
                  ? "border-secondary dark:border-primary bg-secondary dark:bg-primary text-white shadow"
                  : "border-border hover:border-secondary/50 dark:hover:border-primary/50 text-foreground bg-background"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. Date + Custom Time picker — side by side ── */}
      <div className="grid grid-cols-2 gap-3">

        {/* Date popover */}
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
            <CalendarIcon className="inline w-3 h-3 mr-1 -mt-0.5" />Date
          </p>
          <Popover open={calOpen} onOpenChange={setCalOpen}>
            <PopoverTrigger
              type="button"
              className={cn(
                "w-full flex items-center gap-2 h-10 px-3 rounded-xl border-2 border-border bg-background",
                "text-sm font-semibold text-foreground transition-colors",
                "hover:border-secondary/60 dark:hover:border-primary/60 focus:outline-none",
                calOpen && "border-secondary dark:border-primary"
              )}
            >
              <CalendarIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span className="truncate">{mounted && date ? format(date, "MMM d, yyyy") : "Pick date"}</span>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-2xl shadow-2xl border-border" align="start">
              {mounted && (
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => { setDate(d); setCalOpen(false); }}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0)) || d.getDay() === 0}
                  className="rounded-2xl"
                />
              )}
            </PopoverContent>
          </Popover>
          {state.errors?.date && <p className="text-[10px] text-destructive mt-1">{state.errors.date[0]}</p>}
        </div>

        {/* Custom time input */}
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
            <Clock className="inline w-3 h-3 mr-1 -mt-0.5" />Custom Time
          </p>
          <div className="relative">
            <input
              type="time"
              value={time ? toTimeInput(time) : ""}
              onChange={e => {
                const converted = fromTimeInput(e.target.value);
                if (converted) setTime(converted);
              }}
              className={cn(
                "w-full h-10 pl-9 pr-3 rounded-xl border-2 border-border bg-background",
                "text-sm font-semibold text-foreground transition-colors cursor-pointer",
                "focus:outline-none focus:border-secondary dark:focus:border-primary",
                time && !timeSlots.includes(time) && "border-secondary dark:border-primary"
              )}
            />
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>
          {state.errors?.time && <p className="text-[10px] text-destructive mt-1">{state.errors.time[0]}</p>}
        </div>
      </div>

      {/* ── 4. Summary bar ── */}
      {selectedServiceData && date && time && (
        <div className="flex items-center gap-2 bg-secondary/5 dark:bg-primary/5 border border-secondary/20 dark:border-primary/20 rounded-xl px-4 py-2.5 flex-wrap text-xs">
          <span className="font-bold text-foreground">{selectedServiceData.name}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{format(date, "MMM d, yyyy")}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{time}</span>
          <span className="ml-auto font-extrabold text-foreground text-sm">${selectedServiceData.price.toFixed(2)}</span>
        </div>
      )}

      {/* ── 5. CTA ── */}
      {isAuthenticated ? (
        <Button
          type="submit"
          disabled={isPendingServer || isNavigating || !selectedService || !date || !time}
          className="w-full h-11 text-sm font-bold rounded-xl bg-secondary dark:bg-primary hover:bg-secondary/90 dark:hover:bg-primary/90 text-white border-0 shadow-lg"
        >
          {isPendingServer || isNavigating
            ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Confirming...</span>
            : "Confirm Booking"}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={handleSaveAndRedirect}
          disabled={isRedirecting || !selectedService || !date || !time}
          className="w-full h-11 text-sm font-bold rounded-xl bg-secondary dark:bg-primary hover:bg-secondary/90 dark:hover:bg-primary/90 text-white border-0 shadow-lg"
        >
          {isRedirecting
            ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Redirecting...</span>
            : "Continue to Sign In →"}
        </Button>
      )}

      {!isAuthenticated && (
        <p className="text-center text-[10px] text-muted-foreground -mt-2">
          Sign in to confirm. Your selection will be saved.
        </p>
      )}
    </form>
  );
}
