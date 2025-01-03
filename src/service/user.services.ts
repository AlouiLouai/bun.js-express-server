import { type PrismaClient, type User } from '@prisma/client';
import Logger from '../common/Logger';
import { service } from '../common/decorators/layer.decorators';
import Config from '../common/config/Config';

@service()
export default class UserService {
  private readonly prisma: PrismaClient;
  private readonly logger = Logger.getInstance();
  private readonly config = Config.getInstance();
  private readonly saltRounds = 10;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Get user by id.
   * @param id - The id to check.
   * @returns the existing user.
   */
  public async getUserById(id: number): Promise<Partial<User>> {
    try {
      const exist = await this.prisma.user.findUnique({
        where: { id },
        select: {
          email: true,
          lastname: true,
          firstname: true,
          avatar: true,
          products: true,
          role: true
        },
      });
      if (!exist) {
        throw new Error('User not found');
      }
      return exist;
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Custom error handling with different messages for better user feedback
        if (error.message.includes('User not found')) {
          throw new Error('Incorrect user id');
        }
      }
      // Log detailed error for debugging while throwing a user-friendly error message
      this.logger.error(`Login error: ${error}`);
      // Catch-all for unexpected errors
      throw new Error(
        'Login failed due to a system issue. Please try again later.'
      );
    }
  }

  /**
   * Update user profile
   * @param data - the payload of data to update.
   * @param id - the id of specific user.
   * @returns An object containing the updated user without password.
   * @throws Error if update user fails due to invalid data or system issues.
   */
  public async updateUser(
    data: Partial<User>,
    id: number
  ): Promise<Partial<User>> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          avatar: data.avatar,
        },
        select: {
          email: true,
          firstname: true,
          lastname: true,
          avatar: true,
        },
      });
      // Handle case where the user is not found
      if (!updatedUser) {
        throw new Error('Error in updating user');
      }
      // Return the user (without password), access token, and refresh token
      return updatedUser;
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Custom error handling with different messages for better user feedback
        if (error.message.includes('Error in updating user')) {
          throw new Error('Failed to update. Please try again.');
        }
      }
      // Log detailed error for debugging while throwing a user-friendly error message
      this.logger.error(`update user  error: ${error}`);
      // Catch-all for unexpected errors
      throw new Error(
        'Update user& failed due to a system issue. Please try again later.'
      );
    }
  }
}
