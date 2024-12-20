import express, {
  type Request,
  type Response,
  type NextFunction,
  type Express,
} from "express";
import SingletonDatabase from "./common/extension/Database";

const app: Express = express();
const port = Bun.env.PORT || 3000;

// Middleware to handle JSON requests
app.use(express.json());

// Check database connection before starting the server
const db = SingletonDatabase.getInstance();
db.checkAndCreateDatabase().then(async (isConnected) => {
  if(isConnected) {
    await db.createTestTable();
  } else {
    console.log("Unable to connect to the database or create it. Exiting...");
    process.exit(1); // Exit the application if DB connection fails
  }
});

// Define a basic route
app.get(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({
        message: "Boom!! I create my first server on bun.js",
        success: true,
      });
    } catch (error) {
      next(new Error((error as Error).message));
    }
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on("SIGINT", async () => {
  // Gracefully close the database connection when the server shuts down
  await db.close();
  console.log("Database connection closed");
  process.exit();
});
