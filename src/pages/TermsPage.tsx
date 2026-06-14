import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';

const TermsPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background page-shell">
      <div className="hidden sm:block">
        <Header />
      </div>
      <main className="flex-1 py-10">
        <div className="container max-w-4xl px-4 space-y-6 scroll-reveal">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Legal</p>
            <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
            <p className="text-sm text-muted-foreground">Last updated: March 7, 2026</p>
          </div>

          <section className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Use of the service</h2>
            <p className="text-sm text-foreground/90">
              Study Assistant provides AI-generated study materials. You are responsible for how you use the content and should verify important information independently.
            </p>
          </section>

          <section className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Accounts & security</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-foreground/90">
              <li>You must keep your credentials secure and notify us of any unauthorized use.</li>
              <li>We may suspend accounts for abuse, fraud, or violations of these terms.</li>
            </ul>
          </section>

          <section className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Content & intellectual property</h2>
            <p className="text-sm text-foreground/90">
              You retain rights to your inputs and generated study topics. The platform UI and brand assets remain our property. Do not misuse or resell the service.
            </p>
          </section>

          <section className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Disclaimers</h2>
            <p className="text-sm text-foreground/90">
              The service is provided “as is” without warranties. We are not liable for exam outcomes or losses resulting from reliance on generated content.
            </p>
          </section>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default TermsPage;
