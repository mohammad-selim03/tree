# 🛠️ Fix Dependencies & Start Worker

The automatic installation failed because files were locked. Please run these commands manually:

## Step 1: Install Dependencies
Open a terminal in `apps/web` and run:

```bash
npm install bullmq ioredis axios dotenv --legacy-peer-deps
```

## Step 2: Verify Installation
Run this to check if it worked:

```bash
npm list bullmq ioredis axios
```

## Step 3: Start the Worker
If installation was successful:

```bash
npm run worker
```

## Step 4: Restart Dev Server
In your main terminal (root directory):

```bash
pnpm dev
```

---

**Once the worker is running (you see "🚀 Starting Background Workers..."), you can create a listing to test the AI!**
