import { Link, createFileRoute } from "@tanstack/react-router";
import { Zap } from "lucide-react";

export const Route = createFileRoute("/terms-of-service")({
  component: TermsOfServicePage,
});

function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold tracking-tight">snapboard</span>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Last updated: May 2025</p>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Acceptance of Terms</h2>
            <p className="text-sm text-muted-foreground">
              By accessing or using Snapboard, you agree to be bound by these
              Terms of Service. If you do not agree, please do not use the
              service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Eligibility</h2>
            <p className="text-sm text-muted-foreground">
              Snapboard is available to anyone with a valid Google or GitHub
              account. The service is provided free of charge. We reserve the
              right to revoke access at our discretion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Acceptable Use</h2>
            <p className="text-sm text-muted-foreground">
              You agree not to use Snapboard to upload, share, or distribute
              content that is unlawful, harmful, abusive, defamatory, or
              infringes the rights of others. We reserve the right to remove
              any content that violates these terms without notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Ephemeral Nature of Content</h2>
            <p className="text-sm text-muted-foreground">
              All content on Snapboard is temporary and expires automatically.
              We do not guarantee the availability or durability of any content.
              Do not use Snapboard as a permanent storage solution.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Disclaimer of Warranties</h2>
            <p className="text-sm text-muted-foreground">
              Snapboard is provided "as is" without warranties of any kind,
              express or implied. We do not guarantee uninterrupted, error-free
              service. Use of the service is at your own risk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Limitation of Liability</h2>
            <p className="text-sm text-muted-foreground">
              To the fullest extent permitted by law, Snapboard and its
              operators shall not be liable for any indirect, incidental,
              special, or consequential damages arising from your use of the
              service or loss of content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Changes to Terms</h2>
            <p className="text-sm text-muted-foreground">
              We may update these terms at any time. Continued use of the
              service after changes constitutes acceptance of the revised terms.
            </p>
          </section>
        </div>

        <div className="pt-4 border-t">
          <Link
            to="/login"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
