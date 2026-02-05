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
import { subjects, searchTopics, TopicContent } from '@/data/subjects';
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

type SearchState = 'initial' | 'loading' | 'results' | 'no-results';

const SubjectPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchState, setSearchState] = useState<SearchState>('initial');
  const [searchQuery, setSearchQuery] = useState('');
  const [topicResult, setTopicResult] = useState<TopicContent | null>(null);

  const subject = subjects.find(s => s.id === subjectId);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setSearchState('loading');
    
    // Simulate intelligent search delay
    setTimeout(() => {
      const result = searchTopics(query, subjectId);
      if (result) {
        setTopicResult(result);
        setSearchState('results');
      } else {
        setTopicResult(null);
        setSearchState('no-results');
      }
    }, 1500);
  }, [subjectId]);

  // Auto-search when topic query param is present (from bookmarks)
  useEffect(() => {
    const topicParam = searchParams.get('topic');
    if (topicParam && searchState === 'initial') {
      handleSearch(topicParam);
      // Clear the query param after searching
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, searchState, handleSearch, setSearchParams]);

  const handleSuggestedTopicClick = (topic: string) => {
    handleSearch(topic);
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
          "border-b py-8 sm:py-12",
          `bg-${subject.colorClass}`
        )}>
          <div className="container">
            <div className="flex items-center gap-4">
              <div className={cn(
                "flex h-16 w-16 items-center justify-center rounded-2xl sm:h-20 sm:w-20",
                `bg-${subject.colorClass}`
              )}>
                <Icon className={cn("h-8 w-8 sm:h-10 sm:w-10", `text-${subject.colorClass}`)} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                  {subject.name}
                </h1>
                <p className="mt-1 text-muted-foreground">
                  {subject.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 sm:py-12">
          <div className="container">
            <div className="mx-auto max-w-2xl">
              <SearchBar 
                onSearch={handleSearch}
                isLoading={searchState === 'loading'}
                placeholder={`Search a ${subject.name} topic...`}
                colorClass={subject.colorClass}
              />
              
              {searchState === 'initial' && (
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
        <section className="pb-16 sm:pb-20">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              {searchState === 'initial' && (
                <EmptyState type="initial" colorClass={subject.colorClass} />
              )}
              
              {searchState === 'loading' && (
                <LoadingSpinner colorClass={subject.colorClass} />
              )}
              
              {searchState === 'no-results' && (
                <EmptyState type="no-results" query={searchQuery} colorClass={subject.colorClass} />
              )}
              
              {searchState === 'results' && topicResult && (
                <TopicResult topic={topicResult} colorClass={subject.colorClass} />
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
