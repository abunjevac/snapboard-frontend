export type User = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
};

export type NoteMode = "markdown" | "plaintext";

export type Lifetime = "10min" | "30min" | "1day" | "7days" | "forever";

export type Session = {
  id: string;
  ownerId: string;
  title: string;
  note: string;
  noteMode: NoteMode;
  editable: boolean;
  expiresAt: string | null;
  createdAt: string;
};

export type File = {
  id: string;
  sessionId: string;
  filename: string;
  contentType: string;
  sizeBytes: number;
  storageKey: string;
  uploadedAt: string;
};

export type PaginatedSessions = {
  items: Session[];
  total: number;
};

export type ApiError = {
  error: string;
};
