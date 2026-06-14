import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background page-shell">
      <style>{`
        @keyframes float3d {
          0% { transform: rotateX(14deg) rotateY(-16deg) translateY(0); }
          50% { transform: rotateX(12deg) rotateY(-20deg) translateY(-10px); }
          100% { transform: rotateX(14deg) rotateY(-16deg) translateY(0); }
        }
        .floating-book {
          animation: float3d 6s ease-in-out infinite;
        }
      `}</style>
      <div className="hidden sm:block">
        <Header />
      </div>
      <main className="flex-1">
        <section className="relative overflow-hidden scroll-reveal">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-primary/5 dark:from-slate-900/50 dark:to-slate-950" />
          <div className="absolute left-1/2 top-6 -z-0 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl sm:h-64 sm:w-64 lg:h-72 lg:w-72" />
          <div className="container mx-auto grid max-w-6xl gap-8 px-4 pb-12 pt-10 sm:gap-10 sm:pt-14 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold text-primary sm:text-xs">
                <Sparkles className="h-4 w-4" />
                Study Assistant
              </div>
              <h1 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                Study faster with AI-crafted, exam-ready notes.
              </h1>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
                Turn any topic into clear explanations, key points, examples, and practice questions—optimized for quick comprehension.
              </p>
              <div className="flex flex-col gap-3 justify-center sm:flex-row sm:justify-start sm:gap-4">
                <Link to="/login" className="w-full sm:w-auto">
                  <Button className="w-full rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-primary/30 transition hover:bg-primary/90">
                    Log in
                  </Button>
                </Link>
                <Link to="/register" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full rounded-xl px-6 py-3 text-base font-semibold gap-2">
                    Sign up
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Floating 3D book card - mobile-safe sizing */}
              <div className="relative mx-auto flex h-48 w-full max-w-xs items-center justify-center sm:h-52 sm:max-w-sm md:max-w-md lg:mx-0">
                <div
                  className="floating-book relative h-40 w-full max-w-[15rem] rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/20 via-background to-primary/10 shadow-2xl backdrop-blur sm:max-w-[16rem]"
                  style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10"
                    style={{ filter: 'blur(20px)', transform: 'translateZ(-40px)' }}
                  />
                  <div
                    className="absolute inset-0 rounded-2xl border border-primary/30 bg-card/90 shadow-lg"
                    style={{
                      transform: 'rotateX(14deg) rotateY(-16deg) translateZ(20px)',
                      boxShadow: '0 25px 60px rgba(0,0,0,0.18)',
                    }}
                  >
                    <div className="flex h-full flex-col justify-between p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <BookOpen className="h-5 w-5" />
                        Live study pack
                      </div>
                      <div className="space-y-1 text-xs text-foreground/80">
                        <p>• Key points ready for review</p>
                        <p>• Example & exam tips bundled</p>
                        <p>• Practice Qs auto-generated</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative space-y-5">
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rotate-6 rounded-full bg-primary/5 blur-3xl sm:h-80 sm:w-80" />
              <div className="relative grid gap-4 rounded-2xl border border-border bg-card/90 p-5 shadow-xl backdrop-blur">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/20 via-background to-primary/10 p-6 shadow-lg">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-2xl bg-primary/15 blur-2xl" />
                  <div className="absolute -left-6 bottom-4 h-20 w-20 -rotate-6 rounded-xl bg-primary/10 blur-xl" />
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Live preview</p>
                      <p className="text-lg font-semibold text-foreground">Your study pack</p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-foreground/90">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      Ready in seconds
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-2 w-2 rounded-full bg-indigo-500" />
                      Structured definitions, examples, tips
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-2 w-2 rounded-full bg-amber-500" />
                      Practice questions auto-generated
                    </div>
                  </div>
                </div>

                {[
                  { title: 'Structured notes', desc: 'Definition, explanation, examples, exam tips.' },
                  { title: 'Practice questions', desc: 'Auto-generated MCQs to test yourself.' },
                  { title: 'Dark/light ready', desc: 'Readable across devices and themes.' },
                  { title: 'Instant output', desc: 'Get study-ready material in seconds.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-border bg-muted/60 p-4 transition hover:translate-y-[-2px] hover:shadow-md">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default LandingPage;
