import type { Prisma, PrismaClient, User } from "@prisma/client";
import type { Request, Response } from "express";
import Logger from "../common/Logger";
import AuthService from "../service/auth.services";

export default class AuthController {
  private prisma: PrismaClient;
  private logger = Logger.getInstance();
  private authService: AuthService;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.authService = new AuthService(prisma);
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      // extract user data from request body
      const userData: Prisma.UserCreateInput = req.body;
      // Call the registerUser method from AuthService
      const user = await this.authService.registerUser(userData);

      if (!user) {
        res.status(400).json({ message: "User registration failed" });
        return;
      }
      // Send a success response
      res.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      this.logger.error(`Error in register method: ${error}`);
      // Respond with an error message
      res.status(500).json({
        message: "Failed to register user",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
