export const Language = {
  ENGLISH: 'en',
  AMHARIC: 'am',
} as const;

export type Language = typeof Language[keyof typeof Language];

export interface Message {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
}