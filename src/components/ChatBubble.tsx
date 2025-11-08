import React from 'react';
import { Message } from '../types';

const ChatBubble: React.FC<{ message: Message }> = ({ message }) => (
  <div className={`p-2 m-1 rounded-lg ${message.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
    {message.text}
  </div>
);

export default ChatBubble;
