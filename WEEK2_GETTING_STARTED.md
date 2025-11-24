# 🤖 Week 2: Species Verification AI - Getting Started

**Week:** 2 of 8  
**Feature:** AI Species Verification  
**Started:** November 24, 2025  
**Estimated Time:** 8-10 hours  
**Status:** 🚀 STARTING NOW!

---

## 🎯 What We're Building:

### **Species Verification AI System**

When a seller uploads images and creates a listing:
1. ✅ Images uploaded (Week 1 - Done!)
2. 🆕 AI analyzes images in background
3. 🆕 Detects what species is in the photo
4. 🆕 Compares to seller's claimed species
5. 🆕 Verifies ✅ or flags mismatch ⚠️
6. 🆕 Updates listing status automatically

---

## 🏗️ Architecture Overview:

```
User Creates Listing
        ↓
Images Uploaded (Week 1) ✅
        ↓
Listing Saved to Database ✅
        ↓
━━━━━━━━━━━━━━━━━━━━━━━━━━
    NEW: AI PIPELINE
━━━━━━━━━━━━━━━━━━━━━━━━━━
        ↓
Background Job Created
        ↓
Redis Queue → BullMQ Worker
        ↓
Download Image from UploadThing
        ↓
Send to HuggingFace AI
        ↓
Get Species Prediction
        ↓
Compare with Claimed Species
        ↓
Update Database
   ↓               ↓
VERIFIED ✅    MISMATCH ⚠️
```

---

## 📋 Implementation Steps:

### **Phase 1: Infrastructure Setup** (2-3 hours)

#### **Step 1: Install Redis** (30 min)
- Download Redis for Windows
- Install and start Redis server
- Verify connection

#### **Step 2: Install Dependencies** (15 min)
```bash
cd apps/web
pnpm add bullmq ioredis
pnpm add axios sharp
```

#### **Step 3: Sign Up for HuggingFace** (15 min)
- Create account at https://huggingface.co
- Get free API token
- Add to environment variables

#### **Step 4: Test HuggingFace API** (30 min)
- Make test API call
- Verify image classification works
- Understand response format

---

### **Phase 2: Background Jobs** (3-4 hours)

#### **Step 5: Set Up BullMQ** (1 hour)
- Create queue configuration
- Set up worker process
- Add job processor
- Test job execution

#### **Step 6: Create AI Service** (1 hour)
- Build HuggingFace API client
- Image classification function
- Species matching logic
- Error handling

#### **Step 7: Database Integration** (1 hour)
- Update ImageAnalysis table
- Save AI predictions
- Update verification status
- Track confidence scores

---

### **Phase 3: Integration** (2-3 hours)

#### **Step 8: Trigger Jobs on Upload** (1 hour)
- Hook into listing creation
- Queue verification jobs
- Handle multiple images
- Manage job priorities

#### **Step 9: UI Updates** (1 hour)
- Show verification status on listings
- Add badges (Verified ✅, Pending ⏳, Flagged ⚠️)
- Admin review interface
- Seller notifications

#### **Step 10: Testing** (1 hour)
- End-to-end verification flow
- Edge cases
- Performance testing
- Error scenarios

---

## 🔑 What You'll Need:

### **1. HuggingFace API Key** (Free!)
```
https://huggingface.co/settings/tokens
→ Create new token
→ Copy to .env.local
```

### **2. Redis Server** (Free!)
```
Windows: https://github.com/microsoftarchive/redis/releases
or
WSL: sudo apt-get install redis-server
```

