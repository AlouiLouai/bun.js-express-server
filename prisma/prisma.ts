import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// For production purpose enable logs for better monotoring
// const prisma = new PrismaClient({
//     log: ['query', 'info', 'warn', 'error'],
//   });

export default prisma;
