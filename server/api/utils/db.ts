import { PrismaClient } from '../../../prisma/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const prismaClientSingleton = () => {
  // Support both local DATABASE_URL and Vercel Postgres naming
  let connectionString = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL or POSTGRES_PRISMA_URL environment variable is required')
  }

  // Ensure connection_limit=1 for serverless (Vercel)
  if (!connectionString.includes('connection_limit=')) {
    connectionString += connectionString.includes('?') ? '&connection_limit=1' : '?connection_limit=1'
  }

  const pool = new PrismaPg({
    connectionString,
    // Limit pool size for serverless
    max: 1,
  })

  return new PrismaClient({
    adapter: pool,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

// Cache prisma instance in both dev and production for serverless
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()
globalForPrisma.prisma = prisma