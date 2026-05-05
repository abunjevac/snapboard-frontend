import { api } from "./client";
import type { Lifetime, NoteMode, PaginatedSessions, Session } from "./types";

export type CreateSessionInput = {
  title?: string;
  lifetime: Lifetime;
  noteMode?: NoteMode;
  editable?: boolean;
};

export type UpdateSessionInput = {
  title?: string;
  note?: string;
  noteMode?: NoteMode;
  editable?: boolean;
  lifetime?: Lifetime;
};

export const sessionsApi = {
  list: (limit = 20, offset = 0) =>
    api.get<PaginatedSessions>(`/api/sessions?limit=${limit}&offset=${offset}`),
  get: (id: string) => api.get<Session>(`/api/sessions/${id}`),
  create: (input: CreateSessionInput) =>
    api.post<Session>("/api/sessions", input),
  update: (id: string, input: UpdateSessionInput) =>
    api.patch<Session>(`/api/sessions/${id}`, input),
  delete: (id: string) => api.delete(`/api/sessions/${id}`),
  deleteBulk: (ids: string[]) => api.delete("/api/sessions", { ids }),
};
