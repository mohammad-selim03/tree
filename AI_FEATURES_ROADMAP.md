# 🤖 AI Features Implementation Roadmap

**Project:** TreeVerse - AI-Powered Tree Marketplace  
**Created:** November 24, 2025  
**Timeline:** 8 weeks (2 months)  
**Goal:** Transform from basic e-commerce to AI-powered flagship project

---

## 🎯 EXECUTIVE SUMMARY

This roadmap will guide you through implementing **6 core AI features** that will:
- ✅ Differentiate your project from basic e-commerce sites
- ✅ Showcase ML/AI integration skills
- ✅ Use **100% FREE APIs** (HuggingFace, Gemini, OpenAI free tier)
- ✅ Make this a resume-worthy flagship project
- ✅ Follow your existing clean architecture

**Estimated Time:** 8 weeks (part-time) or 4 weeks (full-time)  
**Estimated Cost:** $0 (using free tiers only)

---

## 📋 AI FEATURES PRIORITY ORDER

| Priority | Feature | Impact | Complexity | Time | Status |
|----------|---------|--------|------------|------|--------|
| 🔥 **P0** | Image Upload Infrastructure | Critical | Medium | Week 1 | ⏳ TODO |
| 🔥 **P0** | Species Verification AI | High | Medium | Week 2-3 | ⏳ TODO |
| 🔥 **P0** | AI Care Plan Generator | High | Low | Week 3 | ⏳ TODO |
| 🔥 **P1** | ML-Powered Image Search | High | High | Week 4-5 | ⏳ TODO |
| ⭐ **P1** | AI Listing Quality Score | Medium | Low | Week 6 | ⏳ TODO |
| ⭐ **P2** | AI Price Suggestion | Medium | Medium | Week 7 | ⏳ TODO |
| 💎 **P3** | Growth Simulator | Low | High | Week 8 | ⏳ TODO |

**P0 = Critical, P1 = High Priority, P2 = Medium Priority, P3 = Nice to Have**

---

## 🗓️ WEEK-BY-WEEK BREAKDOWN

### **WEEK 1: Foundation - Image Upload & Storage** ⚡ CRITICAL

**Why First:** All AI features depend on image processing

#### **Deliverables:**
1. ✅ Image upload endpoint
2. ✅ S3/CloudFlare R2 integration
3. ✅ Image optimization pipeline
4. ✅ Frontend image upload UI
5. ✅ Image metadata storage

#### **Tasks:**

**Day 1-2: Choose & Setup Image Storage**
- [ ] Decision: UploadThing (easiest) vs CloudFlare R2 (cheapest) vs AWS S3
- [ ] Create account and get API keys
- [ ] Add environment variables
- [ ] Test upload/download

**Recommended: UploadThing (Free Tier)**
```env
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=...
```

**Day 3-4: Backend Integration**
- [ ] Create `ImageService` in shared infrastructure
- [ ] Add image upload use case
- [ ] Create API endpoint: `POST /api/v1/images/upload`
- [ ] Add image URL to Listing entity
- [ ] Update Prisma schema with `images` table
- [ ] Write unit tests

**Day 5-7: Frontend Integration**
- [ ] Install upload library (`@uploadthing/react`)
- [ ] Create `ImageUpload` component
- [ ] Add to listing creation form
- [ ] Add to listing edit form
- [ ] Add image preview
- [ ] Add image deletion

#### **Acceptance Criteria:**
- ✅ Sellers can upload images when creating listings
- ✅ Images are stored securely with signed URLs
- ✅ Images display on product cards and details
- ✅ Image upload has loading states and error handling

#### **Files to Create/Update:**
```
packages/core/src/shared/infrastructure/services/ImageService.ts
packages/database/prisma/schema.prisma (add Image model)
apps/web/app/api/v1/images/upload/route.ts
apps/web/components/ImageUpload.tsx
apps/web/app/(dashboard)/seller/listings/new/page.tsx (update)
```

---

### **WEEK 2-3: Species Verification AI** 🌿 HIGH IMPACT

