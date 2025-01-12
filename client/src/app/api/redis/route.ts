import { NextResponse } from 'next/server';
import { initializeRedis } from '@/lib/redis';

export async function GET() {
    try {
        // Initialize Redis client
        const redis = await initializeRedis();

        // Set and Get example
        await redis.set('exampleKey', 'Hello from louai!');
        const value = await redis.get('exampleKey');

        // Return a successful response
        return NextResponse.json({ message: 'Data fetched from Redis', value });
    } catch (error) {
        console.error('Error in Redis operation:', error);
        return NextResponse.json({ error: 'Failed to interact with Redis' }, { status: 500 });
    }
}