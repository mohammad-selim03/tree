import { Job } from 'bullmq';
import * as Database from '@repo/database';
import { classifySpeciesFromUrl, matchSpecies } from '@/lib/ai/huggingface';

const prisma = (Database as any).prisma || Database;

export interface SpeciesVerificationJobData {
  listingId: string;
  imageId: string;
  imageUrl: string;
}

export async function processSpeciesVerification(job: Job<SpeciesVerificationJobData>) {
  const { listingId, imageId, imageUrl } = job.data;
  
  console.log(`🔍 Processing species verification for listing ${listingId}, image ${imageId}`);
  
  try {
    // 1. Get listing details to find claimed species
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: {
        species: true,
      },
    });

    if (!listing) {
      throw new Error(`Listing ${listingId} not found`);
    }

    const claimedSpeciesName = listing.species.commonName;
    const claimedScientificName = listing.species.scientificName;
    
    console.log(`🌱 Claimed species: ${claimedSpeciesName} (${claimedScientificName})`);

    // 2. Classify image using AI
    const apiKey = process.env.HUGGING_FACE_API_KEY;
    if (!apiKey) {
      throw new Error('HUGGING_FACE_API_KEY not configured');
    }

    const classification = await classifySpeciesFromUrl(imageUrl, apiKey);
    
    console.log(`🤖 AI Prediction: ${classification.topPrediction} (${(classification.confidence * 100).toFixed(1)}%)`);

    // 3. Match species
    // Check against both common and scientific names
    const matchCommon = matchSpecies(classification.topPrediction, claimedSpeciesName);
    const matchScientific = matchSpecies(classification.topPrediction, claimedScientificName);
    
    const bestMatch = matchCommon.similarity > matchScientific.similarity ? matchCommon : matchScientific;
    
    let status: 'VERIFIED' | 'MISMATCH' | 'PENDING' | 'FLAGGED' = 'PENDING';
    
    if (bestMatch.isMatch && classification.confidence > 0.7) {
      status = 'VERIFIED';
    } else if (!bestMatch.isMatch && classification.confidence > 0.8) {
      status = 'MISMATCH';
    } else {
      status = 'PENDING'; // Low confidence or ambiguous
    }

    console.log(`✅ Verification Result: ${status} (Reason: ${bestMatch.reason})`);

    // 4. Save analysis results
    await prisma.imageAnalysis.create({
      data: {
        imageId: imageId,
        predictions: classification.predictions as any,
        topPrediction: classification.topPrediction,
        confidence: classification.confidence,
        verificationStatus: status,
        mismatchReason: status === 'MISMATCH' ? bestMatch.reason : null,
      },
    });

    // 5. Update listing status if mismatch detected (optional logic)
    if (status === 'MISMATCH') {
      // Maybe flag the listing? For now just log it.
      console.warn(`⚠️ Mismatch detected for listing ${listingId}`);
      
      // Optional: Flag listing
      // await prisma.listing.update({
      //   where: { id: listingId },
      //   data: { status: 'FLAGGED' }
      // });
    }

    return { success: true, status, confidence: classification.confidence };

  } catch (error) {
    console.error(`❌ Failed to verify species for image ${imageId}:`, error);
    throw error;
  }
}
