import express, {
  type Request,
  type Response,
  type NextFunction,
  type Express,
} from "express";
import prisma from "./prisma/prisma";

const app: Express = express();
const port = Bun.env.PORT || 3000;

// Middleware to handle JSON requests
app.use(express.json());

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
  await prisma.$disconnect();
  console.log("Prisma client disconnected. Server shutting down.");
  process.exit();
});
