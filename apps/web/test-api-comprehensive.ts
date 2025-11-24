/**
 * Automated API Testing Script for TreeVerse
 * Tests all major endpoints and functionalities
 */

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1';
const HEALTH_URL = 'http://localhost:3000/api/health';

// ANSI color codes for better console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  duration?: number;
}

const results: TestResult[] = [];
let authToken = '';
let testUserId = '';
let testListingId = '';

// Helper functions
function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(testNumber: number, testName: string) {
  log(`\n${'='.repeat(60)}`, 'blue');
  log(`Test ${testNumber}: ${testName}`, 'blue');
  log('='.repeat(60), 'blue');
}

function logSuccess(message: string) {
  log(`✅ ${message}`, 'green');
}

function logError(message: string) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message: string) {
  log(`⚠️  ${message}`, 'yellow');
}

function recordResult(name: string, passed: boolean, error?: string) {
  results.push({ name, passed, error });
}

// Test functions
async function testHealthCheck() {
  logTest(1, 'Health Check');
  try {
    const start = Date.now();
    const response = await axios.get(HEALTH_URL);
    const duration = Date.now() - start;

    if (response.status === 200) {
      logSuccess(`Health check passed (${duration}ms)`);
      console.log(response.data);
      recordResult('Health Check', true);
      return true;
    }
  } catch (error: any) {
    logError(`Health check failed: ${error.message}`);
    recordResult('Health Check', false, error.message);
    return false;
  }
}

async function testUserRegistration() {
  logTest(2, 'User Registration');
  try {
    const testEmail = `test_${Date.now()}@treeverse.com`;
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      email: testEmail,
      password: 'Test123!@#Strong',
      firstName: 'Test',
      lastName: 'User',
      role: 'SELLER',
    });

    if (response.data.success) {
      authToken = response.data.data.accessToken;
      testUserId = response.data.data.user.id;
      logSuccess(`User registered: ${testEmail}`);
      logSuccess(`User ID: ${testUserId}`);
      logSuccess(`Token received: ${authToken.substring(0, 20)}...`);
      recordResult('User Registration', true);
      return true;
    }
  } catch (error: any) {
    logError(`Registration failed: ${error.response?.data?.error || error.message}`);
    recordResult('User Registration', false, error.message);
    return false;
  }
}

async function testUserLogin() {
  logTest(3, 'User Login');
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@treeverse.com', // Use existing user
      password: 'admin123',
    });

    if (response.data.success) {
      authToken = response.data.data.accessToken;
      logSuccess(`Login successful`);
      logSuccess(`Token: ${authToken.substring(0, 20)}...`);
      recordResult('User Login', true);
      return true;
    }
  } catch (error: any) {
    logError(`Login failed: ${error.response?.data?.error || error.message}`);
    logWarning('Make sure you have a user with email: admin@treeverse.com');
    recordResult('User Login', false, error.message);
    return false;
  }
}

