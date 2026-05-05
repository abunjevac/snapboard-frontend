import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { TopNav } from "@/components/layout/TopNav";
import { FileList } from "@/components/session/FileList";
import { NoteEditor } from "@/components/session/NoteEditor";
import { SessionHeader } from "@/components/session/SessionHeader";
import { sessionsApi } from "@/lib/api/sessions";
import { useAuthStore } from "@/store/auth";

export const Route = createFileRoute("/_auth/sessions/$id")({
  component: SessionDetailPage,
});

function SessionDetailPage() {
  const { id } = Route.useParams();
  const { user } = useAuthStore();

  const {
    data: session,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["session", id],
    queryFn: () => sessionsApi.get(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Session not found or expired.</p>
      </div>
    );
  }

  const isOwner = session.ownerId === user?.id;
  const canEdit = isOwner || session.editable;

  return (
    <>
      <TopNav />
      <main className="container mx-auto px-4 py-6 max-w-3xl">
        <SessionHeader session={session} isOwner={isOwner} />

        <div className="space-y-4">
          <NoteEditor session={session} canEdit={canEdit} />
          <FileList session={session} canEdit={canEdit} />
        </div>
      </main>
    </>
  );
}
