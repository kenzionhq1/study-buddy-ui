import { useEffect, useState } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, AlertCircle, CheckCircle2, BookOpen, Lightbulb, List, FlaskConical, GraduationCap, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { generateTopic, fetchTopicById, GeneratedTopic } from '@/services/topicService';

const ResultPage = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const topicQuery = searchParams.get('topic');
  const [topic, setTopic] = useState<GeneratedTopic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        let result: GeneratedTopic | null = null;

        if (id) {
          result = await fetchTopicById(id);
        } else if (topicQuery) {
          result = await generateTopic(topicQuery);
        }

        if (!cancelled) {
          if (result) {
            setTopic(result);
          } else {
            setError('Topic not found.');
          }
        }
      } catch (err: any) {
        if (!cancelled) setError(err.message || 'Failed to generate topic.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [id, topicQuery]);

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
              message="Generating your topic…"
              submessage="AI is preparing a clear explanation"
            />
          )}

          {error && (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <p className="text-lg font-medium text-foreground">{error}</p>
              <Button onClick={() => navigate('/')}>Go Home</Button>
            </div>
          )}

          {!loading && !error && topic && (
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

              {/* Definition */}
              <Section icon={<BookOpen className="h-5 w-5 text-primary" />} title="Definition">
                <p className="text-foreground leading-relaxed">{topic.content.definition}</p>
              </Section>

              {/* Explanation */}
              <Section icon={<Lightbulb className="h-5 w-5 text-primary" />} title="Explanation">
                <p className="text-foreground leading-relaxed whitespace-pre-line">{topic.content.explanation}</p>
              </Section>

              {/* Key Points */}
              <Section icon={<List className="h-5 w-5 text-primary" />} title="Key Points">
                <ul className="ml-4 list-disc space-y-1.5 text-foreground">
                  {topic.content.keyPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </Section>

              {/* Example */}
              <Section icon={<FlaskConical className="h-5 w-5 text-primary" />} title={topic.content.example.title || 'Example'}>
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {topic.content.example.content}
                </p>
              </Section>

              {/* Exam Tips */}
              <Section icon={<GraduationCap className="h-5 w-5 text-primary" />} title="Exam Tips">
                <ul className="ml-4 list-disc space-y-1.5 text-foreground">
                  {topic.content.examTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </Section>

              {/* Questions */}
              {topic.questions.length > 0 && (
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

/* ---- Helpers ---- */

const Section = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-border bg-card p-5 shadow-card">
    <div className="mb-3 flex items-center gap-2">
      {icon}
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
    </div>
    {children}
  </div>
);

const QuestionCard = ({
  q,
  index,
}: {
  q: { question: string; options: string[]; answer: string };
  index: number;
}) => {
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="font-medium text-foreground">
        {index + 1}. {q.question}
      </p>
      <div className="mt-3 space-y-2">
        {q.options.map((opt) => (
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
