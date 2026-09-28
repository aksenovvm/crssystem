import { SlidersHorizontal } from "lucide-react";

import { EditorPanel } from "./EditorPanel";

interface InspectorProps {
  className?: string;
}

export function Inspector({ className }: InspectorProps) {
  return (
    <EditorPanel title="Inspector" icon={SlidersHorizontal} className={className}>
      <p className="text-sm text-muted-foreground">
        Выберите блок на странице, чтобы увидеть его настройки.
      </p>
    </EditorPanel>
  );
}
