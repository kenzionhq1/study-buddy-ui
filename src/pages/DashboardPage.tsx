import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Loader2,
  AlertCircle,
  BookOpen,
  ShieldCheck,
  Timer,
  Wand2,
} from 'lucide-react';
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

  const suggestions = [
    'Photosynthesis',
    'Supply and Demand',
    'Pythagorean Theorem',
    'Mitosis vs. Meiosis',
  ];

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
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="container relative grid gap-6 px-4 py-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="h-3 w-3" /> Study Assistant
              </div>
              <div className="space-y-3">
                <h1 className="text-2xl font-extrabold leading-tight text-foreground sm:text-3xl md:text-4xl">
                  Turn any topic into exam-ready notes, instantly.
                </h1>
                <p className="text-sm text-muted-foreground sm:text-base">
                  Generate concise explanations, key points, examples, and practice questions tailored to what you need to learn next.
                </p>
              </div>

              <form
                onSubmit={handleGenerate}
                className="rounded-2xl bg-card p-4 shadow-md ring-1 ring-border"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <Input
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="e.g. Explain CRISPR in simple terms"
                      className="w-full rounded-xl border-border bg-muted/60 py-3 text-base"
                      disabled={loading}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-primary/30 transition hover:bg-primary/90 sm:w-auto"
                    disabled={!query.trim() || loading}
                  >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Generate
                  </Button>
                </div>

                {error && (
                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Quick picks:</span>
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setQuery(s);
                        setError('');
                      }}
                      className="rounded-full border border-border bg-muted px-3 py-1 transition hover:border-primary/60 hover:text-primary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </form>

              {/* Mobile quick stats */}
              <div className="grid gap-2 sm:hidden">
                {[
                  { label: 'Avg. read', value: '3–5 min' },
                  { label: 'Questions', value: '5–10 each' },
                  { label: 'Modes', value: 'Definition • Tips • MCQs' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between rounded-xl border border-border bg-muted/60 px-3 py-2 text-sm"
                  >
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="font-semibold text-foreground">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Mobile highlights */}
            <div className="lg:hidden">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                Highlights
              </div>
              <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
                {[
                  { icon: <BookOpen className="h-5 w-5 text-primary" />, title: 'Structured notes', desc: 'Definition, explanation, key points.' },
                  { icon: <ShieldCheck className="h-5 w-5 text-primary" />, title: 'Exam-focused', desc: 'Concise wording for recall.' },
                  { icon: <Timer className="h-5 w-5 text-primary" />, title: 'Time saver', desc: 'Generate in seconds.' },
                  { icon: <Sparkles className="h-5 w-5 text-primary" />, title: 'Practice Qs', desc: 'Auto-created MCQs.' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="min-w-[190px] snap-start rounded-xl border border-border bg-card p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      {item.icon}
                      {item.title}
                    </div>
                      <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop highlights */}
            <div className="hidden gap-4 rounded-2xl bg-card/90 p-5 shadow-lg ring-1 ring-border backdrop-blur lg:grid">
              <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 p-4 text-primary-foreground shadow-md">
                <Wand2 className="h-8 w-8" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-primary-foreground/80">Workflow</p>
                  <p className="text-lg font-semibold">Generate → Review → Save</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: <BookOpen className="h-5 w-5 text-primary" />, title: 'Structured notes', desc: 'Definition, explanation, key points, exam tips.' },
                  { icon: <ShieldCheck className="h-5 w-5 text-primary" />, title: 'Exam-focused', desc: 'Concise wording tuned for recall.' },
                  { icon: <Timer className="h-5 w-5 text-primary" />, title: 'Time saver', desc: 'Generate in seconds, not hours.' },
                  { icon: <Sparkles className="h-5 w-5 text-primary" />, title: 'Practice questions', desc: 'Auto-created MCQs to self-check.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-lg border border-border bg-muted/60 p-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      {item.icon}
                      {item.title}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-card py-8 sm:py-10">
          <div className="container grid gap-3 px-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Avg. read time', value: '3–5 min' },
              { label: 'Practice questions', value: '5–10 per topic' },
              { label: 'Export ready', value: 'Copy & save instantly' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-muted/60 p-4 text-center shadow-sm"
              >
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-semibold text-foreground">{stat.value}</p>
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
