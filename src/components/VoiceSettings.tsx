import React, { useState, useEffect, useRef } from 'react';
import { SettingsIcon } from './icons/Icons';

type Voice = 'Orus' | 'Zephyr';

interface VoiceSettingsProps {
  onVoiceChange: (voice: Voice) => void;
  currentVoice: Voice;
  disabled?: boolean;
}

const VoiceSettings: React.FC<VoiceSettingsProps> = ({ onVoiceChange, currentVoice, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleVoiceSelect = (voice: Voice) => {
    onVoiceChange(voice);
    setIsOpen(false);
  };

  // Close panel if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        disabled={disabled}
        className="w-16 h-16 flex items-center justify-center bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-full transition-colors"
        aria-label="Open voice settings"
      >
        <SettingsIcon />
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-3 w-48 bg-gray-800 border border-white/20 rounded-lg shadow-lg p-2 z-10">
          <p className="text-xs text-gray-400 px-2 pb-2">Assistant Voice</p>
          <button
            onClick={() => handleVoiceSelect('Zephyr')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
              currentVoice === 'Zephyr' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'
            }`}
          >
            Zephyr (Female)
          </button>
          <button
            onClick={() => handleVoiceSelect('Orus')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
              currentVoice === 'Orus' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'
            }`}
          >
            Orus (Male)
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceSettings;
