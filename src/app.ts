import express, {
  type Request,
  type Response,
  type NextFunction,
  type Express,
} from 'express';
import cors from 'cors';
import process from 'node:process';
import prisma from '../prisma/prisma';
import Config from './common/config/Config';
import Logger from './common/Logger';
import AuthRouter from './router/auth.router';
import { corsConfig } from './common/config/CorsConfig';
const app: Express = express();
const config = Config.getInstance();
const logger = Logger.getInstance();

// Middleware
app.use(cors(corsConfig)); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Initialize and use the AuthRouter
const authRouter = new AuthRouter(prisma);
app.use('/auth', authRouter.router); // Mount the AuthRouter on the '/auth' route

// Define a basic route
app.get(
  '/',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({
        message: 'Boom!! I create my first server on bun.js',
        success: true,
      });
    } catch (error) {
      next(new Error((error as Error).message));
    }
  }
);

// Start the server
app.listen(config.app_port, () => {
  logger.info(`Server is running on http://localhost:${config.app_port}`);
});

process.on('SIGINT', async () => {
  // Gracefully close the database connection when the server shuts down
  await prisma.$disconnect();
  logger.info('Prisma client disconnected. Server shutting down.');
  process.exit();
});
