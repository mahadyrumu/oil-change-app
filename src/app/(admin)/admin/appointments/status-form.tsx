"use client"

import { useState, useTransition } from "react"
import { updateAppointmentStatus } from "@/lib/actions/admin"
import { toast } from "sonner"
import { MoreHorizontal, Check, X, CheckCircle2 } from "lucide-react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type Status = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED"

export function StatusForm({ appointmentId, currentStatus }: { appointmentId: string, currentStatus: Status }) {
  const [isPending, startTransition] = useTransition()

  const handleUpdate = (newStatus: Status) => {
    if (newStatus === currentStatus) return

    startTransition(async () => {
      const result = await updateAppointmentStatus(appointmentId, newStatus)
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">Open menu</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => handleUpdate("CONFIRMED")}
          disabled={currentStatus === "CONFIRMED" || isPending}
        >
          <Check className="mr-2 h-4 w-4 text-blue-500" />
          Mark as Confirmed
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleUpdate("COMPLETED")}
          disabled={currentStatus === "COMPLETED" || isPending}
        >
          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
          Mark as Completed
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleUpdate("CANCELLED")}
          disabled={currentStatus === "CANCELLED" || isPending}
          className="text-red-600 focus:text-red-600"
        >
          <X className="mr-2 h-4 w-4" />
          Cancel Appointment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
