import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EditorPanelProps {
  title: string;
  icon: LucideIcon;
  className?: string;
  children: React.ReactNode;
}

/** Боковая панель редактора: заголовок с иконкой + прокручиваемое содержимое. */
export function EditorPanel({ title, icon: Icon, className, children }: EditorPanelProps) {
  return (
    <aside aria-label={title} className={cn("flex min-h-0 flex-col bg-background", className)}>
      <header className="flex h-11 shrink-0 items-center gap-2 border-b px-4">
        <Icon className="size-4 text-muted-foreground" aria-hidden />
        <h2 className="text-sm font-medium">{title}</h2>
      </header>
      <div className="flex-1 p-4 xl:overflow-y-auto">{children}</div>
    </aside>
  );
}
