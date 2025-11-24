import { NextResponse } from 'next/server';
import { prisma } from '@repo/database';

export const dynamic = 'force-dynamic';

export async function GET() {
  const checks = {
    database: false,
    redis: false,
    worker: false,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV,
  };

  const startTime = Date.now();

  // Check database
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = true;
  } catch (error) {
    console.error('Database health check failed:', error);
  }

  // Check Redis (via BullMQ)
  try {
    const { getRedisConnection } = await import('@/lib/queue/config');
    const redis = getRedisConnection();
    await redis.ping();
    checks.redis = true;
  } catch (error) {
    console.error('Redis health check failed:', error);
  }

  // Check worker (if job was processed recently)
  try {
    const recentAnalysis = await prisma.imageAnalysis.findFirst({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000), // Last 5 minutes
        },
      },
    });
    checks.worker = !!recentAnalysis; // True if worker processed something recently
  } catch (error) {
    console.error('Worker health check failed:', error);
  }

  const responseTime = Date.now() - startTime;
  const healthy = checks.database && checks.redis;

  return NextResponse.json(
    {
      status: healthy ? 'healthy' : 'degraded',
      checks,
      responseTime: `${responseTime}ms`,
    },
    { status: healthy ? 200 : 503 }
  );
}
