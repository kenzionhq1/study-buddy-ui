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
        <section className="py-10 sm:py-14 lg:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center animate-fade-in">
              <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground sm:mb-4 sm:text-4xl lg:text-5xl">
                Learn any topic,{' '}
                <span className="text-primary">clearly explained</span>
              </h1>
              <p className="text-base text-muted-foreground sm:text-lg lg:text-xl">
                Your personal study companion for WAEC and NECO success. 
                Select a subject and look up any topic for detailed explanations, 
                key points, examples, and exam tips.
              </p>
            </div>
          </div>
        </section>

        {/* Subjects Grid */}
        <section className="pb-12 sm:pb-16 lg:pb-20">
          <div className="container">
            <h2 className="mb-6 text-center text-xl font-bold text-foreground sm:mb-8 sm:text-2xl lg:text-3xl">
              Choose a Subject
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
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
