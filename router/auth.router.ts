import { Router } from "express";
import type { PrismaClient } from "@prisma/client";
import AuthController from "../controller/auth.controllers";

export default class AuthRouter {
  public router: Router;
  private authController: AuthController;

  constructor(prisma: PrismaClient) {
    this.router = Router();
    this.authController = new AuthController(prisma);

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/register", (req, res) =>
      this.authController.register(req, res)
    );
    // Add more routes here as needed
  }
}
