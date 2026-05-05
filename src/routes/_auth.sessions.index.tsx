import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckSquare, Square } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TopNav } from "@/components/layout/TopNav";
import { DeleteConfirmDialog } from "@/components/sessions/DeleteConfirmDialog";
import { NewSessionDialog } from "@/components/sessions/NewSessionDialog";
import { SessionCard } from "@/components/sessions/SessionCard";
import { Button } from "@/components/ui/button";
import { sessionsApi } from "@/lib/api/sessions";

const PAGE_SIZE = 20;

export const Route = createFileRoute("/_auth/sessions/")({
  component: SessionsPage,
});

function SessionsPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [selecting, setSelecting] = useState(false);
  const [newSessionOpen, setNewSessionOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["sessions", page],
    queryFn: () => sessionsApi.list(PAGE_SIZE, page * PAGE_SIZE),
  });

  const deleteMutation = useMutation({
    mutationFn: (ids: string[]) =>
      ids.length === 1
        ? sessionsApi.delete(ids[0])
        : sessionsApi.deleteBulk(ids),
    onSuccess: (_, ids) => {
      qc.invalidateQueries({ queryKey: ["sessions"] }).catch(console.error);
      setSelected(new Set());
      setSelecting(false);
      toast.success(
        `${ids.length === 1 ? "Session" : `${ids.length} sessions`} deleted.`,
      );
    },
    onError: () => toast.error("Failed to delete. Please try again."),
  });

  const sessions = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleSelect = (id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selected.size === sessions.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(sessions.map((s) => s.id)));
    }
  };

  return (
    <>
      <TopNav onNewSession={() => setNewSessionOpen(true)} />
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Sessions</h1>
            {total > 0 && (
              <span className="text-sm text-muted-foreground">
                {total} total
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {selecting && selected.size > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeleteTarget([...selected])}
              >
                Delete {selected.size}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelecting(!selecting);
                setSelected(new Set());
              }}
            >
              {selecting ? (
                <>
                  <Square className="h-4 w-4 mr-1.5" />
                  Cancel
                </>
              ) : (
                <>
                  <CheckSquare className="h-4 w-4 mr-1.5" />
                  Select
                </>
              )}
            </Button>
            {selecting && (
              <Button variant="ghost" size="sm" onClick={handleSelectAll}>
                {selected.size === sessions.length
                  ? "Deselect all"
                  : "Select all"}
              </Button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-muted-foreground mb-4">No sessions yet.</p>
            <Button onClick={() => setNewSessionOpen(true)}>
              Create your first session
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions.map((s) => (
              <SessionCard
                key={s.id}
                session={s}
                selected={selected.has(s.id)}
                selecting={selecting}
                onSelect={handleSelect}
                onOpen={(id) =>
                  navigate({ to: "/sessions/$id", params: { id } })
                }
                onDelete={(id) => setDeleteTarget([id])}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              {page + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </main>

      <NewSessionDialog
        open={newSessionOpen}
        onOpenChange={setNewSessionOpen}
        onCreated={(id) => navigate({ to: "/sessions/$id", params: { id } })}
      />

      <DeleteConfirmDialog
        open={deleteTarget.length > 0}
        count={deleteTarget.length}
        onConfirm={() => {
          deleteMutation.mutate(deleteTarget);
          setDeleteTarget([]);
        }}
        onCancel={() => setDeleteTarget([])}
      />
    </>
  );
}
