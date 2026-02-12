import { TopicContent } from '@/data/subjects';

/* -----------------------------
   Deep Mode Toggle (Smart AI)
------------------------------ */

// Check if Deep Mode is enabled
export const getAIMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('deep_mode') === 'true';
};

// Enable / Disable Deep Mode
export const setAIMode = (value: boolean): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('deep_mode', value ? 'true' : 'false');
};


/* -----------------------------
   AI Fetch Logic
------------------------------ */

export async function fetchAIExplanation(
  topic: string,
  subject: string
): Promise<TopicContent> {

  // This calls your backend
  const response = await fetch('/api/ask-ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subject,
      topic,
    }),
  });

  if (!response.ok) {
    throw new Error('AI request failed');
  }

  const data = await response.json();

  return data;
}
