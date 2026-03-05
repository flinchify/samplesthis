import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen">
        <div className="max-w-2xl mx-auto px-5 py-16 md:py-24">
          <h1 className="text-3xl md:text-[3rem] font-bold tracking-tight mb-6">About Flinchify</h1>

          <div className="space-y-6 text-[15px] text-[var(--text-muted)] leading-relaxed">
            <p>
              Everyone&apos;s building apps now. Cursor, Bolt, Replit, Lovable — the tools to ship have never been more accessible. But there&apos;s a gap: you can build in hours, but you still have no idea if it actually works for real people.
            </p>
            <p>
              The existing testing platforms were built for enterprise. $30K annual contracts. Weeks of setup. Research panels designed for Fortune 500 UX teams. That doesn&apos;t work when you shipped your app at 2am and want feedback before you share it tomorrow.
            </p>
            <p>
              Flinchify exists to close that gap. Submit your URL, describe who your app is for, and get real humans — matched to your target audience — testing it within hours. Screen recordings, bug reports, honest feedback. No subscription, no minimum spend.
            </p>
            <p>
              On the other side, anyone can become a tester. You don&apos;t need QA experience. You just need to be a real human who fits a particular audience. If you&apos;re a gym-goer, you test fitness apps. If you&apos;re a crypto trader, you test trading tools. You get paid to try apps that are relevant to your life.
            </p>
            <p>
              We verify every tester is a genuine human — not a bot, not an AI agent pretending to be a person. Our verification layer analyses interaction patterns to ensure the feedback you receive comes from real people making real decisions.
            </p>
            <p className="text-white font-medium">
              Built in Australia. For builders everywhere.
            </p>
          </div>

          <div className="flex gap-3 mt-10">
            <Link href="/submit" className="btn btn-primary">Get testers</Link>
            <Link href="/become-a-tester" className="btn btn-secondary">Become a tester</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

