import { createClient, RedisClientType } from 'redis';

let redisClient: RedisClientType | undefined;

// Initialize Redis client
async function initializeRedis() {
    if (!redisClient) {
        redisClient = createClient({
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
            socket: {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT || '18600', 10),
            },
        });

        // Error handling
        redisClient.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });

        // Connect the client
        await redisClient.connect();
        console.log('Redis connected successfully');
    }
    return redisClient;
}

// Export the client and initialization function
export { redisClient, initializeRedis };
