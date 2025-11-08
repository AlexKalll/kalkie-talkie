import React from 'react';

interface ChatBubbleProps {
  id?: string;
  sender: 'user' | 'gemini';
  text: string;
  isFinal?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ id, sender, text, isFinal }) => {
  const isUser = sender === 'user';

  // Only animate final messages (not interim/live updates) to avoid visual jank.
  const isLive = !isFinal && Boolean(id?.includes('live'));

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`px-4 py-3 rounded-2xl shadow-md ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-700 text-white rounded-bl-none'
        } ${!isLive ? 'animate-fade-in' : ''}`}
        // Allow assistant messages to stretch wider horizontally up to 80ch, but never overflow the container
        style={isUser ? { whiteSpace: 'pre-wrap', maxWidth: 'min(60ch, 100%)' } : { whiteSpace: 'pre-wrap', maxWidth: 'min(80ch, 100%)' }}
      >
        <p>{text}</p>
      </div>
    </div>
  );
};

// Add keyframes for animation in a style tag since Tailwind doesn't support them directly in JIT
const AnimationStyles = () => (
  <style>{`
    @keyframes fade-in {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    .animate-fade-in { animation: fade-in 180ms ease-out forwards; }
  `}</style>
);

// Wrapper to include styles once
const ChatBubbleWithAnimation = (props: ChatBubbleProps) => (
  <>
    <AnimationStyles />
    <ChatBubble {...props} />
  </>
);


export default ChatBubbleWithAnimation;