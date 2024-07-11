import React, { useState, useEffect } from 'react';


const WebSocketComponent = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {

    const ws = new WebSocket('ws://localhost:8000/ws'); 


    ws.onopen = () => {
      console.log('WebSocket connected');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      setMessage(event.data);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    setSocket(ws);

    
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && inputMessage.trim() !== '') {
      socket.send(inputMessage); 
      setInputMessage(''); 
    }
  };

  return (
    <div>
      <h1>WebSocket Example</h1>
      <div>
        <input
          type="text"
          value={inputMessage} id='msg'
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <p>Message from server: {message}</p>
    </div>
  );
};

export default WebSocketComponent;
