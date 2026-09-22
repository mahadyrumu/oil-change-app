"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Search, Plus, Edit, Power, PowerOff, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomerFormModal } from "./customer-form-modal";
import { toggleCustomerActiveStatus } from "@/lib/actions/admin-actions";
import { toast } from "sonner";

export function CustomersClient({ customers }: { customers: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const filteredCustomers = customers.filter((cust) => {
    const searchString = `${cust.name || ""} ${cust.email || ""}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter === "ACTIVE") matchesStatus = cust.isActive;
    if (statusFilter === "INACTIVE") matchesStatus = !cust.isActive;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (cust: any) => {
    setSelectedCustomer(cust);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedCustomer(null);
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const actionName = currentStatus ? "deactivate" : "activate";
    if (confirm(`Are you sure you want to ${actionName} this customer?`)) {
      try {
        await toggleCustomerActiveStatus(id, currentStatus);
        toast.success(`Customer ${actionName}d successfully`);
      } catch (error) {
        toast.error(`Failed to ${actionName} customer`);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground mt-1">View all registered customers and their booking history.</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name or email..." 
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
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
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
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Joined Date</th>
                  <th className="px-6 py-4 font-semibold text-center">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Bookings</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {currentCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      No customers found.
                    </td>
                  </tr>
                ) : (
                  currentCustomers.map((customer) => (
                    <tr key={customer.id} className={`hover:bg-muted/30 ${!customer.isActive ? 'opacity-50' : ''}`}>
                      <td className="px-6 py-4 font-medium text-foreground">
                        {customer.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {customer.email}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {format(new Date(customer.createdAt), "MMM d, yyyy")}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase ${
                          customer.isActive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {customer.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center justify-center bg-primary/10 text-primary font-bold w-6 h-6 rounded-full text-xs">
                          {customer._count?.appointments || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleEdit(customer)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className={customer.isActive ? "text-amber-500 hover:bg-amber-500/10" : "text-green-500 hover:bg-green-500/10"} 
                            onClick={() => handleToggleStatus(customer.id, customer.isActive)}
                            title={customer.isActive ? "Deactivate" : "Activate"}
                          >
                            {customer.isActive ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
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
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} entries
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

      {/* Customer Modal */}
      {isModalOpen && (
        <CustomerFormModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={selectedCustomer}
        />
      )}
    </div>
  );
}
