import { subjects } from '@/data/subjects';
import SubjectCard from '@/components/SubjectCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Learn any topic,{' '}
                <span className="text-primary">clearly explained</span>
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl">
                Your personal study companion for WAEC and NECO success. 
                Select a subject and search any topic to get detailed explanations, 
                key points, examples, and exam tips.
              </p>
            </div>
          </div>
        </section>

        {/* Subjects Grid */}
        <section className="pb-16 sm:pb-20 lg:pb-24">
          <div className="container">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl">
              Choose a Subject
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {subjects.map((subject, index) => (
                <SubjectCard key={subject.id} subject={subject} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border bg-secondary/30 py-12 sm:py-16">
          <div className="container px-0 sm:px-6">
            <div className="mx-auto flex max-w-4xl gap-4 overflow-x-auto px-4 pb-2 sm:grid sm:grid-cols-3 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0">
              <div className="min-w-[140px] flex-shrink-0 text-center sm:min-w-0 sm:flex-shrink">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 sm:mb-4 sm:h-12 sm:w-12">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground sm:mb-2 sm:text-base">Clear Explanations</h3>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Topics explained in simple, student-friendly language
                </p>
              </div>
              <div className="min-w-[140px] flex-shrink-0 text-center sm:min-w-0 sm:flex-shrink">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 sm:mb-4 sm:h-12 sm:w-12">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground sm:mb-2 sm:text-base">Key Points</h3>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Important facts highlighted for quick revision
                </p>
              </div>
              <div className="min-w-[140px] flex-shrink-0 text-center sm:min-w-0 sm:flex-shrink">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 sm:mb-4 sm:h-12 sm:w-12">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground sm:mb-2 sm:text-base">Exam Tips</h3>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  WAEC & NECO focused tips for each topic
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
