import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@reevake.com' },
    update: {},
    create: {
      email: 'admin@reevake.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  // Create Initial Services
  const services = [
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

  for (const service of services) {
    const existing = await prisma.service.findFirst({ where: { name: service.name } });
    if (!existing) {
      await prisma.service.create({
        data: service,
      })
    }
  }

  console.log('Seed execution finished')
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
