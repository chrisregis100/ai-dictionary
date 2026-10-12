import "server-only";

import { PrismaNeon } from "@prisma/adapter-neon";

import { PrismaClient } from "@/lib/generated/prisma/client";

declare global {
  // Cache du client Prisma en dev (HMR)
  var prismaClient: PrismaClient | undefined;
}

let cachedClient: PrismaClient | undefined;

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) {
    throw new Error("DATABASE_URL n'est pas définie.");
  }
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

export function getPrisma(): PrismaClient {
  if (cachedClient) return cachedClient;
  if (globalThis.prismaClient) {
    cachedClient = globalThis.prismaClient;
    return cachedClient;
  }

  cachedClient = createPrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalThis.prismaClient = cachedClient;
  }
  return cachedClient;
}
