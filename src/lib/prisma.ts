import { PrismaClient } from "@prisma/client";

// SAFETY: globalThis caches one PrismaClient across HMR reloads in dev so the
// connection pool is not exhausted; TypeScript cannot know about this property.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
