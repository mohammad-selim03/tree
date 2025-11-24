# 🌱 Week 3: AI Care Plan Generator - Setup Guide

## 📋 What You'll Build:
- **AI-powered care plans** using Google Gemini
- **Personalized instructions** based on species
- **Seasonal care guides** (Spring, Summer, Fall, Winter)
- **Common issues & solutions**
- **Downloadable care guides** (PDF/iCal)

---

## 🔑 Step 1: Get Google Gemini API Key

1. Go to: **https://makersuite.google.com/app/apikey**
2. Click **"Create API Key"**
3. Copy your API key

4. **Add to `.env.local`:**
   ```env
   GOOGLE_GEMINI_API_KEY="your-api-key-here"
   ```

---

## 🧪 Step 2: Test Gemini Connection

Create a test script:

```typescript
// apps/web/test-gemini.ts
import { testGeminiConnection } from './lib/ai/gemini';

testGeminiConnection().then(() => {
  console.log('✅ Ready to generate care plans!');
});
```

Run it:
```bash
cd apps/web
npx tsx test-gemini.ts
```

You should see: `✅ Gemini API connected!`

---

## 🎨 Step 3: Add Care Plan to Product Page

The care plan component is already created! Just import it:

```tsx
// In your product detail page
import { CarePlanDisplay } from '@/components/CarePlanDisplay';

// Inside your component
<CarePlanDisplay 
  speciesId={product.speciesId}
  speciesName={product.species.commonName}
  scientificName={product.species.scientificName}
/>
```

---

## 🚀 Step 4: Test the Full Flow

1. **Navigate to any product page** (e.g., `/trees/1`)
2. **Scroll to the Care Plan section**
3. **Click "Generate Care Plan"**
4. **Wait 5-10 seconds** (AI is thinking!)
5. **See the magic!** ✨

### What You'll See:
- ✅ Summary of care requirements
- 💧 Watering schedule
- ☀️ Sunlight needs
- 🌱 Fertilizing guide
- ✂️ Pruning tips
- 📅 Seasonal care (Spring/Summer/Fall/Winter)
- ⚠️ Common issues & solutions
- 💡 Quick tips

---

## 📊 API Endpoints Created:

### Generate Care Plan
```
POST /api/v1/care-plans/generate
Body: {
  "speciesId": "uuid",
  "userId": "uuid" (optional),
  "userLocation": "California" (optional),
  "plantAge": "2 years" (optional),
  "potSize": "5 gallon" (optional)
}
```

### Get Existing Care Plans
```
GET /api/v1/care-plans?speciesId=uuid
GET /api/v1/care-plans?userId=uuid
```

---

## 🎯 Features Included:

### ✅ Core Features:
- AI-generated care instructions
- Watering, sunlight, soil, fertilizing guides
- Pruning schedule
- Seasonal care calendar
- Common problems & solutions
- Quick tips

### 🔜 Coming Next:
- Download as PDF
- Email care reminders
- Export to iCal for calendar integration
- Care plan versioning (track changes over time)

---

## 🐛 Troubleshooting:

### "Failed to generate care plan"
- Check that `GOOGLE_GEMINI_API_KEY` is set in `.env.local`
- Verify API key is valid (run test script)
- Check API quota (free tier has limits)

### "Invalid JSON response"
- Sometimes Gemini returns markdown-wrapped JSON
- The code handles this automatically
- If it persists, check the console logs

### "Connection refused"
- Make sure `pnpm dev` is running
- Restart the server if you just added the API key

---

## 📈 What's Next (Week 4-8):

**Week 4:** AR Tree Preview (place virtual trees in your space)  
**Week 5:** Marketplace Analytics Dashboard  
**Week 6:** Advanced Search & Filters  
**Week 7:** Social Features (Reviews, Q&A)  
**Week 8:** Mobile App & PWA  

---

**You're building something amazing! 🚀**
