import type { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:3000', 'https://mydomain.com'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow access
    } else {
      callback(new Error('Not allowed by CORS')); // Block access
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies
};
