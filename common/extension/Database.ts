import { Pool, Client } from "pg";

class SingletonDatabase {
  private static instance: SingletonDatabase;
  private pool: Pool;

  // Private constructor to prevent direct instantiation
  private constructor() {
    // Create a pool instance using environment variables or default values
    this.pool = new Pool({
      user: Bun.env.DB_USER,
      host: Bun.env.DB_HOST,
      database: Bun.env.DB_NAME,
      password: Bun.env.DB_PASSWORD,
      port: parseInt(Bun.env.DB_PORT || "5432"),
    });
  }

  // Public method to get the instance of the class
  public static getInstance(): SingletonDatabase {
    if (!SingletonDatabase.instance) {
      SingletonDatabase.instance = new SingletonDatabase();
    }
    return SingletonDatabase.instance;
  }

  // Method to query the database
  public async query(queryText: string, params?: any[]) {
    const client = await this.pool.connect();
    try {
      const res = await client.query(queryText, params);
      return res;
    } finally {
      client.release();
    }
  }

  // Method to check database connection and create database if not exists
  public async checkAndCreateDatabase(): Promise<boolean> {
    const client = new Client({
      user: Bun.env.DB_USER,
      host: Bun.env.DB_HOST,
      port: parseInt(Bun.env.DB_PORT || "5432"),
      password: Bun.env.DB_PASSWORD,
    });

    try {
      await client.connect();
      console.log("Connected to PostgreSQL server");

      // Check if the database exists by attempting to query it
      const res = await client.query(
        `SELECT 1 FROM pg_database WHERE datname = $1`,
        [Bun.env.DB_NAME]
      );

      if (res.rows.length === 0) {
        // If the database doesn't exist, create it
        console.log(
          `Database "${Bun.env.DB_NAME}" does not exist, creating it...`
        );
        await client.query(`CREATE DATABASE "${Bun.env.DB_NAME}"`);
        console.log(`Database "${Bun.env.DB_NAME}" created successfully.`);
      } else {
        console.log(`Database "${Bun.env.DB_NAME}" already exists.`);
      }

      // Now connect to the actual database
      await client.end();

      // Now initialize the pool for the actual database
      this.pool = new Pool({
        user: Bun.env.DB_USER,
        host: Bun.env.DB_HOST,
        database: Bun.env.DB_NAME,
        password: Bun.env.DB_PASSWORD,
        port: parseInt(Bun.env.DB_PORT || "5432"),
      });

      return true;
    } catch (error) {
      console.error("Database connection error:", error);
      await client.end();
      return false; // Connection failed
    }
  }

  // Method to create a test table
  public async createTestTable(): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      // Check if the table exists
      const checkTableQuery = `SELECT to_regclass('public.test_table');`;
      const res = await client.query(checkTableQuery);

      if (res.rows[0].to_regclass === null) {
        // If table does not exist, create it
        const createTableQuery = `
          CREATE TABLE test_table (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;
        await client.query(createTableQuery);
        console.log("Test table created successfully.");
      } else {
        console.log("Test table already exists.");
      }

      return true;
    } catch (error) {
      console.error("Error creating test table:", error);
      return false; // Error occurred
    } finally {
      client.release();
    }
  }

  // Close the pool connection when the app is shut down
  public async close() {
    await this.pool.end();
  }
}

export default SingletonDatabase;
