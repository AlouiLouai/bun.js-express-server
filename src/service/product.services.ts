import { Prisma, type PrismaClient, type Product } from '@prisma/client';
import Logger from '../common/Logger';
import { service } from '../common/decorators/layer.decorators';

@service()
export default class ProductService {
  private readonly prisma: PrismaClient;
  private readonly logger = Logger.getInstance();

  constructor(prisma: PrismaClient) {
    if (!prisma) {
      throw new Error('PrismaClient instance is required.');
    }
    this.prisma = prisma;
  }

  /**
   * Register a new user.
   * @param product - The product data to create.
   * @returns The created product.
   */
  public async saveDocument(
    product: Prisma.ProductCreateInput
  ): Promise<Product | null> {
    if (!product) {
      this.logger.warn('Attempted to save a null or undefined product.');
      throw new Error('Invalid product data.');
    }

    try {
      const data = await this.prisma.product.create({
        data: product,
      });

      this.logger.info(`Product successfully created with ID: ${data.id}`);
      return data;
    } catch (error) {
      this.handleDatabaseError(error, 'saveDocument');
      return null;
    }
  }

  /**
   * Handle database errors with detailed logging.
   * @param error - The error object.
   * @param methodName - The name of the method where the error occurred.
   */
  private handleDatabaseError(error: unknown, methodName: string): void {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      this.logger.error(
        `[PrismaClientKnownRequestError] ${methodName}: ${error.message} (code: ${error.code})`
      );
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      this.logger.error(
        `[PrismaClientUnknownRequestError] ${methodName}: ${error.message}`
      );
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      this.logger.error(
        `[PrismaClientValidationError] ${methodName}: ${error.message}`
      );
    } else {
      // Generic error handling
      this.logger.error(`[Error] ${methodName}: ${error}`);
    }

    throw error; // Rethrow the error for higher-level handling
  }
}
