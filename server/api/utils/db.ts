import { PrismaClient } from '../../../prisma/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

const createPrismaClient = () => {
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
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

// Use global variable to persist across HMR in development
if (!global.__prisma) {
  global.__prisma = createPrismaClient()
}

export const prisma = global.__prisma