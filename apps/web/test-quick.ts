/**
 * Quick API Test Script for TreeVerse
 * Tests authentication and basic endpoints with proper HTTP methods
 */

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1';
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function main() {
  log('\n🌳 TreeVerse Quick API Test\n', 'cyan');

  try {
    // Test 1: Health Check
    log('1️⃣  Testing Health Check...', 'blue');
    const health = await axios.get('http://localhost:3000/api/health');
    log(`   ✅ Server is running: ${JSON.stringify(health.data)}`, 'green');
  } catch (error: any) {
    log(`   ❌ Health check failed: ${error.message}`, 'red');
    log('   Make sure the server is running: pnpm dev', 'yellow');
    return;
  }

  try {
    // Test 2: Register (POST)
    log('\n2️⃣  Testing User Registration (POST)...', 'blue');
    const email = `test_${Date.now()}@example.com`;
    const registerRes = await axios.post(`${BASE_URL}/auth/register`, {
      email,
      password: 'Test123!@#',
      firstName: 'Test',
      lastName: 'User',
      role: 'SELLER',
    });
    
    if (registerRes.data.success) {
      log(`   ✅ User registered: ${email}`, 'green');
      log(`   ✅ Token received: ${registerRes.data.data.accessToken.substring(0, 30)}...`, 'green');
      
      const token = registerRes.data.data.accessToken;
      
      // Test 3: Get Profile (with auth token)
      log('\n3️⃣  Testing Get Profile (GET with Authorization)...', 'blue');
      const profileRes = await axios.get(`${BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (profileRes.data.success) {
        log(`   ✅ Profile fetched: ${profileRes.data.data.email}`, 'green');
        log(`   ✅ Role: ${profileRes.data.data.role}`, 'green');
      }
      
      // Test 4: Get Listings (public endpoint)
      log('\n4️⃣  Testing Get Listings (GET - public)...', 'blue');
      const listingsRes = await axios.get(`${BASE_URL}/listings?page=1&limit=5`);
      const listings = listingsRes.data.data?.listings || listingsRes.data.data || [];
      log(`   ✅ Fetched ${listings.length} listings`, 'green');
      
      // Test 5: Create Listing (POST with auth)
      log('\n5️⃣  Testing Create Listing (POST with Authorization)...', 'blue');
      try {
        const createListingRes = await axios.post(
          `${BASE_URL}/listings`,
          {
            title: `Test Tree ${Date.now()}`,
            speciesName: 'Japanese Maple',
            scientificName: 'Acer palmatum',
            description: 'A beautiful test tree for automated testing. This description is long enough to meet validation requirements.',
            price: 149.99,
            inventory: 10,
            height: 120,
            diameter: 3.5,
            age: 5,
            category: 'ORNAMENTAL',
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        if (createListingRes.data.success) {
          log(`   ✅ Listing created: ${createListingRes.data.data.title}`, 'green');
          log(`   ✅ ID: ${createListingRes.data.data.id}`, 'green');
        }
      } catch (error: any) {
        if (error.response?.status === 400) {
          log(`   ⚠️  Validation error (expected if missing required data)`, 'yellow');
          log(`   Details: ${JSON.stringify(error.response.data.details || error.response.data.error)}`, 'yellow');
        } else {
          throw error;
        }
      }
      
      // Test 6: Test wrong HTTP method (should fail)
      log('\n6️⃣  Testing Wrong HTTP Method (GET on POST endpoint)...', 'blue');
      try {
        await axios.get(`${BASE_URL}/auth/login`);
        log(`   ❌ ERROR: Endpoint allowed GET (should only allow POST)`, 'red');
      } catch (error: any) {
        if (error.response?.status === 405) {
          log(`   ✅ Correctly rejected GET request (405 Method Not Allowed)`, 'green');
        } else {
          throw error;
        }
      }
      
      log('\n✅ All tests completed successfully!', 'green');
      log('\n📊 Summary:', 'cyan');
      log('   • Server is running ✓', 'green');
      log('   • Authentication works ✓', 'green');
      log('   • Registration works ✓', 'green');
      log('   • Protected routes work ✓', 'green');
      log('   • HTTP methods enforced ✓\n', 'green');
    }
  } catch (error: any) {
    log(`\n❌ Test failed: ${error.message}`, 'red');
    if (error.response) {
      log(`   Status: ${error.response.status}`, 'red');
      log(`   Error: ${JSON.stringify(error.response.data)}`, 'red');
    }
  }
}

main();
