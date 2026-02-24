import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateTopic, getTopicId } from '@/services/topicService';

function getGenerateErrorMessage(error: any): string {
  const message = String(error?.message || '');

  if (/503|service unavailable/i.test(message)) {
    return 'Topic generation service is temporarily unavailable. Please try again shortly.';
  }

  if (/failed to fetch|networkerror|network error/i.test(message)) {
    return 'Unable to reach the server. Check your backend and internet connection.';
  }

  return message || 'Failed to generate topic';
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!query.trim()) return;

    try {
      setLoading(true);

      const data = await generateTopic(query.trim());
      const topicId = getTopicId(data);
      if (!topicId) throw new Error('Invalid topic response from server');
      navigate(`/result/${topicId}`);
    } catch (error: any) {
      setError(getGenerateErrorMessage(error));
    } finally {
      setLoading(false);
    }
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
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (error) setError('');
                }}
                placeholder="e.g. Photosynthesis, Quadratic Equations…"
                className="flex-1 rounded-xl py-5 text-base"
                disabled={loading}
              />

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
            </form>

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-left text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </section>

        {/* Info */}
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
