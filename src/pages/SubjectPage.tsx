import { useState, useCallback, useEffect } from 'react';
import { useParams, useSearchParams, Navigate } from 'react-router-dom';
import {
  Leaf,
  FlaskConical,
  Calculator,
  Atom,
  BookOpen,
  Pi,
  type LucideIcon,
} from 'lucide-react';
import { subjects, searchTopics, TopicContent, TopicSearchResult } from '@/data/subjects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import TopicResult from '@/components/TopicResult';
import EmptyState from '@/components/EmptyState';
import LoadingSpinner from '@/components/LoadingSpinner';
import SuggestedTopics from '@/components/SuggestedTopics';
import { cn } from '@/lib/utils';
import { fetchAIExplanation, getAIMode } from '@/services/aiService';


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
  setIsAiLoading(false);

  await new Promise(resolve => setTimeout(resolve, 800));

  const searchResult: TopicSearchResult = searchTopics(query, subjectId);

  if (searchResult.topic) {
    setTopicResult(searchResult.topic);
    setLookupState('results');

   if (getAIMode()) {

      try {
        setIsAiLoading(true);

        const enhancedTopic = await fetchAIExplanation(
          searchResult.topic.title,
          searchResult.topic.subject
        );

        setTopicResult(enhancedTopic);

      } catch (error) {
        console.warn("AI failed. Using default content.");
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


  // Auto-search when coming from bookmarks
  useEffect(() => {
    const topicParam = searchParams.get('topic');
    if (topicParam && lookupState === 'initial') {
      handleLookup(topicParam);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, lookupState, handleLookup, setSearchParams]);

  if (!subject) {
    return <Navigate to="/" replace />;
  }

  const Icon = iconMap[subject.icon] || BookOpen;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Subject Header */}
        <section className={cn("border-b py-6 sm:py-10", `bg-${subject.colorClass}`)}>
          <div className="container">
            <div className="flex items-center gap-4">
              <div className={cn(
                "flex h-16 w-16 items-center justify-center rounded-2xl",
                `bg-${subject.colorClass}`
              )}>
                <Icon className={cn("h-8 w-8", `text-${subject.colorClass}`)} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{subject.name}</h1>
                <p className="text-muted-foreground">{subject.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="py-8">
          <div className="container max-w-2xl">
            <SearchBar
              onSearch={handleLookup}
              isLoading={lookupState === 'loading'}
              placeholder={`Search any ${subject.name} topic...`}
              colorClass={subject.colorClass}
            />

            {lookupState === 'initial' && (
              <SuggestedTopics
                topics={subject.topics.slice(0, 5)}
                onTopicClick={handleLookup}
                colorClass={subject.colorClass}
              />
            )}
          </div>
        </section>

        {/* Results */}
        <section className="pb-16">
          <div className="container max-w-3xl">
            {lookupState === 'initial' && (
              <EmptyState type="initial" colorClass={subject.colorClass} />
            )}

            {lookupState === 'loading' && (
              <LoadingSpinner
                colorClass={subject.colorClass}
                message="Finding your topic..."
                submessage="Preparing a clear explanation"
              />
            )}

            {lookupState === 'no-results' && (
              <EmptyState
                type="no-results"
                query={lookupQuery}
                relatedTopics={relatedTopics}
                onTopicClick={handleLookup}
                colorClass={subject.colorClass}
              />
            )}

          {lookupState === 'results' && topicResult && (
  <div
    className={`transition-all duration-500 ${
      isAiLoading
        ? "opacity-70 blur-[1px]"
        : "opacity-100 blur-0"
    } ${
      getAIMode() && !isAiLoading
        ? "animate-[fadeInScale_0.4s_ease-out]"
        : ""
    }`}
  >
    <TopicResult
      topic={topicResult}
      colorClass={subject.colorClass}
      isAiLoading={isAiLoading}
    />
  </div>
)}
          </div>  
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SubjectPage;
