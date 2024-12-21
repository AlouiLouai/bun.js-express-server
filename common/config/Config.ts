import { z } from "zod";
import Logger from "../Logger";

export default class Config {
  private static instance: Config;
  private readonly logger = Logger.getInstance();

  // Type definition for the environment variables using Zod schema
  readonly app_port: number;
  readonly db_host: string;
  readonly db_port: number;
  readonly db_user: string;
  readonly db_password: string;
  readonly db_name: string;
  readonly db_url: string;
  readonly jwt_secret: string;
  readonly jwt_expiry: number;
  readonly mail_server: string;
  readonly mail_port: number;
  readonly mail_use_tls: boolean;
  readonly mail_use_ssl: boolean;
  readonly mail_default_sender: string;
  readonly mail_username: string;
  readonly mail_password: string;

  private constructor() {
    try {
      this.logger.info("Initializing configuration...");
      const envSchema = z.object({
        PORT: z
          .string()
          .transform((val) => parseInt(val, 10))
          .refine((val) => !isNaN(val), {
            message: "PORT must be a valid number",
          }),
        DB_HOST: z.string(),
        DB_PORT: z
          .string()
          .transform((val) => parseInt(val, 10))
          .refine((val) => !isNaN(val), {
            message: "DB_PORT must be a valid number",
          }),
        DB_USER: z.string(),
        DB_PASSWORD: z.string(),
        DB_NAME: z.string(),
        DATABASE_URL: z.string(),
        JWT_SECRET: z.string(),
        JWT_EXPIRY: z
          .string()
          .transform((val) => parseInt(val, 10))
          .refine((val) => !isNaN(val), {
            message: "JWT_EXPIRY must be a valid number",
          }),
        MAIL_SERVER: z.string(),
        MAIL_PORT: z
          .string()
          .transform((val) => parseInt(val, 10))
          .refine((val) => !isNaN(val), {
            message: "MAIL_PORT must be a valid number",
          }),
        MAIL_USE_TLS: z
          .string()
          .transform((val) => val.toLowerCase() === "true") // Convert string "true" to boolean true
          .refine((val) => typeof val === "boolean", {
            message: "MAIL_USE_TLS must be a boolean",
          }),
        MAIL_USE_SSL: z
          .string()
          .transform((val) => val.toLowerCase() === "true") // Convert string "true" to boolean true
          .refine((val) => typeof val === "boolean", {
            message: "MAIL_USE_SSL must be a boolean",
          }),
        MAIL_DEFAULT_SENDER: z.string(),
        MAIL_USERNAME: z.string(),
        MAIL_PASSWORD: z.string(),
      });

      // Parse and validate the environment variables using Zod schema
      const parsedEnv = envSchema.parse(Bun.env);

      this.app_port = parsedEnv.PORT;
      this.db_host = parsedEnv.DB_HOST;
      this.db_port = parsedEnv.DB_PORT;
      this.db_user = parsedEnv.DB_USER;
      this.db_password = parsedEnv.DB_PASSWORD;
      this.db_name = parsedEnv.DB_NAME;
      this.db_url = parsedEnv.DATABASE_URL;
      this.jwt_secret = parsedEnv.JWT_SECRET;
      this.jwt_expiry = parsedEnv.JWT_EXPIRY;
      this.mail_server = parsedEnv.MAIL_SERVER;
      this.mail_port = parsedEnv.MAIL_PORT;
      this.mail_use_tls = parsedEnv.MAIL_USE_TLS;
      this.mail_use_ssl = parsedEnv.MAIL_USE_SSL;
      this.mail_default_sender = parsedEnv.MAIL_DEFAULT_SENDER;
      this.mail_username = parsedEnv.MAIL_USERNAME;
      this.mail_password = parsedEnv.MAIL_PASSWORD;

      this.logger.info("Configuration initialized successfully.");
    } catch (error: any) {
      this.logger.error(`Error initializing configuration: ${error.message}`);
      throw error; // Re-throw the error after logging
    }
  }

  // Singleton pattern to ensure a single instance
  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}
