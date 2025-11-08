export enum Language {
  ENGLISH = 'en',
  AMHARIC = 'am',
}

export interface Message {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
}