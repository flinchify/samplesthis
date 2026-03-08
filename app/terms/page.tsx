import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen">
        <div className="max-w-2xl mx-auto px-5 py-16 md:py-24">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-[var(--text)]">Terms of Service</h1>
          <p className="text-[13px] text-[var(--text-dim)] mb-10">Last updated: March 2026</p>

          <div className="space-y-8 text-[14px] text-[var(--text-muted)] leading-relaxed">
            <section>
              <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">1. Service Description</h2>
              <p>Flinchify (&quot;the Platform&quot;) is a marketplace that connects businesses seeking user testing with independent human testers. Flinchify facilitates the matching, payment processing, and delivery of testing results. Flinchify acts solely as an intermediary and does not perform testing services directly.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">2. Platform Role &amp; Disclaimer</h2>
              <p>Flinchify is a platform provider, not a party to the testing arrangement between businesses and testers. We do not guarantee the quality, accuracy, or completeness of any test results, feedback, screen recordings, or deliverables. Businesses and testers engage with each other at their own risk. Flinchify does not endorse, verify, or take responsibility for any app, product, or service submitted for testing.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">3. For Businesses</h2>
              <p>By posting a job, you agree to pay the total amount (number of testers × price per tester) upfront via Stripe. You define the tasks testers must complete and the time limit for completion. You are responsible for reviewing applicants and accepting or denying them. Payment to testers is released only upon your approval of their submission.</p>
              <p className="mt-2"><strong>Cancellation policy:</strong> You may cancel a job at any time before testers have submitted work. Cancelled jobs receive platform credit equal to the amount paid — <strong>no cash refunds</strong>. Credit can be applied to future job postings and does not expire. Once a tester has submitted work, the job cannot be cancelled.</p>
              <p className="mt-2">Test results and feedback represent the honest, subjective opinions of individual testers. Flinchify makes no warranty that feedback will be comprehensive, technically accurate, or actionable. You should not rely solely on Flinchify testing as a substitute for professional QA, security auditing, or accessibility testing.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">4. For Testers</h2>
              <p>By registering as a tester, you represent that you are a real human, at least 18 years of age, and eligible to receive payments in your country of residence. You agree to provide honest, genuine feedback based on your real experience using the app. Automated testing, AI-generated feedback, plagiarised content, or fraudulent submissions will result in immediate account termination and forfeiture of pending payments.</p>
              <p className="mt-2">Testers are independent contractors, not employees or agents of Flinchify. You are solely responsible for your own tax obligations, including reporting income earned through the Platform. Flinchify does not withhold taxes on your behalf.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">5. Payments &amp; Payouts</h2>
              <p>All payments are processed through Stripe in the user&apos;s local currency. Tester payouts are made via Stripe Connect to the tester&apos;s connected bank account upon approval of their submission. Flinchify retains a platform fee (currently 20%) from each approved test.</p>
              <p className="mt-2"><strong>No cash refunds.</strong> All cancellations result in platform credit only. Flinchify is not responsible for payment delays, failures, or errors caused by Stripe, banks, or incorrect account details provided by the user.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">6. Intellectual Property</h2>
              <p>Apps, products, and URLs submitted for testing remain the sole intellectual property of the submitting business. Testers agree not to copy, reverse-engineer, redistribute, or publicly disclose details of apps they test without the business&apos;s written consent. Screen recordings, bug reports, and feedback deliverables become the property of the business upon payment.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">7. Prohibited Use</h2>
              <p>You may not use the Platform to: (a) submit illegal, harmful, or malicious software for testing; (b) collect personal data from testers beyond what is provided through the Platform; (c) harass, threaten, or discriminate against any user; (d) manipulate reviews, ratings, or feedback; (e) circumvent the Platform to arrange direct payments between businesses and testers.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">8. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, Flinchify, its owners, directors, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, business opportunities, or goodwill, arising from your use of the Platform.</p>
              <p className="mt-2">Flinchify&apos;s total aggregate liability for any claim arising from or related to the Platform shall not exceed the amount you paid to Flinchify in the 12 months preceding the claim.</p>
              <p className="mt-2">Flinchify is not liable for: (a) the conduct, actions, or omissions of any tester or business; (b) any damage to your app, product, or reputation resulting from tester feedback; (c) any loss resulting from unauthorised access to your account; (d) service interruptions or data loss.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">9. Indemnification</h2>
              <p>You agree to indemnify and hold harmless Flinchify and its owners, directors, employees, and affiliates from any claims, damages, losses, or expenses (including legal fees) arising from: (a) your use of the Platform; (b) your violation of these Terms; (c) any dispute between you and another user; (d) any content you submit to the Platform.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">10. Dispute Resolution</h2>
              <p>Disputes between businesses and testers should first be resolved through the Platform&apos;s review and approval process. If a dispute cannot be resolved, Flinchify may mediate at its discretion but is not obligated to do so. Flinchify&apos;s decision in any dispute mediation is final.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">11. Account Termination</h2>
              <p>Flinchify reserves the right to suspend or terminate any account at its sole discretion, with or without notice, for any reason, including but not limited to violation of these Terms, fraudulent activity, or abusive behaviour. Upon termination, pending payouts for legitimately completed work will still be processed.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">12. No Warranty</h2>
              <p>The Platform is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. Flinchify does not warrant that the Platform will be uninterrupted, secure, or error-free.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">13. Governing Law</h2>
              <p>These Terms are governed by and construed in accordance with the laws of New South Wales, Australia. You irrevocably submit to the exclusive jurisdiction of the courts of New South Wales for any disputes arising under these Terms.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">14. Changes to Terms</h2>
              <p>We may update these Terms at any time by posting the revised version on the Platform. Continued use of the Platform after changes constitutes acceptance of the updated Terms. We will notify registered users of material changes via email where practicable.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">15. Contact</h2>
              <p>For questions about these Terms: hello@flinchify.com</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
