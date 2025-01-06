import { Router } from 'express';
import type { Request, Response } from 'express';
import type { PrismaClient } from '@prisma/client';
import { registerRouter, route } from '../common/decorators/layer.decorators';
import ProductController from '../controller/product.controllers';

export default class ProductRouter {
  public router: Router;
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.router = Router();
    this.prisma = prisma;
    this.initializeRoutes();
  }

  @route('post', '/save', true)
  private async saveProduct(req: Request, res: Response): Promise<void> {
    const productController = new ProductController(this.prisma);
    await productController.saveProduct(req, res);
  }

  @route('get', '/getAll', false)
  private async getAllProducts(req: Request, res: Response): Promise<void> {
    const productController = new ProductController(this.prisma);
    await productController.getPaginatedProducts(req, res);
  }

  private initializeRoutes(): void {
    // Automatically register all routes defined with `@route`
    registerRouter(this.router, this);
  }
}
