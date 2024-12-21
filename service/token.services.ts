import { randomBytes } from "crypto";
import { service } from "../common/decorators/layer.decorators";
import type { PrismaClient } from "@prisma/client";

@service()
export default class TokenService {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  public async generateToken(
    userId: number,
    type: "access" | "refresh" | "validation",
    expiresIn: number
  ): Promise<string> {
    const token = randomBytes(32).toString("hex");
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
}
