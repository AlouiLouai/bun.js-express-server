import { Router } from "express";
import type { Request, Response } from "express";
import type { PrismaClient } from "@prisma/client";
import AuthController from "../controller/auth.controllers";
import { registerRouter, route } from "../common/decorators/layer.decorators";

export default class AuthRouter {
  public router: Router;
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.router = Router();
    this.prisma = prisma;
    this.initializeRoutes();
  }

  @route("post", "/register")
  private async register(req: Request, res: Response): Promise<void> {
    const authController = new AuthController(this.prisma);
    await authController.register(req, res);
  }

  private initializeRoutes(): void {
    // Automatically register all routes defined with `@route`
    registerRouter(this.router, this);
  }
}
