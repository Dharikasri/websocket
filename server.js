const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8000 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    
    ws.send(message);
  });

  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});
