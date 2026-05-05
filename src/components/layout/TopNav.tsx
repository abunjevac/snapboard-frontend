import { useNavigate } from "@tanstack/react-router";
import { Monitor, Moon, Plus, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./UserMenu";

type TopNavProps = {
  onNewSession?: () => void;
};

export function TopNav({ onNewSession }: TopNavProps) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const themeIcon =
    theme === "light" ? (
      <Sun className="h-4 w-4" />
    ) : theme === "dark" ? (
      <Moon className="h-4 w-4" />
    ) : (
      <Monitor className="h-4 w-4" />
    );

  const themeTitle =
    theme === "light"
      ? "Light — click for dark"
      : theme === "dark"
        ? "Dark — click for system"
        : "System — click for light";

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl h-14 flex items-center justify-between">
        <button
          className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity"
          onClick={() => navigate({ to: "/sessions" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="none"
            className="h-6 w-6 shrink-0"
            aria-hidden="true"
          >
            <rect x="4" y="5" width="24" height="24" rx="4" fill="url(#sb-bg)" />
            <rect x="11" y="2" width="10" height="6" rx="3" fill="#818cf8" />
            <rect x="13" y="4" width="6" height="2" rx="1" fill="#4f46e5" />
            <rect x="8" y="13" width="16" height="2" rx="1" fill="white" fillOpacity="0.9" />
            <rect x="8" y="18" width="12" height="2" rx="1" fill="white" fillOpacity="0.75" />
            <rect x="8" y="23" width="8" height="2" rx="1" fill="white" fillOpacity="0.55" />
            <defs>
              <linearGradient id="sb-bg" x1="4" y1="5" x2="28" y2="29" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#4338ca" />
              </linearGradient>
            </defs>
          </svg>
          snapboard
        </button>

        <div className="flex items-center gap-2">
          {onNewSession && (
            <Button size="sm" onClick={onNewSession}>
              <Plus className="h-4 w-4 mr-1" />
              New Session
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            title={themeTitle}
          >
            {themeIcon}
          </Button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
