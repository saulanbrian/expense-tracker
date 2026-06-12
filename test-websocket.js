
const WebSocket = require('ws');

const socketUrl = "ws://127.0.0.1:8000";
const jobId = "test-job-id-" + Math.random().toString(36).substring(7);
const fullUrl = `${socketUrl}/ingestion/ws/${jobId}`;

console.log(`Attempting to connect to: ${fullUrl}`);

const ws = new WebSocket(fullUrl);

ws.on('open', function open() {
  console.log('Successfully connected to WebSocket server!');
  ws.send('Hello from test script');
  setTimeout(() => {
    console.log('Closing connection after success test.');
    ws.close();
    process.exit(0);
  }, 2000);
});

ws.on('message', function message(data) {
  console.log('Received message from server:', data.toString());
});

ws.on('error', function error(err) {
  console.error('WebSocket Error:', err.message);
  process.exit(1);
});

ws.on('close', function close() {
  console.log('Connection closed');
});

// Timeout after 5 seconds if no connection
setTimeout(() => {
  console.error('Connection timed out after 5 seconds');
  process.exit(1);
}, 5000);
