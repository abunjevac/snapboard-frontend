import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src="/favicon.svg" alt="" className="h-6 w-6" />
            <span className="text-2xl font-bold tracking-tight">Snapboard</span>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: May 2026</p>

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
              profile from your OAuth provider solely to identify your account.
              We do not share this information with third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Google User Data</h2>
            <p className="text-sm text-muted-foreground">
              When you sign in with Google, Snapboard accesses the following
              data from your Google account via the OAuth 2.0 <code>openid</code>,{" "}
              <code>email</code>, and <code>profile</code> scopes:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 pl-2">
              <li>Email address</li>
              <li>Display name (first and last name)</li>
              <li>Profile picture URL</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              <strong>How we use this data:</strong> This information is used
              exclusively to create and identify your Snapboard account. Your
              email address is used to uniquely identify your account and for
              transactional communications (such as email verification). Your
              display name and profile picture are shown within the application
              so you can confirm you are signed in to the correct account.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Storage:</strong> This data is stored in our database for
              as long as your account is active. We do not use Google user data
              to develop, improve, or train generalised AI or machine-learning
              models. We do not sell or share Google user data with third
              parties.
            </p>
            <p className="text-sm text-muted-foreground">
              Our use of Google user data complies with the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                className="underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">GitHub User Data</h2>
            <p className="text-sm text-muted-foreground">
              When you sign in with GitHub, Snapboard accesses the following
              data from your GitHub account via the <code>read:user</code> and{" "}
              <code>user:email</code> scopes:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 pl-2">
              <li>Email address</li>
              <li>Display name (or username if no name is set)</li>
              <li>Profile picture URL</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              <strong>How we use this data:</strong> This information is used
              exclusively to create and identify your Snapboard account. Your
              email address is used to uniquely identify your account and for
              transactional communications (such as email verification). Your
              display name and profile picture are shown within the application
              so you can confirm you are signed in to the correct account.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Storage:</strong> This data is stored in our database for
              as long as your account is active. We do not use GitHub user data
              to develop, improve, or train generalised AI or machine-learning
              models. We do not sell or share GitHub user data with third
              parties.
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
            <h2 className="text-lg font-semibold">Data Retention & Account Deletion</h2>
            <p className="text-sm text-muted-foreground">
              Account information is retained while your account is active. You
              can permanently delete your account at any time directly from the
              application via the user menu ("Forget me"). Doing so immediately
              and permanently deletes your account record, all sessions, and all
              associated data — including any Google or GitHub profile
              information we hold — from our systems.
            </p>
            <p className="text-sm text-muted-foreground">
              If you need assistance, you may also contact us at{" "}
              <a
                href="mailto:admin@exobyte.org"
                className="underline underline-offset-2"
              >
                admin@exobyte.org
              </a>
              .
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
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </Link>
        </div>
      </div>
    </div>
  );
}
