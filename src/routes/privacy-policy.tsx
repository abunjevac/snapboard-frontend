import { Link, createFileRoute } from "@tanstack/react-router";
import { Zap } from "lucide-react";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
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
          <h1 className="text-2xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: May 2025</p>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Overview</h2>
            <p className="text-sm text-muted-foreground">
              Snapboard is a free service for ephemeral file and note sharing.
              This policy explains what data we collect, how we use it, and your
              rights regarding your information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Authentication</h2>
            <p className="text-sm text-muted-foreground">
              Snapboard uses OAuth 2.0 via Google and GitHub for authentication.
              We do not store passwords. When you sign in, we receive a limited
              profile from your OAuth provider (name, email address, and profile
              picture) solely to identify your account. We do not share this
              information with third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Content & Ephemeral Storage</h2>
            <p className="text-sm text-muted-foreground">
              Files and notes you upload are stored temporarily and expire
              automatically. We do not analyse, sell, or share your content.
              Once content expires it is permanently deleted from our systems.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Cookies & Local Storage</h2>
            <p className="text-sm text-muted-foreground">
              We use a session cookie to keep you signed in. No tracking or
              advertising cookies are used.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Data Retention</h2>
            <p className="text-sm text-muted-foreground">
              Account information is retained while your account is active. You
              may request deletion of your account and associated data at any
              time by contacting us.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Changes to This Policy</h2>
            <p className="text-sm text-muted-foreground">
              We may update this policy from time to time. Continued use of the
              service after changes constitutes acceptance of the revised policy.
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
