/**
 * HuggingFace AI Client for Species Classification
 * Uses Vision Transformer model for plant/tree identification
 */

import axios from 'axios';

// HuggingFace Inference API endpoint
const HF_API_URL = 'https://api-inference.huggingface.co/models/microsoft/resnet-50';

export interface ClassificationResult {
  label: string;
  score: number;
}

export interface SpeciesClassification {
  predictions: ClassificationResult[];
  topPrediction: string;
  confidence: number;
  timestamp: Date;
}

/**
 * Classify plant/tree species from image URL
 */
export async function classifySpeciesFromUrl(
  imageUrl: string,
  apiKey: string
): Promise<SpeciesClassification> {
  try {
    // Download image
    const imageResponse = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    });
    
    const imageBuffer = Buffer.from(imageResponse.data);

    // Send to HuggingFace
    const response = await axios.post(
      HF_API_URL,
      imageBuffer,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/octet-stream',
        },
      }
    );

    const predictions: ClassificationResult[] = response.data;

    // Sort by confidence
    const sortedPredictions = predictions
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Top 5 predictions

    return {
      predictions: sortedPredictions,
      topPrediction: sortedPredictions[0]?.label || 'unknown',
      confidence: sortedPredictions[0]?.score || 0,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('HuggingFace classification error:', error);
    throw new Error('Failed to classify species');
  }
}

/**
 * Match predicted species with claimed species
 * Returns true if there's a match or high similarity
 */
export function matchSpecies(
  predictedSpecies: string,
  claimedSpecies: string
): { isMatch: boolean; similarity: number; reason: string } {
  const predicted = predictedSpecies.toLowerCase().trim();
  const claimed = claimedSpecies.toLowerCase().trim();

  // Exact match
  if (predicted === claimed) {
    return {
      isMatch: true,
      similarity: 1.0,
      reason: 'Exact match',
    };
  }

  // Check if claimed species is contained in prediction
  if (predicted.includes(claimed) || claimed.includes(predicted)) {
    return {
      isMatch: true,
      similarity: 0.8,
      reason: 'Partial match (contained)',
    };
  }

  // Check common words (at least 2 words in common)
  const predictedWords = predicted.split(/\s+/);
  const claimedWords = claimed.split(/\s+/);
  const commonWords = predictedWords.filter(word => 
    claimedWords.includes(word) && word.length > 3
  );

  if (commonWords.length >= 2) {
    return {
      isMatch: true,
      similarity: 0.6,
      reason: `Common words: ${commonWords.join(', ')}`,
    };
  }

  // No match
  return {
    isMatch: false,
    similarity: 0,
    reason: 'No significant match found',
  };
}

/**
 * Test the HuggingFace API connection
 */
export async function testHuggingFaceConnection(apiKey: string): Promise<boolean> {
  try {
    // Use a test image URL (a simple plant photo)
    const testImageUrl = 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400';
    
    const result = await classifySpeciesFromUrl(testImageUrl, apiKey);
    
    console.log('✅ HuggingFace API Test Successful!');
    console.log('Top Prediction:', result.topPrediction);
    console.log('Confidence:', (result.confidence * 100).toFixed(2) + '%');
    
    return true;
  } catch (error) {
    console.error('❌ HuggingFace API Test Failed:', error instanceof Error ? error.message : String(error));
    if (axios.isAxiosError(error)) {
      console.error('Status:', error.response?.status);
      console.error('Data:', JSON.stringify(error.response?.data, null, 2));
    }
    return false;
  }
}
