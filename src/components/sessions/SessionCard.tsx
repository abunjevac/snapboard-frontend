import { formatDistanceToNow } from "date-fns";
import {
  Clock,
  Infinity as InfinityIcon,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Session } from "@/lib/api/types";
import { cn } from "@/lib/utils";

type SessionCardProps = {
  session: Session;
  selected: boolean;
  selecting: boolean;
  onSelect: (id: string, checked: boolean) => void;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
};

export function SessionCard({
  session,
  selected,
  selecting,
  onSelect,
  onOpen,
  onDelete,
}: SessionCardProps) {
  const isExpired = session.expiresAt
    ? new Date(session.expiresAt) < new Date()
    : false;

  const expiryLabel = session.expiresAt
    ? formatDistanceToNow(new Date(session.expiresAt), { addSuffix: true })
    : "∞ forever";

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md hover:border-primary/50 group",
        selected && "ring-2 ring-primary",
        isExpired && "opacity-50",
      )}
      onClick={() =>
        !selecting ? onOpen(session.id) : onSelect(session.id, !selected)
      }
    >
      <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
        <div className="flex items-center gap-2 min-w-0">
          {selecting && (
            <Checkbox
              checked={selected}
              onCheckedChange={(v) => onSelect(session.id, !!v)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <span className="font-semibold text-sm truncate">
            {session.title}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onOpen(session.id);
              }}
            >
              <Pencil className="mr-2 h-4 w-4" /> Open
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(session.id);
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="pt-0 space-y-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{expiryLabel}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {session.expiresAt ? (
            <Badge variant="secondary" className="text-xs">
              <Clock className="h-2.5 w-2.5 mr-1" />
              expires
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-xs">
              <InfinityIcon className="h-2.5 w-2.5 mr-1" />
              forever
            </Badge>
          )}
          {session.editable && (
            <Badge className="text-xs bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-0">
              editable
            </Badge>
          )}
          {session.note && (
            <Badge variant="outline" className="text-xs">
              note
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
