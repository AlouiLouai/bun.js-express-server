import { Router } from 'express';
import type { Request, Response } from 'express';
import type { PrismaClient } from '@prisma/client';
import { registerRouter, route } from '../common/decorators/layer.decorators';
import UserController from '../controller/user.controllers';

export default class UserRouter {
  public router: Router;
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.router = Router();
    this.prisma = prisma;
    this.initializeRoutes();
  }

  @route('get', '/', true)
  private async getUser(req: Request, res: Response): Promise<void> {
    const userController = new UserController(this.prisma);
    await userController.getProfile(req, res);
  }

  @route('put', '/',true)
  private async updateUser(req: Request, res: Response): Promise<void> {
    const userController = new UserController(this.prisma);
    await userController.updateProfile(req, res);
  }

  private initializeRoutes(): void {
    // Automatically register all routes defined with `@route`
    registerRouter(this.router, this);
  }
}
