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
  HelpCircle
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { fetchTopicById, GeneratedTopic } from '@/services/topicService';

const ResultPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [topic, setTopic] = useState<GeneratedTopic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    };
  }, [id]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-3xl">

          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {loading && (
            <LoadingSpinner
              message="Loading topic..."
              submessage="Preparing your study material"
            />
          )}

          {error && (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <p className="text-lg font-medium text-foreground">{error}</p>
              <Button onClick={() => navigate('/')}>Go Home</Button>
            </div>
          )}

          {!loading && topic && (
            <div className="animate-fade-in space-y-6">

              {/* Title */}
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                  {topic.topic}
                </h1>
              </div>

              <p className="text-xs text-muted-foreground">
                Generated {new Date(topic.createdAt).toLocaleDateString()}
              </p>

              <Section icon={<BookOpen className="h-5 w-5 text-primary" />} title="Definition">
              <p>{topic.content.definition || 'No definition available yet.'}</p>
            </Section>

              <Section icon={<Lightbulb className="h-5 w-5 text-primary" />} title="Explanation">
                <p className="whitespace-pre-line">{topic.content.explanation || 'No explanation available yet.'}</p>
              </Section>

              <Section icon={<List className="h-5 w-5 text-primary" />} title="Key Points">
                <ul className="ml-4 list-disc space-y-1.5">
                  {topic.content.keyPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </Section>

              <Section icon={<FlaskConical className="h-5 w-5 text-primary" />} title={topic.content.example.title || 'Example'}>
                <p className="whitespace-pre-line">
                  {topic.content.example.content || 'No example available yet.'}
                </p>
              </Section>

              <Section icon={<GraduationCap className="h-5 w-5 text-primary" />} title="Exam Tips">
                <ul className="ml-4 list-disc space-y-1.5">
                  {topic.content.examTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </Section>

              {topic.questions?.length > 0 && (
                <Section icon={<HelpCircle className="h-5 w-5 text-primary" />} title="Practice Questions">
                  <div className="space-y-5">
                    {topic.questions.map((q, qi) => (
                      <QuestionCard key={qi} q={q} index={qi} />
                    ))}
                  </div>
                </Section>
              )}

            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

/* ---------- Components ---------- */

const Section = ({ icon, title, children }: any) => (
  <div className="rounded-xl border border-border bg-card p-5 shadow-card">
    <div className="mb-3 flex items-center gap-2">
      {icon}
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
    {children}
  </div>
);

const QuestionCard = ({ q, index }: any) => {
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="font-medium">
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
                ? 'border-primary bg-primary/10 text-primary font-medium'
                : revealed && opt === selected && opt !== q.answer
                ? 'border-destructive bg-destructive/10 text-destructive'
                : 'border-border hover:bg-secondary'
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
