const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3000/api/livestream';
const AUTH_TOKEN = 'your-auth-token-here'; // Replace with actual token

// Test data
const testStream = {
  title: 'Test Live Stream'
};

// Headers for authenticated requests
const headers = {
  'Authorization': `Bearer ${AUTH_TOKEN}`,
  'Content-Type': 'application/json'
};

// Test functions
async function testCreateStream() {
  try {
    console.log('Testing create stream...');
    const response = await axios.post(`${BASE_URL}/streams`, testStream, { headers });
    console.log('✅ Create stream successful:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('❌ Create stream failed:', error.response?.data || error.message);
    return null;
  }
}

async function testGetAllStreams() {
  try {
    console.log('\nTesting get all streams...');
    const response = await axios.get(`${BASE_URL}/streams`, { headers });
    console.log('✅ Get all streams successful:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('❌ Get all streams failed:', error.response?.data || error.message);
    return null;
  }
}

async function testGetStreamById(streamId) {
  try {
    console.log(`\nTesting get stream by ID: ${streamId}...`);
    const response = await axios.get(`${BASE_URL}/streams/${streamId}`, { headers });
    console.log('✅ Get stream by ID successful:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('❌ Get stream by ID failed:', error.response?.data || error.message);
    return null;
  }
}

async function testUpdateStreamStatus(streamId, status) {
  try {
    console.log(`\nTesting update stream status to: ${status}...`);
    const response = await axios.patch(`${BASE_URL}/streams/${streamId}/status`, { status }, { headers });
    console.log('✅ Update stream status successful:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('❌ Update stream status failed:', error.response?.data || error.message);
    return null;
  }
}

async function testStartStream(streamId) {
  try {
    console.log(`\nTesting start stream: ${streamId}...`);
    const response = await axios.post(`${BASE_URL}/streams/${streamId}/start`, {}, { headers });
    console.log('✅ Start stream successful:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('❌ Start stream failed:', error.response?.data || error.message);
    return null;
  }
}

async function testEndStream(streamId) {
  try {
    console.log(`\nTesting end stream: ${streamId}...`);
    const response = await axios.post(`${BASE_URL}/streams/${streamId}/end`, {}, { headers });
    console.log('✅ End stream successful:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('❌ End stream failed:', error.response?.data || error.message);
    return null;
  }
}

async function testJoinStream(streamRefNo) {
  try {
    console.log(`\nTesting join stream: ${streamRefNo}...`);
    const response = await axios.post(`${BASE_URL}/streams/join`, { streamRefNo }, { headers });
    console.log('✅ Join stream successful:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('❌ Join stream failed:', error.response?.data || error.message);
    return null;
  }
}

async function testGetStreamParticipants(streamId) {
  try {
    console.log(`\nTesting get stream participants: ${streamId}...`);
    const response = await axios.get(`${BASE_URL}/streams/${streamId}/participants`, { headers });
    console.log('✅ Get stream participants successful:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('❌ Get stream participants failed:', error.response?.data || error.message);
    return null;
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting Livestream API Tests...\n');
  
  // Test 1: Create stream
  const createdStream = await testCreateStream();
  if (!createdStream) {
    console.log('❌ Cannot continue tests without creating a stream');
    return;
  }
  
  const streamId = createdStream.id;
  const streamRefNo = createdStream.ref_no;
  
  // Test 2: Get all streams
  await testGetAllStreams();
  
  // Test 3: Get stream by ID
  await testGetStreamById(streamId);
  
  // Test 4: Update stream status
  await testUpdateStreamStatus(streamId, 'live');
  
  // Test 5: Start stream
  await testStartStream(streamId);
  
  // Test 6: Join stream
  await testJoinStream(streamRefNo);
  
  // Test 7: Get stream participants
  await testGetStreamParticipants(streamId);
  
  // Test 8: End stream
  await testEndStream(streamId);
  
  console.log('\n🎉 All tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testCreateStream,
  testGetAllStreams,
  testGetStreamById,
  testUpdateStreamStatus,
  testStartStream,
  testEndStream,
  testJoinStream,
  testGetStreamParticipants,
  runTests
};
