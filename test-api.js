// Quick API Test Script
// Run this to test if the chat API is working

async function testChatAPI() {
  console.log('🧪 Testing Chat API...\n');
  
  const testMessage = {
    patientId: 'general',
    message: 'Hello, I am feeling anxious'
  };
  
  try {
    console.log('📤 Sending request to http://localhost:3001/api/chat');
    console.log('Message:', testMessage.message);
    console.log('');
    
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testMessage),
    });
    
    console.log('📥 Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    console.log('\n✅ SUCCESS!');
    console.log('Response data:', JSON.stringify(data, null, 2));
    console.log('\n📨 Bot Response:');
    console.log('─'.repeat(60));
    console.log(data.response);
    console.log('─'.repeat(60));
    
  } catch (error) {
    console.error('\n❌ ERROR!');
    console.error('Error message:', error.message);
    console.error('\nPossible causes:');
    console.error('1. Server is not running (run: node server.js)');
    console.error('2. Server is running on a different port');
    console.error('3. Network/firewall issues');
    console.error('4. Google AI API error');
  }
}

// Run the test
testChatAPI();
