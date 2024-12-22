import { PrismaClient } from '@prisma/client';
import PrismaMiddleware from './prisma.middleware';

// Create an instance of PrismaClient
const prisma = new PrismaClient();

// For production purpose enable logs for better monotoring
// const prisma = new PrismaClient({
//     log: ['query', 'info', 'warn', 'error'],
//   });

// Apply middleware to the Prisma Client
new PrismaMiddleware(prisma);

export default prisma;