### **3. Environment Variables**
```env
# Add to apps/web/.env.local
HUGGING_FACE_API_KEY=hf_xxxxxxxxxxxxx
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

---

## 🤖 AI Model We'll Use:

**Model:** `google/vit-base-patch16-224`
- **Purpose:** Image classification
- **Type:** Vision Transformer
- **Training:** ImageNet-21k dataset
- **Performance:** High accuracy for plant species
- **Cost:** FREE via HuggingFace Inference API

**Why this model?**
- ✅ Pre-trained on plants/nature
- ✅ Fast inference (~2-3 seconds)
- ✅ Good accuracy
- ✅ Free API access
- ✅ Easy to use

---

## 📊 Week 2 Timeline:

```
Day 1-2: Infrastructure Setup
  - Install Redis
  - Set up HuggingFace
  - Install dependencies
  - Test connections

Day 3-4: Background Jobs
  - BullMQ workers
  - AI service
  - Database updates

Day 5-6: Integration
  - Trigger jobs
  - UI updates
  - Testing

Day 7: Polish & Deploy
  - Bug fixes
  - Performance tuning
  - Documentation
```

---

## ✅ Success Criteria:

Week 2 is complete when:
- [ ] Redis server running
- [ ] HuggingFace API working
- [ ] Background jobs processing
- [ ] AI classification accurate
- [ ] Verification status saved
- [ ] UI shows verification badges
- [ ] End-to-end flow works

---

## 🎯 Today's Immediate Tasks:

### **Task 1: Sign Up for HuggingFace** (5 min)
1. Go to https://huggingface.co
2. Click "Sign Up"
3. Create account
4. Verify email

### **Task 2: Get API Token** (2 min)
1. Go to Settings → Access Tokens
2. Click "New token"
3. Name: "TreeVerse AI"
4. Role: "Read"
5. Copy token

### **Task 3: Install Redis** (10 min)
**Option A: Windows Native**
```
Download: https://github.com/microsoftarchive/redis/releases
→ Download Redis-x64-3.0.504.msi
→ Install
→ Start Redis service
```

**Option B: WSL (Recommended)**
```bash
wsl
sudo apt-get update
sudo apt-get install redis-server
sudo service redis-server start
```

**Option C: Docker**
```bash
docker run -d -p 6379:6379 redis:alpine
```

### **Task 4: Install Node Dependencies** (3 min)
```bash
cd apps/web
pnpm add bullmq ioredis axios sharp
```

---

## 🔍 What You'll Learn:

1. **AI/ML Integration**
   - HuggingFace API
   - Image classification
   - Model inference
   - Confidence scores

2. **Background Processing**
   - Redis queues
   - BullMQ workers
   - Job scheduling
   - Async processing

3. **System Architecture**
   - Microservices patterns
   - Event-driven design
   - Queue systems
   - Worker processes

4. **Production Patterns**
   - Error handling
   - Retry logic
   - Job monitoring
   - Performance optimization

---

## 💡 Pro Tips:

1. **Test AI First** - Verify HuggingFace works before integrating
2. **Start Simple** - Get basic classification working, then add features
3. **Monitor Jobs** - Use BullMQ dashboard to watch jobs
4. **Handle Errors** - AI might fail, have fallbacks
5. **Cache Results** - Don't re-analyze same images

---

## 📚 Resources:

- **HuggingFace Docs:** https://huggingface.co/docs
- **BullMQ Docs:** https://docs.bullmq.io
- **Redis Docs:** https://redis.io/docs
- **Week 2 Roadmap:** `AI_FEATURES_ROADMAP.md` (Week 2 section)

---

## 🚀 Ready to Start?

**Immediate Actions:**
1. ✅ Open HuggingFace website
2. ✅ Create account
3. ✅ Get API token
4. ✅ Install Redis
5. ✅ Install dependencies

**Then we'll build:**
- AI classification service
- Background job worker
- Database integration
- UI updates

---

## ⏭️ After Week 2:

You'll have:
- ✅ Automated species verification
- ✅ AI-powered quality control
- ✅ Background job processing
- ✅ Redis infrastructure
- ✅ HuggingFace integration

**This sets up infrastructure for ALL remaining AI features!**

---

**Let's start building AI features! Ready?** 🤖✨

**First action: Go to https://huggingface.co and sign up!**
