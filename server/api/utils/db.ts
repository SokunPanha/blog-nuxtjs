import { PrismaClient } from '../../../prisma/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const prismaClientSingleton = () => {
  // Support both local DATABASE_URL and Vercel Postgres naming
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL or POSTGRES_PRISMA_URL environment variable is required')
  }
  const pool = new PrismaPg({ connectionString })
  return new PrismaClient({
    adapter: pool,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma