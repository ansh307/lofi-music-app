import { PrismaClient } from "@prisma/client";


const globalForPrisma = global;

// Avoid creating multiple instances of PrismaClient during hot reloads in dev
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = { prisma };
