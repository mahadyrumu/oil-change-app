import { PrismaClient, AppointmentStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Cleaning up existing customers and appointments...')
  
  // Delete all appointments first to avoid foreign key constraints
  await prisma.appointment.deleteMany({})
  
  // Delete all customers
  await prisma.user.deleteMany({ where: { role: 'CUSTOMER' } })

  // Ensure Admin User exists
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@reevake.com' },
    update: { password: hashedPassword },
    create: {
      email: 'admin@reevake.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('Admin user ensured: admin@reevake.com / admin123')

  // Create or fetch Initial Services
  const servicesData = [
    {
      name: 'Standard Oil Change',
      description: 'Conventional motor oil change, replace oil filter, and check fluid levels.',
      price: 39.99,
      duration: 30,
    },
    {
      name: 'Full Synthetic Oil Change',
      description: 'Maximum protection for your engine. Includes oil filter and comprehensive fluid check.',
      price: 79.99,
      duration: 45,
    },
    {
      name: 'High Mileage Oil Change',
      description: 'Specially formulated for vehicles over 75,000 miles. Helps prevent leaks and burn-off.',
      price: 59.99,
      duration: 45,
    },
  ]

  const serviceRecords = []
  for (const service of servicesData) {
    let existing = await prisma.service.findFirst({ where: { name: service.name } })
    if (!existing) {
      existing = await prisma.service.create({
        data: service,
      })
    }
    serviceRecords.push(existing)
  }

  // Create 5 Mock Customers
  const mockPassword = await bcrypt.hash('password123', 10)
  const customers = []
  
  for (let i = 1; i <= 5; i++) {
    const customer = await prisma.user.create({
      data: {
        name: `Mock Customer ${i}`,
        email: `customer${i}@example.com`,
        password: mockPassword,
        role: 'CUSTOMER',
        isActive: true,
      }
    })
    customers.push(customer)
  }
  console.log('Created 5 mock customers (customer1@example.com -> customer5@example.com / password: password123)')

  // Create 10 appointments for each customer
  const statuses = [
    AppointmentStatus.PENDING,
    AppointmentStatus.CONFIRMED,
    AppointmentStatus.COMPLETED,
    AppointmentStatus.CANCELLED
  ]

  let apptCount = 0
  for (const customer of customers) {
    for (let j = 0; j < 10; j++) {
      // Generate a random date between 30 days ago and 30 days in the future
      const date = new Date()
      date.setDate(date.getDate() + (Math.floor(Math.random() * 60) - 30))
      // Random business hour between 9 AM and 5 PM
      date.setHours(9 + Math.floor(Math.random() * 8), 0, 0, 0)
      
      const randomService = serviceRecords[Math.floor(Math.random() * serviceRecords.length)]
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

      await prisma.appointment.create({
        data: {
          userId: customer.id,
          serviceId: randomService.id,
          date,
          status: randomStatus
        }
      })
      apptCount++
    }
  }
  
  console.log(`Created ${apptCount} mock appointments total.`)
  console.log('Seed execution finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
