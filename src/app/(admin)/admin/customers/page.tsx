import { prisma } from "@/lib/db"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Customers | Admin",
}

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    where: { role: 'CUSTOMER' },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { appointments: true }
      }
    }
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground mt-1">View all registered customers and their booking history.</p>
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
                  <th className="px-6 py-4 font-semibold text-right">Total Bookings</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                      No customers found.
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-muted/30">
                      <td className="px-6 py-4 font-medium text-foreground">
                        {customer.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {customer.email}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {format(customer.createdAt, "MMM d, yyyy")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center justify-center bg-primary/10 text-primary font-bold w-6 h-6 rounded-full text-xs">
                          {customer._count.appointments}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
