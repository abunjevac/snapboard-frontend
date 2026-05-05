import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowLeft,
  Clock,
  Infinity as InfinityIcon,
  Link,
  MoreVertical,
  Timer,
  Trash2,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { DeleteConfirmDialog } from "@/components/sessions/DeleteConfirmDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { sessionsApi } from "@/lib/api/sessions";
import type { Lifetime, Session } from "@/lib/api/types";

type Props = {
  session: Session;
  isOwner: boolean;
};

export function SessionHeader({ session, isOwner }: Props) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [titleDraft, setTitleDraft] = useState(session.title);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitle = useMutation({
    mutationFn: (title: string) => sessionsApi.update(session.id, { title }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["session", session.id] }).catch(console.error);
      setEditing(false);
    },
    onError: () => toast.error("Failed to rename session."),
  });

  const updateExpiry = useMutation({
    mutationFn: (lifetime: Lifetime) =>
      sessionsApi.update(session.id, { lifetime }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["session", session.id] }).catch(console.error);
      toast.success("Expiry updated.");
    },
    onError: () => toast.error("Failed to update expiry."),
  });

  const updateEditable = useMutation({
    mutationFn: (editable: boolean) =>
      sessionsApi.update(session.id, { editable }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["session", session.id] }).catch(console.error);
      toast.success("Editable status updated.");
    },
    onError: () => toast.error("Failed to update editable status."),
  });

  const deleteSession = useMutation({
    mutationFn: () => sessionsApi.delete(session.id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sessions"] }).catch(console.error);
      navigate({ to: "/sessions" });
      toast.success("Session deleted.");
    },
    onError: () => toast.error("Failed to delete session."),
  });

  const handleTitleBlur = () => {
    if (titleDraft.trim() && titleDraft !== session.title) {
      updateTitle.mutate(titleDraft.trim());
    } else {
      setTitleDraft(session.title);
      setEditing(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(console.error);
    toast.success("Link copied!");
  };

  const expiryLabel = session.expiresAt
    ? formatDistanceToNow(new Date(session.expiresAt), { addSuffix: true })
    : null;

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: "/sessions" })}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1 min-w-0">
          {editing ? (
            <Input
              ref={inputRef}
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") inputRef.current?.blur();
                if (e.key === "Escape") {
                  setTitleDraft(session.title);
                  setEditing(false);
                }
              }}
              className="h-8 text-lg font-bold px-1 border-b border-primary rounded-none focus-visible:ring-0"
              autoFocus
            />
          ) : (
            <button
              className="text-lg font-bold truncate hover:text-primary transition-colors text-left w-full"
              onClick={() => {
                setEditing(true);
                setTitleDraft(session.title);
              }}
              title="Click to rename"
            >
              {session.title}
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {expiryLabel ? (
            <Badge variant="secondary" className="text-xs gap-1">
              <Clock className="h-3 w-3" />
              {expiryLabel}
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-xs gap-1">
              <InfinityIcon className="h-3 w-3" />
              forever
            </Badge>
          )}
          {session.editable && (
            <Badge className="text-xs bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-0">
              editable
            </Badge>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={copyLink}>
              <Link className="mr-2 h-4 w-4" />
              Copy link
            </DropdownMenuItem>
            {isOwner && (
              <>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Timer className="mr-2 h-4 w-4" />
                    Change expiry
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {(
                      [
                        ["10min", "10 minutes"],
                        ["30min", "30 minutes"],
                        ["1day", "1 day"],
                        ["7days", "7 days"],
                        ["forever", "Forever"],
                      ] as [Lifetime, string][]
                    ).map(([value, label]) => (
                      <DropdownMenuItem
                        key={value}
                        onClick={() => updateExpiry.mutate(value)}
                      >
                        {label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuCheckboxItem
                  checked={session.editable}
                  onCheckedChange={(checked) => updateEditable.mutate(checked)}
                >
                  Allow editing by others
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => setConfirmDelete(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete session
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DeleteConfirmDialog
        open={confirmDelete}
        count={1}
        onConfirm={() => deleteSession.mutate()}
        onCancel={() => setConfirmDelete(false)}
      />
    </>
  );
}
