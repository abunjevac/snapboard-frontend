import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/lib/api/auth";
import { HttpError } from "@/lib/api/client";

export const Route = createFileRoute("/verify-email")({
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);

    try {
      const { redirectTo } = await authApi.verifyEmail(code.trim());
      window.location.href = redirectTo;
    } catch (err) {
      if (err instanceof HttpError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src="/favicon.svg" alt="" className="h-8 w-8" />
            <span className="text-3xl font-bold tracking-tight">snapboard</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Check your email for a verification code
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Verification code</Label>
            <Input
              id="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Verifying…" : "Verify email"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Didn&apos;t receive a code?{" "}
          <a
            href="/api/auth/login"
            className="hover:text-foreground transition-colors underline underline-offset-2"
          >
            Try signing in again
          </a>
        </p>
      </div>
    </div>
  );
}
