import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Flinchify Works | Hire Testers, Get UX Feedback in Hours",
  description: "Post a test job, set your budget, and get real user feedback in hours. See how Flinchify matches human testers to your app for honest usability testing.",
};
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const BIZ_STEPS = [
  { num: "01", title: "Submit your app", desc: "Paste your URL, pick the app type, and tell us what to focus on. Takes 30 seconds. No account needed." },
  { num: "02", title: "Describe your ideal tester", desc: "Tell us who your app is for — age, interests, tech level. We match from our tester pool. Or skip this for general audience testing." },
  { num: "03", title: "Choose a plan", desc: "3 testers ($29), 5 testers ($49), or 10 testers ($89). No subscriptions. Pay once, get results." },
  { num: "04", title: "We match and dispatch", desc: "Our system matches testers from the pool who fit your audience profile. They get your app within minutes of your order." },
  { num: "05", title: "Testers use your app", desc: "Real people, on real devices, using your app naturally for 15-20 minutes. Screen recording captures everything." },
  { num: "06", title: "Results in your inbox", desc: "Screen recordings, structured bug reports, UX friction notes, and a priority-ranked issue list. Delivered in 4-6 hours." },
];

const TESTER_STEPS = [
  { num: "01", title: "Sign up in 60 seconds", desc: "Name, email, age, interests, devices. That's it. No tests, no interviews, no resumes." },
  { num: "02", title: "Get matched to apps", desc: "We'll send you apps that match your profile. A fitness app goes to gym-goers. A crypto tool goes to traders. You get apps you'd actually use." },
  { num: "03", title: "Use the app for 15 mins", desc: "Open it, try everything, note what breaks or confuses you. Record your screen with a free tool (we'll show you how)." },
  { num: "04", title: "Submit your feedback", desc: "Fill out a quick form: what worked, what didn't, bugs found. Takes 5 minutes." },
  { num: "05", title: "Get paid same day", desc: "$5-15 per test depending on complexity. Paid via PayPal or bank transfer. No minimum payout." },
];

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-5 py-16 md:py-24">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-[3rem] font-bold tracking-tight mb-3">
              How it works
            </h1>
            <p className="text-[16px] text-[var(--text-muted)] max-w-lg mx-auto">
              Simple on both sides. That&apos;s the whole point.
            </p>
          </div>

          {/* Business flow */}
          <div className="mb-20">
            <h2 className="text-[13px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-8">For businesses and developers</h2>
            <div className="space-y-6">
              {BIZ_STEPS.map((s) => (
                <div key={s.num} className="flex gap-5">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                    <span className="text-[12px] font-mono font-bold text-[var(--accent)]">{s.num}</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-[16px] font-semibold mb-1">{s.title}</h3>
                    <p className="text-[14px] text-[var(--text-muted)] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/submit" className="btn btn-primary">Get testers now</Link>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[var(--border)] my-16" id="testers" />

          {/* Tester flow */}
          <div className="mb-20">
            <h2 className="text-[13px] font-semibold text-emerald-400 uppercase tracking-wider mb-8">For testers</h2>
            <div className="space-y-6">
              {TESTER_STEPS.map((s) => (
                <div key={s.num} className="flex gap-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <span className="text-[12px] font-mono font-bold text-emerald-400">{s.num}</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-[16px] font-semibold mb-1">{s.title}</h3>
                    <p className="text-[14px] text-[var(--text-muted)] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/become-a-tester" className="btn btn-primary !bg-emerald-600 hover:!bg-emerald-700">Get started</Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="border-t border-[var(--border)] pt-16">
            <h2 className="text-xl font-bold mb-8 text-center">Common questions</h2>
            <div className="space-y-6 max-w-2xl mx-auto">
              {[
                { q: "What if my app needs a login?", a: "Include test credentials in your submission. We'll share them securely with matched testers." },
                { q: "Can I test mobile apps?", a: "Yes — iOS via TestFlight, Android via Play Store beta link, or any mobile web URL." },
                { q: "How do you verify testers are real?", a: "Every tester goes through human verification. We use behavioural analysis to ensure genuine human interaction, not bots or AI agents." },
                { q: "What if I need testers from a specific country?", a: "Include that in your audience description. We match from our global pool based on location, demographics, and interests." },
                { q: "Can I get recurring testing?", a: "Contact us for a custom recurring plan. Most devs just order a new test after each major deploy." },
              ].map((faq) => (
                <div key={faq.q}>
                  <h3 className="text-[15px] font-semibold mb-1">{faq.q}</h3>
                  <p className="text-[14px] text-[var(--text-muted)] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

