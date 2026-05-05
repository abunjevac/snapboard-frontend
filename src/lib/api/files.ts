import { api } from "./client";
import type { File } from "./types";

export const filesApi = {
  list: (sessionId: string) =>
    api.get<File[]>(`/api/sessions/${sessionId}/files`),
  upload: (sessionId: string, file: globalThis.File) => {
    const fd = new FormData();
    fd.append("file", file);
    return api.upload<File>(`/api/sessions/${sessionId}/files`, fd);
  },
  delete: (sessionId: string, fileId: string) =>
    api.delete(`/api/sessions/${sessionId}/files/${fileId}`),
  downloadUrl: (sessionId: string, fileId: string) =>
    `/api/sessions/${sessionId}/files/${fileId}/download`,
};
