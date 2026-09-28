import Link from "next/link";
import { LayoutTemplate } from "lucide-react";

import { Separator } from "@/components/ui/separator";

interface EditorTopbarProps {
  projectName: string;
}

export function EditorTopbar({ projectName }: EditorTopbarProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4">
      <Link
        href="/"
        className="flex items-center gap-2 rounded-md text-sm font-semibold"
        aria-label="Visual Site Builder — на главную"
      >
        <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <LayoutTemplate className="size-4" aria-hidden />
        </span>
        <span className="hidden sm:inline">Visual Site Builder</span>
      </Link>

      <Separator orientation="vertical" className="data-[orientation=vertical]:h-6" />

      <p className="truncate text-sm text-muted-foreground">{projectName}</p>
    </header>
  );
}
