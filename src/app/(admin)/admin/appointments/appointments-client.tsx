"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppointmentFormModal } from "./appointment-form-modal";
import { deleteAppointment } from "@/lib/actions/admin-actions";
import { toast } from "sonner";

export function AppointmentsClient({ 
  appointments, 
  users, 
  services 
}: { 
  appointments: any[], 
  users: any[], 
  services: any[] 
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const filteredAppointments = appointments.filter((apt) => {
    const searchString = `${apt.user?.name || ""} ${apt.user?.email || ""} ${apt.service.name}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAppointments = filteredAppointments.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (apt: any) => {
    setSelectedAppointment(apt);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedAppointment(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this appointment? This action cannot be undone.")) {
      try {
        await deleteAppointment(id);
        toast.success("Appointment deleted successfully");
      } catch (error) {
        toast.error("Failed to delete appointment");
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'PENDING':
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Pending</span>;
      case 'CONFIRMED':
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Confirmed</span>;
      case 'COMPLETED':
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Completed</span>;
      default:
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground mt-1">Manage all customer bookings and update their statuses.</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="w-4 h-4 mr-2" />
          Add Appointment
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search customers or services..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v || "ALL"); setCurrentPage(1); }}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Service</th>
                  <th className="px-6 py-4 font-semibold">Date & Time</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {currentAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                      No appointments found.
                    </td>
                  </tr>
                ) : (
                  currentAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-muted/30">
                      <td className="px-6 py-4">
                        <div className="font-medium text-foreground">{apt.user?.name || 'Unknown'}</div>
                        <div className="text-muted-foreground">{apt.user?.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{apt.service.name}</div>
                        <div className="text-muted-foreground">${apt.service.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div>{format(new Date(apt.date), "MMM d, yyyy")}</div>
                        <div className="text-muted-foreground">{format(new Date(apt.date), "h:mm a")}</div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(apt.status)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleEdit(apt)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(apt.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAppointments.length)} of {filteredAppointments.length} entries
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium w-16 text-center">
                  Page {currentPage} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Appointment Modal */}
      {isModalOpen && (
        <AppointmentFormModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          users={users}
          services={services}
          initialData={selectedAppointment}
        />
      )}
    </div>
  );
}
