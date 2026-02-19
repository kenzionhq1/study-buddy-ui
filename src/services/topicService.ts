import { apiFetch } from '@/services/api';

/* ---- Types ---- */

export interface GeneratedTopic {
  id: string;
  topic: string;
  content: {
    definition: string;
    explanation: string;
    keyPoints: string[];
    example: { title: string; content: string };
    examTips: string[];
  };
  questions: { question: string; options: string[]; answer: string }[];
  createdAt: string;
  userId: string;
}

/* ---- Local cache helpers ---- */

const CACHE_KEY = 'saved_topics';

function getCachedTopics(): GeneratedTopic[] {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveCachedTopics(topics: GeneratedTopic[]) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(topics));
}

export function findCachedTopic(topicName: string): GeneratedTopic | undefined {
  return getCachedTopics().find(
    (t) => t.topic.toLowerCase() === topicName.toLowerCase()
  );
}

/* ---- API calls ---- */

export async function generateTopic(topicName: string): Promise<GeneratedTopic> {
  const data = await apiFetch<GeneratedTopic>('/generate', {
    method: 'POST',
    body: JSON.stringify({ topic: topicName }),
  });

  // Cache locally
  const existing = getCachedTopics().filter(
    (t) => t.topic.toLowerCase() !== data.topic.toLowerCase()
  );
  saveCachedTopics([data, ...existing]);

  return data;
}

export async function fetchLibrary(): Promise<GeneratedTopic[]> {
  try {
    const data = await apiFetch<GeneratedTopic[]>('/library');
    // Sync cache
    saveCachedTopics(data);
    return data;
  } catch {
    // Fallback to cached
    return getCachedTopics();
  }
}

export async function fetchTopicById(id: string): Promise<GeneratedTopic | null> {
  try {
    return await apiFetch<GeneratedTopic>(`/library/${id}`);
  } catch {
    return getCachedTopics().find((t) => t.id === id) || null;
  }
}
