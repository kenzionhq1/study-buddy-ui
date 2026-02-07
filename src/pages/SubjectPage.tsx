import { useState, useCallback, useEffect } from 'react';
import { useParams, useSearchParams, Navigate } from 'react-router-dom';
import { 
  Leaf, 
  FlaskConical, 
  Calculator, 
  Atom, 
  BookOpen, 
  Pi,
  type LucideIcon 
} from 'lucide-react';
import { subjects, searchTopics, TopicContent, TopicSearchResult } from '@/data/subjects';
import { USE_AI, enhanceTopicWithAI } from '@/services/aiService';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import TopicResult from '@/components/TopicResult';
import EmptyState from '@/components/EmptyState';
import LoadingSpinner from '@/components/LoadingSpinner';
import SuggestedTopics from '@/components/SuggestedTopics';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Leaf,
  FlaskConical,
  Calculator,
  Atom,
  BookOpen,
  Pi,
};

type LookupState = 'initial' | 'loading' | 'results' | 'no-results';

const SubjectPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [lookupState, setLookupState] = useState<LookupState>('initial');
  const [lookupQuery, setLookupQuery] = useState('');
  const [topicResult, setTopicResult] = useState<TopicContent | null>(null);
  const [relatedTopics, setRelatedTopics] = useState<TopicContent[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const subject = subjects.find(s => s.id === subjectId);

  const handleLookup = useCallback(async (query: string) => {
    setLookupQuery(query);
    setLookupState('loading');
    setRelatedTopics([]);
    
    // Simulate intelligent lookup delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const searchResult: TopicSearchResult = searchTopics(query, subjectId);
    
    if (searchResult.topic) {
      // Show mock data immediately
      setTopicResult(searchResult.topic);
      setLookupState('results');
      
      // If AI mode is enabled, enhance the content
      if (USE_AI) {
        setIsAiLoading(true);
        try {
          const { topic: enhancedTopic } = await enhanceTopicWithAI(searchResult.topic, true);
          setTopicResult(enhancedTopic);
        } catch (error) {
          console.warn('AI enhancement failed:', error);
        } finally {
          setIsAiLoading(false);
        }
      }
    } else {
      setTopicResult(null);
      setRelatedTopics(searchResult.relatedTopics);
      setLookupState('no-results');
    }
  }, [subjectId]);

  // Auto-lookup when topic query param is present (from bookmarks)
  useEffect(() => {
    const topicParam = searchParams.get('topic');
    if (topicParam && lookupState === 'initial') {
      handleLookup(topicParam);
      // Clear the query param after looking up
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, lookupState, handleLookup, setSearchParams]);

  const handleSuggestedTopicClick = (topic: string) => {
    handleLookup(topic);
  };

  if (!subject) {
    return <Navigate to="/" replace />;
  }

  const Icon = iconMap[subject.icon] || BookOpen;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Subject Header */}
        <section className={cn(
          "border-b py-6 sm:py-10",
          `bg-${subject.colorClass}`
        )}>
          <div className="container">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl sm:h-16 sm:w-16 sm:rounded-2xl lg:h-20 lg:w-20",
                `bg-${subject.colorClass}`
              )}>
                <Icon className={cn("h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10", `text-${subject.colorClass}`)} />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
                  {subject.name}
                </h1>
                <p className="mt-0.5 text-sm text-muted-foreground sm:mt-1 sm:text-base">
                  {subject.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Topic Lookup Section */}
        <section className="py-6 sm:py-10">
          <div className="container">
            <div className="mx-auto max-w-2xl">
              <SearchBar 
                onSearch={handleLookup}
                isLoading={lookupState === 'loading'}
                placeholder={`Search any ${subject.name} topic...`}
                colorClass={subject.colorClass}
              />
              
              {lookupState === 'initial' && (
                <SuggestedTopics 
                  topics={subject.topics.slice(0, 5)}
                  onTopicClick={handleSuggestedTopicClick}
                  colorClass={subject.colorClass}
                />
              )}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="pb-12 sm:pb-16 lg:pb-20">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              {lookupState === 'initial' && (
                <EmptyState type="initial" colorClass={subject.colorClass} />
              )}
              
              {lookupState === 'loading' && (
                <LoadingSpinner 
                  colorClass={subject.colorClass}
                  message="Finding your topic..."
                  submessage="Preparing a detailed explanation with exam tips"
                />
              )}
              
              {lookupState === 'no-results' && (
                <EmptyState 
                  type="no-results" 
                  query={lookupQuery} 
                  colorClass={subject.colorClass}
                  relatedTopics={relatedTopics}
                  onTopicClick={handleSuggestedTopicClick}
                />
              )}
              
              {lookupState === 'results' && topicResult && (
                <TopicResult 
                  topic={topicResult} 
                  colorClass={subject.colorClass}
                  isAiLoading={isAiLoading}
                />
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SubjectPage;
