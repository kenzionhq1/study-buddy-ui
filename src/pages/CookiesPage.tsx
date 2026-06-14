import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';

const CookiesPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background page-shell">
      <div className="hidden sm:block">
        <Header />
      </div>
      <main className="flex-1 py-10">
        <div className="container max-w-4xl px-4 space-y-6 scroll-reveal">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Legal</p>
            <h1 className="text-3xl font-bold text-foreground">Cookie Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: March 7, 2026</p>
          </div>

          <section className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">What cookies we use</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-foreground/90">
              <li>Essential cookies/local storage to keep you logged in and secure.</li>
              <li>Preference storage for theme and cookie consent choices.</li>
              <li>No advertising cookies are used.</li>
            </ul>
          </section>

          <section className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Managing consent</h2>
            <p className="text-sm text-foreground/90">
              You can accept or reject non-essential cookies through the cookie banner. Your choice is stored so we respect it on future visits.
            </p>
          </section>

          <section className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <p className="text-sm text-foreground/90">
              For questions about this policy or your data, reach out to support@studyassistant.app.
            </p>
          </section>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default CookiesPage;
