import { prisma } from "@/lib/db"
import { format } from "date-fns"
import { CustomersClient } from "./customers-client"

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
    <CustomersClient customers={customers} />
  )
}
