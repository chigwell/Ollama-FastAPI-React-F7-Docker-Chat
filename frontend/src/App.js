import React, { useState, useEffect, useRef } from 'react';
import {
  App,
  View,
  Page,
  Navbar,
  Link,
  Messages,
  Message,
  Messagebar,
  NavTitle,
  Preloader,
  f7ready,
  f7
} from 'framework7-react';
import axios from 'axios';

function MyApp() {
  const [messageText, setMessageText] = useState('');
  const [messagesData, setMessagesData] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const messagebarRef = useRef(null);
  const ws = useRef(null);
  const [preloaderBtn, setBtnPreloader] = useState(false);
  const buttonRef = useRef(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [lastMessageIndex, setLastMessageIndex] = useState(0);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && buttonRef.current) {
        event.preventDefault();
        buttonRef.current.click();
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, []);

  useEffect(() => {
    f7ready(() => {
      messagebarRef.current = f7.messagebar.create({ el: '.messagebar' });
      fetchInitialMessage();
    });
  }, []);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:80/ws');
    ws.current.onopen = () => console.log('WebSocket connected');
    ws.current.onerror = (error) => console.error('WebSocket error:', error);

    return () => ws.current && ws.current.close();
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      let updatedMessage = currentMessage + event.data;
      if (event.data === "**|||END|||**") {
        setCurrentMessage("");
        setBtnPreloader(false);
      } else {
        setCurrentMessage(updatedMessage);
        editMessage(lastMessageIndex - 1, updatedMessage);
      }
    };

    if (ws.current) ws.current.onmessage = handleMessage;
    return () => ws.current && (ws.current.onmessage = null);
  }, [lastMessageIndex, currentMessage, preloaderBtn]);

  const fetchInitialMessage = async () => {
    try {
      const response = await axios.get('http://0.0.0.0:80/messages');
      setMessagesData([{ text: response.data.message, type: 'received' }]);
      setLastMessageIndex(lastMessageIndex + 1);
    } catch (error) {
      console.error('Failed to fetch initial message:', error);
    }
  };

  const sendMessage = () => {
    if (messageText.trim() && !preloaderBtn) {
      setBtnPreloader(true);
      const messageData = { text: messageText.trim(), type: 'sent' };
      const newMessages = [
        ...attachments.map(attachment => ({ image: attachment, type: 'sent' })),
        messageData,
        { text: '', type: 'received' }
      ];
      setMessagesData([...messagesData, ...newMessages]);
      setLastMessageIndex(lastMessageIndex + newMessages.length);
      ws.current.send(messageText);
      setMessageText('');
      setAttachments([]);
    }
  };

  const editMessage = (index, newText, newImage) => {
    setMessagesData(messagesData.map((msg, idx) => idx === index ? { ...msg, text: newText || msg.text, image: newImage || msg.image } : msg));
  };

  return (
    <App>
      <View main className="safe-areas" url="/">
        <Page>
          <Navbar>
            <NavTitle>My Chat</NavTitle>
          </Navbar>
          <Messagebar
            placeholder="Type a message"
            value={messageText}
            onInput={(e) => setMessageText(e.target.value)}
            attachments={attachments}
          >
            {!preloaderBtn &&
              <>
                <button
                  style={{ display: 'none' }}
                  onClick={sendMessage}
                  ref={buttonRef}
                >
                  Send
                </button>
                <Link slot="inner-end" onClick={sendMessage}>
                  <i className="f7-icons" style={{ color: 'rgb(0, 91, 193)' }}>arrow_up_circle_fill</i>
                </Link>
              </>
            }
            {preloaderBtn && <Link><Preloader /></Link>}
          </Messagebar>
          <Messages>
            {messagesData.map((message, index) => (
              <Message key={index} type={message.type} text={message.text} image={message.image} />
            ))}
          </Messages>
        </Page>
      </View>
    </App>
  );
}

export default MyApp;
