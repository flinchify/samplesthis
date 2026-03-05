import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen">
        <div className="max-w-2xl mx-auto px-5 py-16 md:py-24">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Terms of Service</h1>
          <p className="text-[13px] text-[var(--text-dim)] mb-10">Last updated: March 2026</p>

          <div className="space-y-8 text-[14px] text-[var(--text-muted)] leading-relaxed">
            <section>
              <h2 className="text-[16px] font-semibold text-white mb-2">1. Service Description</h2>
              <p>Flinchify is a marketplace connecting businesses that need user testing with real human testers. We facilitate the matching, payment, and delivery of testing results.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-white mb-2">2. For Businesses</h2>
              <p>By submitting an order, you agree to pay the listed price for your chosen plan. Results are delivered within the stated turnaround time. If we cannot match testers to your audience, you will receive a full refund. Test results are provided as-is and represent the honest feedback of matched testers.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-white mb-2">3. For Testers</h2>
              <p>By registering, you agree to provide honest, genuine feedback when assigned a test. You must be a real human — automated testing, bot-generated feedback, or AI-assisted responses will result in immediate removal and forfeiture of payment. Payment is made upon satisfactory completion of assigned tests.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-white mb-2">4. Human Verification</h2>
              <p>We employ behavioural analysis to verify that testers are genuine humans. By using the platform, you consent to this analysis. We reserve the right to remove any tester we reasonably believe is not a genuine human user.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-white mb-2">5. Intellectual Property</h2>
              <p>Apps submitted for testing remain the intellectual property of the submitting business. Testers agree not to copy, redistribute, or publicly disclose details of apps they test. Screen recordings and feedback become the property of the business who ordered the test.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-white mb-2">6. Payments</h2>
              <p>All payments are processed through Stripe. Prices are in USD. Refunds are available if we cannot fulfil your order. Tester payments are made within 24 hours of test completion approval.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-white mb-2">7. Limitation of Liability</h2>
              <p>Flinchify provides a marketplace service. We are not responsible for the quality of apps submitted for testing or the completeness of tester feedback beyond our verification processes. Our liability is limited to the amount paid for the specific service.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-white mb-2">8. Governing Law</h2>
              <p>These terms are governed by the laws of New South Wales, Australia. Any disputes shall be resolved in the courts of New South Wales.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-white mb-2">9. Changes</h2>
              <p>We may update these terms at any time. Continued use of the service after changes constitutes acceptance. We will notify registered users of material changes via email.</p>
            </section>

            <section>
              <h2 className="text-[16px] font-semibold text-white mb-2">10. Contact</h2>
              <p>For questions about these terms: hello@Flinchify.dev</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

