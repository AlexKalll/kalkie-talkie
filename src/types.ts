export const Language = {
  ENGLISH: 'en',
  AMHARIC: 'am',
} as const;

export type Language = typeof Language[keyof typeof Language];

export interface Message {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  // When true, this message is a finalized (stable) message.
  // Interim/live messages (partial transcriptions) will have isFinal = false or undefined.
  isFinal?: boolean;
}