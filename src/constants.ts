import { Language } from './types';

type UITexts = {
  [key in Language]: {
    header: string;
    welcomeTitle: string;
    welcomeSubtitle: string;
    startListening: string;
    stopListening: string;
    clearChat: string;
    statusIdle: string;
    statusConnecting: string;
    statusListening: string;
    statusMuted: string;
    statusError: string;
    mute: string;
    unmute: string;
  };
};

export const UI_TEXTS: UITexts = {
  [Language.ENGLISH]: {
    header: 'Gemini Live Talk',
    welcomeTitle: 'Talk with Gemini Live',
    welcomeSubtitle: 'Your AI companion in English and Amharic. Tap the microphone to begin.',
    startListening: 'Start Listening',
    stopListening: 'Stop Listening',
    clearChat: 'Clear Chat',
    statusIdle: 'Tap to talk',
    statusConnecting: 'Connecting...',
    statusListening: 'Listening...',
    statusMuted: 'Muted',
    statusError: 'Connection error',
    mute: 'Mute',
    unmute: 'Unmute',
  },
  [Language.AMHARIC]: {
    header: 'ከ Gemini Live ጋር ይነጋገሩ',
    welcomeTitle: 'ከ Gemini Live ጋር ይነጋገሩ',
    welcomeSubtitle: 'የእርስዎ AI ጓደኛ በእንግሊዝኛ እና በአማርኛ። ለመጀመር ማይክሮፎኑን ይንኩ።',
    startListening: 'ማዳመጥ ጀምር',
    stopListening: 'ማዳመጥ አቁም',
    clearChat: 'ውይይትን አጽዳ',
    statusIdle: 'ለመነጋገር ይንኩ',
    statusConnecting: 'በመገናኘት ላይ...',
    statusListening: 'በማዳመጥ ላይ...',
    statusMuted: 'ድምጸ-ከል ተደርጓል',
    statusError: 'የግንኙነት ስህተት',
    mute: 'ድምጸ-ከል አድርግ',
    unmute: 'ድምጸ-ከል አንሳ',
  },
};