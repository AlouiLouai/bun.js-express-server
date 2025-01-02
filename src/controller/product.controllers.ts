import type { Prisma, PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';
import Logger from '../common/Logger';
import { post } from '../common/decorators/http.decorators';
import { controller } from '../common/decorators/layer.decorators';
import ProductService from '../service/product.services';

@controller('/auth')
export default class ProductController {
  private readonly prisma: PrismaClient;
  private readonly logger = Logger.getInstance();
  private readonly productService: ProductService;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.productService = new ProductService(prisma);
  }

  /**
   * Handles product saving.
   * @param req - The HTTP request.
   * @param res - The HTTP response.
   */
  @post('/save-product')
  public async saveProduct(req: Request, res: Response): Promise<void> {
    try {
      // extract product data from request body
      const productData: Prisma.ProductCreateInput = req.body;
      if (
        !productData.link ||
        !productData.price ||
        !productData.title
      ) {
        throw new Error('link || price || title are required.');
      }
      const product = await this.productService.saveDocument(productData);
      // Send a success response
      res.status(201).json({
        message: 'Product saved successfully',
        product,
      });
    } catch (error) {
      this.logger.error(`Error in save document controller method: ${error}`);
      // Send an error response with appropriate status and message
      res.status(400).json({
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }
}
