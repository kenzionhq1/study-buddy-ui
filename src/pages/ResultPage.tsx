import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Lightbulb,
  List,
  FlaskConical,
  GraduationCap,
  HelpCircle,
  Volume2,
  Square,
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchTopicById, GeneratedTopic } from '@/services/topicService';

const ResultPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [topic, setTopic] = useState<GeneratedTopic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    if (!id) {
      setTopic(null);
      setError('No topic selected');
      setLoading(false);
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError('');
        setTopic(null);

        const data = await fetchTopicById(id);

        if (!cancelled && data) {
          setTopic(data);
        } else if (!cancelled && !data) {
          setError('Topic not found');
        }
      } catch (err: any) {
        if (!cancelled) setError(err.message || 'Failed to load topic');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [id]);

  const handleReadAloud = () => {
    if (!topic || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;

    if (isReading) {
      synth.cancel();
      setIsReading(false);
      return;
    }

    const parts = [
      `Topic: ${topic.topic}.`,
      topic.content.definition,
      topic.content.explanation,
      topic.content.keyPoints.join('. '),
      topic.content.examTips.join('. '),
    ]
      .filter(Boolean)
      .join('. ');

    const utterance = new SpeechSynthesisUtterance(parts);
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);

    synth.cancel();
    synth.speak(utterance);
    setIsReading(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 py-8 sm:py-10">
        <div className="container max-w-5xl px-4">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3 w-3" />
              Generated study pack
            </div>
          </div>

          {loading && <ResultSkeleton />}

          {error && (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-destructive/30 bg-destructive/10 p-8 text-center text-destructive">
              <AlertCircle className="h-12 w-12" />
              <p className="text-lg font-semibold">{error}</p>
              <Button onClick={() => navigate('/')}>Go Home</Button>
            </div>
          )}

          {!loading && topic && (
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Generated {new Date(topic.createdAt).toLocaleDateString()}
                    </div>
                    <Button
                      variant={isReading ? 'secondary' : 'outline'}
                      size="sm"
                      className="gap-2"
                      onClick={handleReadAloud}
                    >
                      {isReading ? <Square className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      {isReading ? 'Stop' : 'Read aloud'}
                    </Button>
                  </div>
                  <h1 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                    {topic.topic}
                  </h1>
                </div>

                <Section icon={<BookOpen className="h-5 w-5 text-primary" />} title="Definition">
                  <p className="text-foreground/90">{topic.content.definition || 'No definition available yet.'}</p>
                </Section>

                <Section icon={<Lightbulb className="h-5 w-5 text-amber-500" />} title="Explanation">
                  <p className="whitespace-pre-line text-foreground/90">{topic.content.explanation || 'No explanation available yet.'}</p>
                </Section>

                <Section icon={<List className="h-5 w-5 text-indigo-500" />} title="Step-by-step breakdown">
                  <ol className="ml-4 list-decimal space-y-1.5 text-foreground/90">
                    {topic.content.keyPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ol>
                </Section>

                <Section icon={<FlaskConical className="h-5 w-5 text-cyan-500" />} title={topic.content.example.title || 'Example'}>
                  <p className="whitespace-pre-line text-foreground/90">
                    {topic.content.example.content || 'No example available yet.'}
                  </p>
                </Section>

                <Section icon={<GraduationCap className="h-5 w-5 text-rose-500" />} title="Exam Tips">
                  <ul className="ml-4 list-disc space-y-1.5 text-foreground/90">
                    {topic.content.examTips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </Section>

                {topic.questions?.length ? (
                  <Section icon={<HelpCircle className="h-5 w-5 text-teal-500" />} title="Practice Questions">
                    <div className="space-y-5">
                      {topic.questions.map((q, qi) => (
                        <QuestionCard key={qi} q={q} index={qi} />
                      ))}
                    </div>
                  </Section>
                ) : null}
              </div>

              <aside className="space-y-4">
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-foreground">Topic Snapshot</h3>
                  <div className="mt-3 grid gap-3 text-sm text-muted-foreground">
                    <SnapshotRow label="Created" value={new Date(topic.createdAt).toLocaleDateString()} />
                    <SnapshotRow label="Questions" value={String(topic.questions?.length ?? 0)} />
                    <SnapshotRow label="Key points" value={String(topic.content.keyPoints.length)} />
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-gradient-to-br from-emerald-500/15 via-primary/10 to-sky-500/15 p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-foreground">Tips to study this pack</h3>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                    <li>1. Skim key points first, then read the explanation.</li>
                    <li>2. Answer practice questions before checking answers.</li>
                    <li>3. Revisit exam tips and add personal mnemonics.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-foreground">Simplify</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Rephrase the core idea in your own words. If it sounds too complex, break it into three sentences: what it is, why it matters, and one concrete example.
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ResultSkeleton = () => (
  <div className="space-y-4">
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-6 w-24" />
      </div>
      <Skeleton className="mt-3 h-6 w-56" />
    </div>

    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <Skeleton className="mb-2 h-4 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-2/3" />
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <Skeleton className="mb-3 h-4 w-28" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="mb-2 h-3 w-full" />
          ))}
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <Skeleton className="mb-3 h-4 w-36" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="mb-2 h-3 w-5/6" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SnapshotRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between rounded-lg bg-muted px-3 py-2">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-semibold text-foreground">{value}</span>
  </div>
);

/* ---------- Components ---------- */

const Section = ({ icon, title, children }: any) => (
  <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
    <div className="mb-3 flex items-center gap-2">
      {icon}
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
    </div>
    <div className="text-sm leading-relaxed text-foreground/90">{children}</div>
  </div>
);

const QuestionCard = ({ q, index }: any) => {
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border bg-muted p-4">
      <p className="font-medium text-foreground">
        {index + 1}. {q.question}
      </p>

      <div className="mt-3 space-y-2">
        {q.options.map((opt: string) => (
          <button
            key={opt}
            onClick={() => {
              setSelected(opt);
              setRevealed(true);
            }}
            disabled={revealed}
            className={`w-full rounded-lg border px-4 py-2 text-left text-sm transition-colors ${
              revealed && opt === q.answer
                ? 'border-primary/50 bg-primary/10 text-primary font-semibold'
                : revealed && opt === selected && opt !== q.answer
                ? 'border-destructive/40 bg-destructive/10 text-destructive'
                : 'border-border hover:border-border/70 hover:bg-card'
            }`}
          >
            {opt}
            {revealed && opt === q.answer && (
              <CheckCircle2 className="ml-2 inline h-4 w-4 text-primary" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
