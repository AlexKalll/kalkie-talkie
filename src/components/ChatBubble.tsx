import React from 'react';

interface ChatBubbleProps {
  sender: 'user' | 'gemini';
  text: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ sender, text }) => {
  const isUser = sender === 'user';

  return (
    <div
      className={`flex items-end gap-2 animate-fade-in-up ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`px-4 py-3 rounded-2xl max-w-sm md:max-w-md shadow-md ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-700 text-white rounded-bl-none'
        }`}
      >
        <p style={{ whiteSpace: 'pre-wrap' }}>{text}</p>
      </div>
    </div>
  );
};

// Add keyframes for animation in a style tag since Tailwind doesn't support them directly in JIT
const AnimationStyles = () => (
    <style>{`
        @keyframes fade-in-up {
            0% {
                opacity: 0;
                transform: translateY(10px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.5s ease-out forwards;
        }
    `}</style>
)

// Wrapper to include styles once
const ChatBubbleWithAnimation = (props: ChatBubbleProps) => (
    <>
        <AnimationStyles />
        <ChatBubble {...props} />
    </>
)


export default ChatBubbleWithAnimation;