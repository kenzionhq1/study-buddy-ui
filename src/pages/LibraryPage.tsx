import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Library, Search, BookOpen, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import { Input } from '@/components/ui/input';
import { fetchLibrary, GeneratedTopic, getTopicId } from '@/services/topicService';

const LibraryPage = () => {
  const [topics, setTopics] = useState<GeneratedTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchLibrary()
      .then(setTopics)
      .finally(() => setLoading(false));
  }, []);

  const filtered = search.trim()
    ? topics.filter((t) =>
        t.topic.toLowerCase().includes(search.toLowerCase())
      )
    : topics;

  return (
    <div className="flex min-h-screen flex-col bg-background page-shell">
      <div className="hidden sm:block">
        <Header />
      </div>

      <main className="flex-1 py-8">
        <div className="container max-w-4xl px-4">
          <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
            <Library className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              My Library
            </h1>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search saved topics…"
              className="w-full rounded-xl pl-10"
            />
          </div>

          {loading && (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">
                {search ? 'No topics match your search.' : 'Your library is empty. Generate your first topic!'}
              </p>
              <Link
                to="/"
                className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Generate a Topic
              </Link>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 scroll-reveal">
              {filtered.map((t, i) => {
                const topicId = getTopicId(t);
                if (!topicId) return null;

                return (
                  <Link
                    key={topicId}
                    to={`/app/result/${topicId}`}
                    className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                  >
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {t.topic}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {t.content.definition}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                      <span>·</span>
                      <span>{t.questions?.length ?? 0} questions</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
};

export default LibraryPage;
