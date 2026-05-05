import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  onFiles: (files: globalThis.File[]) => void;
  disabled?: boolean;
};

export function FileUpload({ onFiles, disabled }: Props) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      if (disabled) return;
      const files = Array.from(e.dataTransfer.files);
      if (files.length) onFiles(files);
    },
    [onFiles, disabled],
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) onFiles(files);
    e.target.value = "";
  };

  return (
    <label
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed cursor-pointer transition-colors p-6",
        dragging
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 hover:bg-muted/30",
        disabled && "opacity-50 cursor-not-allowed",
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <Upload className="h-6 w-6 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">
        Drag & drop files or{" "}
        <span className="text-primary font-medium">browse</span>
      </span>
      <input
        type="file"
        multiple
        className="hidden"
        disabled={disabled}
        onChange={handleInput}
      />
    </label>
  );
}
