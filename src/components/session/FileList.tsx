import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, File, Image, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { filesApi } from "@/lib/api/files";
import type { Session } from "@/lib/api/types";
import { FileUpload } from "./FileUpload";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

type Props = {
  session: Session;
  canEdit: boolean;
};

export function FileList({ session, canEdit }: Props) {
  const qc = useQueryClient();

  const { data: files = [], isLoading } = useQuery({
    queryKey: ["files", session.id],
    queryFn: () => filesApi.list(session.id),
  });

  const upload = useMutation({
    mutationFn: (file: globalThis.File) => filesApi.upload(session.id, file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["files", session.id] }).catch(console.error);
      toast.success("File uploaded.");
    },
    onError: (e) => toast.error(`Upload failed: ${e.message}`),
  });

  const remove = useMutation({
    mutationFn: (fileId: string) => filesApi.delete(session.id, fileId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["files", session.id] }).catch(console.error);
      toast.success("File deleted.");
    },
    onError: () => toast.error("Failed to delete file."),
  });

  const handleFiles = (newFiles: globalThis.File[]) => {
    newFiles.forEach((f) => upload.mutate(f));
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 bg-muted/30 border-b border-border">
        <span className="text-sm font-medium">
          Files{" "}
          {files.length > 0 && (
            <span className="text-muted-foreground">({files.length})</span>
          )}
        </span>
        {upload.isPending && (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {isLoading ? (
        <div className="p-4 flex justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="divide-y divide-border">
          {files.map((f) => {
            const isImage = f.contentType.startsWith("image/");
            return (
              <div
                key={f.id}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-muted/20 transition-colors"
              >
                {isImage ? (
                  <Image className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <File className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
                <span className="text-sm truncate flex-1">{f.filename}</span>
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatBytes(f.sizeBytes)}
                </span>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    asChild
                  >
                    <a
                      href={filesApi.downloadUrl(session.id, f.id)}
                      download={f.filename}
                    >
                      <Download className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                  {canEdit && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => remove.mutate(f.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {canEdit && (
        <div className="p-3 border-t border-border">
          <FileUpload onFiles={handleFiles} disabled={upload.isPending} />
        </div>
      )}
    </div>
  );
}
