import { Prisma, type PrismaClient, type User } from '@prisma/client';
import Logger from '../common/Logger';
import bcrypt from 'bcrypt';
import { omit } from 'lodash';
import jwt from 'jsonwebtoken';
import { service } from '../common/decorators/layer.decorators';
import Config from '../common/config/Config';
import TokenService from './token.services';
import EmailService from './email.services';

@service()
export default class AuthService {
  private readonly prisma: PrismaClient;
  private readonly tokenService: TokenService;
  private readonly emailService: EmailService;
  private readonly logger = Logger.getInstance();
  private readonly config = Config.getInstance();
  private readonly saltRounds = 10;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.tokenService = new TokenService(prisma);
    this.emailService = new EmailService();
  }

  /**
   * Checks if a user exists by email.
   * @param email - The email to check.
   * @returns A boolean indicating whether the user exists.
   */
  private async isEmailTaken(email: string): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      return !!user;
    } catch (error) {
      this.logger.error(`Error checking email existence: ${error}`);
      throw new Error('Failed to verify email existence.');
    }
  }

  /**
   * Login user and return user data with access token and refresh token.
   * @param email - The email address of the user.
   * @param password - The password provided by the user.
   * @returns An object containing the user (without password), access_token, and refresh_token.
   * @throws Error if login fails due to invalid email, password, or system issues.
   */
  public async loginUser(
    email: string,
    password: string
  ): Promise<{ user: User; access_token: string; refresh_token: string }> {
    try {
      // Validate input: check for empty email and password
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format.');
      }
      // Fetch the user by email
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      // Handle case where the user is not found
      if (!user) {
        throw new Error('Invalid email or password.');
      }
      // Extract hashed password and rename for clarity
      const userWithoutPassword = omit(user, ['password']);
      // Verify the password matches the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password.');
      }
      // Generate a JWT for the authenticated user
      const accessToken = jwt.sign(
        {
          sub: user.id,
          email: user.email,
          role: user.role,
        },
        this.config.jwt_secret, // Secret
        {
          expiresIn: '1h', // Token expiry
        }
      );
      // Generate refresh token (make expiry configurable in the config file)
      const refreshToken = await this.tokenService.generateToken(
        user.id,
        'refresh',
        this.config.jwt_expiry || 60 * 60 // 1 hour default
      );
      // Return the user (without password), access token, and refresh token
      return {
        user: userWithoutPassword as User,
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Custom error handling with different messages for better user feedback
        if (error.message.includes('Invalid email or password')) {
          throw new Error('Incorrect email or password. Please try again.');
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
   * logout user and delete tokens.
   * @param userId - The id of the user.
   * @returns void
   * @throws Error if logout fails due to  system issues.
   */
  public async logoutUser(userId: number): Promise<void> {
    try {
      await this.prisma.token.deleteMany({
        where: { userId: userId },
      });

      this.logger.info(`User ${userId} successfully logged out.`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error during logout: ${error.message}`);
        throw error;
      } else {
        this.logger.error('An unknown error occurred during logout.');
        throw new Error('Unknown error during logout.');
      }
    }
  }

  /**
   * Register a new user.
   * @param user - The user data to create.
   * @returns The created user.
   */
  public async registerUser(
    user: Prisma.UserCreateInput
  ): Promise<User | null> {
    try {
      //Check user email existence
      if (await this.isEmailTaken(user.email)) {
        throw new Error('Email is already in use.');
      }
      //Salt and hash password
      const hashedPassword = await bcrypt.hash(user.password, this.saltRounds);
      //Replace the plain password with hashed password
      const userData = { ...user, password: hashedPassword };
      //Save the user to database
      const data = await this.prisma.user.create({ data: userData });
      return data;
    } catch (error) {
      //Check for prisma-specific errors
      this.handleDatabaseError(error);
      // Log and rethrow the error for the controller to handle
      this.logger.error(`register user service error : ${error}`);
      throw error;
    }
  }

  /**
   * Handles Prisma-specific database errors.
   * @param error - The error to handle.
   */
  private handleDatabaseError(error: unknown): void {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002' // Unique constraint error
    ) {
      throw new Error('A user with this email already exists.');
    }
  }

  /**
   * Forgot password
   * @param email - email linked to fogot password account
   */
  public async forgotPassword(email: string): Promise<void> {
    try {
      // Fetch the user by email
      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        // Log the event and throw an error
        this.logger.warn(
          `Password reset attempted for non-existent email: ${email}`
        );
        throw new Error('User with that email not found!');
      }

      // Generate a password reset token (valid for 1 hour)
      const resetToken = jwt.sign(
        { userId: user.id, email: user.email },
        this.config.jwt_secret as string, // Secure secret key from environment
        { expiresIn: '1h' }
      );

      // Build the reset link (ensure the link is securely constructed)
      const resetLink = `http://localhost:3000/auth/reset-password?token=${resetToken}`;

      // Send the reset email with the link
      await this.emailService.sendEmail(
        user.email,
        'Reset Your Password',
        `<p>We received a request to reset your password. Please click the link below to reset it:</p>
        <p><a href="${resetLink}">Reset Password</a></p>
        <p>If you did not request this, please ignore this email.</p>`
      );

      // Log the successful sending of the email
      this.logger.info(`Password reset email sent to ${email}`);
    } catch (error) {
      // Log and rethrow the error for the controller to handle
      this.logger.error(
        `Forgot password service error for email ${email}: ${error}`
      );
      throw error;
    }
  }

  /**
   * Verify and reset the password using the token from the reset password link.
   * @param token - The reset password token sent via email.
   * @param newPassword - The new password the user wants to set.
   */
  public async resetPassword(
    token: string,
    newPassword: string
  ): Promise<void> {
    try {
      //Verify and decode the reset token
      const decoded = this.tokenService.verifyResetToken(token);
      if (!decoded) {
        throw new Error('Invalid or expired reset token.');
      }
      // Retriev the user from the database using the decoded email or userId
      const user = await this.prisma.user.findUnique({
        where: { email: decoded.email },
      });
      if (!user) {
        throw new Error('User not found.');
      }
      // Hash the new password using bcrypt before saving it to the database
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      //  Update the user's password in the database
      await this.prisma.user.update({
        where: { email: decoded.email },
        data: { password: hashedPassword },
      });
      // Log success and notify the user (optional)
      this.logger.info(`Password reset successful for ${decoded.email}`);
      // Optional: Send a confirmation email to the user
      await this.emailService.sendEmail(
        decoded.email,
        'Password Reset Successful',
        '<p>Your password has been successfully reset. You can now log in with your new password.</p>'
      );
    } catch (error: unknown) {
      // Log and rethrow the error
      if (error instanceof Error) {
        this.logger.error(`Error resetting password: ${error.message}`);
        throw error;
      } else {
        this.logger.error('An unknown error occurred during reset password.');
        throw new Error('Unknown error during reset password.');
      }
    }
  }

  public async users(): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany();
      this.logger.info('getting users', users);
      return users;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error getting users: ${error.message}`);
        throw error;
      } else {
        this.logger.error('An unknown error occurred during reset password.');
        throw new Error('Unknown error during reset password.');
      }
    }
  }
}
