import { PrismaClient } from "@prisma/client";
import Logger from "../common/Logger";

const logger = Logger.getInstance();

class PrismaMiddleware {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.init();
  }

  private init() {
    // Correctly set up the Prisma client extension with query middleware
    this.prisma.$extends({
      query: {
        async $allOperations({ model, operation, args, query }) {
          const start = Date.now();
          // Proceed with the query (this actually runs the query)
          const result = await query(args);
          const duration = Date.now() - start;

          // Log the query if it takes longer than 1000ms (1 second)
          if (duration > 1000) {
            logger.warn(`Query ${model}.${operation} took ${duration}ms`);
          }

          return result;
        },
      },
    });
  }
}

export default PrismaMiddleware;
