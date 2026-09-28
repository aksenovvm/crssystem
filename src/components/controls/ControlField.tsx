import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";

interface ControlFieldProps {
  id: string;
  label: string;
  /** Метка справа от подписи, например код языка у переводимого поля. */
  hint?: string;
  children: ReactNode;
}

/** Подпись + поле ввода. Общая обёртка для всех контролов Inspector. */
export function ControlField({ id, label, hint, children }: ControlFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        {hint && (
          <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground uppercase">
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
