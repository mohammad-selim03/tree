import { Queue, Worker, QueueEvents, ConnectionOptions } from 'bullmq';
import IORedis from 'ioredis';

// Redis connection options
const connectionOptions: ConnectionOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null, // Required for BullMQ
};

// Singleton Redis connection for reuse
let redisConnection: IORedis | null = null;

export function getRedisConnection() {
  if (!redisConnection) {
    redisConnection = new IORedis(connectionOptions);
  }
  return redisConnection;
}

// Queue Names
export const QUEUE_NAMES = {
  SPECIES_VERIFICATION: 'species-verification',
  IMAGE_PROCESSING: 'image-processing',
  NOTIFICATIONS: 'notifications',
} as const;

// Queue Instances (Singleton)
const queues: Record<string, Queue> = {};

export function getQueue(name: string): Queue {
  if (!queues[name]) {
    queues[name] = new Queue(name, {
      connection: getRedisConnection(),
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
        removeOnComplete: {
          age: 24 * 3600, // Keep for 24 hours
          count: 1000,
        },
        removeOnFail: {
          age: 7 * 24 * 3600, // Keep for 7 days
        },
      },
    });
  }
  return queues[name];
}

// Helper to close connections (for graceful shutdown)
export async function closeQueues() {
  await Promise.all(Object.values(queues).map(q => q.close()));
  if (redisConnection) {
    await redisConnection.quit();
  }
}
