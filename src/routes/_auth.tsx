import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { authApi } from "@/lib/api/auth";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ location }) => {
    try {
      await authApi.me();
    } catch {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  staleTime: 5 * 60 * 1000,
  component: AuthLayout,
});

function AuthLayout() {
  useAuth();
  return <Outlet />;
}
