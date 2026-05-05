import { createFileRoute, redirect } from "@tanstack/react-router";
import { authApi } from "@/lib/api/auth";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    try {
      await authApi.me();
    } catch {
      throw redirect({ to: "/login" });
    }
    throw redirect({ to: "/sessions" });
  },
  component: () => null,
});