**Value:** Builds trust, prevents fraud, unique feature

#### **Deliverables:**
1. ✅ HuggingFace integration
2. ✅ Species classification endpoint
3. ✅ Verification status in listings
4. ✅ Admin review queue for mismatches
5. ✅ Verification badge UI

#### **Day 1-2: Research & Setup**
- [ ] Research free plant classification models
- [ ] Test HuggingFace Inference API
- [ ] Create HuggingFace account (free)
- [ ] Test API with sample images

**Recommended Model Options:**
1. `google/vit-base-patch16-224` (general image classification)
2. `nateraw/vit-base-plant` (plant-specific, if available)
3. Custom PlantNet API (free for non-commercial)

**Day 3-5: Backend Implementation**

Create new bounded context: `/packages/core/src/ai`

**Files to create:**
```typescript
// packages/core/src/ai/domain/entities/Verification.ts
export class SpeciesVerification {
  constructor(
    public readonly id: string,
    public readonly listingId: string,
    public readonly declaredSpecies: string,
    public readonly detectedSpecies: string,
    public readonly confidence: number,
    public readonly status: VerificationStatus,
    public readonly verifiedAt: Date
  ) {}
  
  isMatch(): boolean {
    return this.confidence > 0.75 && 
           this.declaredSpecies.toLowerCase().includes(this.detectedSpecies.toLowerCase());
  }
}

// packages/core/src/ai/infrastructure/services/HuggingFaceService.ts
export class HuggingFaceService {
  async classifyImage(imageUrl: string): Promise<ClassificationResult> {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: imageUrl }),
      }
    );
    
    const results = await response.json();
    return {
      label: results[0].label,
      confidence: results[0].score,
    };
  }
}

// packages/core/src/ai/application/use-cases/VerifySpeciesUseCase.ts
export class VerifySpeciesUseCase {
  async execute(listingId: string, imageUrl: string): Promise<VerificationResult> {
    // 1. Get listing with declared species
    const listing = await this.listingRepo.findById(listingId);
    
    // 2. Classify image
    const classification = await this.aiService.classifyImage(imageUrl);
    
    // 3. Compare and create verification
    const verification = new SpeciesVerification(
      uuid(),
      listingId,
      listing.species,
      classification.label,
      classification.confidence,
      this.determineStatus(listing.species, classification),
      new Date()
    );
    
    // 4. Save verification
    await this.verificationRepo.save(verification);
    
    // 5. If mismatch, flag for review
    if (!verification.isMatch()) {
      await this.flagForReview(listingId, verification);
    }
    
    return verification;
  }
}
```

**Day 6-7: Background Job Setup**

Setup Redis + BullMQ for async processing:

```bash
# Install dependencies
cd packages/core
pnpm add bullmq ioredis
```

```typescript
// packages/core/src/shared/infrastructure/queue/VerificationQueue.ts
import { Queue, Worker } from 'bullmq';

export class VerificationQueue {
  private queue: Queue;
  
  constructor() {
    this.queue = new Queue('species-verification', {
      connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379'),
      }
    });
  }
  
  async addVerificationJob(listingId: string, imageUrl: string) {
    await this.queue.add('verify', { listingId, imageUrl });
  }
}

// apps/worker/src/workers/VerificationWorker.ts
const worker = new Worker('species-verification', async (job) => {
  const { listingId, imageUrl } = job.data;
  const useCase = new VerifySpeciesUseCase(/* deps */);
  await useCase.execute(listingId, imageUrl);
});
```

**Day 8-10: Frontend Integration**

- [ ] Add verification status to listing cards
- [ ] Create verification badge component
- [ ] Add admin review queue page
- [ ] Add verification details to seller dashboard
- [ ] Show verification timeline

**Day 11-12: Testing**
- [ ] Unit tests for verification logic
- [ ] Integration tests for API
- [ ] Test with real plant images
- [ ] Test edge cases (no match, low confidence)

