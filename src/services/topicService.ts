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

type NormalizedQuestion = { question: string; options: string[]; answer: string };

type DynamicSection = {
  type?: string;
  heading?: string;
  content?: string;
  items?: unknown[];
  steps?: unknown[];
  questions?: unknown[];
};

export function getTopicId(topic: Pick<GeneratedTopic, 'id' | '_id'>): string {
  return topic.id || topic._id || '';
}

function parseJsonIfString(value: unknown): unknown {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === 'string' ? item : ''))
    .filter(Boolean);
}

function expandLines(values: string[]): string[] {
  return values
    .flatMap((entry) =>
      entry
        .split(/\r?\n/)
        .map((line) => line.replace(/^\s*[-*]\s*/, '').trim())
        .filter(Boolean)
    )
    .filter(Boolean);
}

function normalizeQuestion(raw: unknown): NormalizedQuestion | null {
  if (!raw || typeof raw !== 'object') return null;
  const q = raw as { question?: unknown; options?: unknown; answer?: unknown };
  const question = typeof q.question === 'string' ? q.question : '';
  if (!question) return null;

  const options = asStringArray(q.options);
  const answer = typeof q.answer === 'string' ? q.answer : '';

  return { question, options, answer };
}

function extractFromSections(sections: DynamicSection[]) {
  let definition = '';
  let explanation = '';
  let keyPoints: string[] = [];
  let examTips: string[] = [];
  let example = { title: 'Example', content: '' };
  const questions: NormalizedQuestion[] = [];

  for (const section of sections) {
    const type = typeof section.type === 'string' ? section.type.toLowerCase().trim() : 'text';
    const heading = typeof section.heading === 'string' ? section.heading : '';
    const content = typeof section.content === 'string' ? section.content.trim() : '';

    if (type === 'qa') {
      const qs = Array.isArray(section.questions) ? section.questions : [];
      for (const item of qs) {
        const q = normalizeQuestion(item);
        if (q) questions.push(q);
      }
      continue;
    }

    if (type === 'list') {
      const items = expandLines(asStringArray(section.items));
      const fallbackItems = content ? expandLines([content]) : [];
      const merged = items.length ? items : fallbackItems;
      if (!merged.length) continue;

      if (/tip|exam/i.test(heading)) examTips = [...examTips, ...merged];
      else keyPoints = [...keyPoints, ...merged];
      continue;
    }

    if (type === 'steps') {
      const steps = expandLines(asStringArray(section.steps));
      const fallbackSteps = content ? expandLines([content]) : [];
      const merged = steps.length ? steps : fallbackSteps;
      if (!merged.length) continue;

      if (/tip|exam/i.test(heading)) examTips = [...examTips, ...merged];
      else if (keyPoints.length === 0) keyPoints = [...merged];
      else examTips = [...examTips, ...merged];
      continue;
    }

    if (!content) continue;

    if (/definition/i.test(heading) && !definition) {
      definition = content;
      continue;
    }

    if (/explanation|introduction|overview|summary/i.test(heading) && !explanation) {
      explanation = content;
      continue;
    }

    if (/example/i.test(heading) && !example.content) {
      example = { title: heading || 'Example', content };
      continue;
    }

    if (!definition) definition = content;
    else if (!explanation) explanation = content;
    else if (!example.content) example = { title: heading || 'Example', content };
  }

  if (!definition && explanation) definition = explanation;
  if (!explanation && definition) explanation = definition;

  return {
    definition,
    explanation,
    keyPoints,
    examTips,
    example,
    questions,
  };
}

function normalizeTopic(raw: any): GeneratedTopic | null {
  const parsed = parseJsonIfString(raw);
  if (!parsed || typeof parsed !== 'object') return null;

  const source = parsed as {
    id?: unknown;
    _id?: unknown;
    topic?: unknown;
    title?: unknown;
    content?: unknown;
    sections?: unknown;
    questions?: unknown;
    createdAt?: unknown;
    userId?: unknown;
  };

  const idCandidate = source.id ?? source._id;
  const id = typeof idCandidate === 'string' ? idCandidate : undefined;

  const contentRaw = parseJsonIfString(source.content);
  const contentObj = contentRaw && typeof contentRaw === 'object' ? (contentRaw as Record<string, unknown>) : {};

  const topicTitle =
    (typeof source.topic === 'string' && source.topic) ||
    (typeof source.title === 'string' && source.title) ||
    (typeof contentObj.title === 'string' ? contentObj.title : '');

  if (!topicTitle) return null;

  const sectionSource = parseJsonIfString(contentObj.sections ?? source.sections);
  const sections = Array.isArray(sectionSource)
    ? sectionSource.filter((item): item is DynamicSection => !!item && typeof item === 'object')
    : [];
  const fromSections = extractFromSections(sections);

  const legacyDefinition =
    typeof contentObj.definition === 'string' ? contentObj.definition : '';
  const legacyExplanation =
    typeof contentObj.explanation === 'string' ? contentObj.explanation : '';
  const legacyKeyPoints = expandLines(asStringArray(contentObj.keyPoints));
  const legacyExamTips = expandLines(asStringArray(contentObj.examTips));
  const legacyExampleRaw =
    contentObj.example && typeof contentObj.example === 'object'
      ? (contentObj.example as Record<string, unknown>)
      : {};
  const legacyExample = {
    title:
      typeof legacyExampleRaw.title === 'string' ? legacyExampleRaw.title : 'Example',
    content:
      typeof legacyExampleRaw.content === 'string' ? legacyExampleRaw.content : '',
  };

  const questionSource = Array.isArray(source.questions) ? source.questions : [];
  const normalizedQuestions = questionSource
    .map((item) => normalizeQuestion(item))
    .filter((item): item is NormalizedQuestion => !!item);
  const questions = normalizedQuestions.length
    ? normalizedQuestions
    : fromSections.questions;

  const createdAt =
    typeof source.createdAt === 'string' && source.createdAt
      ? source.createdAt
      : new Date().toISOString();

  const topicSlug = topicTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'topic';
  const finalId = id || `local-${topicSlug}-${new Date(createdAt).getTime()}`;

  return {
    id: finalId,
    _id: finalId,
    topic: topicTitle,
    content: {
      definition: legacyDefinition || fromSections.definition,
      explanation: legacyExplanation || fromSections.explanation,
      keyPoints: legacyKeyPoints.length ? legacyKeyPoints : fromSections.keyPoints,
      example: legacyExample.content ? legacyExample : fromSections.example,
      examTips: legacyExamTips.length ? legacyExamTips : fromSections.examTips,
    },
    questions,
    createdAt,
    userId: typeof source.userId === 'string' ? source.userId : undefined,
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
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
    if (!Array.isArray(cached)) return [];
    return cached
      .map((item) => normalizeTopic(item))
      .filter((item): item is GeneratedTopic => !!item);
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
