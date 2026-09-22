"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createCustomer, updateCustomer } from "@/lib/actions/admin-actions";

const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  isActive: z.boolean(),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

interface CustomerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any; // If provided, we are in Edit mode
}

export function CustomerFormModal({ isOpen, onClose, initialData }: CustomerFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!initialData;

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      isActive: initialData !== undefined ? initialData.isActive : true,
    },
  });

  const onSubmit = async (data: CustomerFormValues) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateCustomer(initialData.id, data);
        toast.success("Customer updated successfully");
      } else {
        await createCustomer(data);
        toast.success("Customer created successfully");
      }
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to save customer");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Customer" : "Add Customer"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Modify the customer's details." : "Create a new customer profile."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input 
              placeholder="e.g. John Doe"
              {...form.register("name")}
              className={form.formState.errors.name ? "border-red-500" : ""}
            />
            {form.formState.errors.name && (
              <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input 
              type="email"
              placeholder="e.g. john@example.com"
              {...form.register("email")}
              className={form.formState.errors.email ? "border-red-500" : ""}
            />
            {form.formState.errors.email && (
              <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          {isEditing && (
            <div className="flex items-center space-x-2 pt-2">
              <input 
                type="checkbox" 
                id="isActive" 
                className="rounded border-gray-300"
                {...form.register("isActive")}
              />
              <label htmlFor="isActive" className="text-sm font-medium">
                Active Account
              </label>
            </div>
          )}

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
