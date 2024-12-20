import Logger from "../Logger";

export default class Config {
  private static instance: Config;
  private readonly logger = Logger.getInstance();

  // Type definition for the environment variables
  readonly app_port: number;
  readonly db_host: string;
  readonly db_port: number;
  readonly db_user: string;
  readonly db_password: string;
  readonly db_name: string;
  readonly db_url: string;

  private constructor() {
    try {
      this.logger.info("Initializing configuration...");
      this.app_port = this.parseNumber("PORT");
      this.db_host = this.getEnvVar("DB_HOST");
      this.db_port = this.parseNumber("DB_PORT");
      this.db_user = this.getEnvVar("DB_USER");
      this.db_password = this.getEnvVar("DB_PASSWORD");
      this.db_name = this.getEnvVar("DB_NAME");
      this.db_url = this.getEnvVar("DATABASE_URL");
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

  // handle the type || undefined from environments
  private getEnvVar(key: string): string {
    const value = Bun.env[key];
    if (value === undefined) {
      const errorMessage = `Environment variable ${key} is not defined`;
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }
    return value;
  }

  private parseNumber(key: string): number {
    const value = this.getEnvVar(key);
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
      const errorMessage = `Environment variable ${key} is not a valid number`;
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }
    return parsed;
  }
}
