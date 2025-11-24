import axios from 'axios';

const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export interface CarePlanRequest {
  speciesName: string;
  scientificName: string;
  userLocation?: string;
  plantAge?: string;
  potSize?: string;
}

export interface CarePlan {
  summary: string;
  watering: {
    frequency: string;
    amount: string;
    tips: string[];
  };
  sunlight: {
    requirement: string;
    hours: string;
    tips: string[];
  };
  soil: {
    type: string;
    ph: string;
    tips: string[];
  };
  fertilizing: {
    frequency: string;
    type: string;
    tips: string[];
  };
  pruning: {
    frequency: string;
    season: string;
    tips: string[];
  };
  seasonalCare: {
    spring: string[];
    summer: string[];
    fall: string[];
    winter: string[];
  };
  commonIssues: {
    issue: string;
    solution: string;
  }[];
  quickTips: string[];
}

/**
 * Generate a comprehensive care plan using Google Gemini
 */
export async function generateCarePlan(request: CarePlanRequest): Promise<CarePlan> {
  if (!GEMINI_API_KEY) {
    throw new Error('GOOGLE_GEMINI_API_KEY not configured');
  }

  const prompt = `You are an expert botanist and horticulturist. Generate a comprehensive, practical care guide for the following plant:

**Plant Information:**
- Common Name: ${request.speciesName}
- Scientific Name: ${request.scientificName}
${request.userLocation ? `- Location: ${request.userLocation}` : ''}
${request.plantAge ? `- Plant Age: ${request.plantAge}` : ''}
${request.potSize ? `- Container Size: ${request.potSize}` : ''}

**Required Format (MUST be valid JSON):**
{
  "summary": "A brief 2-3 sentence overview of this plant's care requirements",
  "watering": {
    "frequency": "How often to water (e.g., 'Once per week', 'Every 3-4 days')",
    "amount": "How much water (e.g., '1-2 cups', 'Until soil is moist')",
    "tips": ["Tip 1", "Tip 2", "Tip 3"]
  },
  "sunlight": {
    "requirement": "Light level (e.g., 'Full sun', 'Partial shade')",
    "hours": "Hours per day (e.g., '6-8 hours', '4-6 hours')",
    "tips": ["Tip 1", "Tip 2"]
  },
  "soil": {
    "type": "Soil type (e.g., 'Well-draining loam', 'Sandy soil')",
    "ph": "pH range (e.g., '6.0-7.0', 'Slightly acidic')",
    "tips": ["Tip 1", "Tip 2"]
  },
  "fertilizing": {
    "frequency": "How often (e.g., 'Monthly during growing season')",
    "type": "Fertilizer type (e.g., 'Balanced 10-10-10', 'Organic compost')",
    "tips": ["Tip 1", "Tip 2"]
  },
  "pruning": {
    "frequency": "How often (e.g., 'Annually', 'As needed')",
    "season": "Best time (e.g., 'Late winter', 'Early spring')",
    "tips": ["Tip 1", "Tip 2"]
  },
  "seasonalCare": {
    "spring": ["Task 1", "Task 2"],
    "summer": ["Task 1", "Task 2"],
    "fall": ["Task 1", "Task 2"],
    "winter": ["Task 1", "Task 2"]
  },
  "commonIssues": [
    {"issue": "Problem name", "solution": "How to fix it"},
    {"issue": "Problem name", "solution": "How to fix it"}
  ],
  "quickTips": ["Tip 1", "Tip 2", "Tip 3", "Tip 4", "Tip 5"]
}

**IMPORTANT:** 
- Respond ONLY with valid JSON (no markdown, no explanations)
- Be specific and practical
- Include at least 3 tips for each category
- Tailor advice to the plant's specific needs
- Make it actionable for beginners`;

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const generatedText = response.data.candidates[0].content.parts[0].text;
    
    // Clean up the response (remove markdown code blocks if present)
    let cleanedText = generatedText.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/, '').replace(/\n?```$/, '');
    }

    const carePlan = JSON.parse(cleanedText) as CarePlan;
    return carePlan;
  } catch (error: any) {
    console.error('Failed to generate care plan:', error.response?.data || error.message);
    throw new Error('Failed to generate care plan. Please try again.');
  }
}

/**
 * Generate a quick summary for listing cards
 */
export async function generateQuickCareSummary(speciesName: string, scientificName: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('GOOGLE_GEMINI_API_KEY not configured');
  }

  const prompt = `In 2-3 sentences, describe the basic care requirements for ${speciesName} (${scientificName}). Focus on sunlight, water, and difficulty level. Be concise and beginner-friendly.`;

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150,
        },
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return response.data.candidates[0].content.parts[0].text.trim();
  } catch (error: any) {
    console.error('Failed to generate summary:', error.response?.data || error.message);
    return `${speciesName} is a beautiful plant that requires regular care and attention.`;
  }
}

/**
 * Test Gemini connection
 */
export async function testGeminiConnection(): Promise<boolean> {
  if (!GEMINI_API_KEY) {
    console.error('❌ GOOGLE_GEMINI_API_KEY not set');
    return false;
  }

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: 'Say "OK" if you can read this.' }] }],
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log('✅ Gemini API connected!');
    console.log('Response:', response.data.candidates[0].content.parts[0].text);
    return true;
  } catch (error: any) {
    console.error('❌ Gemini connection failed:', error.response?.data || error.message);
    return false;
  }
}
