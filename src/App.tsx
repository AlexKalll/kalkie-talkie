import React, { useState, useEffect, useRef } from 'react';
import { Language } from './types';
import { UI_TEXTS } from './constants';
import { useGeminiLive } from './hooks/useGeminiLive';
import ChatBubble from './components/ChatBubble';
import LanguageSwitcher from './components/LanguageSwitcher';
import ControlButton from './components/ControlButton';
import VoiceSettings from './components/VoiceSettings';
import { MicrophoneIcon, StopIcon, TrashIcon, MicrophoneOffIcon } from './components/icons/Icons';

type Voice = 'Orus' | 'Zephyr';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [voice, setVoice] = useState<Voice>(() => {
    return (localStorage.getItem('gemini-voice') as Voice) || 'Zephyr';
  });

  const {
    messages,
    connectionState,
    isListening,
    isMuted,
    startSession,
    closeSession,
    clearMessages,
    errorMessage,
    toggleMute,
  } = useGeminiLive(language, voice);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('gemini-voice', voice);
  }, [voice]);
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleMicClick = () => {
    if (!isListening) {
      startSession();
    } else {
      toggleMute();
    }
  };

  const handleClearClick = () => {
    if (isListening) {
      closeSession();
    }
    clearMessages();
  };

  const getStatusText = () => {
    if (connectionState === 'connecting') return UI_TEXTS[language].statusConnecting;
    if (connectionState === 'error') return errorMessage ?? UI_TEXTS[language].statusError;
    if (isListening && !isMuted) return UI_TEXTS[language].statusListening;
    if (isListening && isMuted) return UI_TEXTS[language].statusMuted;
    return UI_TEXTS[language].statusIdle;
  };
  
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 min-h-screen text-white flex flex-col items-center justify-center p-4 animated-gradient">
      <div className="w-full max-w-2xl h-full max-h-[90vh] bg-black bg-opacity-40 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/10">
        <header className="p-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
          <h1 className="text-xl font-bold">{UI_TEXTS[language].header}</h1>
          <LanguageSwitcher language={language} setLanguage={setLanguage} disabled={isListening} />
        </header>

        <main className="flex-grow p-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h2 className="text-3xl font-bold tracking-tight">{UI_TEXTS[language].welcomeTitle}</h2>
              <p className="text-gray-300 mt-2 max-w-md">{UI_TEXTS[language].welcomeSubtitle}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <ChatBubble key={msg.id} sender={msg.sender} text={msg.text} />
              ))}
              <div ref={chatEndRef} />
            </div>
          )}
        </main>
        
        <footer className="p-4 border-t border-white/10 flex-shrink-0">
            <div className="flex items-center justify-center space-x-4">
                <VoiceSettings 
                  onVoiceChange={setVoice} 
                  currentVoice={voice} 
                  disabled={isListening} 
                />
                 <ControlButton
                    onClick={handleClearClick}
                    disabled={messages.length === 0 && !isListening}
                    className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500"
                    aria-label={UI_TEXTS[language].clearChat}
                >
                    <TrashIcon />
                </ControlButton>

                <ControlButton
                    onClick={handleMicClick}
                    className={`${isListening && !isMuted ? 'bg-red-600 hover:bg-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-500'} w-20 h-20 text-4xl`}
                    aria-label={isListening ? (isMuted ? UI_TEXTS[language].unmute : UI_TEXTS[language].mute) : UI_TEXTS[language].startListening}
                >
                    {isListening ? (isMuted ? <MicrophoneOffIcon /> : <StopIcon />) : <MicrophoneIcon />}
                </ControlButton>

                <div className="w-32 h-16 flex items-center justify-center">
                    <p className={`text-center text-xs min-h-[2.5rem] ${connectionState === 'error' ? 'text-red-400' : 'text-gray-400'}`}>{getStatusText()}</p>
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default App;