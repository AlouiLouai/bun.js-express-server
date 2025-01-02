import type { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';
import Logger from '../common/Logger';
import { get, put } from '../common/decorators/http.decorators';
import { controller } from '../common/decorators/layer.decorators';
import UserService from '../service/user.services';

@controller('/profile')
export default class UserController {
  private readonly prisma: PrismaClient;
  private readonly logger = Logger.getInstance();
  private readonly userService: UserService;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.userService = new UserService(prisma);
  }

  /**
   * Handles getting profile.
   * @param req - The HTTP request.
   * @param res - The HTTP response.
   */
  @get('/')
  public async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const profile = await this.userService.getUserById(Number(req.user?.sub));
      // Send a success response
      res.status(201).json({
        message: 'Profile got successfully',
        profile,
      });
    } catch (error) {
      this.logger.error(`Error in getProfile method: ${error}`);
      // Send an error response with appropriate status and message
      res.status(400).json({
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }

  /**
   * Handles uupdate profile
   * @param req- The HTTP request.
   * @param res - The HTTP response.
   */
  @put('/')
  public async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      // Call the registerUser method from AuthService
      const updatedUser = await this.userService.updateUser(
        req.body,
        Number(req.user?.sub)
      );
      // Send a success response
      res.status(201).json({
        message: 'Profile Updated successfully',
        updatedUser,
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
}
