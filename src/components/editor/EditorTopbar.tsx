"use client";

import Link from "next/link";
import { Languages, LayoutTemplate, Monitor, Smartphone, Tablet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/store/editorStore";
import type { Breakpoint } from "@/types";

const breakpointIcons: Record<Breakpoint, typeof Monitor> = {
  desktop: Monitor,
  tablet: Tablet,
  mobile: Smartphone,
};

interface EditorTopbarProps {
  projectName: string;
}

export function EditorTopbar({ projectName }: EditorTopbarProps) {
  const breakpoint = useEditorStore((state) => state.currentBreakpoint);
  const locale = useEditorStore((state) => state.currentLocale);
  const BreakpointIcon = breakpointIcons[breakpoint];

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

      <p className="min-w-0 flex-1 truncate text-sm text-muted-foreground">{projectName}</p>

      <div className="flex items-center gap-2">
        <Badge variant="outline" title="Текущий breakpoint">
          <BreakpointIcon aria-hidden />
          {breakpoint}
        </Badge>
        <Badge variant="outline" title="Текущий язык">
          <Languages aria-hidden />
          {locale.toUpperCase()}
        </Badge>
      </div>
    </header>
  );
}
