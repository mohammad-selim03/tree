import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { Worker } from 'bullmq';
import { QUEUE_NAMES, getRedisConnection } from './lib/queue/config';
import { processSpeciesVerification } from './lib/queue/workers/species-verifier';

console.log('🚀 Starting Background Workers...');

// Species Verification Worker
const speciesWorker = new Worker(
  QUEUE_NAMES.SPECIES_VERIFICATION,
  processSpeciesVerification,
  {
    connection: getRedisConnection(),
    concurrency: 5, // Process 5 images at once
    limiter: {
      max: 10, // Max 10 jobs
      duration: 1000, // per second (rate limit for AI API)
    },
  }
);

speciesWorker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed!`);
});

speciesWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err);
});

console.log(`👀 Listening for jobs on queue: ${QUEUE_NAMES.SPECIES_VERIFICATION}`);

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Shutting down workers...');
  await speciesWorker.close();
  process.exit(0);
});
