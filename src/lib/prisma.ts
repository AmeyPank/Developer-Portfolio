import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log:
            process.env.NODE_ENV === "development"
                ? ["query", "error", "warn"]
                : ["error"],
    });
    
console.log(`[Runtime Environment]: Running in ${process.env.NODE_ENV} mode`);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;