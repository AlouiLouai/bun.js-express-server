import { Router } from 'express';
import type { Request, Response } from 'express';
import type { PrismaClient } from '@prisma/client';
import AuthController from '../controller/auth.controllers';
import { registerRouter, route } from '../common/decorators/layer.decorators';

export default class AuthRouter {
  public router: Router;
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.router = Router();
    this.prisma = prisma;
    this.initializeRoutes();
  }

  @route('post', '/register')
  private async register(req: Request, res: Response): Promise<void> {
    const authController = new AuthController(this.prisma);
    await authController.register(req, res);
  }

  @route('post', '/login')
  private async login(req: Request, res: Response): Promise<void> {
    const authController = new AuthController(this.prisma);
    await authController.login(req, res);
  }

  @route('post', '/forgot-password')
  private async forgotPassword(req: Request, res: Response): Promise<void> {
    const authController = new AuthController(this.prisma);
    await authController.forgotPassword(req, res);
  }

  @route('post', '/reset-password', false, ['resetToken'])
  private async resetPassword(req: Request, res: Response): Promise<void> {
    const resetToken = req.query.token as string; // Extract resetToken from query params
    if (!resetToken) {
      res.status(400).json({ message: 'Reset token is required.' });
    }
    const authController = new AuthController(this.prisma);
    await authController.resetPassword(req, res);
  }

  private initializeRoutes(): void {
    // Automatically register all routes defined with `@route`
    registerRouter(this.router, this);
  }
}
