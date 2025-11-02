import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // Ensure DATABASE_URL is set
  let databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(`DATABASE_URL environment variable is not set. Please check your .env file.`);
  }

  // Remove quotes if present (common in .env files)
  databaseUrl = databaseUrl.trim().replace(/^["']|["']$/g, "");

  // Validate DATABASE_URL format
  if (!databaseUrl.startsWith("mysql://")) {
    throw new Error(`DATABASE_URL must start with mysql://. Got: ${databaseUrl.substring(0, 50)}...`);
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Store prisma instance globally in all environments to prevent connection leaks
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma;
}
