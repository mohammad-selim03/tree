/**
 * Test HuggingFace API Integration
 * Run this to verify your API key and connection work
 * 
 * Usage: node --loader ts-node/esm test-ai.ts
 * Or: tsx test-ai.ts
 */

import { testHuggingFaceConnection, classifySpeciesFromUrl } from './lib/ai/huggingface';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Manually load .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '.env.local');

if (fs.existsSync(envPath)) {
  console.log('📄 Loading .env.local from:', envPath);
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    // Match key=value, handling quotes and whitespace
    const match = line.match(/^\s*([\w_]+)\s*=\s*(.*)?\s*$/);
    if (match && match[1] && match[2]) {
      const key = match[1].trim();
      let value = match[2].trim();
      
      // Remove surrounding quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      process.env[key] = value;
    }
  });
} else {
  console.warn('⚠️ .env.local file not found at:', envPath);
}

async function main() {
  console.log('🤖 Testing HuggingFace AI Integration...\n');

  // Get API key from environment
  const apiKey = process.env.HUGGING_FACE_API_KEY;

  if (!apiKey) {
    console.error('❌ ERROR: HUGGING_FACE_API_KEY not found in environment variables');
    console.log('\nPlease add to apps/web/.env.local:');
    console.log('HUGGING_FACE_API_KEY=hf_your_token_here\n');
    process.exit(1);
  }

  console.log('✅ API Key found:', apiKey.substring(0, 10) + '...\n');

  // Test connection
  console.log('📡 Testing API connection...\n');
  const isConnected = await testHuggingFaceConnection(apiKey);

  if (!isConnected) {
    console.error('\n❌ Connection test failed!');
    console.log('Please check:');
    console.log('1. API key is correct');
    console.log('2. You have internet connection');
    console.log('3. HuggingFace API is accessible\n');
    process.exit(1);
  }

  console.log('\n✅ SUCCESS! HuggingFace AI is ready to use!');
  console.log('\n📊 Testing with sample plant image...\n');

  try {
    // Test with a tree image
    const treeImageUrl = 'https://images.unsplash.com/photo-1511497584788-876760111969?w=600'; // Maple tree
    
    console.log('🌳 Analyzing image:', treeImageUrl);
    const result = await classifySpeciesFromUrl(treeImageUrl, apiKey);

    console.log('\n📋 Top 5 Predictions:');
    result.predictions.forEach((pred, index) => {
      const percentage = (pred.score * 100).toFixed(2);
      console.log(`${index + 1}. ${pred.label}: ${percentage}%`);
    });

    console.log('\n🎯 Top Prediction:', result.topPrediction);
    console.log('🎲 Confidence:', (result.confidence * 100).toFixed(2) + '%');

    console.log('\n✨ AI Classification is working perfectly!');
    console.log('\n⏭️  Next Steps:');
    console.log('1. Set up Redis for background jobs');
    console.log('2. Create BullMQ worker');
    console.log('3. Integrate with listing creation');
    console.log('4. Start verifying species automatically!\n');

  } catch (error) {
    console.error('\n❌ Classification test failed:', error);
    process.exit(1);
  }
}

main().catch(console.error);
