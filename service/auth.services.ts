import type { Prisma, PrismaClient, User } from "@prisma/client";
import Logger from "../common/Logger";

export default class AuthService {
  private prisma: PrismaClient;
  private logger = Logger.getInstance();

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async registerUser(
    user: Prisma.UserCreateInput
  ): Promise<User | null> {
    try {
      const data = await this.prisma.user.create({ data: user });
      return data;
    } catch (error) {
      this.logger.error(`register user service error : ${error}`);
      return null;
    }
  }
}