async function testGetProfile() {
  logTest(4, 'Get User Profile');
  try {
    const response = await axios.get(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (response.data.success) {
      logSuccess(`Profile fetched: ${response.data.data.email}`);
      console.log('Profile data:', response.data.data);
      recordResult('Get Profile', true);
      return true;
    }
  } catch (error: any) {
    logError(`Get profile failed: ${error.response?.data?.error || error.message}`);
    recordResult('Get Profile', false, error.message);
    return false;
  }
}

async function testProtectedRouteWithoutAuth() {
  logTest(5, 'Protected Route Without Authentication');
  try {
    await axios.get(`${BASE_URL}/auth/me`);
    logError('Protected route allowed access without token (SECURITY ISSUE!)');
    recordResult('Protected Route Security', false, 'Unauthorized access allowed');
    return false;
  } catch (error: any) {
    if (error.response?.status === 401) {
      logSuccess('Protected route correctly rejected unauthorized request');
      recordResult('Protected Route Security', true);
      return true;
    }
    logError(`Unexpected error: ${error.message}`);
    recordResult('Protected Route Security', false, error.message);
    return false;
  }
}

async function testGetListings() {
  logTest(6, 'Get All Listings');
  try {
    const response = await axios.get(`${BASE_URL}/listings?page=1&limit=10`);

    if (response.data.success) {
      const listings = response.data.data.listings || response.data.data;
      logSuccess(`Fetched ${listings.length} listings`);
      if (listings.length > 0) {
        testListingId = listings[0].id;
        logSuccess(`Sample listing ID: ${testListingId}`);
        console.log('First listing:', {
          id: listings[0].id,
          title: listings[0].title,
          price: listings[0].price,
        });
      }
      recordResult('Get Listings', true);
      return true;
    }
  } catch (error: any) {
    logError(`Get listings failed: ${error.response?.data?.error || error.message}`);
    recordResult('Get Listings', false, error.message);
    return false;
  }
}

async function testGetListingById() {
  logTest(7, 'Get Listing By ID');
  if (!testListingId) {
    logWarning('Skipping - no listing ID available');
    recordResult('Get Listing By ID', false, 'No listing ID');
    return false;
  }

  try {
    const response = await axios.get(`${BASE_URL}/listings/${testListingId}`);

    if (response.data.success) {
      logSuccess(`Fetched listing: ${response.data.data.title}`);
      console.log('Listing details:', {
        title: response.data.data.title,
        price: response.data.data.price,
        seller: response.data.data.seller?.businessName,
      });
      recordResult('Get Listing By ID', true);
      return true;
    }
  } catch (error: any) {
    logError(`Get listing failed: ${error.response?.data?.error || error.message}`);
    recordResult('Get Listing By ID', false, error.message);
    return false;
  }
}

async function testCreateListing() {
  logTest(8, 'Create New Listing');
  if (!authToken) {
    logWarning('Skipping - no auth token available');
    recordResult('Create Listing', false, 'No auth token');
    return false;
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/listings`,
      {
        title: `Test Japanese Maple ${Date.now()}`,
        speciesName: 'Japanese Maple',
        scientificName: 'Acer palmatum',
        description:
          'A beautiful test tree for automated testing purposes. This tree is well-maintained.',
        price: 149.99,
        inventory: 10,
        height: 120,
        diameter: 3.5,
        age: 5,
        category: 'ORNAMENTAL',
      },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    if (response.data.success) {
      const newListing = response.data.data;
      testListingId = newListing.id;
      logSuccess(`Listing created: ${newListing.title}`);
      logSuccess(`Listing ID: ${testListingId}`);
      recordResult('Create Listing', true);
      return true;
    }
  } catch (error: any) {
    logError(`Create listing failed: ${error.response?.data?.error || error.message}`);
    if (error.response?.data?.details) {
      console.log('Validation errors:', error.response.data.details);
    }
    recordResult('Create Listing', false, error.message);
    return false;
  }
}

async function testGetAnalytics() {
  logTest(9, 'Get Seller Analytics');
  if (!authToken) {
    logWarning('Skipping - no auth token available');
    recordResult('Get Analytics', false, 'No auth token');
    return false;
  }

  try {
    const response = await axios.get(`${BASE_URL}/analytics?period=30d`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (response.data.success) {
      logSuccess('Analytics fetched successfully');
      console.log('Analytics summary:', {
        totalRevenue: response.data.data.totalRevenue,
        totalOrders: response.data.data.totalOrders,
        activeListings: response.data.data.activeListings,
      });
      recordResult('Get Analytics', true);
      return true;
    }
  } catch (error: any) {
    logError(`Get analytics failed: ${error.response?.data?.error || error.message}`);
    recordResult('Get Analytics', false, error.message);
    return false;
  }
}

async function testAdminVerifications() {
  logTest(10, 'Get Admin Verifications');
  if (!authToken) {
    logWarning('Skipping - no auth token available');
    recordResult('Admin Verifications', false, 'No auth token');
    return false;
  }

  try {
    const response = await axios.get(`${BASE_URL}/admin/verifications`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (response.data.success) {
      logSuccess(`Fetched ${response.data.data.length || 0} verifications`);
      recordResult('Admin Verifications', true);
      return true;
    }
  } catch (error: any) {
    if (error.response?.status === 403) {
      logWarning('Access forbidden - user is not admin (expected for non-admin users)');
      recordResult('Admin Verifications', true); // This is expected
      return true;
    }
    logError(`Get verifications failed: ${error.response?.data?.error || error.message}`);
    recordResult('Admin Verifications', false, error.message);
    return false;
  }
}

async function testPaymentIntent() {
  logTest(11, 'Create Payment Intent');
  if (!authToken) {
    logWarning('Skipping - no auth token available');
    recordResult('Payment Intent', false, 'No auth token');
    return false;
  }

  logWarning('Skipping - requires valid order ID (needs e2e test)');
  recordResult('Payment Intent', false, 'Skipped - needs order ID');
  return false;
}

// Print test summary
function printSummary() {
  log('\n' + '='.repeat(60), 'magenta');
  log('TEST SUMMARY', 'magenta');
  log('='.repeat(60), 'magenta');

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  const total = results.length;

  log(`\nTotal Tests: ${total}`, 'blue');
  log(`Passed: ${passed}`, 'green');
  log(`Failed: ${failed}`, 'red');
  log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%\n`, 'blue');

  if (failed > 0) {
    log('Failed Tests:', 'red');
    results
      .filter((r) => !r.passed)
      .forEach((r) => {
        log(`  ❌ ${r.name}: ${r.error}`, 'red');
      });
  }

  log('\n' + '='.repeat(60), 'magenta');
}

// Main test runner
async function runAllTests() {
  log('\n🌳 TreeVerse API Test Suite', 'magenta');
  log('Starting automated tests...\n', 'blue');

  // Phase 1: Infrastructure
  await testHealthCheck();

  // Phase 2: Authentication
  await testUserRegistration();
  // await testUserLogin(); // Comment out if registration works
  await testGetProfile();
  await testProtectedRouteWithoutAuth();

  // Phase 3: Listings
  await testGetListings();
  await testGetListingById();
  await testCreateListing();

  // Phase 4: Analytics & Admin
  await testGetAnalytics();
  await testAdminVerifications();

  // Phase 5: Payments
  await testPaymentIntent();

  // Print results
  printSummary();

  // Exit with appropriate code
  const allPassed = results.every((r) => r.passed);
  process.exit(allPassed ? 0 : 1);
}

// Run tests
runAllTests().catch((error) => {
  logError(`Fatal error: ${error.message}`);
  console.error(error);
  process.exit(1);
});
