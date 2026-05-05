import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { authApi } from "@/lib/api/auth";
import { HttpError } from "@/lib/api/client";
import { useAuthStore } from "@/store/auth";

export function useAuth() {
  const { user, setUser, clear } = useAuthStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: authApi.me,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) setUser(data);
    if (error instanceof HttpError && error.status === 401) clear();
  }, [data, error, setUser, clear]);

  const isAuthenticated = !!user;
  const isLoaded = !isLoading;

  return { user, isAuthenticated, isLoaded };
}
