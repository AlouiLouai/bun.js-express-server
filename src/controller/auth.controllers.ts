import type { Prisma, PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';
import Logger from '../common/Logger';
import AuthService from '../service/auth.services';
import { get, post } from '../common/decorators/http.decorators';
import { controller } from '../common/decorators/layer.decorators';

@controller('/auth')
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
  @post('/register')
  public async register(req: Request, res: Response): Promise<void> {
    try {
      // extract user data from request body
      const userData: Prisma.UserCreateInput = req.body;
      // validate user input
      if (!userData.email || !userData.password) {
        throw new Error('Email and password are required.');
      }
      // Call the registerUser method from AuthService
      const user = await this.authService.registerUser(userData);
      // Send a success response
      res.status(201).json({
        message: 'User registered successfully',
        user,
      });
    } catch (error) {
      this.logger.error(`Error in register method: ${error}`);
      // Send an error response with appropriate status and message
      res.status(400).json({
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }

  /**
   * Handles user login
   * @param req- The HTTP request.
   * @param res - The HTTP response.
   */
  @post('/login')
  public async login(req: Request, res: Response): Promise<void> {
    try {
      // extract user data from request body
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }
      // Call the registerUser method from AuthService
      const { user, access_token, refresh_token } =
        await this.authService.loginUser(email, password);
      // Send a success response
      res.status(201).json({
        message: 'User logged successfully',
        user,
        access_token: access_token,
        refresh_token: refresh_token,
      });
    } catch (error) {
      this.logger.error(`Error in login method: ${error}`);
      // Send an error response with appropriate status and message
      res.status(400).json({
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }

  /**
   * Handles user login
   * @param req- The HTTP request.
   * @param res - The HTTP response.
   */
  @post('/forgot-password')
  public async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await this.authService.forgotPassword(email);
      res.status(200).json({
        message: 'Email send successfully',
      });
    } catch (error) {
      this.logger.error(`Error in forgot password method: ${error}`);
      // Send an error response with appropriate status and message
      res.status(400).json({
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }

  /**
   * Handles user login
   * @param req- The HTTP request.
   * @param res - The HTTP response.
   */
  @post('/reset-password')
  public async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      // Get the resetToken from query params
      const resetToken = req.query.token as string;
      if (!resetToken) {
        res.status(400).json({ message: 'Reset token is required.' });
        return;
      }
      const { new_password } = req.body;
      await this.authService.resetPassword(resetToken, new_password);
      res.status(200).json({
        message: 'Password reset successfully!!',
      });
    } catch (error) {
      this.logger.error(`Error in reset password method: ${error}`);
      // Send an error response with appropriate status and message
      res.status(400).json({
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }

  @get('/users')
  public async users(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.authService.users();
      res.status(200).json({
        "users": response
      })
    } catch (error) {
      this.logger.error(`Error in get users method: ${error}`);
      // Send an error response with appropriate status and message
      res.status(400).json({
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }
}
