"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar, Clock, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, XCircle } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { CancelAppointmentDialog } from "./cancel-appointment-dialog";
import { EditAppointmentModal } from "./edit-appointment-modal";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { useQuery } from "@tanstack/react-query";
import { getUserAppointments } from "@/lib/actions/queries";

export function AppointmentsTable({ appointments: initialAppointments }: { appointments: any[] }) {
  const { data: appointments } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => getUserAppointments(),
    initialData: initialAppointments,
    staleTime: 60 * 1000,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [appointmentToCancel, setAppointmentToCancel] = useState<any>(null);
  const [appointmentToEdit, setAppointmentToEdit] = useState<any>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && openDropdownId?.startsWith('mobile-')) {
        setOpenDropdownId(null);
      } else if (window.innerWidth < 768 && openDropdownId?.startsWith('desktop-')) {
        setOpenDropdownId(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [openDropdownId]);

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch = apt.service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAppointments = filteredAppointments.slice(startIndex, startIndex + itemsPerPage);

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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search service..." 
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

      <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
        <PaginationControls 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          totalItems={filteredAppointments.length}
          totalPages={totalPages}
          startIndex={startIndex}
        />
        <Table className="hidden md:table">
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-[300px]">Service</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  No appointments found matching your filters.
                </TableCell>
              </TableRow>
            ) : (
              currentAppointments.map((apt) => (
                <TableRow key={apt.id} className="group hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{apt.service.name}</span>
                      <span className="text-xs text-muted-foreground">{apt.service.duration} mins</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-primary" />
                        {format(new Date(apt.date), "MMM d, yyyy")}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1.5 text-primary" />
                        {format(new Date(apt.date), "h:mm a")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">${apt.service.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {getStatusBadge(apt.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu 
                      open={openDropdownId === `desktop-${apt.id}`} 
                      onOpenChange={(open) => setOpenDropdownId(open ? `desktop-${apt.id}` : null)}
                    >
                      <DropdownMenuTrigger className="inline-flex h-8 w-8 p-0 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-auto min-w-[180px]">
                        <DropdownMenuItem 
                          onClick={() => setAppointmentToEdit(apt)}
                          disabled={apt.status === 'COMPLETED' || apt.status === 'CANCELLED'}
                          className="whitespace-nowrap"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Reschedule</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setAppointmentToCancel(apt)}
                          disabled={apt.status === 'COMPLETED' || apt.status === 'CANCELLED'}
                          className="text-destructive focus:text-destructive whitespace-nowrap"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          <span>Cancel Appointment</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Mobile View */}
        <div className="flex flex-col gap-4 p-4 md:hidden">
          {currentAppointments.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground border rounded-lg bg-muted/20">
              No appointments found matching your filters.
            </div>
          ) : (
            currentAppointments.map((apt) => (
              <div key={apt.id} className="flex flex-col p-4 border rounded-xl bg-card shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground">{apt.service.name}</span>
                    <span className="text-xs text-muted-foreground">{apt.service.duration} mins</span>
                  </div>
                  <div>{getStatusBadge(apt.status)}</div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="flex flex-col space-y-1 text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-primary" />
                      {format(new Date(apt.date), "MMM d, yyyy")}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1.5 text-primary" />
                      {format(new Date(apt.date), "h:mm a")}
                    </div>
                  </div>
                  <div className="font-bold text-lg">${apt.service.price.toFixed(2)}</div>
                </div>
                
                <div className="flex justify-end pt-2 border-t mt-2">
                  <DropdownMenu
                    open={openDropdownId === `mobile-${apt.id}`} 
                    onOpenChange={(open) => setOpenDropdownId(open ? `mobile-${apt.id}` : null)}
                  >
                    <DropdownMenuTrigger className="inline-flex h-9 px-4 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border bg-background hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                      Actions <MoreHorizontal className="ml-2 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-auto min-w-[180px]">
                      <DropdownMenuItem 
                        onClick={() => setAppointmentToEdit(apt)}
                        disabled={apt.status === 'COMPLETED' || apt.status === 'CANCELLED'}
                        className="whitespace-nowrap"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Reschedule</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setAppointmentToCancel(apt)}
                        disabled={apt.status === 'COMPLETED' || apt.status === 'CANCELLED'}
                        className="text-destructive focus:text-destructive whitespace-nowrap"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        <span>Cancel Appointment</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t">
          <PaginationControls 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            totalItems={filteredAppointments.length}
            totalPages={totalPages}
            startIndex={startIndex}
          />
        </div>
      </div>

      {appointmentToCancel && (
        <CancelAppointmentDialog
          isOpen={!!appointmentToCancel}
          onClose={() => setAppointmentToCancel(null)}
          appointmentId={appointmentToCancel.id}
          serviceName={appointmentToCancel.service.name}
        />
      )}

      {appointmentToEdit && (
        <EditAppointmentModal
          isOpen={!!appointmentToEdit}
          onClose={() => setAppointmentToEdit(null)}
          appointment={appointmentToEdit}
        />
      )}
    </div>
  );
}
