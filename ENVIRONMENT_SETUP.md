# 🔧 Environment Configuration Guide

## Required Environment Variables

Create a `.env.local` file in `apps/web/` with the following variables:

```bash
# API Configuration
# Leave this empty to use the internal Next.js API (default: /api/v1)
# Only set this if you are running a separate backend server
# NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

# Authentication (Required for JWT)
JWT_SECRET=your-super-secret-jwt-key-change-in-production-minimum-32-characters

# Optional: Image Upload Service
# Choose ONE of the following based on your preference:

# Option 1: UploadThing (Recommended for ease of use)
# UPLOADTHING_SECRET=your_uploadthing_secret
# UPLOADTHING_APP_ID=your_app_id

# Option 2: Cloudinary
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

# Option 3: AWS S3
# AWS_ACCESS_KEY_ID=your_access_key
# AWS_SECRET_ACCESS_KEY=your_secret_key
# AWS_S3_BUCKET=your-bucket-name
# AWS_REGION=us-east-1

# Optional: Analytics
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Error Tracking
# NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
# SENTRY_AUTH_TOKEN=your_sentry_token

# Development
NODE_ENV=development
```

## Setup Instructions

### 1. Copy Environment Template
```bash
# From the apps/web directory
cp .env.example .env.local
```

### 2. Configure API URL

**Option A: Single Port (Recommended)**
If running everything on port 3000, leave `NEXT_PUBLIC_API_URL` commented out or empty.

**Option B: Split Ports (Frontend 3000 / Backend 3003)**
If you want to run the backend separately on port 3003:
1. Update `.env.local`:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:3003/api/v1
   ```
2. Run the backend:
   ```bash
   npm run dev:api
   ```

### 3. Generate JWT Secret
Use a secure random string (minimum 32 characters):
```bash
# On Linux/Mac:
openssl rand -base64 32

# On Windows (PowerShell):
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 4. Image Upload Setup (Optional)

#### Using UploadThing (Recommended)
1. Sign up at https://uploadthing.com
2. Create a new app
3. Copy your secret and app ID to `.env.local`

#### Using Cloudinary
1. Sign up at https://cloudinary.com
2. Get credentials from dashboard
3. Add to `.env.local`

#### Using AWS S3
1. Create S3 bucket
2. Create IAM user with S3 permissions
3. Add credentials to `.env.local`

### 5. Restart Development Server
```bash
pnpm dev
```

## Environment Variable Usage

### In Server Components
```typescript
// Access directly
const apiUrl = process.env.NEXT_PUBLIC_API_URL
const jwtSecret = process.env.JWT_SECRET
```

### In Client Components
```typescript
// Only NEXT_PUBLIC_ prefixed variables are available
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

## Security Notes

⚠️ **NEVER** commit `.env.local` to version control
✅ `.env.example` SHOULD be committed (without sensitive values)
✅ Use different secrets for development and production
✅ Rotate secrets regularly in production
✅ Use environment-specific configuration

## Troubleshooting

### API Connection Issues
1. Ensure `NEXT_PUBLIC_API_URL` is **NOT** set in `.env.local` (to use default)
2. Verify the app is running on port 3000
3. Check browser network tab for 404 or 500 errors on `/api/v1/*` requests

### Authentication Issues
1. Verify `JWT_SECRET` is set
2. Check token in browser localStorage
3. Clear browser cache and cookies
4. Check network tab for 401 responses

### Image Upload Issues
1. Verify upload service credentials
2. Check file size limits
3. Verify CORS settings on upload service
4. Check browser console for errors

## Production Deployment

### Vercel
Add environment variables in:
Project Settings → Environment Variables

### Docker
Create `.env.production` and mount it:
```bash
docker run --env-file .env.production ...
```

### Other Platforms
Consult platform documentation for environment variable configuration.
