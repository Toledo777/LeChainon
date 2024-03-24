import React, { useState, useEffect, useRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

export default function ResourceView() {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const chatboxRef = useRef(null);

  // Function to generate fake messages sent by a sender
  const generateFakeMessages = () => {
    const numMessages = 1;
    const fakeMessages = [];

    // Generate each fake message
    for (let i = 0; i < numMessages; i++) {
      // Pretend to have a sender named "Fake Sender"
      const fakeMessage = {
        text: `Fake message ${i + 1}`,
        sender: 'Fake Sender',
      };
      fakeMessages.push(fakeMessage);
    }

    // Set the fake messages in the state
    setMessages((prevMessages) => [...prevMessages, ...fakeMessages]);
  };

  // Simulate sending fake messages at intervals
  useEffect(() => {
    const intervalId = setInterval(generateFakeMessages, 10000); // Send fake messages every 10 seconds
    return () => clearInterval(intervalId);
  }, []);

  const handleMessageSend = () => {
    const message = inputRef.current.value;
    if (message) {
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);
      inputRef.current.value = '';
    }
  };

  // Scroll the chatbox to the bottom whenever new messages are added
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', height: '70vh', width: '100%' }}>
      <div
        ref={chatboxRef}
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '10px',
          maxWidth: '100%',
          width: '100%',
          overflowY: messages.length > 5 ? 'scroll' : 'hidden', // Apply scrollbar when there are more than 5 messages
        }}
      >
        <div style={{ flex: '1' }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                textAlign: message.sender === 'user' ? 'right' : 'left',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  backgroundColor: message.sender === 'user' ? '#007bff' : '#ccffcc', // Light green for fake messages
                  color: message.sender === 'user' ? '#fff' : '#000',
                  padding: '10px',
                  borderRadius: '5px',
                  display: 'inline-block',
                  maxWidth: '70%',
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Input text field and button */}
      <div style={{ paddingTop: '10px' }}>
        <input
          ref={inputRef}
          type="text"
          style={{
            flex: '1',
            marginRight: '10px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '90%',
          }}
          placeholder="Type your message"
        />
        <Button
          variant="contained"
          style={{ backgroundColor: '#007bff', color: '#fff', width: '9%' }}
          type="button"
          onClick={handleMessageSend}
        >
          Send
        </Button>
      </div>
    </Container>
  );
}
