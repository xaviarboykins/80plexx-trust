import { PrismaClient } from "@prisma/client";
declare global {
     namespace globalThis {
          var prismadb: PrismaClient;
     }
}

export const prismadb =
     global.prisma ||
     new PrismaClient({
          log: ["query"],
     });

if (process.env.NODE_ENV !== "production") global.prisma = prismadb;
