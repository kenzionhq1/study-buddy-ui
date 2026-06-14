import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';

const PrivacyPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background page-shell">
      <div className="hidden sm:block">
        <Header />
      </div>
      <main className="flex-1 py-10">
        <div className="container max-w-4xl px-4 space-y-6 scroll-reveal">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Legal</p>
            <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: March 7, 2026</p>
          </div>

          <section className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">What we collect</h2>
            <p className="text-sm text-foreground/90">
              We collect your name, email, password (hashed), generated topics, and usage data needed to deliver study packs and keep your account secure.
            </p>
          </section>

          <section className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">How we use data</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-foreground/90">
              <li>Authenticate your account and keep you signed in.</li>
              <li>Generate and store study topics and results.</li>
              <li>Improve reliability, security, and product experience.</li>
            </ul>
          </section>

          <section className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Cookies & local storage</h2>
            <p className="text-sm text-foreground/90">
              We use essential cookies/local storage to maintain sessions and your preferences. Non-essential cookies are optional and can be rejected via the cookie banner.
            </p>
          </section>

          <section className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Your choices</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-foreground/90">
              <li>Update or delete your account by contacting support.</li>
              <li>Accept or reject non-essential cookies at any time.</li>
              <li>Request export of your generated study data.</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default PrivacyPage;
