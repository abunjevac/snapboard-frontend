import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, FileText, Pencil } from "lucide-react";
import { useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sessionsApi } from "@/lib/api/sessions";
import type { NoteMode, Session } from "@/lib/api/types";
import { cn } from "@/lib/utils";

type Props = {
  session: Session;
  canEdit: boolean;
};

export function NoteEditor({ session, canEdit }: Props) {
  const qc = useQueryClient();
  const [preview, setPreview] = useState(false);
  const [draft, setDraft] = useState(session.note);

  const updateNote = useMutation({
    mutationFn: (note: string) => sessionsApi.update(session.id, { note }),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["session", session.id] }),
    onError: () => toast.error("Failed to save note."),
  });

  const updateMode = useMutation({
    mutationFn: (noteMode: NoteMode) =>
      sessionsApi.update(session.id, { noteMode }),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["session", session.id] }),
  });

  const handleBlur = useCallback(() => {
    if (draft !== session.note) {
      updateNote.mutate(draft);
    }
  }, [draft, session.note, updateNote]);

  const isMarkdown = session.noteMode === "markdown";

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 bg-muted/30 border-b border-border">
        <span className="text-sm font-medium">Note</span>
        <div className="flex items-center gap-1">
          {isMarkdown && canEdit && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setPreview(!preview)}
            >
              {preview ? (
                <>
                  <Pencil className="h-3 w-3 mr-1" />
                  Edit
                </>
              ) : (
                <>
                  <Eye className="h-3 w-3 mr-1" />
                  Preview
                </>
              )}
            </Button>
          )}
          <div className="flex rounded-md border border-border overflow-hidden">
            <button
              className={cn(
                "px-2 py-0.5 text-xs font-medium transition-colors",
                isMarkdown
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:bg-muted",
              )}
              onClick={() => canEdit && updateMode.mutate("markdown")}
            >
              MD
            </button>
            <button
              className={cn(
                "px-2 py-0.5 text-xs font-medium transition-colors",
                !isMarkdown
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:bg-muted",
              )}
              onClick={() => canEdit && updateMode.mutate("plaintext")}
            >
              <FileText className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-45">
        {!canEdit || (isMarkdown && preview) ? (
          <div
            className={cn(
              "p-3 min-h-45",
              isMarkdown
                ? "prose prose-sm dark:prose-invert max-w-none"
                : "text-sm whitespace-pre-wrap font-mono",
            )}
          >
            {session.note ? (
              isMarkdown ? (
                <ReactMarkdown>{session.note}</ReactMarkdown>
              ) : (
                session.note
              )
            ) : (
              <span className="text-muted-foreground italic">No note yet.</span>
            )}
          </div>
        ) : (
          <Textarea
            className="border-0 rounded-none resize-none min-h-45 focus-visible:ring-0 font-mono text-sm"
            placeholder={isMarkdown ? "# Your note in Markdown…" : "Your note…"}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={handleBlur}
          />
        )}
      </div>
    </div>
  );
}
