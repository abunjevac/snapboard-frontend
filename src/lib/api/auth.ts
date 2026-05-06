import { api } from "./client";
import type { User } from "./types";

export const authApi = {
  me: () => api.get<User>("/api/auth/me"),
  logout: () => api.post<void>("/api/auth/logout"),
  forgetMe: () => api.delete<void>("/api/auth/me"),
  verifyEmail: (code: string) =>
    api.post<{ redirectTo: string }>("/api/auth/verify-email", { code }),
};