#### **Acceptance Criteria:**
- ✅ Images are automatically verified when listing is created
- ✅ Verification status shows on listings (Verified/Pending/Flagged)
- ✅ Mismatches create admin review tasks
- ✅ Background job processes verification asynchronously
- ✅ Confidence scores are stored and displayed

#### **Database Schema:**
```prisma
model SpeciesVerification {
  id              String   @id @default(uuid())
  listingId       String
  listing         Listing  @relation(fields: [listingId], references: [id])
  declaredSpecies String
  detectedSpecies String
  confidence      Float
  status          VerificationStatus
  verifiedAt      DateTime @default(now())
  reviewedBy      String?
  reviewedAt      DateTime?
  
  @@index([listingId])
  @@index([status])
}

enum VerificationStatus {
  PENDING
  VERIFIED
  FLAGGED
  APPROVED
  REJECTED
}
```

---

### **WEEK 3: AI Care Plan Generator** 📅 HIGH IMPACT

**Value:** Unique buyer experience, increases conversion, low complexity

#### **Deliverables:**
1. ✅ Gemini API integration
2. ✅ Care plan generation prompt
3. ✅ ICS calendar file generation
4. ✅ Email with care plan
5. ✅ Care plan display in UI

#### **Day 1-2: Gemini API Setup**

**Sign up for Google AI Studio (100% Free):**
- Go to https://makersuite.google.com/
- Get free API key
- No credit card required

```env
GOOGLE_GEMINI_API_KEY=AIza...
```

**Day 3-4: Care Plan Generator**

```typescript
// packages/core/src/ai/infrastructure/services/GeminiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
  }
  
  async generateCarePlan(species: string, climate: string): Promise<CarePlan> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
You are a professional horticulturist. Generate a detailed care plan for a ${species} tree.

Climate: ${climate}

Provide a structured care plan with:
1. Watering schedule (frequency, amount)
2. Sunlight requirements
3. Fertilizing schedule (type, frequency)
4. Pruning schedule
5. Seasonal care tips
6. Common problems to watch for

Format as JSON with this structure:
{
  "watering": { "frequency": "string", "amount": "string", "notes": "string" },
  "sunlight": { "hours": number, "type": "string", "notes": "string" },
  "fertilizing": { "frequency": "string", "type": "string", "schedule": ["month1", "month2"] },
  "pruning": { "frequency": "string", "bestMonths": ["month1", "month2"], "notes": "string" },
  "seasonalTips": { "spring": "string", "summer": "string", "fall": "string", "winter": "string" },
  "commonIssues": ["issue1", "issue2"]
}
`;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Failed to parse care plan");
    
    return JSON.parse(jsonMatch[0]);
  }
}

// packages/core/src/ai/application/use-cases/GenerateCarePlanUseCase.ts
export class GenerateCarePlanUseCase {
  async execute(orderId: string): Promise<CarePlanDTO> {
    // 1. Get order with listing details
    const order = await this.orderRepo.findById(orderId);
    const listing = await this.listingRepo.findById(order.items[0].listingId);
    
    // 2. Generate care plan with AI
    const carePlan = await this.geminiService.generateCarePlan(
      listing.species,
      order.shippingAddress.city // Use for climate estimation
    );
    
    // 3. Save care plan
    const carePlanEntity = CarePlan.create({
      orderId,
      species: listing.species,
      plan: carePlan,
    });
    await this.carePlanRepo.save(carePlanEntity);
    
    // 4. Generate calendar file
    const icsFile = this.generateICS(carePlan);
    
    // 5. Send email
    await this.emailService.sendCarePlan(order.buyerEmail, carePlan, icsFile);
    
    return CarePlanDTO.fromEntity(carePlanEntity);
  }
  
