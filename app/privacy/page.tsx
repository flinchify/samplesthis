import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen">
        <div className="max-w-2xl mx-auto px-5 py-16 md:py-24">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-[13px] text-[var(--text-dim)] mb-10">Last updated: March 2026</p>

          <div className="space-y-8 text-[14px] text-[var(--text-muted)] leading-relaxed">
            <section>
              <h2 className="text-[16px] font-semibold text-white mb-2">Information We Collect</h2>
              <p>We collect information you provide when registering as a tester (name, email, age range, location, interests, devices) or submitting an app for testing (email, company, app URL, target audience description). We also collect payment information processed securely through Stripe.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-white mb-2">How We Use Your Information</h2>
              <p>For testers: to match you with relevant testing opportunities and pay you. For businesses: to match testers to your audience profile and deliver results. We never sell your data to third parties.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-white mb-2">Data Security</h2>
              <p>We use industry-standard encryption and security measures. Payment data is handled by Stripe and never touches our servers. Tester personal information is only shared with businesses in aggregate form (demographics), never individually.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-white mb-2">Data Retention</h2>
              <p>Account data is retained while your account is active. Test results and recordings are retained for 90 days after delivery. You can request deletion of your data at any time by contacting us.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-white mb-2">Your Rights</h2>
              <p>Under the Australian Privacy Act 1988 and applicable privacy principles, you have the right to access, correct, or delete your personal information. Contact us at privacy@SampleThis.dev.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-white mb-2">Cookies</h2>
              <p>We use essential cookies for site functionality. We do not use tracking or advertising cookies without your consent.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-white mb-2">Contact</h2>
              <p>For privacy inquiries: privacy@SampleThis.dev</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
