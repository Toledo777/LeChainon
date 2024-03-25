import React, { useState, useEffect, useRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

export default function ResourceView() {
  const [messages, setMessages] = useState([]);
  const [senderName, setSenderName] = useState('');
  const inputRef = useRef(null);
  const chatboxRef = useRef(null);

  const fetchData = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: 'YM5Qa9IGAAO7dyD0JJgTrTVyk0U2' }),
      };
      const response = await fetch('http://localhost:8000/chat/get', requestOptions);
      const result = await response.json();
      console.log(result);

      // Extract the sender's name from the result
      if (result && result.chats && result.chats.length > 0) {
        setSenderName(result.chats[0].from); // Assuming sender's name is stored in the 'from' field of the first chat message
        setMessages(
          result.chats.map((chat) => ({
            text: chat.text,
            sender: chat.from === 'YM5Qa9IGAAO7dyD0JJgTrTVyk0U2' ? 'user' : 'other',
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch initial data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleMessageSend = async () => {
    const message = inputRef.current.value;
    if (message) {
      const newMessage = { text: message, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      inputRef.current.value = '';

      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            uid1: 'YM5Qa9IGAAO7dyD0JJgTrTVyk0U2',
            uid2: 'ls3YYsM7BxctoAXDJzMAMgG4lAg1',
            text: message,
          }),
        };
        await fetch('http://localhost:8000/chat/create', requestOptions);
      } catch (error) {
        console.error('Error sending message:', error);
      }
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
      {/* Display sender's name */}
      <Typography variant="h6" gutterBottom>
        Jane Doe's Chat
      </Typography>
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
      <div style={{ display: 'flex', alignItems: 'center', paddingTop: '10px' }}>
        <input
          ref={inputRef}
          type="text"
          style={{
            flex: '1',
            marginRight: '10px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
          placeholder="Type your message"
        />
        <Button
          variant="contained"
          style={{ backgroundColor: '#007bff', color: '#fff', minWidth: 0 }}
          type="button"
          onClick={handleMessageSend}
        >
          Send
        </Button>
      </div>
    </Container>
  );
}
