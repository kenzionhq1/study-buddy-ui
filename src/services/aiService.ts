import { TopicContent } from '@/data/subjects';

// Feature flag for AI mode
export const USE_AI = false;

// AI Response interface (matches TopicContent structure)
export interface AITopicResponse {
  definition: string;
  explanation: string;
  key_points: string[];
  real_world_example: {
    title: string;
    content: string;
  };
  exam_tips: string[];
}

// Cache key generator
const getCacheKey = (topic: string, subject: string) => 
  `ai_topic_${subject.toLowerCase()}_${topic.toLowerCase().replace(/\s+/g, '_')}`;

// Check if we have a cached AI response
export function getCachedAIResponse(topic: string, subject: string): TopicContent | null {
  if (typeof window === 'undefined') return null;
  
  const cacheKey = getCacheKey(topic, subject);
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      // Check if cache is still valid (24 hours)
      if (parsed.timestamp && Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
        return parsed.data;
      }
      // Clear expired cache
      localStorage.removeItem(cacheKey);
    } catch {
      localStorage.removeItem(cacheKey);
    }
  }
  
  return null;
}

// Cache AI response
export function cacheAIResponse(topic: string, subject: string, data: TopicContent): void {
  if (typeof window === 'undefined') return;
  
  const cacheKey = getCacheKey(topic, subject);
  localStorage.setItem(cacheKey, JSON.stringify({
    timestamp: Date.now(),
    data
  }));
}

// Example AI system prompt (for future API integration)
export const AI_SYSTEM_PROMPT = `You are an educational assistant for Nigerian secondary school students (SS1-SS3).
Your task is to explain topics in a way that:
1. Aligns with WAEC/NECO syllabus
2. Uses simple, clear language
3. Provides exam-focused content
4. Includes practical examples relevant to Nigerian students

Always respond in this JSON format:
{
  "definition": "Clear, concise definition (1-2 sentences)",
  "explanation": "Detailed explanation with paragraphs separated by \\n\\n",
  "key_points": ["Point 1", "Point 2", ...],
  "real_world_example": {
    "title": "Example Title",
    "content": "Practical example content"
  },
  "exam_tips": ["Tip 1", "Tip 2", ...]
}`;

// Mock AI response generator (simulates what an AI would return)
export function generateMockAIResponse(topic: string, subject: string): TopicContent {
  // This simulates an AI-enhanced response
  return {
    title: topic,
    subject: subject,
    isAiEnhanced: true,
    definition: `[AI-Enhanced] ${topic} is a fundamental concept in ${subject} that forms the basis for understanding more complex topics in this field.`,
    explanation: `This AI-generated explanation for ${topic} would provide a comprehensive overview tailored for Nigerian SS1-SS3 students.

The content would be structured to align with WAEC/NECO syllabus requirements, using simple language and relatable examples.

Key concepts would be broken down step by step, with clear explanations of how they connect to real-world applications.`,
    keyPoints: [
      `[AI] Core principle of ${topic}`,
      `[AI] Key formula or rule to remember`,
      `[AI] Common applications in real life`,
      `[AI] How this connects to other topics`,
      `[AI] Important variations to know`
    ],
    example: {
      title: 'AI-Generated Example',
      content: `This would be a practical example of ${topic} that Nigerian students can relate to, using familiar scenarios and contexts.`
    },
    examTips: [
      `[AI] Frequently asked question types in WAEC`,
      `[AI] Common mistakes to avoid`,
      `[AI] Key formulas to memorize`,
      `[AI] How to structure your answers`
    ]
  };
}

// Simulate AI API call (for future integration)
export async function fetchAIExplanation(topic: string, subject: string): Promise<TopicContent | null> {
  if (!USE_AI) return null;
  
  // Check cache first
  const cached = getCachedAIResponse(topic, subject);
  if (cached) return cached;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In a real implementation, this would call an AI API
  // For now, return mock data
  const response = generateMockAIResponse(topic, subject);
  
  // Cache the response
  cacheAIResponse(topic, subject, response);
  
  return response;
}

// Enhance mock data with AI (if enabled)
export async function enhanceTopicWithAI(
  mockTopic: TopicContent, 
  enableAI: boolean = USE_AI
): Promise<{ topic: TopicContent; isEnhanced: boolean }> {
  if (!enableAI) {
    return { topic: mockTopic, isEnhanced: false };
  }
  
  try {
    const aiResponse = await fetchAIExplanation(mockTopic.title, mockTopic.subject);
    if (aiResponse) {
      return { 
        topic: { ...aiResponse, isAiEnhanced: true }, 
        isEnhanced: true 
      };
    }
  } catch (error) {
    console.warn('AI enhancement failed, using mock data:', error);
  }
  
  return { topic: mockTopic, isEnhanced: false };
}
