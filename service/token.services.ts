import { randomBytes } from 'crypto';
import { service } from '../common/decorators/layer.decorators';
import type { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import Config from '../common/config/Config';

@service()
export default class TokenService {
  private readonly prisma: PrismaClient;
  private readonly config = Config.getInstance();

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  public async generateToken(
    userId: number,
    type: 'access' | 'refresh' | 'validation',
    expiresIn: number
  ): Promise<string> {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    //Store the token in the database
    await this.prisma.token.create({
      data: {
        userId,
        token,
        type,
        expiresAt,
      },
    });

    return token;
  }

  /**
   * Helper function to verify the reset token.
   * @param token - The reset token.
   * @returns The decoded token payload if valid, null if invalid or expired.
   */
  public verifyResetToken(
    token: string
  ): { userId: string; email: string } | null {
    try {
      // Verify the JWT token and return the decoded payload
      const decoded = jwt.verify(token, this.config.jwt_secret as string);
      return decoded as { userId: string; email: string };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error.message;
      }
      return null; // Return null if the token is invalid or expired
    }
  }
}
