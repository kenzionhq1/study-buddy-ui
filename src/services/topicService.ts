import { apiFetch } from '@/services/api';

/* ---- Types ---- */

export interface GeneratedTopic {
  id?: string;
  _id?: string;
  topic: string;
  content: {
    definition: string;
    explanation: string;
    keyPoints: string[];
    example: { title: string; content: string };
    examTips: string[];
  };
  questions?: { question: string; options: string[]; answer: string }[];
  createdAt: string;
  userId?: string;
}

export function getTopicId(topic: Pick<GeneratedTopic, 'id' | '_id'>): string {
  return topic.id || topic._id || '';
}

function normalizeTopic(raw: any): GeneratedTopic | null {
  if (!raw || typeof raw !== 'object') return null;
  if (typeof raw.topic !== 'string') return null;

  const id = raw.id ?? raw._id;
  const content = raw.content && typeof raw.content === 'object' ? raw.content : {};
  const example = content.example && typeof content.example === 'object' ? content.example : {};
  const questions = Array.isArray(raw.questions)
    ? raw.questions
        .map((q: any) => {
          if (!q || typeof q !== 'object') return null;
          const options = Array.isArray(q.options)
            ? q.options.filter((opt: any) => typeof opt === 'string')
            : [];
          return {
            question: typeof q.question === 'string' ? q.question : '',
            options,
            answer: typeof q.answer === 'string' ? q.answer : '',
          };
        })
        .filter((q: any) => !!q && q.question)
    : [];

  return {
    id: typeof id === 'string' ? id : undefined,
    _id: typeof id === 'string' ? id : undefined,
    topic: raw.topic,
    content: {
      definition: typeof content.definition === 'string' ? content.definition : '',
      explanation: typeof content.explanation === 'string' ? content.explanation : '',
      keyPoints: Array.isArray(content.keyPoints)
        ? content.keyPoints.filter((pt: any) => typeof pt === 'string')
        : [],
      example: {
        title: typeof example.title === 'string' ? example.title : 'Example',
        content: typeof example.content === 'string' ? example.content : '',
      },
      examTips: Array.isArray(content.examTips)
        ? content.examTips.filter((tip: any) => typeof tip === 'string')
        : [],
    },
    questions,
    createdAt:
      typeof raw.createdAt === 'string' && raw.createdAt
        ? raw.createdAt
        : new Date().toISOString(),
    userId: typeof raw.userId === 'string' ? raw.userId : undefined,
  };
}

function extractTopic(payload: any): GeneratedTopic | null {
  const nestedTopic =
    (payload?.data?.topic && typeof payload.data.topic === 'object' ? payload.data.topic : null) ||
    (payload?.topic && typeof payload.topic === 'object' ? payload.topic : null);

  return (
    normalizeTopic(nestedTopic) ||
    normalizeTopic(payload?.data) ||
    normalizeTopic(payload)
  );
}

function extractTopics(payload: any): GeneratedTopic[] {
  const list =
    (Array.isArray(payload?.data?.topics) ? payload.data.topics : null) ||
    (Array.isArray(payload?.topics) ? payload.topics : null) ||
    (Array.isArray(payload?.data) ? payload.data : null) ||
    (Array.isArray(payload) ? payload : null) ||
    [];

  return list
    .map((item) => extractTopic(item))
    .filter((item): item is GeneratedTopic => !!item);
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

/* =====================================================
   API CALLS — CONNECTED TO BACKEND
   ===================================================== */


/* Generate topic (AI or existing) */
export async function generateTopic(topicName: string): Promise<GeneratedTopic> {
  const response = await apiFetch<any>('/topics/generate', {
    method: 'POST',
    body: JSON.stringify({ topic: topicName }),
  });
  const data = extractTopic(response);
  if (!data) throw new Error('Invalid topic response from server');

  // Cache locally
  const existing = getCachedTopics().filter(
    (t) => t.topic.toLowerCase() !== data.topic.toLowerCase()
  );

  saveCachedTopics([data, ...existing]);

  return data;
}


/* Fetch user library */
export async function fetchLibrary(): Promise<GeneratedTopic[]> {
  try {
    const response = await apiFetch<any>('/topics');
    const data = extractTopics(response);

    saveCachedTopics(data);

    return data;
  } catch {
    return getCachedTopics();
  }
}


/* Fetch single topic */
export async function fetchTopicById(id: string): Promise<GeneratedTopic | null> {
  try {
    const response = await apiFetch<any>(`/topics/${id}`);
    return extractTopic(response);
  } catch {
    return getCachedTopics().find((t) => getTopicId(t) === id) || null;
  }
}
