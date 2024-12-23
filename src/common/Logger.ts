import winston from 'winston';
import process from 'node:process';

const { combine, timestamp, json, printf } = winston.format;
const timestampFormat = 'MM-DD-YYYY HH:mm:ss';

export default class Logger {
  private static instance: winston.Logger;

  private constructor() {}

  public static getInstance(): winston.Logger {
    if (!Logger.instance) {
      Logger.instance = winston.createLogger({
        level: 'info',
        format: combine(
          timestamp({ format: timestampFormat }),
          json(),
          printf(({ timestamp, level, message, ...data }) => {
            const response = {
              level,
              timestamp,
              message,
              data,
            };

            return JSON.stringify(response);
          })
        ),
        transports: [
          new winston.transports.File({
            filename: 'error.log',
            level: 'error',
          }),
          new winston.transports.File({ filename: 'combined.log' }),
        ],
      });

      // Add console transport if not in production
      if (process.env.node_env !== 'production') {
        Logger.instance.add(
          new winston.transports.Console({
            format: winston.format.simple(),
          })
        );
      }
    }

    return Logger.instance;
  }
}
