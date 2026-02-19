import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Loader2, FolderOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { findCachedTopic } from '@/services/topicService';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const cached = query.trim() ? findCachedTopic(query.trim()) : undefined;

  const handleGenerate = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (cached) {
      navigate(`/result/${cached.id}`);
      return;
    }

    navigate(`/result?topic=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-card py-12 sm:py-20">
          <div className="container max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              What do you want to learn?
            </h1>
            <p className="mt-3 text-muted-foreground">
              Type any topic and we'll generate a clear, exam-ready explanation with questions.
            </p>

            <form onSubmit={handleGenerate} className="mt-8 flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Photosynthesis, Quadratic Equations…"
                className="flex-1 rounded-xl py-5 text-base"
                disabled={loading}
              />

              {cached ? (
                <Button
                  type="submit"
                  variant="secondary"
                  className="shrink-0 rounded-xl px-5"
                >
                  <FolderOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Open Saved</span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="shrink-0 rounded-xl px-5"
                  disabled={!query.trim() || loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">Generate</span>
                </Button>
              )}
            </form>
          </div>
        </section>

        {/* Quick info */}
        <section className="py-12">
          <div className="container grid max-w-3xl gap-6 sm:grid-cols-3">
            {[
              { icon: '📖', title: 'Clear Explanations', desc: 'AI-powered definitions and breakdowns.' },
              { icon: '🎯', title: 'Key Points', desc: 'Focused summaries for quick revision.' },
              { icon: '❓', title: 'Practice Questions', desc: 'Test yourself with AI-generated questions.' },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card p-5 text-center shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-2 font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