  private generateICS(carePlan: CarePlan): string {
    // Use ics library to create calendar events
    const events = [];
    
    // Add fertilizing events
    carePlan.fertilizing.schedule.forEach(month => {
      events.push({
        title: `Fertilize ${carePlan.species}`,
        start: this.getDateForMonth(month),
        duration: { hours: 1 },
        description: `Apply ${carePlan.fertilizing.type} fertilizer`,
      });
    });
    
    // Add pruning events
    carePlan.pruning.bestMonths.forEach(month => {
      events.push({
        title: `Prune ${carePlan.species}`,
        start: this.getDateForMonth(month),
        duration: { hours: 2 },
        description: carePlan.pruning.notes,
      });
    });
    
    return createEvents(events).value;
  }
}
```

**Day 5-6: Email Template**

```typescript
// packages/core/src/shared/infrastructure/email/templates/care-plan.html
export const carePlanEmailTemplate = (carePlan: CarePlan) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; }
    .section { margin: 20px 0; padding: 15px; background: #f9f9f9; border-radius: 8px; }
    .schedule-item { margin: 10px 0; padding: 10px; background: white; border-left: 4px solid #667eea; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🌳 Your Tree Care Plan</h1>
    <p>Congratulations on your ${carePlan.species}!</p>
  </div>
  
  <div class="section">
    <h2>💧 Watering</h2>
    <p><strong>Frequency:</strong> ${carePlan.watering.frequency}</p>
    <p><strong>Amount:</strong> ${carePlan.watering.amount}</p>
    <p>${carePlan.watering.notes}</p>
  </div>
  
  <div class="section">
    <h2>☀️ Sunlight</h2>
    <p><strong>Daily Hours:</strong> ${carePlan.sunlight.hours} hours</p>
    <p><strong>Type:</strong> ${carePlan.sunlight.type}</p>
    <p>${carePlan.sunlight.notes}</p>
  </div>
  
  <div class="section">
    <h2>🌱 Fertilizing Schedule</h2>
    <p><strong>Frequency:</strong> ${carePlan.fertilizing.frequency}</p>
    <p><strong>Type:</strong> ${carePlan.fertilizing.type}</p>
    ${carePlan.fertilizing.schedule.map(month => 
      `<div class="schedule-item">📅 ${month}</div>`
    ).join('')}
  </div>
  
  <div class="section">
    <h2>✂️ Pruning</h2>
    <p><strong>Frequency:</strong> ${carePlan.pruning.frequency}</p>
    <p><strong>Best Months:</strong> ${carePlan.pruning.bestMonths.join(', ')}</p>
    <p>${carePlan.pruning.notes}</p>
  </div>
  
  <div class="section">
    <h2>📅 Seasonal Tips</h2>
    <div class="schedule-item"><strong>Spring:</strong> ${carePlan.seasonalTips.spring}</div>
    <div class="schedule-item"><strong>Summer:</strong> ${carePlan.seasonalTips.summer}</div>
    <div class="schedule-item"><strong>Fall:</strong> ${carePlan.seasonalTips.fall}</div>
    <div class="schedule-item"><strong>Winter:</strong> ${carePlan.seasonalTips.winter}</div>
  </div>
  
  <p style="margin-top: 30px;">
    📎 <strong>Attached:</strong> Calendar file (ICS) - Import to Google Calendar, Apple Calendar, or Outlook
  </p>
</body>
</html>
`;
```

**Day 7: Frontend Display**

- [ ] Create Care Plan page: `/dashboard/care-plans`
- [ ] Display care plan after purchase
- [ ] Add download ICS button
- [ ] Create printable care plan card

**Day 8: Testing**
- [ ] Test with different species
- [ ] Verify ICS file format
- [ ] Test email delivery
- [ ] Test calendar import

#### **Acceptance Criteria:**
- ✅ Care plan auto-generated after order completion
- ✅ Email sent to buyer with care plan
- ✅ ICS calendar file attached to email
- ✅ Care plan viewable in customer dashboard
- ✅ Plan includes watering, sunlight, fertilizing, pruning schedules

---

### **WEEK 4-5: ML-Powered Image Search** 🔍 HIGH IMPACT

**Value:** Unique feature, improves discovery, shows ML skills

#### **Deliverables:**
1. ✅ Vector database setup (pgvector)
2. ✅ CLIP embeddings generation
3. ✅ Similarity search endpoint
4. ✅ "Search by image" UI
5. ✅ Similar listings widget

#### **Day 1-2: PostgreSQL pgvector Setup**

```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Add to Prisma schema
model ImageEmbedding {
  id        String   @id @default(uuid())
  listingId String
  listing   Listing  @relation(fields: [listingId], references: [id])
  imageUrl  String
  embedding Unsupported("vector(512)") // CLIP produces 512-dim vectors
  createdAt DateTime @default(now())
  
  @@index([listingId])
}
```

**Day 3-5: CLIP Integration**

**Option 1: HuggingFace CLIP (FREE)**
```typescript
// packages/core/src/ai/infrastructure/services/CLIPService.ts
export class CLIPService {
  async generateEmbedding(imageUrl: string): Promise<number[]> {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/openai/clip-vit-base-patch32",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: imageUrl }),
      }
    );
    
    const embedding = await response.json();
    return embedding; // Returns 512-dimensional vector
  }
  
  async findSimilar(queryEmbedding: number[], limit: number = 10): Promise<string[]> {
    // Use pgvector cosine similarity
    const query = `
      SELECT listing_id, 
             1 - (embedding <=> $1::vector) as similarity
      FROM image_embeddings
      ORDER BY embedding <=> $1::vector
      LIMIT $2
    `;
    
    const results = await this.db.query(query, [
      JSON.stringify(queryEmbedding),
      limit
    ]);
    
    return results.rows.map(r => r.listing_id);
  }
}
```

**Option 2: Replicate API (FREE tier available)**
```typescript
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const embedding = await replicate.run(
  "andreasjansson/clip-features:latest",
  { input: { image: imageUrl } }
);
```

**Day 6-8: Background Job for Embedding Generation**

```typescript
// apps/worker/src/workers/EmbeddingWorker.ts
const worker = new Worker('generate-embeddings', async (job) => {
  const { listingId, imageUrl } = job.data;
  
  // 1. Generate embedding
  const embedding = await clipService.generateEmbedding(imageUrl);
  
  // 2. Save to database
  await prisma.imageEmbedding.create({
    data: {
      listingId,
      imageUrl,
      embedding: JSON.stringify(embedding), // pgvector handles this
    }
  });
});

// Trigger on image upload
queue.add('generate-embeddings', {
  listingId: listing.id,
  imageUrl: uploadedImageUrl,
});
```

**Day 9-10: Search API & Frontend**

```typescript
// apps/web/app/api/v1/search/image/route.ts
export async function POST(request: Request) {
  const { imageUrl } = await request.json();
  
  // 1. Generate embedding for query image
  const queryEmbedding = await clipService.generateEmbedding(imageUrl);
  
  // 2. Find similar listings
  const similarListingIds = await clipService.findSimilar(queryEmbedding, 20);
  
  // 3. Get full listing details
  const listings = await listingRepo.findByIds(similarListingIds);
  
  return Response.json({ listings });
}

// apps/web/components/ImageSearch.tsx
export function ImageSearch() {
  const [preview, setPreview] = useState<string>();
  const { data, isLoading } = useImageSearch(preview);
  
  return (
    <div>
      <input 
        type="file" 
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target?.result as string);
            reader.readAsDataURL(file);
          }
        }}
      />
      
      {isLoading && <Spinner />}
      
      <div className="grid grid-cols-3 gap-4">
        {data?.listings.map(listing => (
          <ProductCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
```

**Day 11-12: Similar Listings Widget**

```typescript
// apps/web/components/SimilarListings.tsx
export function SimilarListings({ currentListingId }: Props) {
  const { data } = useSimilarListings(currentListingId);
  
  return (
    <section>
      <h2>Similar Trees</h2>
      <div className="grid grid-cols-4 gap-4">
        {data?.listings.map(listing => (
          <ProductCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
}

// Add to product detail page
```

#### **Acceptance Criteria:**
- ✅ Users can upload an image to search for similar trees
- ✅ Similarity search returns relevant results
- ✅ Product detail pages show "Similar Trees" widget
- ✅ Embeddings generated automatically for all new listings
- ✅ Search is fast (<2 seconds)

---

### **WEEK 6: AI Listing Quality Score** ⭐ MEDIUM IMPACT

**Value:** Helps sellers improve listings, increases marketplace quality

#### **Deliverables:**
1. ✅ Quality scoring algorithm
2. ✅ Image quality check
3. ✅ SEO score calculation
4. ✅ Quality improvement suggestions
5. ✅ Quality badge display

#### **Implementation:**

```typescript
// packages/core/src/ai/domain/services/QualityScorer.ts
export class ListingQualityScorer {
  async calculateScore(listing: Listing): Promise<QualityScore> {
    const scores = {
      imageQuality: await this.scoreImageQuality(listing.images),
      descriptionQuality: this.scoreDescription(listing.description),
      titleQuality: this.scoreTitle(listing.title),
      speciesAccuracy: await this.scoreSpeciesAccuracy(listing),
      priceCompetitiveness: await this.scorePricing(listing),
    };
    
    const totalScore = Object.values(scores).reduce((a, b) => a + b) / 5;
    
    const suggestions = this.generateSuggestions(scores);
    
    return new QualityScore(
      listing.id,
      totalScore,
      scores,
      suggestions
    );
  }
  
  private async scoreImageQuality(images: Image[]): Promise<number> {
    if (images.length === 0) return 0;
    
    let score = 0;
    
    // Check quantity (max 20 points)
    score += Math.min(images.length * 5, 20);
    
    // Check image dimensions (use Sharp library)
    for (const image of images) {
      const metadata = await sharp(image.url).metadata();
      
      // Resolution check (20 points)
      if (metadata.width >= 1200 && metadata.height >= 1200) {
        score += 20;
        break;
      } else if (metadata.width >= 800) {
        score += 10;
      }
    }
    
    // Check variety (different angles) using AI - 10 points
    // This would require another AI call
    
    return Math.min(score, 100);
  }
  
  private scoreDescription(description: string): number {
    let score = 0;
    
    // Length check
    if (description.length > 200) score += 25;
    else if (description.length > 100) score += 15;
    else score += 5;
    
    // Keyword density (tree care terms)
    const keywords = ['watering', 'sunlight', 'soil', 'height', 'age', 'care', 'growth'];
    const foundKeywords = keywords.filter(k => 
      description.toLowerCase().includes(k)
    );
    score += foundKeywords.length * 5; // Up to 35 points
    
    // Bullet points or formatting
    if (description.includes('\n') || description.includes('•')) {
      score += 15;
    }
    
    // Grammar check (optional - use Gemini)
    score += 25; // Default
    
    return Math.min(score, 100);
  }
  
  private generateSuggestions(scores: QualityScores): string[] {
    const suggestions = [];
    
    if (scores.imageQuality < 60) {
      suggestions.push("📸 Add more high-resolution images (min 1200x1200px)");
    }
    
    if (scores.descriptionQuality < 60) {
      suggestions.push("📝 Add more details about care requirements and tree characteristics");
    }
    
    if (scores.titleQuality < 60) {
      suggestions.push("🏷️ Include species name, size, and key features in title");
    }
    
    if (scores.speciesAccuracy < 80) {
      suggestions.push("⚠️ Species verification needed - upload clearer images");
    }
    
    return suggestions;
  }
}
```

**Frontend Display:**

```typescript
// apps/web/app/(dashboard)/seller/listings/[id]/quality/page.tsx
export default function QualityScorePage({ params }: Props) {
  const { data: score } = useListingQuality(params.id);
  
  return (
    <div>
      <h1>Listing Quality Score</h1>
      
      <div className="quality-meter">
        <CircularProgress value={score.total} />
        <p>{score.total}/100</p>
      </div>
      
      <div className="score-breakdown">
        <ScoreCard label="Image Quality" score={score.imageQuality} />
        <ScoreCard label="Description" score={score.descriptionQuality} />
        <ScoreCard label="Title" score={score.titleQuality} />
        <ScoreCard label="Species Verified" score={score.speciesAccuracy} />
        <ScoreCard label="Pricing" score={score.priceCompetitiveness} />
      </div>
      
      <div className="suggestions">
        <h2>How to Improve</h2>
        {score.suggestions.map(s => (
          <div className="suggestion-card">{s}</div>
        ))}
      </div>
    </div>
  );
}
```

---

### **WEEK 7: AI Price Suggestion** 💰 MEDIUM IMPACT

**Value:** Helps sellers price competitively, uses ML

```typescript
// packages/core/src/ai/application/use-cases/SuggestPriceUseCase.ts
export class SuggestPriceUseCase {
  async execute(listing: Listing): Promise<PriceSuggestion> {
    // 1. Find similar listings
    const similar = await this.listingRepo.findSimilar({
      species: listing.species,
      age: listing.age,
      height: listing.height,
    });
    
    // 2. Calculate statistics
    const prices = similar.map(l => l.price.amount);
    const avgPrice = prices.reduce((a, b) => a + b) / prices.length;
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    // 3. Adjust for quality score
    const qualityScore = await this.qualityScorer.calculateScore(listing);
    const qualityMultiplier = 0.8 + (qualityScore.total / 100) * 0.4; // 0.8 to 1.2
    
    const suggestedPrice = avgPrice * qualityMultiplier;
    
    // 4. Use Gemini for market insights
    const marketInsight = await this.geminiService.generatePriceInsight(
      listing.species,
      { avgPrice, suggestedPrice, similar: similar.length }
    );
    
    return {
      suggested: suggestedPrice,
      range: { min: minPrice, max: maxPrice },
      average: avgPrice,
      confidence: this.calculateConfidence(similar.length),
      insight: marketInsight,
    };
  }
}
```

---

### **WEEK 8: Growth Simulator** (OPTIONAL) 🌱

**Value:** Unique UX, visualization, impressive demo

```typescript
// packages/core/src/ai/application/use-cases/SimulateGrowthUseCase.ts
export class SimulateGrowthUseCase {
  async execute(species: string, currentAge: number): Promise<GrowthTimeline> {
    // Use Gemini to generate growth data
    const prompt = `
Generate a realistic growth timeline for a ${species} tree.
Current age: ${currentAge} years

Provide growth data for the next 10 years with:
- Height in feet
- Canopy width in feet
- Key visual changes
- Milestones (flowers, fruit, etc.)

Format as JSON array.
`;
    
    const data = await this.geminiService.generate(prompt);
    
    return new GrowthTimeline(species, data);
  }
}

// Frontend visualization using Chart.js or Recharts
<LineChart data={growthData}>
  <Line dataKey="height" stroke="#8884d8" />
  <Line dataKey="width" stroke="#82ca9d" />
</LineChart>
```

---

## 🛠️ TECHNICAL STACK FOR AI FEATURES

### **APIs & Services (All FREE tiers)**

| Service | Purpose | Free Tier | Cost Beyond Free |
|---------|---------|-----------|------------------|
| **HuggingFace Inference API** | Image classification, embeddings | 30K requests/month | $0.06 per 1K requests |
| **Google Gemini** | Text generation, care plans | Unlimited (60 req/min) | Free forever |
| **UploadThing** | Image uploads | 2GB storage, 2GB bandwidth | $20/mo for 100GB |
| **Replicate** | Alternative for CLIP | Free tier available | Pay per use |
| **pgvector** | Vector similarity search | Free (PostgreSQL extension) | N/A |

### **New Dependencies**

```json
{
  "dependencies": {
    "@google/generative-ai": "^0.1.3",
    "bullmq": "^5.0.0",
    "ioredis": "^5.3.2",
    "replicate": "^0.25.2",
    "sharp": "^0.33.0",
    "ics": "^3.7.0",
    "uploadthing": "^6.0.0",
    "@uploadthing/react": "^6.0.0"
  }
}
```

### **Infrastructure Requirements**

```yaml
# docker-compose.yml - Add Redis
services:
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

volumes:
  redis-data:
```

---

## 📊 SUCCESS METRICS

Track these to measure AI feature impact:

| Metric | Target | Tracking |
|--------|--------|----------|
| **Verification Accuracy** | >85% | Compare AI vs human verification |
| **Care Plan Generation Time** | <10 seconds | Monitor queue processing time |
| **Image Search Relevance** | >80% user satisfaction | User feedback surveys |
| **Quality Score Adoption** | >60% sellers use it | Analytics on page views |
| **Price Suggestion Accuracy** | Within 15% of market | Compare suggested vs actual |

---

## ✅ DEFINITION OF DONE (per feature)

Before considering a feature complete:

- [ ] **Core functionality implemented** - Feature works end-to-end
- [ ] **Unit tests written** - >80% coverage for business logic
- [ ] **Integration tests added** - API endpoints tested
- [ ] **Error handling complete** - Graceful failures, retry logic
- [ ] **Loading states added** - UI shows progress
- [ ] **Documentation updated** - README and guides
- [ ] **Tested with real data** - Not just mocks
- [ ] **Performance validated** - <3s response time
- [ ] **Security reviewed** - API keys protected, input validated
- [ ] **UI polished** - Looks professional

---

## 🚨 RISKS & MITIGATIONS

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **API rate limits hit** | High | Medium | Implement caching, queue jobs, upgrade if needed |
| **AI accuracy too low** | High | Medium | Fall back to manual verification, tune prompts |
| **Performance issues** | Medium | Medium | Use background jobs, optimize queries, add indexes |
| **Free tier limits** | Medium | Low | Monitor usage, have backup APIs ready |
| **Integration complexity** | Medium | High | Follow existing patterns, thorough testing |

---

## 📚 LEARNING RESOURCES

### **Before You Start:**

1. **HuggingFace Inference API:**
   - Docs: https://huggingface.co/docs/api-inference/
   - CLIP Model: https://huggingface.co/openai/clip-vit-base-patch32

2. **Google Gemini:**
   - Quickstart: https://ai.google.dev/tutorials/get_started_web
   - Prompt Guide: https://ai.google.dev/docs/prompt_best_practices

3. **pgvector:**
   - GitHub: https://github.com/pgvector/pgvector
   - Prisma Integration: https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields

4. **BullMQ:**
   - Docs: https://docs.bullmq.io/
   - Tutorial: https://blog.logrocket.com/optimizing-node-js-application-performance-bullmq/

---

## 🎯 QUICK START CHECKLIST

### **Week 1 Prep:**
- [ ] Create HuggingFace account
- [ ] Get Google AI Studio API key
- [ ] Choose image upload service (UploadThing recommended)
- [ ] Set up Redis locally
- [ ] Install all new dependencies
- [ ] Update environment variables

### **Tools to Install:**
```bash
# Image processing
pnpm add sharp

# AI services
pnpm add @google/generative-ai

# Background jobs
pnpm add bullmq ioredis

# Image upload
pnpm add uploadthing @uploadthing/react

# Calendar generation
pnpm add ics

# Vector search (already have Prisma)
# pgvector is a PostgreSQL extension
```

---

## 🏆 END GOAL

After 8 weeks, you will have:

✅ **A truly unique AI-powered marketplace**
✅ **6 working AI features** (species verification, care plans, image search, quality scores, price suggestions, growth simulator)
✅ **Portfolio-ready flagship project** that stands out
✅ **Demonstrated ML/AI skills** with real integrations
✅ **Production-ready features** with proper error handling and testing
✅ **$0 spent** (all using free tiers)

**This will transform your project from "another e-commerce site" to "an AI-powered specialized marketplace with unique features that solve real problems."**

---

## 📞 SUPPORT & NEXT STEPS

Ready to start? Let's begin with **Week 1: Image Upload Infrastructure!**

Would you like me to:
1. Create detailed implementation files for Week 1?
2. Set up the project structure for AI features?
3. Help you choose between image upload services?
4. Generate the Prisma schema updates?

**Let's build something amazing! 🚀**
