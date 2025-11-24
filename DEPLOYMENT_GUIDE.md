# 🚀 TreeVerse Production Deployment Guide

**Last Updated:** November 24, 2025  
**Status:** Ready for Production

---

## ✅ Pre-Deployment Checklist

### 1. Environment Setup
- [ ] PostgreSQL database provisioned
- [ ] Redis instance running (local or cloud)
- [ ] Domain name configured
- [ ] SSL certificate obtained
- [ ] CDN configured (optional but recommended)

### 2. API Keys Obtained
- [ ] HuggingFace API key (species verification)
- [ ] Google Gemini API key (care plans)
- [ ] UploadThing account created
- [ ] Stripe keys (if implementing payments)

### 3. Database Setup
```bash
# Run migrations
cd packages/database
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Seed initial data (optional)
npx prisma db seed
```

### 4. Environment Variables
Create `.env.production`:
```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/treeverse"

# Redis
REDIS_HOST="your-redis-host.com"
REDIS_PORT="6379"
REDIS_PASSWORD="your-redis-password"

# AI Services
HUGGING_FACE_API_KEY="hf_xxxx"
GOOGLE_GEMINI_API_KEY="AIzaxxxx"

# File Upload
UPLOADTHING_SECRET="sk_live_xxxx"
UPLOADTHING_APP_ID="xxxxxx"

# Next.js
NEXT_PUBLIC_API_URL="https://yourdomain.com/api"
NODE_ENV="production"

# Security
JWT_ACCESS_SECRET="your-super-secret-key-min-64-chars"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-min-64-chars"
```

---

## 🏗️ Build & Deploy

### Option 1: Vercel (Recommended)
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# 4. Set environment variables in Vercel dashboard
# 5. Deploy worker to separate service (see below)
```

### Option 2: Self-Hosted (Docker)
```bash
# 1. Build Docker image
docker build -t treeverse:latest .

# 2. Run web server
docker run -d \
  --name treeverse-web \
  -p 3000:3000 \
  --env-file .env.production \
  treeverse:latest

# 3. Run worker
docker run -d \
  --name treeverse-worker \
  --env-file .env.production \
  treeverse:latest \
  pnpm run worker
```

### Option 3: Traditional VPS (PM2)
```bash
# 1. Install dependencies
pnpm install --prod

# 2. Build application
pnpm run build

# 3. Install PM2
npm install -g pm2

# 4. Start web server
pm2 start ecosystem.config.js --only web

# 5. Start worker
pm2 start ecosystem.config.js --only worker

# 6. Save PM2 config
pm2 save
pm2 startup
```

**Create `ecosystem.config.js`:**
```javascript
module.exports = {
  apps: [
    {
      name: 'treeverse-web',
      script: 'pnpm',
      args: 'start',
      cwd: './apps/web',
      instances: 2,
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'treeverse-worker',
      script: 'pnpm',
      args: 'run worker',
      cwd: './apps/web',
      instances: 1,
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
```

---

## 🗄️ Database Migration

### Production Migration Workflow:
```bash
# 1. Create migration
npx prisma migrate dev --name production_init

# 2. Review SQL in migrations folder
# 3. Test on staging database first

# 4. Deploy to production (DANGEROUS - BE CAREFUL!)
npx prisma migrate deploy
```

### Database Backup (CRITICAL):
```bash
# PostgreSQL backup
pg_dump -U username -d treeverse > backup_$(date +%Y%m%d).sql

# Restore if needed
psql -U username -d treeverse < backup_20251124.sql
```

---

## ⚙️ Redis Setup

### Option 1: Redis Cloud (Recommended)
1. Sign up: https://redis.com/try-free/
2. Create database
3. Copy connection details
4. Update `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`

### Option 2: Self-Hosted
```bash
# Docker
docker run -d \
  --name redis \
  -p 6379:6379 \
  redis:alpine redis-server --requirepass yourpassword

# Or install locally
sudo apt-get install redis-server
sudo systemctl start redis
```

---

## 🔒 Security Hardening

### 1. Environment Variables
- ✅ Never commit `.env` files
- ✅ Use different keys for dev/prod
- ✅ Rotate secrets regularly
- ✅ Use secrets management (AWS Secrets Manager, Vault)

### 2. API Security
```typescript
// Add rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply to API routes
app.use('/api/', limiter);
```

### 3. CORS Configuration
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://yourdomain.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
        ],
      },
    ];
  },
};
```

### 4. Image Upload Security
- ✅ Validate file types
- ✅ Limit file sizes (4MB max)
- ✅ Scan for malware (optional)
- ✅ Use signed URLs

---

## 📊 Monitoring & Logging

### 1. Application Monitoring (Sentry)
```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### 2. Database Monitoring
- Use Prisma Studio for dev: `npx prisma studio`
- Set up pgAdmin for production
- Enable query logging
- Monitor connection pool

### 3. Worker Monitoring
```typescript
// worker.ts
import * as Sentry from '@sentry/node';

worker.on('failed', (job, err) => {
  Sentry.captureException(err, {
    tags: { jobId: job?.id, queue: 'species-verification' },
  });
});
```

### 4. Uptime Monitoring
- Use UptimeRobot (free)
- Monitor critical endpoints:
  - `/` (homepage)
  - `/api/health` (create this endpoint)
  - `/api/v1/listings` (API health)

---

## 🚦 Health Check Endpoint

**Create:** `app/api/health/route.ts`
```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import Redis from 'ioredis';

export async function GET() {
  const checks = {
    database: false,
    redis: false,
    timestamp: new Date().toISOString(),
  };

  try {
    // Check database
    await prisma.$queryRaw`SELECT 1`;
    checks.database = true;
  } catch (error) {
    console.error('Database health check failed:', error);
  }

  try {
    // Check Redis
    const redis = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379'),
    });
    await redis.ping();
    checks.redis = true;
    redis.disconnect();
  } catch (error) {
    console.error('Redis health check failed:', error);
  }

  const healthy = checks.database && checks.redis;

  return NextResponse.json(
    { healthy, checks },
    { status: healthy ? 200 : 503 }
  );
}
```

---

## 📈 Performance Optimization

### 1. Image Optimization
```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['uploadthing.com', 'utfs.io'],
    formats: ['image/webp', 'image/avif'],
  },
};
```

### 2. Database Optimization
```prisma
// Add indexes to schema.prisma
model Listing {
  @@index([status, publishedAt])
  @@index([sellerId, createdAt])
}

