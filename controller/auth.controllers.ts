import type { Prisma, PrismaClient, User } from "@prisma/client";
import type { Request, Response } from "express";
import Logger from "../common/Logger";
import AuthService from "../service/auth.services";

export default class AuthController {
  private readonly prisma: PrismaClient;
  private readonly logger = Logger.getInstance();
  private readonly authService: AuthService;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.authService = new AuthService(prisma);
  }

  /**
   * Handles user registration.
   * @param req - The HTTP request.
   * @param res - The HTTP response.
   */
  public async register(req: Request, res: Response): Promise<void> {
    try {
      // extract user data from request body
      const userData: Prisma.UserCreateInput = req.body;
      // validate user input
      if (!userData.email || !userData.password) {
        throw new Error("Email and password are required.");
      }
      // Call the registerUser method from AuthService
      const user = await this.authService.registerUser(userData);
      // Send a success response
      res.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      this.logger.error(`Error in register method: ${error}`);
      // Respond with an error message
      // Send an error response with appropriate status and message
      res.status(400).json({
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }
}
