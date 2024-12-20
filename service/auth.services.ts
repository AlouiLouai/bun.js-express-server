import { Prisma, type PrismaClient, type User } from "@prisma/client";
import Logger from "../common/Logger";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { service } from "../common/decorators/layer.decorators";
import Config from "../common/config/Config";

@service()
export default class AuthService {
  private prisma: PrismaClient;
  private logger = Logger.getInstance();
  private config = Config.getInstance();
  private readonly saltRounds = 10;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
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
   * login user
   * @param email 
   * @param password 
   * @returns the connected user with token
   */
  public async loginUser(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    try {
      // Validate input
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      // Fetch the user by email
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      // Handle case where the user is not found
      if (!user) {
        throw new Error("Invalid email or password.");
      }

      // Log fetched user for debugging purposes (exclude password in production logs)
      this.logger.info(`User found for email: ${email}`);

      // Verify the password matches the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password.");
      }

      // Generate a JWT for the authenticated user
      const token = jwt.sign(
        {
          sub: user.id,
          email: user.email,
        }, // Payload
        this.config.jwt_secret, // Secret
        {
          expiresIn: this.config.jwt_expiry, // Token expiry
        }
      );

      // Return the user (excluding sensitive fields like password) and token
      const { password: _, ...userWithoutPassword } = user; // Exclude password from user object
      return { user: userWithoutPassword as User, token };
    } catch (error) {
      // Log detailed error for debugging while throwing a user-friendly error message
      this.logger.error(`Login error: ${error}`);
      throw new Error(
        "Login failed. Please check your credentials and try again."
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
}
