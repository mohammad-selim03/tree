# 🧪 Pre-Production Testing Checklist

**Test Date:** November 24, 2025  
**Tester:** ___________  
**Environment:** Development → Production Ready

---

## ✅ Testing Protocol

### Phase 1: Infrastructure Tests (5 min)
- [ ] 1.1 Health endpoint responds
- [ ] 1.2 Database connection working
- [ ] 1.3 Redis connection working
- [ ] 1.4 Worker process running

### Phase 2: Core Features (10 min)
- [ ] 2.1 Homepage loads
- [ ] 2.2 Product grid displays
- [ ] 2.3 Product detail pages work
- [ ] 2.4 Seller dashboard accessible
- [ ] 2.5 Admin dashboard accessible

### Phase 3: AI Feature Tests (15 min)
- [ ] 3.1 Image upload works
- [ ] 3.2 Species verification triggers
- [ ] 3.3 Verification results saved
- [ ] 3.4 Verification badge displays
- [ ] 3.5 Care plan generates
- [ ] 3.6 Care plan saves to DB

### Phase 4: Analytics & Reporting (5 min)
- [ ] 4.1 Analytics dashboard loads
- [ ] 4.2 Stats calculate correctly
- [ ] 4.3 Charts render
- [ ] 4.4 Period filter works

### Phase 5: Admin Features (5 min)
- [ ] 5.1 Verification dashboard loads
- [ ] 5.2 All verifications display
- [ ] 5.3 Filters work
- [ ] 5.4 Search functions

---

## 📊 Detailed Test Cases

### TEST 1: Health Check
**URL:** `http://localhost:3000/api/health`  
**Expected Response:**
```json
{
  "status": "healthy",
  "checks": {
    "database": true,
    "redis": true,
    "worker": true
  },
  "responseTime": "< 100ms"
}
```

**Result:** ⬜ PASS / ⬜ FAIL  
**Notes:** _________________

---

### TEST 2: Create Listing with Image
**Steps:**
1. Navigate to `/seller/listings/new`
2. Fill form:
   - Title: "Test Japanese Maple"
   - Species: Select "Acer palmatum" (or any species)
   - Description: "This is a test listing with at least 50 characters to meet validation"
   - Price: 149.99
   - Inventory: 10
3. Upload test image (use any tree image)
4. Click "Create Listing"

**Expected:**
- ✅ Form validates
- ✅ Image uploads successfully
- ✅ Listing created
- ✅ Redirect to listings page
- ✅ Toast notification appears

**Result:** ⬜ PASS / ⬜ FAIL  
**Notes:** _________________

---

### TEST 3: AI Species Verification
**Steps:**
1. After creating listing (Test 2)
2. Check worker logs (Terminal 2)
3. Wait 10-30 seconds
4. Check `/admin/verifications`

**Expected in Worker Logs:**
```
🔍 Processing species verification for listing...
🌱 Claimed species: Japanese Maple (Acer palmatum)
🤖 AI Prediction: maple tree (94%)
✅ Verification Result: VERIFIED
```

**Expected in Admin Dashboard:**
- ✅ New verification appears
- ✅ Status shows (VERIFIED/MISMATCH/PENDING)
- ✅ Confidence % displays
- ✅ Timestamp is recent

**Result:** ⬜ PASS / ⬜ FAIL  
**Notes:** _________________

---

### TEST 4: Verification Badge on Product Card
**Steps:**
1. Navigate to `/trees`
2. Find your test listing
3. Check for badge

**Expected:**
- ✅ "✨ Verified Species" badge (if VERIFIED)
- ⬜ OR "⚠️ Unverified" badge (if MISMATCH)
- ⬜ OR no badge (if PENDING)

**Result:** ⬜ PASS / ⬜ FAIL  
**Notes:** _________________

---

### TEST 5: Care Plan Generation
**Prerequisites:** Add Gemini API key to `.env.local`

**Test with CLI:**
```bash
cd apps/web
npx tsx test-gemini.ts
```

**Expected Output:**
```
🧪 Testing Google Gemini API...
✅ API key found
📡 Testing connection...
✅ Gemini API connected!
🌱 Generating sample care plan for Japanese Maple...
✅ Care Plan Generated!
📋 Summary: The Japanese Maple is a stunning...
💧 Watering: Once per week
☀️ Sunlight: Partial shade
🎉 Test successful!
```

**Result:** ⬜ PASS / ⬜ FAIL  
**Notes:** _________________

---

