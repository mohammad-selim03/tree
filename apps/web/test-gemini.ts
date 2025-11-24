import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { testGeminiConnection, generateCarePlan } from './lib/ai/gemini';

async function main() {
  console.log('🧪 Testing Google Gemini API...\n');

  // Check if API key is set
  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    console.error('❌ GOOGLE_GEMINI_API_KEY not found in .env.local');
    console.log('\n📝 To fix this:');
    console.log('1. Get your API key from: https://makersuite.google.com/app/apikey');
    console.log('2. Add to apps/web/.env.local:');
    console.log('   GOOGLE_GEMINI_API_KEY="your-key-here"');
    process.exit(1);
  }

  console.log('✅ API key found\n');

  // Test connection
  console.log('📡 Testing connection...');
  const connected = await testGeminiConnection();

  if (!connected) {
    console.error('\n❌ Connection failed. Check your API key.');
    process.exit(1);
  }

  // Generate a sample care plan
  console.log('\n\n🌱 Generating sample care plan for Japanese Maple...');
  try {
    const carePlan = await generateCarePlan({
      speciesName: 'Japanese Maple',
      scientificName: 'Acer palmatum',
    });

    console.log('\n✅ Care Plan Generated!');
    console.log('\n📋 Summary:', carePlan.summary);
    console.log('\n💧 Watering:', carePlan.watering.frequency);
    console.log('☀️ Sunlight:', carePlan.sunlight.requirement);
    console.log('🌱 Fertilizing:', carePlan.fertilizing.frequency);
    console.log('✂️ Pruning:', carePlan.pruning.season);
    console.log('\n💡 Quick Tips:');
    carePlan.quickTips.slice(0, 3).forEach((tip, i) => {
      console.log(`   ${i + 1}. ${tip}`);
    });

    console.log('\n\n🎉 Test successful! You can now use Gemini in your app.');
  } catch (error: any) {
    console.error('\n❌ Failed to generate care plan:', error.message);
    console.error('\nFull error:', error);
  }
}

main();
