"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { createAppointment, updateAppointment } from "@/lib/actions/admin-actions";

const appointmentSchema = z.object({
  userId: z.string().min(1, "Customer is required"),
  serviceId: z.string().min(1, "Service is required"),
  date: z.string().min(1, "Date and time is required"),
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

interface AppointmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: any[];
  services: any[];
  initialData?: any; // If provided, we are in Edit mode
}

export function AppointmentFormModal({ isOpen, onClose, users, services, initialData }: AppointmentFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!initialData;

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      userId: initialData?.userId || "",
      serviceId: initialData?.serviceId || "",
      // Format the date for the datetime-local input
      date: initialData?.date 
        ? format(new Date(initialData.date), "yyyy-MM-dd'T'HH:mm") 
        : "",
      status: initialData?.status || "PENDING",
    },
  });

  const onSubmit = async (data: AppointmentFormValues) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateAppointment(initialData.id, data);
        toast.success("Appointment updated successfully");
      } else {
        await createAppointment(data);
        toast.success("Appointment created successfully");
      }
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to save appointment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Appointment" : "Create Appointment"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Modify the appointment details below." : "Book a new appointment on behalf of a customer."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Customer</label>
            <Select 
              value={form.watch("userId")} 
              onValueChange={(val) => form.setValue("userId", val || "")}
            >
              <SelectTrigger className={form.formState.errors.userId ? "border-red-500" : ""}>
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name || user.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.userId && (
              <p className="text-xs text-red-500">{form.formState.errors.userId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Service</label>
            <Select 
              value={form.watch("serviceId")} 
              onValueChange={(val) => form.setValue("serviceId", val || "")}
            >
              <SelectTrigger className={form.formState.errors.serviceId ? "border-red-500" : ""}>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} (${service.price})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.serviceId && (
              <p className="text-xs text-red-500">{form.formState.errors.serviceId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date & Time</label>
            <Input 
              type="datetime-local" 
              {...form.register("date")}
              className={form.formState.errors.date ? "border-red-500" : ""}
            />
            {form.formState.errors.date && (
              <p className="text-xs text-red-500">{form.formState.errors.date.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select 
              value={form.watch("status")} 
              onValueChange={(val: any) => form.setValue("status", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