### TEST 6: Analytics Dashboard
**Steps:**
1. Navigate to `/seller/analytics`
2. Check all sections load
3. Click period filters (7d, 30d, 90d)
4. Switch tabs (Views, Verification, Performance)

**Expected:**
- ✅ 4 stat cards display
- ✅ Charts render without errors
- ✅ Period filter updates data
- ✅ Tabs switch smoothly
- ✅ No console errors

**Result:** ⬜ PASS / ⬜ FAIL  
**Notes:** _________________

---

### TEST 7: Admin Verification Dashboard
**Steps:**
1. Navigate to `/admin/verifications`
2. Check stats cards
3. Test filters (ALL, VERIFIED, MISMATCH, PENDING)
4. Test search

**Expected:**
- ✅ Stats cards show correct counts
- ✅ Filters update results
- ✅ Search works
- ✅ Images display
- ✅ All verifications listed

**Result:** ⬜ PASS / ⬜ FAIL  
**Notes:** _________________

---

### TEST 8: Mobile Responsiveness
**Steps:**
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on:
   - iPhone (375px)
   - iPad (768px)
   - Desktop (1920px)

**Pages to Test:**
- [ ] Homepage
- [ ] Product grid
- [ ] Product detail
- [ ] Analytics dashboard
- [ ] Admin dashboard

**Expected:**
- ✅ All pages responsive
- ✅ No horizontal scroll
- ✅ Touch-friendly buttons
- ✅ Readable text

**Result:** ⬜ PASS / ⬜ FAIL  
**Notes:** _________________

---

### TEST 9: Error Handling
**Test Invalid Data:**
1. Try to create listing without images
2. Try to create listing with empty title
3. Try to create listing with price = 0

**Expected:**
- ✅ Validation errors show
- ✅ Toast notifications appear
- ✅ Form doesn't submit
- ✅ Error messages are clear

**Result:** ⬜ PASS / ⬜ FAIL  
**Notes:** _________________

---

### TEST 10: Performance Check
**Use Browser DevTools:**
1. Open Network tab
2. Refresh homepage
3. Check metrics

**Expected:**
- ✅ First Contentful Paint < 2s
- ✅ Time to Interactive < 4s
- ✅ Total page size < 2MB
- ✅ API calls < 100ms (avg)

**Result:** ⬜ PASS / ⬜ FAIL  
**Notes:** _________________

---

## 🔧 Troubleshooting Guide

### Issue: Health check fails
**Solutions:**
- Check `pnpm dev` is running
- Check `pnpm run worker` is running
- Restart Redis: `docker restart tree-redis`
- Check `.env.local` has all keys

### Issue: Worker not processing
**Solutions:**
- Check worker logs for errors
- Verify `HUGGING_FACE_API_KEY` is set
- Check Redis connection
- Restart worker: `Ctrl+C` then `pnpm run worker`

### Issue: Care plans fail
**Solutions:**
- Add `GOOGLE_GEMINI_API_KEY` to `.env.local`
- Run test: `npx tsx test-gemini.ts`
- Check API quota at https://makersuite.google.com

### Issue: Images not uploading
**Solutions:**
- Check `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID`
- Verify UploadThing account is active
- Check file size < 4MB
- Check file type is image/*

---

## ✅ Final Checklist Before Production

### Code Quality
- [ ] No console errors in browser
- [ ] No TypeScript errors
- [ ] All environment variables set
- [ ] `.env.local` not committed to git

### Database
- [ ] Migrations run successfully
- [ ] Seed data (if needed)
- [ ] Backup taken
- [ ] Indexes created

### Security
- [ ] Different API keys for prod
- [ ] Strong JWT secrets
- [ ] CORS configured
- [ ] Rate limiting enabled

### Performance
- [ ] Images optimized
- [ ] Caching enabled
- [ ] Database queries optimized
- [ ] Bundle size acceptable

### Monitoring
- [ ] Health check endpoint works
- [ ] Error tracking setup (optional)
- [ ] Analytics tracking (optional)
- [ ] Uptime monitoring (optional)

---

## 📝 Test Summary

**Total Tests:** 10  
**Passed:** ___  
**Failed:** ___  
**Skipped:** ___

**Overall Status:** ⬜ READY FOR PRODUCTION / ⬜ NEEDS WORK

**Critical Issues:**
1. ________________
2. ________________

**Non-Critical Issues:**
1. ________________
2. ________________

**Sign-off:**

Tester: _____________ Date: _______  
Approved: __________ Date: _______

---

## 🚀 Ready to Deploy?

If all tests pass, proceed to `DEPLOYMENT_GUIDE.md`!