model ImageAnalysis {
  @@index([verificationStatus, createdAt])
}
```

### 3. Caching Strategy
```typescript
// Cache listing data
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function getCachedListings(key: string) {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  
  const data = await fetchListings();
  await redis.setex(key, 300, JSON.stringify(data)); // 5min cache
  return data;
}
```

### 4. Bundle Optimization
```bash
# Analyze bundle size
npx @next/bundle-analyzer
```

---

## 🧪 Pre-Launch Testing

### Automated Tests (TODO - Future Enhancement)
```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Load testing
artillery run load-test.yml
```

### Manual Testing Checklist:
- [ ] Create seller account
- [ ] Create listing with images
- [ ] Verify image upload works
- [ ] Check worker processes images
- [ ] Verify "Verified" badge appears
- [ ] Generate care plan
- [ ] View analytics dashboard
- [ ] Admin verification review
- [ ] Mobile responsive test
- [ ] Cross-browser test (Chrome, Firefox, Safari)

---

## 🚀 Launch Day Checklist

### 24 Hours Before:
- [ ] Final database backup
- [ ] Test rollback procedure
- [ ] Notify users (if applicable)
- [ ] Set up monitoring alerts
- [ ] Prepare rollback plan

### Launch:
- [ ] Deploy to production
- [ ] Run smoke tests
- [ ] Monitor error logs
- [ ] Check worker is processing
- [ ] Test critical user flows
- [ ] Monitor server resources

### Post-Launch (First 24 Hours):
- [ ] Monitor error rates
- [ ] Check worker queue health
- [ ] Review performance metrics
- [ ] Collect user feedback
- [ ] Fix critical bugs immediately

---

## 📞 Support & Maintenance

### Regular Tasks:
- **Daily:** Check error logs, monitor uptime
- **Weekly:** Review analytics, database cleanup
- **Monthly:** Update dependencies, security patches
- **Quarterly:** Performance audit, cost optimization

### Incident Response:
1. **Detect:** Monitoring alerts
2. **Assess:** Severity (P0-P3)
3. **Mitigate:** Rollback if critical
4. **Fix:** Deploy fix
5. **Post-Mortem:** Document lessons

---

## 💰 Cost Estimation (Monthly)

### Free Tier (Development):
- **Vercel:** Free (Hobby plan)
- **PostgreSQL:** $0 (Neon.tech free tier)
- **Redis:** $0 (Redis Cloud free tier)
- **UploadThing:** Free (5GB storage)
- **HuggingFace:** Free (rate limited)
- **Google Gemini:** Free (60 requests/min)
- **Total:** $0/month

### Production (Small Scale):
- **Vercel Pro:** $20/month
- **PostgreSQL:** $25/month (Neon.tech)
- **Redis:** $10/month (Upstash)
- **UploadThing:** $20/month (100GB)
- **HuggingFace:** Free or $9/month
- **Google Gemini:** Pay-as-you-go (~$10/month)
- **Domain:** $12/year
- **Total:** ~$90-100/month

### Production (Medium Scale):
- **VPS:** $40/month (4GB RAM)
- **PostgreSQL:** $50/month (managed)
- **Redis:** $25/month
- **CDN:** $20/month
- **Backups:** $10/month
- **Total:** ~$145/month

---

## 🎯 Success Metrics

### Track These KPIs:
- **Users:** Total registrations, active sellers
- **Listings:** Total, active, verification rate
- **AI Usage:** Verifications/day, care plans/day
- **Performance:** Page load times, API response times
- **Errors:** Error rate, failed jobs
- **Business:** GMV, revenue, conversion rate

---

## 🆘 Troubleshooting Production Issues

### Issue: Worker Not Processing Jobs
```bash
# Check Redis connection
redis-cli ping

# Check worker logs
pm2 logs treeverse-worker

# Restart worker
pm2 restart treeverse-worker
```

### Issue: High Database CPU
```sql
-- Find slow queries
SELECT pid, now() - query_start as duration, query 
FROM pg_stat_activity 
WHERE state = 'active'
ORDER BY duration DESC;

-- Add missing indexes
CREATE INDEX idx_listing_status ON listing(status);
```

### Issue: Image Upload Failing
- Check UploadThing quota
- Verify API keys
- Check file size limits
- Review CORS settings

---

## 📚 Additional Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Vercel Deployment:** https://vercel.com/docs
- **Redis Best Practices:** https://redis.io/docs/manual/
- **Security Checklist:** https://owasp.org/

---

## 🎉 You're Ready to Launch!

**Your AI-powered marketplace is production-ready!**

Remember:
- Start small, scale gradually
- Monitor everything
- Listen to users
- Iterate quickly
- Have fun! 🚀

**Good luck with your launch!** 🌳✨
