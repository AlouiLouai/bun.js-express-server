import { Prisma, type PrismaClient, type User } from "@prisma/client";
import Logger from "../common/Logger";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { service } from "../common/decorators/layer.decorators";
import Config from "../common/config/Config";
import TokenService from "./token.services";
import EmailService from "./email.services";

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
      throw new Error("Failed to verify email existence.");
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
        throw new Error("Email and password are required.");
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format.");
      }

      // Fetch the user by email
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      // Handle case where the user is not found
      if (!user) {
        throw new Error("Invalid email or password.");
      }

      // Verify the password matches the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password.");
      }

      // Generate a JWT for the authenticated user
      const accessToken = jwt.sign(
        {
          sub: user.id,
          email: user.email,
        },
        this.config.jwt_secret, // Secret
        {
          expiresIn: this.config.jwt_expiry, // Token expiry
        }
      );

      // Generate refresh token (make expiry configurable in the config file)
      const refreshToken = await this.tokenService.generateToken(
        user.id,
        "refresh",
        this.config.jwt_expiry || 60 * 60 // 1 hour default
      );

      // Exclude sensitive fields like password from the user object
      const { password: _, ...userWithoutPassword } = user;

      // Return the user (without password), access token, and refresh token
      return {
        user: userWithoutPassword as User,
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error: any) {
      // Log detailed error for debugging while throwing a user-friendly error message
      this.logger.error(`Login error: ${error}`);

      // Custom error handling with different messages for better user feedback
      if (error.message.includes("Invalid email or password")) {
        throw new Error("Incorrect email or password. Please try again.");
      }

      // Catch-all for unexpected errors
      throw new Error(
        "Login failed due to a system issue. Please try again later."
      );
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
        throw new Error("Email is already in use.");
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
      error.code === "P2002" // Unique constraint error
    ) {
      throw new Error("A user with this email already exists.");
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
        throw new Error("User with that email not found!");
      }

      // Generate a password reset token (valid for 1 hour)
      const resetToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET as string, // Secure secret key from environment
        { expiresIn: "1h" }
      );

      // Build the reset link (ensure the link is securely constructed)
      const resetLink = `http://localhost:5000/auth/reset-password?token=${resetToken}`;

      // Send the reset email with the link
      await this.emailService.sendEmail(
        user.email,
        "Reset Your Password",
        `<p>We received a request to reset your password. Please click the link below to reset it:</p>
        <p><a href="${resetLink}">Reset Password</a></p>
        <p>If you did not request this, please ignore this email.</p>`
      );

      // Log the successful sending of the email
      this.logger.info(`Password reset email sent to ${email}`);
    } catch (error: any) {
      // Log and rethrow the error for the controller to handle
      this.logger.error(
        `Forgot password service error for email ${email}: ${error.message}`
      );
      throw new Error(
        "An error occurred while processing your password reset request."
      );
    }
  }
}
